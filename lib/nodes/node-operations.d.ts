import { ContensisClient, Entry, INodeOperations, Node, NodeGetByEntryOptions, NodeGetByIdOptions, NodeGetByPathOptions, NodeGetRootOptions, NodeGetChildrenOptions, NodeGetParentOptions, NodeGetAncestorsOptions, NodeGetAncestorAtLevelOptions, NodeGetSiblingOptions, NodeGetCanonicalByEntryOptions } from '../models';
import { IHttpClient } from 'contensis-core-api';
export declare class NodeOperations implements INodeOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getRoot(options?: NodeGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node>;
    getByEntry(entryId: string): Promise<Node[]>;
    getByEntry(entry: Entry): Promise<Node[]>;
    getByEntry(options: NodeGetByEntryOptions): Promise<Node[]>;
    getByEntry(options: NodeGetCanonicalByEntryOptions): Promise<Node>;
    getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node>;
    getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]>;
    private validateNodeId;
    private getNodeIdFromOptions;
}
