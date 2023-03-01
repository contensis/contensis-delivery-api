import { Config, ContensisClient, IContentTypeOperations, IEntryOperations, IProjectOperations, ITaxonomyOperations, INodeOperations } from '../models';
import { ClientConfig } from './client-config';
import { ClientParams } from 'contensis-core-api';
export declare class Client implements ContensisClient {
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
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
    private httpClient;
    private contensisClassicToken;
    static create(config?: Config): Client;
    static configure(config: Config): void;
    constructor(config?: Config);
    getParams(): ClientParams;
    getHeaders(contentType?: string): {
        [key: string]: string;
    };
    isBearerTokenExpired(): boolean;
    isRefreshTokenExpired(): boolean;
    ensureIsAuthorized(): Promise<string>;
    private authenticate;
    private getAuthenticatePayload;
}
