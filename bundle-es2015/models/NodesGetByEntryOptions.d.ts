import { NodesOptions } from './NodesOptions';
import { Entry } from './Entry';
export interface NodesGetByEntryOptions extends NodesOptions {
    entryId?: string;
    entry?: Entry;
}
