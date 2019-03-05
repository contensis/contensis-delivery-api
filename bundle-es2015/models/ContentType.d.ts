import { VersionInfo } from './VersionInfo';
import { Field } from './Field';
export interface ContentType {
    id: string;
    projectId: string;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    entryTitleField: string;
    fields: Field[];
    enabled: boolean;
    defaultLanguage: string;
    supportedLanguages: string[];
    workflowId: string;
    dataFormat: string;
    previewUrl: string;
    version: VersionInfo;
}
