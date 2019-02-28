import { Config, ClientParams, ContensisClient, IEntryOperations, IContentTypeOperations, IProjectOperations, ITaxonomyOperations } from '../interfaces';
import { ClientConfig } from './client-config';
export declare class Client implements ContensisClient {
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
    private httpClient;
    static create(config?: Config): Client;
    static configure(config: Config): void;
    constructor(config?: Config);
    getParams(): ClientParams;
}
