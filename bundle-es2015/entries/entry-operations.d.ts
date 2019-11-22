import { Entry, EntryGetOptions, EntryListOptions, IEntryOperations, PagedList } from '../models';
import { IHttpClient, IParamsProvider } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: any, linkDepth?: number): Promise<PagedList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
    private searchUsingPost;
}
