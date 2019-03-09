import {
    IHttpClient, IParamsProvider, INodesOperations, Node, NodesGetByEntryOptions,
    NodesGetByIdOptions, NodesGetByPathOptions, NodesGetRootOptions, Entry, NodesGetChildrenOptions,
    NodesGetParentOptions, NodesGetAncestorsOptions, NodesGetAncestorAtLevelOptions, NodesGetSiblingOptions
} from '../models';
import { UrlBuilder } from '../http/url-builder';
import { isString } from '../utils';

let nodesOptionsMappers = {
    language: (value: string) => (!value) ? value : null,
    fields: (value: string[]) => (value && value.length > 0) ? value : null,
};

let nodesGetOptionsMappers = {
    ...nodesOptionsMappers,
    depth: (value: number) => (value && (value > 0)) ? value : null,
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
            { language: null, depth: null, versionStatus: null, fields: null })
            .setOptions(options)
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    get(idOrPathOrOptions: string | NodesGetByIdOptions | NodesGetByPathOptions): Promise<Node> {
        let isPath = (isString(idOrPathOrOptions) && (idOrPathOrOptions as string).startsWith('/'))
            || (!!(idOrPathOrOptions as NodesGetByPathOptions) && !!(idOrPathOrOptions as NodesGetByPathOptions).path);

        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';

        let url = UrlBuilder.create(
            urlTemplate,
            { language: null, depth: null, versionStatus: null, fields: null })
            .setOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesGetOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node>(url);
    }

    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodesGetByEntryOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }

    getChildren(idOrNodeOrOptions: string | Node | NodesGetChildrenOptions): Promise<Node[]> {
        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/children',
                { language: null, versionStatus: null, fields: null })
            .setOptions(idOrNodeOrOptions, 'id')
            .setParams(this.paramsProvider.getParams())
            .addMappers(nodesOptionsMappers)
            .toUrl();

        return this.httpClient.request<Node[]>(url);
    }

    getParent(idOrNodeOrOptions: string | Node | NodesGetParentOptions): Promise<Node> {
        throw new Error('Method not implemented.');
    }
    getAncestorAtLevel(options: NodesGetAncestorAtLevelOptions): Promise<Node> {
        throw new Error('Method not implemented.');
    }

    getAncestors(idOrNodeOrOptions: string | Node | NodesGetAncestorsOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }

    getSiblings(idOrNodeOrOptions: string | Node | NodesGetSiblingOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }
}
