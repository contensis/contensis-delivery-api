import { Entry } from './Entry';
import { NodeDefaultOptions } from './NodeDefaultOptions';

export interface NodeGetByEntryOptions extends NodeDefaultOptions {
	entryId?: string;
	entry?: Entry;
}
