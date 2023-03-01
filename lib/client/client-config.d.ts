import { Config } from '../models';
import { ClientGrants, ClientGrantType, ClientParams, ResponseHandler } from 'contensis-core-api';
export declare class ClientConfig implements Config {
    private currentConfig;
    private previousConfig;
    rootUrl: string;
    accessToken: string;
    clientType: ClientGrantType;
    clientDetails: ClientGrants;
    defaultHeaders: {
        [key: string]: string;
    };
    projectId: string;
    language: string;
    versionStatus: 'published' | 'latest';
    pageSize: number;
    responseHandler: ResponseHandler;
    fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    constructor(currentConfig: Config, previousConfig: Config);
    toParams(): ClientParams;
    private getValue;
}
