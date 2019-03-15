import { NodesDefaultOptions } from './NodesDefaultOptions';
import { NodesNodeOptions } from './NodesNodeOptions';
export interface NodesGetAncestorsOptions extends NodesDefaultOptions, NodesNodeOptions {
    startLevel?: number;
}
