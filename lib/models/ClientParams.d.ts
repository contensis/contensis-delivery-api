import { VersionStatus } from './VersionStatus';
export interface ClientParams {
    rootUrl: string;
    accessToken: string;
    language: string;
    versionStatus: VersionStatus;
    projectId: string;
    pageIndex: number;
    pageSize: number;
}
