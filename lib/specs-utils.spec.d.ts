import { VersionStatus } from 'contensis-core-api';
import { Config } from './models';
export declare function getDefaultAuthenticateUrl(isRelative?: boolean): string;
export declare function setDefaultSpyForAccessToken(global: any, returnValueForApi?: any): void;
export declare function setDefaultSpyForClientCredentials(global: any, returnValueForApi: any, rejectRequest?: boolean): void;
export declare function getDefaultFetchRequestForAccessToken(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', contentType?: string, isRelativeUrl?: boolean, body?: string): Object;
export declare function getDefaultFetchRequestForClientCredentials(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', isRelativeUrl?: boolean, body?: string): Object;
export declare function getDefaultConfigForAccessToken(versionStatus?: VersionStatus): Config;
export declare function getDefaultConfigForClientCredentials(): Config;
