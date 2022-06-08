import {
	Entry, EntryGetOptions, EntryListOptions,
	IEntryOperations
} from '../models';

import { LinkResolver } from './link-resolver';
import {
	ClientParams, defaultMapperForLanguage, defaultMapperForPublishedVersionStatus,
	IHttpClient, IParamsProvider, isBrowser, isIE, MapperFn, PagedList, Query, UrlBuilder, ZenqlQuery
} from 'contensis-core-api';

const defaultListUrl = `/api/delivery/projects/:projectId/entries`;

let listUrl = (options: EntryListOptions, params: ClientParams) => {
	return !!options.contentTypeId
		? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
		: defaultListUrl;
};

let getMappers: { [key: string]: MapperFn } = {
	language: defaultMapperForLanguage,
	versionStatus: defaultMapperForPublishedVersionStatus,
	fields: (value: string[]) => (value && value.length > 0) ? value : null,
	linkDepth: (value: number) => (value && (value > 0)) ? value : null,
};

let listMappers: { [key: string]: MapperFn } = {
	...getMappers,
	order: (value: string[]) => (value && value.length > 0) ? value : null,
	pageIndex: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
	pageSize: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize)
};

let searchMappers: { [key: string]: MapperFn } = {
	linkDepth: (value: number) => (value && (value > 0)) ? value : null
};


export class EntryOperations implements IEntryOperations {
	constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

	}

	get(idOrOptions: string | EntryGetOptions): Promise<Entry> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id',
			{ language: null, versionStatus: null, linkDepth: null, fields: null })
			.addOptions(idOrOptions, 'id')
			.setParams(this.paramsProvider.getParams())
			.addMappers(getMappers)
			.toUrl();

		return this.httpClient.request<Entry>(url);
	}

	list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>> {
		let url = UrlBuilder.create(
			listUrl,
			{ language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
			.addOptions(contentTypeIdOrOptions, 'contentTypeId')
			.setParams(this.paramsProvider.getParams())
			.addMappers(listMappers)
			.toUrl();
		return this.httpClient.request<PagedList<Entry>>(url);
	}

	search(query: string | Query | ZenqlQuery, linkDepth: number = 0): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let deliveryQuery = query instanceof Query ? query as Query : null;
		// use duck-typing for backwards compatibility pre v1.2.0
		if (deliveryQuery !== null || !!(query as any).where || !!(query as any).orderBy) {
			return this.searchUsingQuery(deliveryQuery || (query as any), linkDepth);
		}

		let zenqlQuery: ZenqlQuery = query instanceof ZenqlQuery ? query as ZenqlQuery : null;
		if (zenqlQuery === null) {
			if (typeof query === 'string') {
				zenqlQuery = new ZenqlQuery(query);
			} else {
				throw new Error('A valid query needs to be specified.');
			}
		}

		let params = this.paramsProvider.getParams();
		let pageSize = params.pageSize || 25;
		let pageIndex = params.pageIndex || 0;
		let fields: string[] = [];

		pageSize = zenqlQuery.pageSize || pageSize;
		pageIndex = zenqlQuery.pageIndex || pageIndex;
		fields = zenqlQuery.fields || fields;

		let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			linkDepth,
			pageSize,
			pageIndex,
			zenql: zenqlQuery.zenql,
		};

		if (fields && fields.length > 0) {
			payload['fields'] = fields;
		}

		let url = UrlBuilder.create(defaultListUrl, { ...payload })
			.setParams({ ...(payload as any), projectId })
			.addMappers(searchMappers)
			.toUrl();

		return this.httpClient.request<PagedList<Entry>>(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json; charset=utf-8' }
		});

	}

	resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields: string[] = null): Promise<T> {
		let params = this.paramsProvider.getParams();
		let resolver = new LinkResolver(entryOrList, fields, params.versionStatus, (query: any) => this.search(query));
		return resolver.resolve();
	}

	private searchUsingQuery(query: Query, linkDepth: number = 0): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let deliveryQuery = query as Query;

		let params = this.paramsProvider.getParams();
		let pageSize = params.pageSize || 25;
		let pageIndex = params.pageIndex || 0;
		let fields: string[] = [];

		pageSize = deliveryQuery.pageSize || pageSize;
		pageIndex = deliveryQuery.pageIndex || pageIndex;
		fields = deliveryQuery.fields || fields;

		let orderBy = (deliveryQuery.orderBy && ((deliveryQuery.orderBy as any)._items || deliveryQuery.orderBy));

		let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			linkDepth,
			pageSize,
			pageIndex,
			where: JSON.stringify(deliveryQuery.where)
		};

		if (fields && fields.length > 0) {
			payload['fields'] = fields;
		}

		if (deliveryQuery.orderBy && (!Array.isArray(deliveryQuery.orderBy) || (deliveryQuery.orderBy as any).length > 0)) {
			payload['orderBy'] = JSON.stringify(orderBy);
		}

		let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { ...payload })
			.setParams({ ...(payload as any), projectId })
			.addMappers(searchMappers)
			.toUrl();

		if (isBrowser() && isIE() && url.length > 2083) {
			return this.searchUsingPost(query, linkDepth);
		}

		return this.httpClient.request<PagedList<Entry>>(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json; charset=utf-8' }
		});
	}

	private searchUsingPost(query: any, linkDepth: number = 0): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let params = this.paramsProvider.getParams();
		query.pageSize = query.pageSize || params.pageSize;
		query.pageIndex = query.pageIndex || 0;

		let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { linkDepth })
			.setParams(this.paramsProvider.getParams())
			.addMappers(searchMappers)
			.toUrl();

		return this.httpClient.request<PagedList<Entry>>(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(query)
		});
	}
}
