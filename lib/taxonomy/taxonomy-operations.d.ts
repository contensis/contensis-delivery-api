import { ContensisClient, ITaxonomyOperations, TaxonomyGetNodeByKeyOptions, TaxonomyGetNodeByPathOptions, TaxonomyNode, TaxonomyResolveChildrenOptions } from '../models';
import { IHttpClient } from 'contensis-core-api';
export declare class TaxonomyOperations implements ITaxonomyOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}
