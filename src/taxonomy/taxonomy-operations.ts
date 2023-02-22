import {
	ContensisClient,
	ITaxonomyOperations, TaxonomyGetNodeByKeyOptions, TaxonomyGetNodeByPathOptions,
	TaxonomyNode, TaxonomyResolveChildrenOptions
} from '../models';
import { IHttpClient, UrlBuilder } from 'contensis-core-api';

let taxonomyMappers = {
	order: (value) => (value === 'defined') ? value : null
};

export class TaxonomyOperations implements ITaxonomyOperations {
	constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

	}

	getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes/:key', { order: null, childDepth: null, language: null })
			.addOptions(key, 'key')
			.setParams(this.contensisClient.getParams())
			.addMappers(taxonomyMappers)
			.toUrl();

		return this.contensisClient.ensureIsAuthorized().then(() => {
			return this.httpClient.request<TaxonomyNode>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes', { order: null, childDepth: null, language: null, path: null })
			.addOptions(path, 'path')
			.setParams(this.contensisClient.getParams())
			.addMappers(taxonomyMappers)
			.toUrl();

		return this.contensisClient.ensureIsAuthorized().then(() => {
			return this.httpClient.request<TaxonomyNode>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode> {
		let resolveOptions = node as TaxonomyResolveChildrenOptions;

		let taxonomyNodeOrKey: string | TaxonomyNode = null;
		let getNodeByKeyOptions: Partial<TaxonomyGetNodeByKeyOptions> = { childDepth: 1 };

		if (resolveOptions.node) {
			taxonomyNodeOrKey = resolveOptions.node;
			getNodeByKeyOptions = { childDepth: resolveOptions.childDepth || 1, order: resolveOptions.order, language: resolveOptions.language };
		} else if (resolveOptions.key) {
			if ((node as any).path) {
				taxonomyNodeOrKey = node as TaxonomyNode;
			} else {
				taxonomyNodeOrKey = resolveOptions.key;
				getNodeByKeyOptions = { childDepth: resolveOptions.childDepth || 1, order: resolveOptions.order, language: resolveOptions.language };
			}
		} else {
			taxonomyNodeOrKey = node as string;
		}

		if (typeof taxonomyNodeOrKey === 'string') {
			return this.getNodeByKey({ ...getNodeByKeyOptions, key: taxonomyNodeOrKey });
		}
		if (!taxonomyNodeOrKey.hasChildren) {
			return Promise.resolve({ ...taxonomyNodeOrKey, children: [] });
		} else if (taxonomyNodeOrKey.children && (taxonomyNodeOrKey.children.length > 0)) {
			return Promise.resolve({ ...taxonomyNodeOrKey });
		}
		return this.getNodeByKey({ ...getNodeByKeyOptions, key: taxonomyNodeOrKey.key });
	}
}
