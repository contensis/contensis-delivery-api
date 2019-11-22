import { IProjectOperations, Project } from '../models';
import { IHttpClient, IParamsProvider, UrlBuilder } from 'contensis-core-api';

export class ProjectOperations implements IProjectOperations {
    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

    }

    get(): Promise<Project> {
        let url = UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request<Project>(url);
    }
}
