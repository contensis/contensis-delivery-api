import { Entry } from './Entry';
import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
import { PagedList, PagedSearchList, Query, ZenqlQuery } from 'contensis-core-api';
export interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: string, linkDepth?: number): Promise<PagedList<Entry>>;
    search(query: Query | ZenqlQuery, linkDepth?: number): Promise<PagedSearchList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}
