import { NodeDefaultOptions } from './NodeDefaultOptions';
import { Entry } from './Entry';
export interface NodeGetByEntryOptions extends NodeDefaultOptions {
    entryId?: string;
    entry?: Entry;
}
