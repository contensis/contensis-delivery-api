import { IHttpClient, IParamsProvider, ITaxonomyOperations, TaxonomyGetNodeByKeyOptions, TaxonomyGetNodeByPathOptions, TaxonomyNode, TaxonomyResolveChildrenOptions } from '../models';
export declare class TaxonomyOperations implements ITaxonomyOperations {
    private httpClient;
    private paramsProvider;
    constructor(httpClient: IHttpClient, paramsProvider: IParamsProvider);
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}
