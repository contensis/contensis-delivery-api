import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IProjectOperations } from './IProjectOperations';
import { ITaxonomyOperations } from './ITaxonomyOperations';
import { IParamsProvider } from './IParamsProvider';
import { INodesOperations } from './INodesOperations';
export interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodesOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
}
