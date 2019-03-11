import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IProjectOperations } from './IProjectOperations';
import { ITaxonomyOperations } from './ITaxonomyOperations';
import { IParamsProvider } from './IParamsProvider';
import { INodeOperations } from './INodeOperations';
export interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodeOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
}
