import { ContentType } from './ContentType';
export interface IContentTypeOperations {
    get(contentTypeId: string): Promise<ContentType>;
}
