import { VersionInfo } from 'contensis-core-api';
import { Workflow } from './Workflow';
export interface EntrySys {
    allUris: string[];
    availableLanguages: string[];
    contentTypeId: string;
    dataFormat: string;
    id: string;
    isPublished: boolean;
    language: string;
    owner?: string;
    projectId: string;
    properties?: {
        [key: string]: any;
    };
    slug?: string;
    uri: string;
    version: VersionInfo;
    versionStatus: string;
    workflow: Workflow;
}
