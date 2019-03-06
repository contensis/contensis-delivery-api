import { Node } from './Node';
import { NodesGetOptions } from './NodesGetOptions';
export interface NodesGetParentOptions extends NodesGetOptions {
    id?: string;
    node?: Node;
}
