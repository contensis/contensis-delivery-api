import { ContensisClient, IContentTypeOperations } from '../models';
import { ContentType, IHttpClient } from 'contensis-core-api';
export declare class ContentTypeOperations implements IContentTypeOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(contentTypeId: string): Promise<ContentType>;
}
