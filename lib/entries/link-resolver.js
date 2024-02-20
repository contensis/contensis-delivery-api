"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_resolver_1 = require("./list-resolver");
class LinkResolver {
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
            let listResolver = new list_resolver_1.ListResolver(entries, this.paths, this.versionStatus, this.search);
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
exports.LinkResolver = LinkResolver;
