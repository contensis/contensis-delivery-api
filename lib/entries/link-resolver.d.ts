import { Entry } from '../models';
import { PagedList, VersionStatus } from 'contensis-core-api';
export declare class LinkResolver<T extends Entry | Entry[] | PagedList<Entry>> {
    private entryOrList;
    private paths;
    private versionStatus;
    private search;
    constructor(entryOrList: T, paths: string[], versionStatus: VersionStatus, search: (query: any) => Promise<PagedList<Entry>>);
    resolve(): Promise<T>;
    private getEntries;
}
