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
import { ClientParams, HttpClient, IHttpClient, ContensisAuthenticationError, ContensisApplicationError, ContensisClassicGrant, ClientCredentialsGrant, ContensisClassicRefreshTokenGrant } from 'contensis-core-api';
import * as Scopes from './scopes';

import fetch from 'cross-fetch';

const ContensisClassicTokenKey = 'x-contensis-classic-token';

export class Client implements ContensisClient {
	static defaultClientConfig: ClientConfig = null;

	clientConfig: ClientConfig = null;
	fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	nodes: INodeOperations;
	project: IProjectOperations;
	taxonomy: ITaxonomyOperations;

	bearerToken: string;
	bearerTokenExpiryDate: Date;
	refreshToken?: string;
	refreshTokenExpiryDate?: Date;

	private httpClient: IHttpClient;

	// @ts-ignore
	private contensisClassicToken: string;

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

	public getHeaders(contentType: string = 'application/json'): { [key: string]: string } {
		let headers = {
			Accept: 'application/json'
		};

		if (!!contentType) {
			headers['Content-Type'] = contentType;
		}

		if (!this.clientConfig.accessToken) {
			headers['Authorization'] = `Bearer ${this.bearerToken}`;
		}

		return headers;
	}

	public isBearerTokenExpired(): boolean {
		if (!!this.bearerToken && !!this.bearerTokenExpiryDate) {
			const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
			if (approxCurrentDate < this.bearerTokenExpiryDate) {
				return false;
			}
		}

		return true;
	}

	public isRefreshTokenExpired(): boolean {
		if (!!this.refreshToken && !!this.refreshTokenExpiryDate) {
			const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
			if (approxCurrentDate < this.refreshTokenExpiryDate) {
				return false;
			}
		}

		return true;
	}

	public ensureIsAuthorized(): Promise<string> {
		if (!!this.clientConfig.accessToken) {
			return Promise.resolve('');
		}

		if (!this.isBearerTokenExpired()) {
			return Promise.resolve(this.bearerToken);
		}

		return this.authenticate()
			.then(() => this.bearerToken)
			.catch((error: Error) => {
				if (error instanceof ContensisAuthenticationError) {
					throw error;
				}

				throw new ContensisApplicationError(error.message);
			});
	}

	private authenticate(): Promise<void> {
		const AuthPayload = this.getAuthenticatePayload();

		const AuthData = Object.keys(AuthPayload)
			.map(key => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(AuthPayload[key]);
			})
			.join('&');

		let rootUrl = !!this.clientConfig.rootUrl ? this.clientConfig.rootUrl : '';
		return this.fetchFn(`${rootUrl}/authenticate/connect/token`, {
			method: 'POST',
			// mode: 'cors',
			// cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: AuthData,
		})
			.then(async response => {
				let responseData = await response.json();
				return { response, responseData };
			})
			.then(responseAndData => {
				let { response, responseData } = responseAndData;
				if (!response.ok) {
					throw new ContensisAuthenticationError(!!responseData.error ? responseData.error : JSON.stringify(responseData));
				}

				this.bearerToken = responseData.access_token;
				const expiresInSeconds = responseData.expires_in;
				const currentDate = new Date();
				this.bearerTokenExpiryDate = new Date(currentDate.getTime() + expiresInSeconds * 1000);
				if (!!responseData.refresh_token) {
					this.refreshToken = responseData.refresh_token;
					this.refreshTokenExpiryDate = new Date(currentDate.getTime() + 15 * 24 * 3600 * 1000); // 15 days
				} else {
					this.refreshToken = null;
					this.refreshTokenExpiryDate = null;
				}

				if (!!response.headers && response.headers.has(ContensisClassicTokenKey)) {
					this.contensisClassicToken = response.headers.get(ContensisClassicTokenKey);
				} else {
					this.contensisClassicToken = null;
				}
			});
	}

	private getAuthenticatePayload() {
		let payload = {
			scope: this.clientConfig.clientType === 'client_credentials' ? Scopes.getResourcesScopes() : Scopes.getAllScopes(),
		};

		if (this.clientConfig.clientType !== 'none') {
			payload['grant_type'] = this.clientConfig.clientType;
		}

		if (this.clientConfig.clientType === 'client_credentials') {
			let clientDetails = this.clientConfig.clientDetails as ClientCredentialsGrant;
			payload['client_id'] = clientDetails.clientId;
			payload['client_secret'] = clientDetails.clientSecret;
		} else if (this.clientConfig.clientType === 'contensis_classic') {
			let clientDetails = this.clientConfig.clientDetails as ContensisClassicGrant;
			payload['username'] = clientDetails.username;
			payload['password'] = clientDetails.password;
		} else if (this.clientConfig.clientType === 'contensis_classic_refresh_token') {
			let clientDetails = this.clientConfig.clientDetails as ContensisClassicRefreshTokenGrant;
			payload['refresh_token'] = clientDetails.refreshToken;
		}

		return payload;
	}
}



