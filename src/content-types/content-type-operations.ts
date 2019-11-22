import { ContentType, IContentTypeOperations } from '../models';
import { IHttpClient, IParamsProvider, UrlBuilder } from 'contensis-core-api';

export class ContentTypeOperations implements IContentTypeOperations {
    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

    }

    get(contentTypeId: string): Promise<ContentType> {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();

        return this.httpClient.request<ContentType>(url);
    }
}
