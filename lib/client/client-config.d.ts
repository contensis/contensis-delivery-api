import { Config } from '../models';
import { ClientParams, ResponseHandler } from 'contensis-core-api';
export declare class ClientConfig implements Config {
    private currentConfig;
    private previousConfig;
    rootUrl: string;
    accessToken: string;
    defaultHeaders: {
        [key: string]: string;
    };
    projectId: string;
    language: string;
    versionStatus: 'published' | 'latest';
    pageSize: number;
    responseHandler: ResponseHandler;
    constructor(currentConfig: Config, previousConfig: Config);
    toParams(): ClientParams;
    private getValue;
}
