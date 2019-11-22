import { ITaxonomyOperations, TaxonomyGetNodeByKeyOptions, TaxonomyGetNodeByPathOptions, TaxonomyNode, TaxonomyResolveChildrenOptions } from '../models';
import { IHttpClient, IParamsProvider } from 'contensis-core-api';
export declare class TaxonomyOperations implements ITaxonomyOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}
