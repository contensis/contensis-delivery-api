import { Editor } from './Editor';
export interface Field {
    id: string;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    dataType: string;
    dataFormat: string;
    default: {
        [key: string]: any;
    };
    validations: {
        [key: string]: any;
    };
    editor: Editor;
}
