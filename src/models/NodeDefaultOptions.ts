import { FieldLinkDepths, VersionStatus } from 'contensis-core-api';

export interface NodeDefaultOptions {
  language?: string;
  versionStatus?: VersionStatus;
  entryFields?: string[];
  entryLinkDepth?: number;
  entryFieldLinkDepths?: FieldLinkDepths;
}
