import { Op, Query } from 'contensis-core-api';
function isUnresolvedEntry(value) {
    if (value && value.sys && value.sys.id) {
        let keys = Object.keys(value);
        return (keys.length === 1);
    }
    return false;
}
function isUnresolvedImage(value) {
    if (value && value.asset) {
        let keys = Object.keys(value);
        return (keys.length <= 2) && isUnresolvedEntry(value.asset);
    }
    return false;
}
function isComposer(value) {
    if (Array.isArray(value) && (value.length > 0)) {
        return isComposerItem(value[0]);
    }
    return false;
}
function isComposerItem(value) {
    if (value && value.type && value.value) {
        let keys = Object.keys(value);
        return (keys.length === 2);
    }
    return false;
}
class DeferredEntry {
    constructor(sys, versionStatus) {
        this.sys = sys;
        this.versionStatus = versionStatus;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.expression = Op.and(Op.equalTo('sys.id', sys.id), Op.equalTo('sys.language', sys.language), Op.equalTo('sys.versionStatus', this.versionStatus));
    }
    is(sys) {
        return !!(sys && sys.id && sys.language && (sys.id === this.sys.id) && (sys.language === this.sys.language));
    }
}
class ListResolver {
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
        this.nestedSearch();
        return Promise.all(promises).then(values => this.entries);
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
            return Promise.all(promises).then(() => Promise.resolve(list));
        })
            .then((value) => (this.deferredEntries.length > 0) ? this.nestedSearch() : value);
    }
}
class EntryResolver {
    constructor(entry, paths, getEntry) {
        this.entry = entry;
        this.paths = paths;
        this.getEntry = getEntry;
    }
    resolve() {
        let paths = this.paths || Object.keys(this.entry);
        let promises = paths.map(path => {
            let parts = path.split('.');
            let field = parts.shift();
            let promise = null;
            let value = this.entry[field];
            if (value) {
                promise = this.resolveField(value);
                if (!promise && isComposer(value)) {
                    let composerType = (parts.length > 0) ? parts.shift() : null;
                    promise = this.resolveComposerField(value, composerType);
                }
            }
            promise = !promise
                ? Promise.resolve(null)
                : promise.then(resolvedValue => {
                    this.entry[field] = resolvedValue.value;
                    return resolvedValue;
                });
            return promise.then(v => this.next(v, parts.join('.')));
        });
        return Promise.all(promises).then(values => this.entry);
    }
    next(resolvedEntry, path) {
        if (!path || !resolvedEntry || !resolvedEntry.entries || (resolvedEntry.entries.length <= 0)) {
            return Promise.resolve(resolvedEntry);
        }
        let promises = resolvedEntry.entries.map(entry => {
            let resolver = new EntryResolver(entry, [path], (id, language) => this.getEntry(id, language));
            return resolver.resolve();
        });
        return Promise.all(promises);
    }
    resolveField(value) {
        if (isUnresolvedEntry(value)) {
            return this.resolveEntry(value);
        }
        if (isUnresolvedImage(value)) {
            return this.resolveImage(value);
        }
        if (Array.isArray(value)) {
            let isResolving = false;
            let promises = value.map(item => {
                if (isUnresolvedEntry(item)) {
                    isResolving = true;
                    return this.resolveEntry(item);
                }
                if (isUnresolvedImage(item)) {
                    isResolving = true;
                    return this.resolveImage(item);
                }
                return Promise.resolve({ entries: [], value: item });
            });
            if (isResolving) {
                return Promise.all(promises).then((resolvedEntries) => {
                    let list = [];
                    let entries = [];
                    for (let e of resolvedEntries) {
                        list.push(e.value);
                        entries = entries.concat(e.entries);
                    }
                    return { entries, value: list };
                });
            }
        }
        return null;
    }
    resolveComposerField(value, type) {
        if (Array.isArray(value)) {
            let isResolving = false;
            let promises = value.map(item => {
                if (isComposerItem(item)) {
                    if (!type || (type === item.type)) {
                        let itemPromise = this.resolveField(item.value);
                        if (itemPromise) {
                            isResolving = true;
                            return itemPromise.then((v) => {
                                item.value = v;
                                return item;
                            });
                        }
                    }
                }
                return Promise.resolve({ entries: [], value: item });
            });
            if (isResolving) {
                return Promise.all(promises).then((resolvedEntries) => {
                    let list = [];
                    let entries = [];
                    for (let e of resolvedEntries) {
                        list.push(e.value);
                        entries = entries.concat(e.entries);
                    }
                    return { entries, value: list };
                });
            }
        }
        return null;
    }
    resolveEntry(value) {
        if (value && value.sys && value.sys.id) {
            let language = value.sys.language || this.entry.sys.language;
            return this.getEntry(value.sys.id, language).then((entry) => ({ entries: [entry], value: entry }));
        }
        return Promise.resolve({ entries: [], value });
    }
    resolveImage(value) {
        if (value && value.asset && value.asset.sys && value.asset.sys.id) {
            let language = value.asset.sys.language || this.entry.sys.language;
            return this.getEntry(value.asset.sys.id, language)
                .then((image) => {
                value.asset = image;
                return { entries: [image], value };
            });
        }
        return Promise.resolve({ entries: [], value });
    }
}
export class LinkResolver {
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
            let listResolver = new ListResolver(entries, this.paths, this.versionStatus, this.search);
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
