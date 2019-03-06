export class NodesOperations {
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
    getById(idOrOptions) {
        throw new Error('Method not implemented.');
    }
    getByPath(pathOrOptions) {
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
