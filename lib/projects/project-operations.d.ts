import { IProjectOperations, Project } from '../models';
import { IHttpClient, IParamsProvider } from 'contensis-core-api';
export declare class ProjectOperations implements IProjectOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    get(): Promise<Project>;
}
