import { ResponseHandler, VersionStatus } from 'contensis-core-api';
export interface Config {
    rootUrl?: string;
    accessToken?: string;
    defaultHeaders?: {
        [key: string]: string;
    };
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
    responseHandler?: ResponseHandler;
    fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
