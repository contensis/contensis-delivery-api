"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("../http/url-builder");
const utils_1 = require("../utils");
let nodeDefaultOptionsMappers = {
    language: utils_1.defaultMapperForLanguage,
    versionStatus: utils_1.defaultMapperForVersionStatus,
    entryFields: (value) => (value && value.length > 0) ? value : null,
    entryLinkDepth: (value) => (value && (value > 0)) ? value : null,
};
let nodeDefaultWithDepthOptionsMappers = Object.assign({}, nodeDefaultOptionsMappers, { depth: (value) => (value && (value > 0)) ? value : null });
let nodeGetByPathOptions = Object.assign({}, nodeDefaultWithDepthOptionsMappers, { allowPartialMatch: (value) => (!!value) ? true : null });
let nodeGetByEntryOptions = Object.assign({}, nodeDefaultOptionsMappers, { entryId: (value) => (!!value) ? value : null });
let nodeGetAncestorAtLevelOptionsMappers = Object.assign({}, nodeDefaultWithDepthOptionsMappers, { startLevel: (value) => (value && (value > 0)) ? value : null });
let nodeGetAncestorsOptionsMappers = Object.assign({}, nodeDefaultOptionsMappers, { startLevel: (value) => (value && (value > 0)) ? value : null });
class NodeOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('The class was not initialised correctly.');
        }
    }
    getRoot(options) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/nodes/root', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    get(idOrPathOrOptions) {
        const validationMessage = 'A valid node id or path needs to be specified.';
        if ((utils_1.isString(idOrPathOrOptions) && !idOrPathOrOptions)
            || (typeof idOrPathOrOptions === 'object' &&
                (idOrPathOrOptions === null || (!idOrPathOrOptions.id && !idOrPathOrOptions.path)))) {
            throw new Error(validationMessage);
        }
        let isPath = (utils_1.isString(idOrPathOrOptions) && idOrPathOrOptions.startsWith('/'))
            || (!!idOrPathOrOptions && !!idOrPathOrOptions.path);
        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';
        let url = url_builder_1.UrlBuilder.create(urlTemplate, { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, allowPartialMatch: null })
            .addOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetByPathOptions)
            .toUrl();
        return this.httpClient.request(url);
    }
    getByEntry(entryIdOrEntryOrOptions) {
        const validationMessage = 'A valid entry id needs to be specified.';
        if (utils_1.isString(entryIdOrEntryOrOptions) && !entryIdOrEntryOrOptions) {
            throw new Error(validationMessage);
        }
        if (typeof entryIdOrEntryOrOptions === 'object') {
            if (entryIdOrEntryOrOptions === null) {
                throw new Error(validationMessage);
            }
            if (!entryIdOrEntryOrOptions.entryId
                && (!entryIdOrEntryOrOptions.entry
                    || !entryIdOrEntryOrOptions.entry.sys
                    || !entryIdOrEntryOrOptions.entry.sys.id)
                && (!entryIdOrEntryOrOptions.sys || !entryIdOrEntryOrOptions.sys.id)) {
                throw new Error(validationMessage);
            }
        }
        let entryId = null;
        if (utils_1.isString(entryIdOrEntryOrOptions)) {
            entryId = entryIdOrEntryOrOptions;
        }
        else if (typeof entryIdOrEntryOrOptions === 'object') {
            if (!!entryIdOrEntryOrOptions.sys) {
                entryId = entryIdOrEntryOrOptions.sys.id;
            }
            if (!!entryIdOrEntryOrOptions.entry && !!entryIdOrEntryOrOptions.entry.sys) {
                entryId = entryIdOrEntryOrOptions.entry.sys.id;
            }
        }
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/', { entryId: null, language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(entryId, 'entryId')
            .addOptions(entryIdOrEntryOrOptions)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetByEntryOptions)
            .toUrl();
        return this.httpClient.request(url);
    }
    getChildren(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/children', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getParent(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/parent', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getAncestorAtLevel(options) {
        this.validateNodeId(options);
        let nodeId = this.getNodeIdFromOptions(options);
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestor', { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getAncestors(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestors', { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getSiblings(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = url_builder_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/siblings', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    validateNodeId(idOrNodeOrOptions) {
        const validationMessage = 'A valid node id needs to be specified.';
        if (utils_1.isString(idOrNodeOrOptions) && !idOrNodeOrOptions) {
            throw new Error(validationMessage);
        }
        if (typeof idOrNodeOrOptions === 'object') {
            if (idOrNodeOrOptions === null) {
                throw new Error(validationMessage);
            }
            if (!idOrNodeOrOptions.id
                && (!idOrNodeOrOptions.node
                    || !idOrNodeOrOptions.node.id)) {
                throw new Error(validationMessage);
            }
        }
    }
    getNodeIdFromOptions(idOrNodeOrOptions) {
        let nodeId = null;
        if (utils_1.isString(idOrNodeOrOptions)) {
            nodeId = idOrNodeOrOptions;
        }
        else if (typeof idOrNodeOrOptions === 'object') {
            if (!!idOrNodeOrOptions.id) {
                nodeId = idOrNodeOrOptions.id;
            }
            else if (!!idOrNodeOrOptions.node) {
                nodeId = idOrNodeOrOptions.node.id;
            }
        }
        return nodeId;
    }
}
exports.NodeOperations = NodeOperations;
