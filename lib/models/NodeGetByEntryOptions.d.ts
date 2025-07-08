import { Entry } from './Entry';
import { NodeDefaultOptions } from './NodeDefaultOptions';
import { NodeDefaultWithDepthOptions } from './NodeDefaultWithDepthOptions';
export interface NodeGetByEntryOptions extends NodeDefaultOptions {
    entryId?: string;
    entry?: Entry;
    canonicalOnly?: boolean;
}
export interface NodeGetCanonicalByEntryOptions extends NodeGetByEntryOptions, NodeDefaultWithDepthOptions {
    canonicalOnly: true;
}
