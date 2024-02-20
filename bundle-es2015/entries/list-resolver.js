import { Op, Query } from 'contensis-core-api';
import { DeferredEntry } from './DeferredEntry';
import { EntryResolver } from './entry-resolver';
export class ListResolver {
    constructor(entries, paths, versionStatus, search) {
        this.entries = entries;
        this.paths = paths;
        this.versionStatus = versionStatus;
        this.search = search;
        this.deferredEntries = [];
    }
    resolve() {
        this.deferredEntries = [];
        let promises = this.entries.map(entry => {
            let resolver = new EntryResolver(entry, this.paths, (id, language) => this.getEntry(id, language));
            return resolver.resolve();
        });
        return this.nestedSearch().then(_ => {
            return Promise.all(promises).then(_ => {
                return this.entries;
            });
        });
    }
    getEntry(id, language) {
        let deferredEntry = new DeferredEntry({ id, language }, this.versionStatus);
        this.deferredEntries.push(deferredEntry);
        return deferredEntry.promise;
    }
    nestedSearch() {
        let expressions = this.deferredEntries.map(g => g.expression);
        let query = new Query(Op.or(...expressions));
        query.pageIndex = 0;
        query.pageSize = expressions.length;
        return this.search(query).then((list) => {
            let allDeferredEntries = this.deferredEntries;
            this.deferredEntries = [];
            let promises = [];
            for (let item of list.items) {
                let deferredEntries = allDeferredEntries.filter(deferredEntry => deferredEntry.is(item.sys));
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
