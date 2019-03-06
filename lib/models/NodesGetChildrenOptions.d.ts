import { Node } from './Node';
import { NodesOptions } from './NodesOptions';
export interface NodesGetChildrenOptions extends NodesOptions {
    id?: string;
    node?: Node;
}
