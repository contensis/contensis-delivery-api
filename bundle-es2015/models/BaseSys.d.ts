import { ContentTypeFormat, VersionInfo, VersionStatus } from 'contensis-core-api';
import { EntryMetadata } from './EntryMetadata';
import { EntryMetadataClassic } from './EntryMetadataClassic';
import { Workflow } from './Workflow';
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
    metadata?: EntryMetadata & EntryMetadataClassic;
}
