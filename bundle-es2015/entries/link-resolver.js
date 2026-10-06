import { ListResolver } from './list-resolver';
export class LinkResolver {
    entryOrList;
    paths;
    versionStatus;
    search;
    constructor(entryOrList, paths, versionStatus, search) {
        this.entryOrList = entryOrList;
        this.paths = paths;
        this.versionStatus = versionStatus;
        this.search = search;
    }
    resolve() {
        let entries = this.getEntries();
        let promise = Promise.resolve([]);
        if (entries.length > 0) {
            // Resolve links at the version status the entries were fetched with (all entries share it),
            // falling back to the client versionStatus for stubs without a sys object
            let versionStatus = entries[0]?.sys?.versionStatus || this.versionStatus;
            let listResolver = new ListResolver(entries, this.paths, versionStatus, this.search);
            promise = listResolver.resolve();
        }
        return promise.then(() => this.entryOrList);
    }
    getEntries() {
        let entryOrList = this.entryOrList;
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
