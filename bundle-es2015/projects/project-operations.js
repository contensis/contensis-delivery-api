import { UrlBuilder } from 'contensis-core-api';
export class ProjectOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get() {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
