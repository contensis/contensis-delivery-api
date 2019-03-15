import { IHttpClient, IParamsProvider, INodesOperations, Node, NodesGetByEntryOptions, NodesGetByIdOptions, NodesGetByPathOptions, NodesGetRootOptions, Entry, NodesGetChildrenOptions, NodesGetParentOptions, NodesGetAncestorsOptions, NodesGetAncestorAtLevelOptions, NodesGetSiblingOptions } from '../models';
export declare class NodesOperations implements INodesOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    getRoot(options?: NodesGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodesGetByIdOptions | NodesGetByPathOptions): Promise<Node>;
    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodesGetByEntryOptions): Promise<Node[]>;
    getChildren(idOrNodeOrOptions: string | Node | NodesGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodesGetParentOptions): Promise<Node>;
    getAncestorAtLevel(options: NodesGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodesGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodesGetSiblingOptions): Promise<Node[]>;
}
