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
export class EntryResolver {
    entry;
    paths;
    getEntry;
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
            return promise.then(v => {
                return this.next(v, parts.join('.'));
            });
        });
        return Promise.all(promises).then(values => {
            return this.entry;
        });
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
    async resolveEntry(value) {
        if (value && value.sys && value.sys.id) {
            let language = value.sys.language || this.entry.sys.language;
            let entry = await this.getEntry(value.sys.id, language);
            return { entries: [entry], value: entry };
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
