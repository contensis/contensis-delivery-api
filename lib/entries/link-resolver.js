"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkResolver = void 0;
const list_resolver_1 = require("./list-resolver");
class LinkResolver {
    constructor(entryOrList, paths, versionStatus, search) {
        this.entryOrList = entryOrList;
        this.paths = paths;
        this.versionStatus = versionStatus;
        this.search = search;
    }
    resolve() {
        var _a, _b;
        let entries = this.getEntries();
        let promise = Promise.resolve([]);
        if (entries.length > 0) {
            // Resolve links at the version status the entries were fetched with (all entries share it),
            // falling back to the client versionStatus for stubs without a sys object
            let versionStatus = ((_b = (_a = entries[0]) === null || _a === void 0 ? void 0 : _a.sys) === null || _b === void 0 ? void 0 : _b.versionStatus) || this.versionStatus;
            let listResolver = new list_resolver_1.ListResolver(entries, this.paths, versionStatus, this.search);
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
