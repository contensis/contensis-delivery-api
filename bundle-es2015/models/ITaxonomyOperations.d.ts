import { TaxonomyNode } from './TaxonomyNode';
import { TaxonomyGetNodeByKeyOptions } from './TaxonomyGetNodeByKeyOptions';
import { TaxonomyGetNodeByPathOptions } from './TaxonomyGetNodeByPathOptions';
import { TaxonomyResolveChildrenOptions } from './TaxonomyResolveChildrenOptions';
export interface ITaxonomyOperations {
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}
