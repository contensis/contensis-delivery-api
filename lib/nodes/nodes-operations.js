"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("../http/url-builder");
const utils_1 = require("../utils");
let nodesOptionsMappers = {
    language: (value) => (!value) ? value : null,
    fields: (value) => (value && value.length > 0) ? value : null,
};
let nodesGetOptionsMappers = Object.assign({}, nodesOptionsMappers, { depth: (value) => (value && (value > 0)) ? value : null });
class NodesOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('The class was not initialised correctly.');
        }
    }
    getRoot(options) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/nodes/root', { language: null, depth: null, versionStatus: null, fields: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    get(idOrPathOrOptions) {
        let isPath = (utils_1.isString(idOrPathOrOptions) && idOrPathOrOptions.startsWith('/'))
            || (!!idOrPathOrOptions && !!idOrPathOrOptions.path);
        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';
        let url = url_builder_1.UrlBuilder.create(urlTemplate, { language: null, depth: null, versionStatus: null, fields: null })
            .setOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getByEntry(entryIdOrEntryOrOptions) {
        throw new Error('Method not implemented.');
    }
    getChildren(idOrNodeOrOptions) {
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/children', { language: null, versionStatus: null, fields: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getParent(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getAncestorAtLevel(options) {
        throw new Error('Method not implemented.');
    }
    getAncestors(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getSiblings(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
}
exports.NodesOperations = NodesOperations;
