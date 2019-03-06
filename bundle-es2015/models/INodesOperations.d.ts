import { Node } from './Node';
import { NodesGetByIdOptions } from './NodesGetByIdOptions';
import { NodesGetByPathOptions } from './NodesGetByPathOptions';
import { NodesGetByEntryOptions } from './NodesGetByEntryOptions';
import { NodesGetRootOptions } from './NodesGetRootOptions';
import { Entry } from './Entry';
import { NodesGetChildrenOptions } from './NodesGetChildrenOptions';
import { NodesGetParentOptions } from './NodesGetParentOptions';
import { NodesGetAncestorsOptions } from './NodesGetAncestorsOptions';
import { NodesGetAncestorAtLevelOptions } from './NodesGetAncestorAtLevelOptions';
import { NodesGetSiblingOptions } from './NodesGetSiblingOptions';
export interface INodesOperations {
    getRoot(options?: NodesGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodesGetByIdOptions | NodesGetByPathOptions): Promise<Node>;
    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodesGetByEntryOptions): Promise<Node[]>;
    getChildren(idOrNodeOrOptions: string | Node | NodesGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodesGetParentOptions): Promise<Node[]>;
    getAncestorAtLevel(idOrNodeOrOptions: string | Node | NodesGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodesGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodesGetSiblingOptions): Promise<Node[]>;
}
