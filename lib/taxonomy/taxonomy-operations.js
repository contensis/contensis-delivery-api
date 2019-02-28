"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("../http/url-builder");
let taxonomyMappers = {
    order: (value) => (value === 'alphabetical') ? value : null
};
class TaxonomyOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    getNodeByKey(key) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes/:key', { order: null, childDepth: null, language: null })
            .setOptions(key, 'key')
            .setParams(this.paramsProvider.getParams())
            .addMappers(taxonomyMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getNodeByPath(path) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes', { order: null, childDepth: null, language: null, path: null })
            .setOptions(path, 'path')
            .setParams(this.paramsProvider.getParams())
            .addMappers(taxonomyMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    resolveChildren(node) {
        let resolveOptions = node;
        let taxonomyNodeOrKey = null;
        let getNodeByKeyOptions = { childDepth: 1 };
        if (resolveOptions.node) {
            taxonomyNodeOrKey = resolveOptions.node;
            getNodeByKeyOptions = { childDepth: resolveOptions.childDepth || 1, order: resolveOptions.order, language: resolveOptions.language };
        }
        else if (resolveOptions.key) {
            if (node.path) {
                taxonomyNodeOrKey = node;
            }
            else {
                taxonomyNodeOrKey = resolveOptions.key;
                getNodeByKeyOptions = { childDepth: resolveOptions.childDepth || 1, order: resolveOptions.order, language: resolveOptions.language };
            }
        }
        else {
            taxonomyNodeOrKey = node;
        }
        if (typeof taxonomyNodeOrKey === 'string') {
            return this.getNodeByKey(Object.assign({}, getNodeByKeyOptions, { key: taxonomyNodeOrKey }));
        }
        if (!taxonomyNodeOrKey.hasChildren) {
            return Promise.resolve(Object.assign({}, taxonomyNodeOrKey, { children: [] }));
        }
        else if (taxonomyNodeOrKey.children && (taxonomyNodeOrKey.children.length > 0)) {
            return Promise.resolve(Object.assign({}, taxonomyNodeOrKey));
        }
        return this.getNodeByKey(Object.assign({}, getNodeByKeyOptions, { key: taxonomyNodeOrKey.key }));
    }
}
exports.TaxonomyOperations = TaxonomyOperations;
