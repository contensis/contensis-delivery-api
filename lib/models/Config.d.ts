import { VersionStatus } from './VersionStatus';
export interface Config {
    rootUrl?: string;
    accessToken?: string;
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
}
