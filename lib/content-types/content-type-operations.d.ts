import { ContentType, IContentTypeOperations } from '../models';
import { IHttpClient, IParamsProvider } from 'contensis-core-api';
export declare class ContentTypeOperations implements IContentTypeOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(contentTypeId: string): Promise<ContentType>;
}
