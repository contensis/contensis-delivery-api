import { Project } from './Project';
export interface IProjectOperations {
	get(): Promise<Project>;
}
