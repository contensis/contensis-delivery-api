import { NodesDefaultOptions } from './NodesDefaultOptions';
import { Entry } from './Entry';
export interface NodesGetByEntryOptions extends NodesDefaultOptions {
    entryId?: string;
    entry?: Entry;
}
