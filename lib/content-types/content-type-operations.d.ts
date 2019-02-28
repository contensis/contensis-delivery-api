import { IHttpClient, IContentTypeOperations, IParamsProvider, ContentType } from '../interfaces';
export declare class ContentTypeOperations implements IContentTypeOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(contentTypeId: string): Promise<ContentType>;
}
