"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodesOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
        if (!this.httpClient || !this.paramsProvider) {
            throw new Error('Method not implemented.');
        }
    }
    getRoot(options) {
        throw new Error('Method not implemented.');
    }
    get(idOrPathOrOptions) {
        throw new Error('Method not implemented.');
    }
    getByEntry(entryIdOrEntryOrOptions) {
        throw new Error('Method not implemented.');
    }
    getChildren(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getParent(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getAncestorAtLevel(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getAncestors(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
    getSiblings(idOrNodeOrOptions) {
        throw new Error('Method not implemented.');
    }
}
exports.NodesOperations = NodesOperations;
