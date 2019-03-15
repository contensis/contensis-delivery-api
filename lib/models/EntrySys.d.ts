import { VersionInfo } from './VersionInfo';
export interface EntrySys {
    id: string;
    uri: string;
    projectId: string;
    contentTypeId: string;
    dataFormat: string;
    language: string;
    metadata: {
        [key: string]: any;
    };
    properties: {
        [key: string]: any;
    };
    version: VersionInfo;
    owner: string;
}
