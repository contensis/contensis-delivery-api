"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryOperations = void 0;
const tslib_1 = require("tslib");
const link_resolver_1 = require("./link-resolver");
const contensis_core_api_1 = require("contensis-core-api");
const defaultListUrl = `/api/delivery/projects/:projectId/entries`;
let listUrl = (options, params) => {
    return !!options.contentTypeId
        ? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
        : defaultListUrl;
};
let getMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    versionStatus: contensis_core_api_1.defaultMapperForPublishedVersionStatus,
    fields: (value) => (value && value.length > 0 ? value : null),
    linkDepth: (value) => (value && value > 0 ? value : null),
    fieldLinkDepths: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};
let listMappers = Object.assign(Object.assign({}, getMappers), { order: (value) => (value && value.length > 0) ? value : null, pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex), pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize) });
let searchMappers = {
    aggregations: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
    linkDepth: (value) => (value && (value > 0)) ? value : null,
    fieldLinkDepths: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};
class EntryOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id', { language: null, versionStatus: null, linkDepth: null, fieldLinkDepths: null, fields: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list(contentTypeIdOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create(listUrl, { language: null, versionStatus: null, linkDepth: null, order: null, fieldLinkDepths: null, fields: null, pageIndex: null, pageSize: null })
            .addOptions(contentTypeIdOrOptions, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    search(query, linkDepth = 0) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let deliveryQuery = query instanceof contensis_core_api_1.Query ? query : null;
        // use duck-typing for backwards compatibility pre v1.2.0
        if (deliveryQuery !== null || !!query.where || !!query.orderBy) {
            return this.searchUsingQuery(deliveryQuery || query, linkDepth);
        }
        let zenqlQuery = query instanceof contensis_core_api_1.ZenqlQuery ? query : null;
        if (zenqlQuery === null) {
            if (typeof query === 'string') {
                zenqlQuery = new contensis_core_api_1.ZenqlQuery(query);
            }
            else {
                throw new Error('A valid query needs to be specified.');
            }
        }
        let params = this.contensisClient.getParams();
        let pageSize = params.pageSize || 25;
        let pageIndex = params.pageIndex || 0;
        let fields = [];
        let fieldLinkDepths = {};
        let aggregations = {};
        pageSize = zenqlQuery.pageSize || pageSize;
        pageIndex = zenqlQuery.pageIndex || pageIndex;
        fields = zenqlQuery.fields || fields;
        fieldLinkDepths = zenqlQuery.fieldLinkDepths || fieldLinkDepths;
        aggregations = zenqlQuery.aggregations || aggregations;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus } = params, requestParams = tslib_1.__rest(params, ["accessToken", "projectId", "language", "responseHandler", "rootUrl", "versionStatus"]);
        let payload = Object.assign(Object.assign({}, requestParams), { aggregations,
            fieldLinkDepths,
            linkDepth,
            pageSize,
            pageIndex, zenql: zenqlQuery.zenql });
        if (fields && fields.length > 0) {
            payload['fields'] = fields;
        }
        let url = contensis_core_api_1.UrlBuilder.create(defaultListUrl, Object.assign({}, payload))
            .setParams(Object.assign(Object.assign({}, payload), { projectId }))
            .addMappers(searchMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                method: 'GET',
                headers: this.contensisClient.getHeaders('application/json; charset=utf-8')
            });
        });
    }
    resolve(entryOrList, fields = null) {
        let params = this.contensisClient.getParams();
        let resolver = new link_resolver_1.LinkResolver(entryOrList, fields, params.versionStatus, (query) => this.search(query));
        return resolver.resolve();
    }
    searchUsingQuery(query, linkDepth = 0) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let deliveryQuery = query;
        let params = this.contensisClient.getParams();
        let pageSize = params.pageSize || 25;
        let pageIndex = params.pageIndex || 0;
        let fields = [];
        let fieldLinkDepths = {};
        let aggregations = {};
        pageSize = deliveryQuery.pageSize || pageSize;
        pageIndex = deliveryQuery.pageIndex || pageIndex;
        fields = deliveryQuery.fields || fields;
        fieldLinkDepths = deliveryQuery.fieldLinkDepths || fieldLinkDepths;
        aggregations = deliveryQuery.aggregations || aggregations;
        let orderBy = (deliveryQuery.orderBy && (deliveryQuery.orderBy._items || deliveryQuery.orderBy));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus } = params, requestParams = tslib_1.__rest(params, ["accessToken", "projectId", "language", "responseHandler", "rootUrl", "versionStatus"]);
        let payload = Object.assign(Object.assign({}, requestParams), { aggregations,
            fieldLinkDepths,
            linkDepth,
            pageSize,
            pageIndex, where: JSON.stringify(deliveryQuery.where) });
        if (fields && fields.length > 0) {
            payload['fields'] = fields;
        }
        if (deliveryQuery.orderBy && (!Array.isArray(deliveryQuery.orderBy) || deliveryQuery.orderBy.length > 0)) {
            payload['orderBy'] = JSON.stringify(orderBy);
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', Object.assign({}, payload))
            .setParams(Object.assign(Object.assign({}, payload), { projectId }))
            .addMappers(searchMappers)
            .toUrl();
        if (url.length > 8000 || ((0, contensis_core_api_1.isBrowser)() && (0, contensis_core_api_1.isIE)() && url.length > 2083)) {
            return this.searchUsingPost(query, linkDepth);
        }
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                method: 'GET',
                headers: this.contensisClient.getHeaders('application/json; charset=utf-8')
            });
        });
    }
    searchUsingPost(query, linkDepth = 0) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let params = this.contensisClient.getParams();
        query.pageSize = query.pageSize || params.pageSize;
        query.pageIndex = query.pageIndex || 0;
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { linkDepth, fieldLinkDepths: query.fieldLinkDepths })
            .setParams(this.contensisClient.getParams())
            .addMappers(searchMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            // Clone the query instance so we can remove the fieldLinkDepths
            // from the POST body without mutating the supplied query arg
            const clone = Object.assign(Object.create(Object.getPrototypeOf(query)), query);
            delete clone.fieldLinkDepths;
            return this.httpClient.request(url, {
                method: 'POST',
                headers: this.contensisClient.getHeaders('application/json; charset=utf-8'),
                body: JSON.stringify(clone)
            });
        });
    }
}
exports.EntryOperations = EntryOperations;
