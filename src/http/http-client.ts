import { IParamsProvider } from '../interfaces';

export class HttpClient {

	constructor(private paramsProvider: IParamsProvider) {

	}

	request<T>(url: string, request: RequestInit = {}): Promise<T> {
		let params = this.paramsProvider.getParams();
		request.method = request.method || (!!request.body ? 'POST' : 'GET');
		request.mode = 'cors';
		request.headers = request.headers || {};
		let headers = request.headers as any;
		if (!headers.accessToken) {
			headers.accessToken = params.accessToken;
		}
		return fetch(`${params.rootUrl}${url}`, request)
			.then((response) => response.json())
			.then(result => result as any);
	}

}
