import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ProjectOperations } from '../projects/project-operations';
import { TaxonomyOperations } from '../taxonomy/taxonomy-operations';
import { ClientConfig } from './client-config';
import { HttpClient } from '../http/http-client';
import { NodeOperations } from '../nodes/node-operations';
export class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
        this.httpClient = new HttpClient(this);
        this.entries = new EntryOperations(this.httpClient, this);
        this.project = new ProjectOperations(this.httpClient, this);
        this.contentTypes = new ContentTypeOperations(this.httpClient, this);
        this.nodes = new NodeOperations(this.httpClient, this);
        this.taxonomy = new TaxonomyOperations(this.httpClient, this);
    }
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
    }
    getParams() {
        return this.clientConfig.toParams();
    }
}
Client.defaultClientConfig = null;
