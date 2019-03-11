import { IHttpClient, IParamsProvider, INodeOperations, Node, NodeGetByEntryOptions, NodeGetByIdOptions, NodeGetByPathOptions, NodeGetRootOptions, Entry, NodeGetChildrenOptions, NodeGetParentOptions, NodeGetAncestorsOptions, NodeGetAncestorAtLevelOptions, NodeGetSiblingOptions } from '../models';
export declare class NodeOperations implements INodeOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    getRoot(options?: NodeGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node>;
    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodeGetByEntryOptions): Promise<Node[]>;
    getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node>;
    getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]>;
}
