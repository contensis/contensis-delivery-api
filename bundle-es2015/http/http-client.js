import { isBrowser } from '../utils';
export class HttpClient {
    constructor(paramsProvider) {
        this.paramsProvider = paramsProvider;
    }
    request(url, request = {}) {
        let params = this.paramsProvider.getParams();
        const isRelativeRequestUrl = !params.rootUrl || params.rootUrl === '/';
        if (!isBrowser() && isRelativeRequestUrl) {
            throw new Error('You cannot specify a relative root url if not in a browser context.');
        }
        request.method = request.method || (!!request.body ? 'POST' : 'GET');
        if (!isRelativeRequestUrl) {
            request.mode = 'cors';
        }
        request.headers = request.headers || {};
        let headers = request.headers;
        if (!headers.accessToken) {
            headers.accessToken = params.accessToken;
        }
        const requestUrl = isRelativeRequestUrl ? `${url}` : `${params.rootUrl}${url}`;
        return fetch(requestUrl, request)
            .then((response) => response.json())
            .then(result => result);
    }
}
