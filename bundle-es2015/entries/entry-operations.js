import { LinkResolver } from './link-resolver';
import { UrlBuilder } from '../http/url-builder';
import '../polyfills';
import { defaultMapperForLanguage, defaultMapperForVersionStatus, isBrowser, isIE } from '../utils';
let getMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForVersionStatus,
    fields: (value) => (value && value.length > 0) ? value : null,
    linkDepth: (value) => (value && (value > 0)) ? value : null,
};
let listUrl = (options, params) => {
    return !!options.contentTypeId
        ? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
        : `/api/delivery/projects/:projectId/entries`;
};
let listMappers = {
    ...getMappers,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize)
};
let searchMappers = {
    linkDepth: (value) => (value && (value > 0)) ? value : null
};
export class EntryOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(idOrOptions) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id', { language: null, versionStatus: null, linkDepth: null, fields: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(getMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    list(contentTypeIdOrOptions) {
        let url = UrlBuilder.create(listUrl, { language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
            .addOptions(contentTypeIdOrOptions, 'contentTypeId')
            .setParams(this.paramsProvider.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    search(query, linkDepth = 0) {
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
            .setParams({ ...payload, projectId })
            .addMappers(searchMappers)
            .toUrl();
        if (isBrowser() && isIE() && url.length > 2083) {
            return this.searchUsingPost(query, linkDepth);
        }
        return this.httpClient.request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }
    resolve(entryOrList, fields = null) {
        let params = this.paramsProvider.getParams();
        let resolver = new LinkResolver(entryOrList, fields, params.versionStatus, (query) => this.search(query));
        return resolver.resolve();
    }
    searchUsingPost(query, linkDepth = 0) {
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
        return this.httpClient.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(query)
        });
    }
}
