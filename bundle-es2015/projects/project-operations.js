import { UrlBuilder } from 'contensis-core-api';
export class ProjectOperations {
    httpClient;
    paramsProvider;
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get() {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
