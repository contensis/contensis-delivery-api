"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const entry_operations_1 = require("../entries/entry-operations");
const content_type_operations_1 = require("../content-types/content-type-operations");
const project_operations_1 = require("../projects/project-operations");
const taxonomy_operations_1 = require("../taxonomy/taxonomy-operations");
const client_config_1 = require("./client-config");
const node_operations_1 = require("../nodes/node-operations");
const contensis_core_api_1 = require("contensis-core-api");
const cross_fetch_1 = require("cross-fetch");
class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.clientConfig = new client_config_1.ClientConfig(config, Client.defaultClientConfig);
        this.fetchFn = !this.clientConfig.fetchFn ? cross_fetch_1.default : this.clientConfig.fetchFn;
        this.httpClient = new contensis_core_api_1.HttpClient(this, this.fetchFn);
        this.entries = new entry_operations_1.EntryOperations(this.httpClient, this);
        this.project = new project_operations_1.ProjectOperations(this.httpClient, this);
        this.contentTypes = new content_type_operations_1.ContentTypeOperations(this.httpClient, this);
        this.nodes = new node_operations_1.NodeOperations(this.httpClient, this);
        this.taxonomy = new taxonomy_operations_1.TaxonomyOperations(this.httpClient, this);
    }
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new client_config_1.ClientConfig(config, Client.defaultClientConfig);
    }
    getParams() {
        return this.clientConfig.toParams();
    }
}
exports.Client = Client;
Client.defaultClientConfig = null;
