import { VersionStatus } from './VersionStatus';
import { ResponseHandler } from './ResponseHandler';
export interface ClientParams {
	rootUrl: string;
	accessToken: string;
	language: string;
	versionStatus: VersionStatus;
	projectId: string;
	pageIndex: number;
	pageSize: number;
	responseHandler: ResponseHandler;
}
