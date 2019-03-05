import { IHttpClient, IParamsProvider, IProjectOperations, Project } from '../models';
export declare class ProjectOperations implements IProjectOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(): Promise<Project>;
}
