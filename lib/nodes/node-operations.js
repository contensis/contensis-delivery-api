"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
const nodeDefaultOptionsMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    versionStatus: contensis_core_api_1.defaultMapperForPublishedVersionStatus,
    entryFields: (value) => (value && value.length > 0 ? value : null),
    entryLinkDepth: (value) => (value && value > 0 ? value : null),
    entryFieldLinkDepths: (value) => Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};
const nodeDefaultWithDepthOptionsMappers = Object.assign(Object.assign({}, nodeDefaultOptionsMappers), { depth: (value) => (value && (value > 0)) ? value : null });
const nodeGetByPathOptions = Object.assign(Object.assign({}, nodeDefaultWithDepthOptionsMappers), { allowPartialMatch: (value) => (!!value) ? true : null });
const nodeGetByEntryOptions = Object.assign(Object.assign({}, nodeDefaultWithDepthOptionsMappers), { canonicalOnly: (value) => value ? true : null, entryId: (value) => value ? value : null });
const nodeGetAncestorAtLevelOptionsMappers = Object.assign(Object.assign({}, nodeDefaultWithDepthOptionsMappers), { startLevel: (value) => (value && (value > 0)) ? value : null });
const nodeGetAncestorsOptionsMappers = Object.assign(Object.assign({}, nodeDefaultOptionsMappers), { startLevel: (value) => (value && (value > 0)) ? value : null });
class NodeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class was not initialised correctly.');
        }
    }
    async getRoot(options) {
        const url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/nodes/root', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async get(idOrPathOrOptions) {
        const validationMessage = 'A valid node id or path needs to be specified.';
        if (((0, contensis_core_api_1.isString)(idOrPathOrOptions) && !idOrPathOrOptions)
            || (typeof idOrPathOrOptions === 'object' &&
                (idOrPathOrOptions === null || (!idOrPathOrOptions.id && !idOrPathOrOptions.path)))) {
            throw new Error(validationMessage);
        }
        const isPath = ((0, contensis_core_api_1.isString)(idOrPathOrOptions) && idOrPathOrOptions.startsWith('/'))
            || (!!idOrPathOrOptions && !!idOrPathOrOptions.path);
        const urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';
        const url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null, allowPartialMatch: null })
            .addOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByPathOptions)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getByEntry(entryIdOrEntryOrOptions) {
        const validationMessage = 'A valid entry id needs to be specified.';
        if ((0, contensis_core_api_1.isString)(entryIdOrEntryOrOptions) && !entryIdOrEntryOrOptions) {
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
        if ((0, contensis_core_api_1.isString)(entryIdOrEntryOrOptions)) {
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
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/', { canonicalOnly: null, depth: null, entryFields: null, entryFieldLinkDepths: null, entryLinkDepth: null, entryId: null, language: null, versionStatus: null })
            .addOptions(entryId, 'entryId')
            .addOptions(entryIdOrEntryOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByEntryOptions)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getChildren(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        const nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/children', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getParent(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        const nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/parent', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getAncestorAtLevel(options) {
        this.validateNodeId(options);
        const nodeId = this.getNodeIdFromOptions(options);
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestors', { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getAncestors(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        const nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestors', { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async getSiblings(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        const nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        const url = contensis_core_api_1.UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/siblings', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    validateNodeId(idOrNodeOrOptions) {
        const validationMessage = 'A valid node id needs to be specified.';
        if ((0, contensis_core_api_1.isString)(idOrNodeOrOptions) && !idOrNodeOrOptions) {
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
        if ((0, contensis_core_api_1.isString)(idOrNodeOrOptions)) {
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
