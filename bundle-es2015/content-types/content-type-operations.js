import { UrlBuilder } from 'contensis-core-api';
export class ContentTypeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(contentTypeId) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
