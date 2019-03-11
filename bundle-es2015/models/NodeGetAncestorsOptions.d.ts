import { NodeDefaultOptions } from './NodeDefaultOptions';
import { NodeIdOptions } from './NodeIdOptions';
export interface NodeGetAncestorsOptions extends NodeDefaultOptions, NodeIdOptions {
    startLevel?: number;
}
