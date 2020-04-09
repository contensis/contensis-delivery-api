import { VersionInfo } from 'contensis-core-api';
import { Workflow } from './Workflow';
export interface EntrySys {
    id: string;
    projectId: string;
    contentTypeId: string;
    dataFormat: string;
    language: string;
    availableLanguage: string[];
    uri: string;
    allUris: string[];
    metadata: {
        [key: string]: any;
    };
    workflow: Workflow;
    isPublished: boolean;
    version: VersionInfo;
    properties: {
        [key: string]: any;
    };
    owner: string;
}
