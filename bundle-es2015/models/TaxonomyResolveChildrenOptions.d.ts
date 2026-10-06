import { TaxonomyNode } from './TaxonomyNode';
import { TaxonomyGetOptions } from './TaxonomyGetOptions';
export interface TaxonomyResolveChildrenOptions extends TaxonomyGetOptions {
    key?: string;
    node?: TaxonomyNode;
}
