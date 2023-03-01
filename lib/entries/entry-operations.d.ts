import { Entry, EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient } from '../models';
import { IHttpClient, PagedList, Query, ZenqlQuery } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: string | Query | ZenqlQuery, linkDepth?: number): Promise<PagedList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
    private searchUsingQuery;
    private searchUsingPost;
}
