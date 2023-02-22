import { ContensisClient, IProjectOperations } from '../models';
import { IHttpClient, Project } from 'contensis-core-api';
export declare class ProjectOperations implements IProjectOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(): Promise<Project>;
}
