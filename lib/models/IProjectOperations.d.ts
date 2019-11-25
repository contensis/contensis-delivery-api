import { Project } from 'contensis-core-api';
export interface IProjectOperations {
    get(): Promise<Project>;
}
