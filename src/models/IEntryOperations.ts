import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
import { Entry, PagedList } from 'contensis-core-api';

export interface IEntryOperations {
	get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
	list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
	search(json: any, linkDepth?: number): Promise<PagedList<Entry>>;
	resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}
