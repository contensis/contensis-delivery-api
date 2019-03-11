import { NodeDefaultWithDepthOptions } from './NodeDefaultWithDepthOptions';
import { NodeIdOptions } from './NodeIdOptions';
export interface NodeGetAncestorAtLevelOptions
    extends NodeDefaultWithDepthOptions, NodeIdOptions {
    startLevel: number;
}
