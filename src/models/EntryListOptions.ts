import { FieldLinkDepths, PageOptions } from 'contensis-core-api';
export interface EntryListOptions {
	contentTypeId?: string;
	language?: string;
	pageOptions?: PageOptions;
	order?: string[];
	linkDepth?: number;
  fields?: string[];
  fieldLinkDepths?: FieldLinkDepths;
}
