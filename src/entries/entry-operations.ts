import {
	ClientParams, Entry, EntryGetOptions, EntryListOptions,
	IEntryOperations, IHttpClient, IParamsProvider, MapperFn, PagedList
} from '../models';

import { LinkResolver } from './link-resolver';
import { UrlBuilder } from '../http/url-builder';
import '../polyfills';
import { defaultMapperForLanguage, defaultMapperForVersionStatus } from '../utils';

let getMappers: { [key: string]: MapperFn } = {
	language: defaultMapperForLanguage,
	versionStatus: defaultMapperForVersionStatus,
	fields: (value: string[]) => (value && value.length > 0) ? value : null,
	linkDepth: (value: number) => (value && (value > 0)) ? value : null,
};

let listUrl = (options: EntryListOptions, params: ClientParams) => {
	return !!options.contentTypeId
		? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
		: `/api/delivery/projects/:projectId/entries`;
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

	search(query: any, linkDepth: number = 0): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let params = this.paramsProvider.getParams();
		let pageSize = query.pageSize || params.pageSize;
		let pageIndex = query.pageIndex || 0;

		let orderBy = (query.orderBy && (query.orderBy._items || query.orderBy));

		let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			linkDepth,
			pageSize,
			pageIndex,
			fields: query.fields && query.fields.length > 0 ? query.fields : null,
			where: JSON.stringify(query.where),
		};

		if (orderBy && orderBy.length > 0) {
			payload['orderBy'] = JSON.stringify(orderBy);
		}

		let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { ...payload })
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

}
