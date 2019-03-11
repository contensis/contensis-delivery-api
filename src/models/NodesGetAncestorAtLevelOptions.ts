import { NodesDefaultWithDepthOptions } from './NodesDefaultWithDepthOptions';
import { NodesNodeOptions } from './NodesNodeOptions';
export interface NodesGetAncestorAtLevelOptions
    extends NodesDefaultWithDepthOptions, NodesNodeOptions {
    startLevel: number;
}
