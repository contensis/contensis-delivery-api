import { Config, ClientParams } from '../models';
export declare class ClientConfig implements Config {
    private currentConfig;
    private previousConfig;
    rootUrl: string;
    accessToken: string;
    projectId: string;
    language: string;
    versionStatus: 'published' | 'latest';
    pageSize: number;
    constructor(currentConfig: Config, previousConfig: Config);
    toParams(): ClientParams;
    private getValue;
}
