"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const link_resolver_1 = require("./link-resolver");
const url_builder_1 = require("../http/url-builder");
require("../polyfills");
const utils_1 = require("../utils");
let getMappers = {
    language: utils_1.defaultMapperForLanguage,
    versionStatus: utils_1.defaultMapperForVersionStatus,
    fields: (value) => (value && value.length > 0) ? value : null,
    linkDepth: (value) => (value && (value > 0)) ? value : null,
};
let listUrl = (options, params) => {
    return !!options.contentTypeId
        ? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
        : `/api/delivery/projects/:projectId/entries`;
};
let listMappers = Object.assign({}, getMappers, { order: (value) => (value && value.length > 0) ? value : null, pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex), pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize) });
let searchMappers = {
    linkDepth: (value) => (value && (value > 0)) ? value : null
};
class EntryOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(idOrOptions) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id', { language: null, versionStatus: null, linkDepth: null, fields: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(getMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    list(contentTypeIdOrOptions) {
        let url = url_builder_1.UrlBuilder.create(listUrl, { language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
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
        let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus } = params, requestParams = tslib_1.__rest(params, ["accessToken", "projectId", "language", "responseHandler", "rootUrl", "versionStatus"]);
        let payload = Object.assign({}, requestParams, { linkDepth,
            pageSize,
            pageIndex, fields: query.fields && query.fields.length > 0 ? query.fields : null, where: JSON.stringify(query.where) });
        if (orderBy && orderBy.length > 0) {
            payload['orderBy'] = JSON.stringify(orderBy);
        }
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', Object.assign({}, payload))
            .setParams(Object.assign({}, payload, { projectId }))
            .addMappers(searchMappers)
            .toUrl();
        if (utils_1.isBrowser() && utils_1.isIE() && url.length > 2083) {
            return this.searchUsingPost(query, linkDepth);
        }
        return this.httpClient.request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }
    resolve(entryOrList, fields = null) {
        let params = this.paramsProvider.getParams();
        let resolver = new link_resolver_1.LinkResolver(entryOrList, fields, params.versionStatus, (query) => this.search(query));
        return resolver.resolve();
    }
    searchUsingPost(query, linkDepth = 0) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let params = this.paramsProvider.getParams();
        query.pageSize = query.pageSize || params.pageSize;
        query.pageIndex = query.pageIndex || 0;
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { linkDepth })
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
exports.EntryOperations = EntryOperations;
