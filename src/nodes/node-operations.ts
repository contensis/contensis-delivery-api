import {
    ContensisClient, Entry, INodeOperations, Node, NodeGetByEntryOptions,
    NodeGetByIdOptions, NodeGetByPathOptions, NodeGetRootOptions, NodeGetChildrenOptions,
    NodeGetParentOptions, NodeGetAncestorsOptions, NodeGetAncestorAtLevelOptions, NodeGetSiblingOptions,
    NodeGetCanonicalByEntryOptions
} from '../models';
import {
    defaultMapperForLanguage, defaultMapperForPublishedVersionStatus, FieldLinkDepths, IHttpClient,
    isString, UrlBuilder
} from 'contensis-core-api';

let nodeDefaultOptionsMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForPublishedVersionStatus,
    entryFields: (value: string[]) => (value && value.length > 0 ? value : null),
    entryLinkDepth: (value: number) => (value && value > 0 ? value : null),
    entryFieldLinkDepths: (value: FieldLinkDepths) =>
        Object.keys(value || {}).length > 0 ? JSON.stringify(value) : null,
};

let nodeDefaultWithDepthOptionsMappers = {
    ...nodeDefaultOptionsMappers,
    depth: (value: number) => (value && (value > 0)) ? value : null,
};

let nodeGetByPathOptions = {
    ...nodeDefaultWithDepthOptionsMappers,
    allowPartialMatch: (value: boolean) => (!!value) ? true : null,
};

let nodeGetByEntryOptions = {
    ...nodeDefaultWithDepthOptionsMappers,
    canonicalOnly: (value: boolean) => value ? true : null,
    entryId: (value: string) => value ? value : null,
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

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class was not initialised correctly.');
        }
    }

    async getRoot(options?: NodeGetRootOptions): Promise<Node> {
        let url = UrlBuilder.create(
            '/api/delivery/projects/:projectId/nodes/root',
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node> {
        const validationMessage = 'A valid node id or path needs to be specified.';
        if ((isString(idOrPathOrOptions) && !idOrPathOrOptions)
            || (typeof idOrPathOrOptions === 'object' &&
                (idOrPathOrOptions === null || (!(idOrPathOrOptions as any).id && !(idOrPathOrOptions as any).path)))) {
            throw new Error(validationMessage);
        }

        let isPath = (isString(idOrPathOrOptions) && (idOrPathOrOptions as string).startsWith('/'))
            || (!!(idOrPathOrOptions as NodeGetByPathOptions) && !!(idOrPathOrOptions as NodeGetByPathOptions).path);

        let urlTemplate = isPath ? '/api/delivery/projects/:projectId/nodes:path' : '/api/delivery/projects/:projectId/nodes/:id';

        let url = UrlBuilder.create(
            urlTemplate,
            { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null, allowPartialMatch: null })
            .addOptions(idOrPathOrOptions, isPath ? 'path' : 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByPathOptions)
            .toUrl();
        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getByEntry(entryId: string): Promise<Node[]>;
    async getByEntry(entry: Entry): Promise<Node[]>;
    async getByEntry(options: NodeGetByEntryOptions): Promise<Node[]>;
    async getByEntry(options: NodeGetCanonicalByEntryOptions): Promise<Node>;
    async getByEntry(entryIdOrEntryOrOptions: string | Entry | NodeGetByEntryOptions | NodeGetCanonicalByEntryOptions): Promise<Node[] | Node> {
        const validationMessage = 'A valid entry id needs to be specified.';
        if (isString(entryIdOrEntryOrOptions) && !entryIdOrEntryOrOptions) {
            throw new Error(validationMessage);
        }

        if (typeof entryIdOrEntryOrOptions === 'object') {
            if (entryIdOrEntryOrOptions === null) {
                throw new Error(validationMessage);
            }
            if (!(entryIdOrEntryOrOptions as any).entryId
                && (!(entryIdOrEntryOrOptions as any).entry
                    || !(entryIdOrEntryOrOptions as any).entry.sys
                    || !(entryIdOrEntryOrOptions as any).entry.sys.id)
                && (!(entryIdOrEntryOrOptions as any).sys || !(entryIdOrEntryOrOptions as any).sys.id)) {
                throw new Error(validationMessage);
            }
        }

        let entryId: string = null;
        if (isString(entryIdOrEntryOrOptions)) {
            entryId = entryIdOrEntryOrOptions as string;
        } else if (typeof entryIdOrEntryOrOptions === 'object') {
            if (!!(entryIdOrEntryOrOptions as any).sys) {
                entryId = (entryIdOrEntryOrOptions as any).sys.id;
            }

            if (!!(entryIdOrEntryOrOptions as any).entry && !!(entryIdOrEntryOrOptions as any).entry.sys) {
                entryId = (entryIdOrEntryOrOptions as any).entry.sys.id;
            }
        }

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/',
                { canonicalOnly: null, depth: null, entryFields: null, entryFieldLinkDepths: null, entryLinkDepth: null, entryId: null, language: null, versionStatus: null })
            .addOptions(entryId, 'entryId')
            .addOptions(entryIdOrEntryOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetByEntryOptions)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node[]>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]> {
        this.validateNodeId(idOrNodeOrOptions);

        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/children',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node[]>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node> {
        this.validateNodeId(idOrNodeOrOptions);

        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/parent',
                { language: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultWithDepthOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node> {
        this.validateNodeId(options);

        let nodeId = this.getNodeIdFromOptions(options);

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestors',
                { language: null, startLevel: null, depth: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorAtLevelOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]> {
        this.validateNodeId(idOrNodeOrOptions);

        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/ancestors',
                { language: null, startLevel: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeGetAncestorsOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node[]>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]> {
        this.validateNodeId(idOrNodeOrOptions);

        let nodeId = this.getNodeIdFromOptions(idOrNodeOrOptions);

        let url = UrlBuilder
            .create(
                '/api/delivery/projects/:projectId/nodes/:id/siblings',
                { language: null, versionStatus: null, entryFields: null, entryLinkDepth: null, entryFieldLinkDepths: null })
            .addOptions(nodeId, 'id')
            .addOptions(idOrNodeOrOptions)
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();

        await this.contensisClient.ensureIsAuthorized();
        return await this.httpClient.request<Node[]>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    private validateNodeId(idOrNodeOrOptions: string | Node | { id?: string; node?: Node; }): void {
        const validationMessage = 'A valid node id needs to be specified.';

        if (isString(idOrNodeOrOptions) && !idOrNodeOrOptions) {
            throw new Error(validationMessage);
        }

        if (typeof idOrNodeOrOptions === 'object') {
            if (idOrNodeOrOptions === null) {
                throw new Error(validationMessage);
            }

            if (!(idOrNodeOrOptions as any).id
                && (!(idOrNodeOrOptions as any).node
                    || !(idOrNodeOrOptions as any).node.id)) {
                throw new Error(validationMessage);
            }
        }
    }

    private getNodeIdFromOptions(idOrNodeOrOptions: any): string {
        let nodeId: string = null;
        if (isString(idOrNodeOrOptions)) {
            nodeId = idOrNodeOrOptions as string;
        } else if (typeof idOrNodeOrOptions === 'object') {
            if (!!(idOrNodeOrOptions as any).id) {
                nodeId = (idOrNodeOrOptions as any).id;
            } else if (!!(idOrNodeOrOptions as any).node) {
                nodeId = (idOrNodeOrOptions as any).node.id;
            }
        }

        return nodeId;
    }
}
