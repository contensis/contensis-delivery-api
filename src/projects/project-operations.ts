import { ContensisClient, IProjectOperations } from '../models';
import { IHttpClient, Project, UrlBuilder } from 'contensis-core-api';

export class ProjectOperations implements IProjectOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(): Promise<Project> {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request<Project>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
