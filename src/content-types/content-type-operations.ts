import {IHttpClient, IContentTypeOperations, IParamsProvider, ContentType} from '../interfaces';
import { UrlBuilder } from '../http/url-builder';

export class ContentTypeOperations implements IContentTypeOperations {
    constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

    }

    get(contentTypeId: string): Promise<ContentType> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
			.setOptions(contentTypeId, 'contentTypeId')
			.setParams(this.paramsProvider.getParams())
			.toUrl();

        return this.httpClient.request<ContentType>(url);
    }
}
