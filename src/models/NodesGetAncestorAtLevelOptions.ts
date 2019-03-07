import { NodesGetAncestorsOptions } from './NodesOptions';
import { Node } from './Node';
export interface NodesGetAncestorAtLevelOptions extends NodesOptions {
    id?: string;
    node?: Node;
    startAtLevel: number;    
}
