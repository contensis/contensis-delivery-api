import { VersionStatus } from './VersionStatus';
import { ResponseHandler } from './ResponseHandler';
export interface Config {
	rootUrl?: string;
	accessToken?: string;
	projectId?: string;
	language?: string;
	versionStatus?: VersionStatus;
	pageSize?: number;
	responseHandler?: ResponseHandler;
}
