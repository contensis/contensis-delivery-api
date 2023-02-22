import { ContensisClient, IContentTypeOperations } from '../models';
import { ContentType, IHttpClient, UrlBuilder } from 'contensis-core-api';

export class ContentTypeOperations implements IContentTypeOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(contentTypeId: string): Promise<ContentType> {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request<ContentType>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
