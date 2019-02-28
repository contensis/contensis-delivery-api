import { IHttpClient, IProjectOperations, IParamsProvider, Project } from '../interfaces';
export declare class ProjectOperations implements IProjectOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(): Promise<Project>;
}
