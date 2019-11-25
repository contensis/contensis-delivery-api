import { NodeDefaultOptions } from './NodeDefaultOptions';
import { Entry } from 'contensis-core-api';
export interface NodeGetByEntryOptions extends NodeDefaultOptions {
    entryId?: string;
    entry?: Entry;
}
