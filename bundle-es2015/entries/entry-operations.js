import { LinkResolver } from './link-resolver';
import { defaultMapperForLanguage, defaultMapperForPublishedVersionStatus, isBrowser, isIE, Query, UrlBuilder, ZenqlQuery } from 'contensis-core-api';
const defaultListUrl = `/api/delivery/projects/:projectId/entries`;
let listUrl = (options, params) => {
    return !!options.contentTypeId
        ? `/api/delivery/projects/:projectId/contentTypes/:contentTypeId/entries`
        : defaultListUrl;
};
let getMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForPublishedVersionStatus,
    fields: (value) => (value && value.length > 0 ? value : null),
    linkDepth: (value) => (value && value > 0 ? value : null),
    fieldLinkDepths: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};
let listMappers = {
    ...getMappers,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize)
};
let searchMappers = {
    aggregations: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
    linkDepth: (value) => (value && (value > 0)) ? value : null,
    fieldLinkDepths: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};
export class EntryOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/:id', { language: null, versionStatus: null, linkDepth: null, fieldLinkDepths: null, fields: null })
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
        let url = UrlBuilder.create(listUrl, { language: null, versionStatus: null, linkDepth: null, order: null, fieldLinkDepths: null, fields: null, pageIndex: null, pageSize: null })
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
        let deliveryQuery = query instanceof Query ? query : null;
        // use duck-typing for backwards compatibility pre v1.2.0
        if (deliveryQuery !== null || !!query.where || !!query.orderBy) {
            return this.searchUsingQuery(deliveryQuery || query, linkDepth);
        }
        let zenqlQuery = query instanceof ZenqlQuery ? query : null;
        if (zenqlQuery === null) {
            if (typeof query === 'string') {
                zenqlQuery = new ZenqlQuery(query);
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
        pageSize = zenqlQuery.pageSize || pageSize;
        pageIndex = zenqlQuery.pageIndex || pageIndex;
        fields = zenqlQuery.fields || fields;
        fieldLinkDepths = zenqlQuery.fieldLinkDepths || fieldLinkDepths;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;
        let payload = {
            ...requestParams,
            aggregations: zenqlQuery.aggregations,
            fieldLinkDepths,
            linkDepth,
            pageSize,
            pageIndex,
            zenql: zenqlQuery.zenql,
        };
        if (fields && fields.length > 0) {
            payload['fields'] = fields;
        }
        let url = UrlBuilder.create(defaultListUrl, { ...payload })
            .setParams({ ...payload, projectId })
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
        let resolver = new LinkResolver(entryOrList, fields, params.versionStatus, (query) => this.search(query));
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
        pageSize = deliveryQuery.pageSize || pageSize;
        pageIndex = deliveryQuery.pageIndex || pageIndex;
        fields = deliveryQuery.fields || fields;
        fieldLinkDepths = deliveryQuery.fieldLinkDepths || fieldLinkDepths;
        let orderBy = (deliveryQuery.orderBy && (deliveryQuery.orderBy._items || deliveryQuery.orderBy));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let { accessToken, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;
        let payload = {
            ...requestParams,
            aggregations: deliveryQuery.aggregations,
            fieldLinkDepths,
            linkDepth,
            pageSize,
            pageIndex,
            where: JSON.stringify(deliveryQuery.where)
        };
        if (fields && fields.length > 0) {
            payload['fields'] = fields;
        }
        if (deliveryQuery.orderBy && (!Array.isArray(deliveryQuery.orderBy) || deliveryQuery.orderBy.length > 0)) {
            payload['orderBy'] = JSON.stringify(orderBy);
        }
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { ...payload })
            .setParams({ ...payload, projectId })
            .addMappers(searchMappers)
            .toUrl();
        if (url.length > 8000 || (isBrowser() && isIE() && url.length > 2083)) {
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
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/entries/search', { linkDepth, fieldLinkDepths: query.fieldLinkDepths })
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
