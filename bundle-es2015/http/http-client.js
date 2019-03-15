export class HttpClient {
    constructor(paramsProvider) {
        this.paramsProvider = paramsProvider;
    }
    request(url, request = {}) {
        let params = this.paramsProvider.getParams();
        request.method = request.method || (!!request.body ? 'POST' : 'GET');
        request.mode = 'cors';
        request.headers = request.headers || {};
        let headers = request.headers;
        if (!headers.accessToken) {
            headers.accessToken = params.accessToken;
        }
        return fetch(`${params.rootUrl}${url}`, request)
            .then((response) => response.json())
            .then(result => result);
    }
}
