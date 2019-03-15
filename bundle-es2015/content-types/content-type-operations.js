import { UrlBuilder } from '../http/url-builder';
export class ContentTypeOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(contentTypeId) {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
