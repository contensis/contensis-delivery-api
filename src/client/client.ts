import {
	Config, ContensisClient, IContentTypeOperations,
	IEntryOperations, IProjectOperations, ITaxonomyOperations, INodeOperations
} from '../models';

import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ProjectOperations } from '../projects/project-operations';
import { TaxonomyOperations } from '../taxonomy/taxonomy-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { ClientParams, HttpClient, IHttpClient } from 'contensis-core-api';

import fetch from 'cross-fetch';

export class Client implements ContensisClient {
	static defaultClientConfig: ClientConfig = null;

	clientConfig: ClientConfig = null;
	fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	nodes: INodeOperations;
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
		this.fetchFn = !this.clientConfig.fetchFn ? fetch : this.clientConfig.fetchFn;
		this.httpClient = new HttpClient(this, this.fetchFn);

		this.entries = new EntryOperations(this.httpClient, this);
		this.project = new ProjectOperations(this.httpClient, this);
		this.contentTypes = new ContentTypeOperations(this.httpClient, this);
		this.nodes = new NodeOperations(this.httpClient, this);
		this.taxonomy = new TaxonomyOperations(this.httpClient, this);
	}

	public getParams(): ClientParams {
		return this.clientConfig.toParams();
	}
}



