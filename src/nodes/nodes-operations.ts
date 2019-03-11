import {
    IHttpClient, IParamsProvider, INodesOperations, Node, NodesGetByEntryOptions,
    NodesGetByIdOptions, NodesGetByPathOptions, NodesGetRootOptions, Entry, NodesGetChildrenOptions,
    NodesGetParentOptions, NodesGetAncestorsOptions, NodesGetAncestorAtLevelOptions, NodesGetSiblingOptions
} from '../models';
import { UrlBuilder } from '../http/url-builder';
import { isString } from '../utils';

let nodesDefaultOptionsMappers = {
    language: (value: string) => (!value) ? value : null,
    entryFields: (value: string[]) => (value && value.length > 0) ? value : null,
    entryLinkDepth: (value: number) => (value && (value > 0)) ? value : null,
};

let nodesDefaultWithDepthOptionsMappers = {
    ...nodesDefaultOptionsMappers,
    depth: (value: number) => (value && (value > 0)) ? value : null,
};

let nodesGetAncestorAtLevelOptionsMappers = {
    ...nodesDefaultWithDepthOptionsMappers,
    startLevel: (value: number) => (value && (value > 0)) ? value : null,
};

let nodesGetAncestorsOptionsMappers = {
    ...nodesDefaultOptionsMappers,
    startLevel: (value: number) => (value && (value > 0)) ? value : null,
};

export class NodesOperations implements INodesOperations {

    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('The class was not initialised correctly.');
        }
    }

    getRoot(options?: NodesGetRootOptions): Promise<Node> {
        let url = UrlBuilder.create(
            '/api/delivery/projects/:projectId/nodes/root',
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    get(idOrPathOrOptions: string | NodesGetByIdOptions | NodesGetByPathOptions): Promise<Node> {
        let isPath = (isString(idOrPathOrOptions) && (idOrPathOrOptions as string).startsWith('/'))
            || (!!(idOrPathOrOptions as NodesGetByPathOptions) && !!(idOrPathOrOptions as NodesGetByPathOptions).path);

        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';

        let url = UrlBuilder.create(
            urlTemplate,
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodesGetByEntryOptions): Promise<Node[]> {
        let url = UrlBuilder
        .create(
            '/api/delivery/projects/:projectId/nodes',
            { entryId: null, language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
        .setOptions(entryIdOrEntryOrOptions, 'entryId')
        .setParams(this.paramsProvider.getParams())
        .addMappers(nodesDefaultOptionsMappers)
        .toUrl();

    return this.httpClient.request<Node[]>(url);
    }

    getChildren(idOrNodeOrOptions: string | Node | NodesGetChildrenOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/children',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesDefaultOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }

    getParent(idOrNodeOrOptions: string | Node | NodesGetParentOptions): Promise<Node> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/parent',
                { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }
    getAncestorAtLevel(options: NodesGetAncestorAtLevelOptions): Promise<Node> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestor',
                { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetAncestorAtLevelOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    getAncestors(idOrNodeOrOptions: string | Node | NodesGetAncestorsOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestors',
                { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetAncestorsOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }

    getSiblings(idOrNodeOrOptions: string | Node | NodesGetSiblingOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/siblings',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesDefaultOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }
}
