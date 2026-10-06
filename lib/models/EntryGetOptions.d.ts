import { FieldLinkDepths, VersionStatus } from 'contensis-core-api';
export interface EntryGetOptions {
    id: string;
    language?: string;
    versionStatus?: VersionStatus;
    linkDepth?: number;
    fields?: string[];
    fieldLinkDepths?: FieldLinkDepths;
}
