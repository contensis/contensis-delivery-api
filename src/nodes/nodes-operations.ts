import {
    IHttpClient, IParamsProvider, INodesOperations, Node, NodesGetByEntryOptions,
    NodesGetByIdOptions, NodesGetByPathOptions, NodesGetRootOptions, Entry, NodesGetChildrenOptions,
    NodesGetParentOptions, NodesGetAncestorsOptions, NodesGetAncestorAtLevelOptions, NodesGetSiblingOptions
} from '../models';

export class NodesOperations implements INodesOperations {

    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('Method not implemented.');
        }
    }

    getRoot(options?: NodesGetRootOptions): Promise<Node> {
        throw new Error('Method not implemented.');
    }

    get(idOrPathOrOptions: string | NodesGetByIdOptions | NodesGetByPathOptions): Promise<Node> {
        throw new Error('Method not implemented.');
    }

    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodesGetByEntryOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }

    getChildren(idOrNodeOrOptions: string | Node | NodesGetChildrenOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }

    getParent(idOrNodeOrOptions: string | Node | NodesGetParentOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }
    getAncestorAtLevel(idOrNodeOrOptions: string | Node | NodesGetAncestorAtLevelOptions): Promise<Node> {
        throw new Error('Method not implemented.');
    }

    getAncestors(idOrNodeOrOptions: string | Node | NodesGetAncestorsOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }

    getSiblings(idOrNodeOrOptions: string | Node | NodesGetSiblingOptions): Promise<Node[]> {
        throw new Error('Method not implemented.');
    }
}
