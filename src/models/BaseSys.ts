import { VersionInfo, VersionStatus } from 'contensis-core-api';
import { Workflow } from './Workflow';
import { ClassicMetadata } from './ClassicMetadata';
import { ContentTypeFormat } from 'contensis-core-api';

export interface BaseSys<T extends ContentTypeFormat> {
    availableLanguages?: string[];
    contentTypeId: string;
    dataFormat: T;
    id: string;
    isPublished?: boolean;
    language: string;
    owner?: string;
    projectId?: string;
    slug?: string;
    uri?: string;
    version?: VersionInfo;
    versionStatus: VersionStatus;
    workflow?: Workflow;
    metadata?: ClassicMetadata;
}
