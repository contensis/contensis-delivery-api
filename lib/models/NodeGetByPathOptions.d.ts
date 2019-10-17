import { NodeDefaultWithDepthOptions } from './NodeDefaultWithDepthOptions';
export interface NodeGetByPathOptions extends NodeDefaultWithDepthOptions {
    path: string;
    allowPartialMatch?: boolean;
}
