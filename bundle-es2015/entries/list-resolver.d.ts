import { Entry } from '../models';
import { PagedList, VersionStatus } from 'contensis-core-api';
export declare class ListResolver {
    private entries;
    private paths;
    private versionStatus;
    private search;
    private deferredEntries;
    constructor(entries: Entry[], paths: string[], versionStatus: VersionStatus, search: (query: any) => Promise<PagedList<Entry>>);
    resolve(): Promise<Entry[]>;
    getEntry(id: string, language: string): Promise<Entry>;
    private nestedSearch;
}
