import {
	ClientParams, Config, ContensisClient, IContentTypeOperations,
	IEntryOperations, IHttpClient, IProjectOperations, ITaxonomyOperations, INodesOperations
} from '../models';

import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ProjectOperations } from '../projects/project-operations';
import { TaxonomyOperations } from '../taxonomy/taxonomy-operations';
import { ClientConfig } from './client-config';
import { HttpClient } from '../http/http-client';
import { NodesOperations } from '../nodes/nodes-operations';

export class Client implements ContensisClient {
	static defaultClientConfig: ClientConfig = null;

	clientConfig: ClientConfig = null;
	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	nodes: INodesOperations;
	project: IProjectOperations;
	taxonomy: ITaxonomyOperations;

	private httpClient: IHttpClient;

	static create(config: Config = null): Client {
		return new Client(config);
	}

	static configure(config: Config) {
		Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
	}

	constructor(config: Config = null) {
		this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);

		this.httpClient = new HttpClient(this);
		this.entries = new EntryOperations(this.httpClient, this);
		this.project = new ProjectOperations(this.httpClient, this);
		this.contentTypes = new ContentTypeOperations(this.httpClient, this);
		this.nodes = new NodesOperations(this.httpClient, this);
		this.taxonomy = new TaxonomyOperations(this.httpClient, this);
	}

	public getParams(): ClientParams {
		return this.clientConfig.toParams();
	}
}



