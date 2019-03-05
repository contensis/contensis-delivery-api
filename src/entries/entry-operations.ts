import {
	ClientParams, Entry, EntryGetOptions, EntryListOptions,
	IEntryOperations, IHttpClient, IParamsProvider, PagedList
} from '../models';

import { LinkResolver } from './link-resolver';
import { UrlBuilder } from '../http/url-builder';
import '../polyfills';

let getMappers = {
	fields: (value: string[]) => (value && value.length > 0) ? value : null,
	linkDepth: (value: number) => (value && (value > 0)) ? value : null,
	versionStatus: (value: string) => (value === 'published') ? null : value
};

let listUrl = (options: EntryListOptions, params: ClientParams) => {
	return !!options.contentTypeId
		? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
		: `/api/delivery/projects/:projectId/entries`;
};

let listMappers = {
	fields: (value: string[]) => (value && value.length > 0) ? value : null,
	linkDepth: (value: number) => (value && (value > 0)) ? value : null,
	order: (value: string[]) => (value && value.length > 0) ? value : null,
	pageIndex: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
	pageSize: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
	versionStatus: (value: string) => (value === 'published') ? null : value
};

let searchMappers = {
	linkDepth: (value: number) => (value && (value > 0)) ? value : null
};


export class EntryOperations implements IEntryOperations {
	constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

	}

	get(idOrOptions: string | EntryGetOptions): Promise<Entry> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id', { language: null, versionStatus: null, linkDepth: null, fields: null })
			.setOptions(idOrOptions, 'id')
			.setParams(this.paramsProvider.getParams())
			.addMappers(getMappers)
			.toUrl();

		return this.httpClient.request<Entry>(url);
	}

	list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>> {
		let url = UrlBuilder.create(listUrl, { language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
			.setOptions(contentTypeIdOrOptions, 'contentTypeId')
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

	resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields: string[] = null): Promise<T> {
		let params = this.paramsProvider.getParams();
		let resolver = new LinkResolver(entryOrList, fields, params.versionStatus, (query: any) => this.search(query));
		return resolver.resolve();
	}

}
