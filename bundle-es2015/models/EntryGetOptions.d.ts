import { FieldLinkDepths } from 'contensis-core-api';
export interface EntryGetOptions {
    id: string;
    language?: string;
    linkDepth?: number;
    fields?: string[];
    fieldLinkDepths?: FieldLinkDepths;
}
