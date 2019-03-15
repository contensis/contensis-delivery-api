import { PageOptions } from './PageOptions';
export interface EntryListOptions {
	contentTypeId?: string;
	language?: string;
	pageOptions?: PageOptions;
	order?: string[];
	linkDepth?: number;
	fields?: string[];
}
