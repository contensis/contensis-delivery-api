import {
    IHttpClient, IParamsProvider, INodeOperations, Node, NodeGetByEntryOptions,
    NodeGetByIdOptions, NodeGetByPathOptions, NodeGetRootOptions, Entry, NodeGetChildrenOptions,
    NodeGetParentOptions, NodeGetAncestorsOptions, NodeGetAncestorAtLevelOptions, NodeGetSiblingOptions
} from '../models';
import { UrlBuilder } from '../http/url-builder';
import { isString } from '../utils';

let nodeDefaultOptionsMappers = {
    language: (value: string) => (!!value ) ? value : null,
    versionStatus: (value: string) => (value === 'published') ? null : value,
    entryFields: (value: string[]) => (value && value.length > 0) ? value : null,
    entryLinkDepth: (value: number) => (value && (value > 0)) ? value : null,
};

let nodeDefaultWithDepthOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    depth: (value: number) => (value && (value > 0)) ? value : null,
};

let nodeGetAncestorAtLevelOptionsMappers = {
    ...nodeDefaultWithDepthOptionsMappers,
    startLevel: (value: number) => (value && (value > 0)) ? value : null,
};

let nodeGetAncestorsOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    startLevel: (value: number) => (value && (value > 0)) ? value : null,
};

export class NodeOperations implements INodeOperations {

    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('The class was not initialised correctly.');
        }
    }

    getRoot(options?: NodeGetRootOptions): Promise<Node> {
        let url = UrlBuilder.create(
            '/api/delivery/projects/:projectId/nodes/root',
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node> {
        let isPath = (isString(idOrPathOrOptions) && (idOrPathOrOptions as string).startsWith('/'))
            || (!!(idOrPathOrOptions as NodeGetByPathOptions) && !!(idOrPathOrOptions as NodeGetByPathOptions).path);

        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';

        let url = UrlBuilder.create(
            urlTemplate,
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodeGetByEntryOptions): Promise<Node[]> {
        let url = UrlBuilder
        .create(
            '/api/delivery/projects/:projectId/nodes',
            { entryId: null, language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
        .setOptions(entryIdOrEntryOrOptions, 'entryId')
        .setParams(this.paramsProvider.getParams())
        .addMappers(nodeDefaultOptionsMappers)
        .toUrl();

    return this.httpClient.request<Node[]>(url);
    }

    getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/children',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }

    getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/parent',
                { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }
    getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestor',
                { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestors',
                { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }

    getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/siblings',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }
}
