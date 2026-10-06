import { Entry,  } from '../models';
import { PagedList, VersionStatus } from 'contensis-core-api';
import { ListResolver } from './list-resolver';

export class LinkResolver<T extends Entry | Entry[] | PagedList<Entry>> {
    constructor(private entryOrList: T, private paths: string[], private versionStatus: VersionStatus, private search: (query: any) => Promise<PagedList<Entry>>) {

    }

    resolve(): Promise<T> {
        let entries = this.getEntries();
        let promise = Promise.resolve<Entry[]>([]);
        if (entries.length > 0) {
            // Resolve links at the version status the entries were fetched with (all entries share it),
            // falling back to the client versionStatus for stubs without a sys object
            let versionStatus = entries[0]?.sys?.versionStatus || this.versionStatus;
            let listResolver = new ListResolver(entries, this.paths, versionStatus, this.search);
            promise = listResolver.resolve();
        }
        return promise.then(() => this.entryOrList);
    }

    private getEntries(): Entry[] {
        let entryOrList = this.entryOrList as any;
        if (!entryOrList) {
            return [];
        }
        if (Array.isArray(entryOrList)) {
            return entryOrList;
        }
        if (entryOrList.items && Array.isArray(entryOrList.items)) {
            return entryOrList.items;
        }
        return [entryOrList];
    }
}
