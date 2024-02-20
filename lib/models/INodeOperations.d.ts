import { Entry } from './Entry';
import { Node } from './Node';
import { NodeGetByIdOptions } from './NodeGetByIdOptions';
import { NodeGetByPathOptions } from './NodeGetByPathOptions';
import { NodeGetByEntryOptions } from './NodeGetByEntryOptions';
import { NodeGetRootOptions } from './NodeGetRootOptions';
import { NodeGetChildrenOptions } from './NodeGetChildrenOptions';
import { NodeGetParentOptions } from './NodeGetParentOptions';
import { NodeGetAncestorsOptions } from './NodeGetAncestorsOptions';
import { NodeGetAncestorAtLevelOptions } from './NodeGetAncestorAtLevelOptions';
import { NodeGetSiblingOptions } from './NodeGetSiblingOptions';
export interface INodeOperations {
    getRoot(options?: NodeGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node>;
    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodeGetByEntryOptions): Promise<Node[]>;
    getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node>;
    getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]>;
}
