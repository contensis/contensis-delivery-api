import { Entry } from '../models';
import { Op, Query, PagedList, VersionStatus } from 'contensis-core-api';
import { DeferredEntry } from './DeferredEntry';
import { EntryResolver } from './entry-resolver';

export class ListResolver {
    private deferredEntries: DeferredEntry[] = [];

    constructor(private entries: Entry[], private paths: string[], private versionStatus: VersionStatus, private search: (query: any) => Promise<PagedList<Entry>>) {
    }

    resolve(): Promise<Entry[]> {
        this.deferredEntries = [];
        let promises = this.entries.map(entry => {
            let resolver = new EntryResolver(entry, this.paths, (id: string, language: string) => this.getEntry(id, language));
            return resolver.resolve();
        });
        return this.nestedSearch().then(_ => {
            return Promise.all(promises).then(_ => {
                return this.entries;
            });
        });
    }

    getEntry(id: string, language: string): Promise<Entry> {
        let deferredEntry = new DeferredEntry({ id, language }, this.versionStatus);
        this.deferredEntries.push(deferredEntry);
        return deferredEntry.promise;
    }

    private nestedSearch(): Promise<any> {
        let expressions = this.deferredEntries.map(g => g.expression);
        let query = new Query(Op.or(...expressions));
        query.pageIndex = 0;
        query.pageSize = expressions.length;
        return this.search(query).then((list) => {
            let allDeferredEntries = this.deferredEntries;
            this.deferredEntries = [];

            let promises = [];

            for (let item of list.items) {
                let deferredEntries = allDeferredEntries.filter(deferredEntry => deferredEntry.is(item.sys as { id: string; language: string; }));
                for (let deferredEntry of deferredEntries) {
                    deferredEntry.resolve(item);
                    promises.push(deferredEntry.promise);
                }
            }

            if (promises.length === 0) {
                for (let deferredEntry of allDeferredEntries) {
                    deferredEntry.resolve(null);
                }

                return Promise.resolve(list);
            }

            return Promise.all(promises).then(() => Promise.resolve(list));
        })
            .then(value => {
                return (this.deferredEntries.length > 0) ? this.nestedSearch() : value;
            });
    }
}
