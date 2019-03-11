import { UrlBuilder } from '../http/url-builder';
import { isString } from '../utils';
let nodeDefaultOptionsMappers = {
    language: (value) => (!!value) ? value : null,
    versionStatus: (value) => (value === 'published') ? null : value,
    entryFields: (value) => (value && value.length > 0) ? value : null,
    entryLinkDepth: (value) => (value && (value > 0)) ? value : null,
};
let nodeDefaultWithDepthOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    depth: (value) => (value && (value > 0)) ? value : null,
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
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('The class was not initialised correctly.');
        }
    }
    getRoot(options) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/nodes/root', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    get(idOrPathOrOptions) {
        let isPath = (isString(idOrPathOrOptions) && idOrPathOrOptions.startsWith('/'))
            || (!!idOrPathOrOptions && !!idOrPathOrOptions.path);
        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';
        let url = UrlBuilder.create(urlTemplate, { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getByEntry(entryIdOrEntryOrOptions) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes', { entryId: null, language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(entryIdOrEntryOrOptions, 'entryId')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getChildren(idOrNodeOrOptions) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/children', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getParent(idOrNodeOrOptions) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/parent', { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getAncestorAtLevel(options) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestor', { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getAncestors(idOrNodeOrOptions) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/ancestors', { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
    getSiblings(idOrNodeOrOptions) {
        let url = UrlBuilder
            .create('/api/delivery/projects/:projectId/nodes/:id/siblings', { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
}
