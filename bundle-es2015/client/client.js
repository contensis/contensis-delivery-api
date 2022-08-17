import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ProjectOperations } from '../projects/project-operations';
import { TaxonomyOperations } from '../taxonomy/taxonomy-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { HttpClient } from 'contensis-core-api';
import fetch from 'cross-fetch';
export class Client {
    static defaultClientConfig = null;
    clientConfig = null;
    fetchFn;
    entries;
    contentTypes;
    nodes;
    project;
    taxonomy;
    httpClient;
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
    }
    constructor(config = null) {
        this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
        this.fetchFn = !this.clientConfig.fetchFn ? fetch : this.clientConfig.fetchFn;
        this.httpClient = new HttpClient(this, this.fetchFn);
        this.entries = new EntryOperations(this.httpClient, this);
        this.project = new ProjectOperations(this.httpClient, this);
        this.contentTypes = new ContentTypeOperations(this.httpClient, this);
        this.nodes = new NodeOperations(this.httpClient, this);
        this.taxonomy = new TaxonomyOperations(this.httpClient, this);
    }
    getParams() {
        return this.clientConfig.toParams();
    }
}
