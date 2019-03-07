import { NodesOptions } from './NodesOptions';

export interface NodesGetAncestorsOptions extends NodesOptions {
	id?: string;
    node?: Node;
	startLevel?: number;
}
