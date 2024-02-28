import { FieldLinkDepths } from 'contensis-core-api';

export interface NodeDefaultOptions {
  language?: string;
  entryFields?: string[];
  entryLinkDepth?: number;
  entryFieldLinkDepths?: FieldLinkDepths;
}
