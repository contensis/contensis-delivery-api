import { defaultMapperForLanguage, defaultMapperForPublishedVersionStatus, isString, UrlBuilder } from 'contensis-core-api';
let nodeDefaultOptionsMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForPublishedVersionStatus,
    entryFields: (value) => (value && value.length > 0) ? value : null,
    entryLinkDepth: (value) => (value && (value > 0)) ? value : null,
};
let nodeDefaultWithDepthOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    depth: (value) => (value && (value > 0)) ? value : null,
};
let nodeGetByPathOptions = {
    ...nodeDefaultWithDepthOptionsMappers,
    allowPartialMatch: (value) => (!!value) ? true : null,
};
let nodeGetByEntryOptions = {
    ...nodeDefaultOptionsMappers,
    entryId: (value) => (!!value) ? value : null,
};
let nodeGetAncestorAtLevelOptionsMappers = {
    ...nodeDefaultWithDepthOptionsMappers,
    startLevel: (value) => (value && (value > 0)) ? value : null,
};
let nodeGetAncestorsOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    startLevel: (value) => (value && (value > 0)) ? value : null,
};
export class NodeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class was not initialised correctly.');
        }
    }
    getRoot(options) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/nodes/root', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    get(idOrPathOrOptions) {
        const validationMessage = 'A valid node id or path needs to be specified.';
        if ((isString(idOrPathOrOptions) && !idOrPathOrOptions)
            || (typeof idOrPathOrOptions === 'object' &&
                (idOrPathOrOptions === null || (!idOrPathOrOptions.id && !idOrPathOrOptions.path)))) {
            throw new Error(validationMessage);
        }
        let isPath = (isString(idOrPathOrOptions) && idOrPathOrOptions.startsWith('/'))
            || (!!idOrPathOrOptions && !!idOrPathOrOptions.path);
        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';
        let url = UrlBuilder.create(urlTemplate, { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, allowPartialMatch: null })
            .addOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByPathOptions)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getByEntry(entryIdOrEntryOrOptions) {
        const validationMessage = 'A valid entry id needs to be specified.';
        if (isString(entryIdOrEntryOrOptions) && !entryIdOrEntryOrOptions) {
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
        if (isString(entryIdOrEntryOrOptions)) {
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
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/', { entryId: null, language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(entryId, 'entryId')
            .addOptions(entryIdOrEntryOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByEntryOptions)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getChildren(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/children', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getParent(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/parent', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getAncestorAtLevel(options) {
        this.validateNodeId(options);
        let nodeId = this.getNodeIdFromOptions(options);
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestor', { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getAncestors(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestors', { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getSiblings(idOrNodeOrOptions) {
        this.validateNodeId(idOrNodeOrOptions);
        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/siblings', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    validateNodeId(idOrNodeOrOptions) {
        const validationMessage = 'A valid node id needs to be specified.';
        if (isString(idOrNodeOrOptions) && !idOrNodeOrOptions) {
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
        if (isString(idOrNodeOrOptions)) {
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
