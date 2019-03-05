import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IProjectOperations } from './IProjectOperations';
import { ITaxonomyOperations } from './ITaxonomyOperations';
import { IParamsProvider } from './IParamsProvider';
export interface ContensisClient extends IParamsProvider {
	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	project: IProjectOperations;
	taxonomy: ITaxonomyOperations;
}
