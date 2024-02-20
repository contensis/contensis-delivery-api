import { ContentType } from 'contensis-core-api';
export interface IContentTypeOperations {
    get(contentTypeId: string): Promise<ContentType>;
}
