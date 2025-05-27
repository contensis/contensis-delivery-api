"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTypeOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
class ContentTypeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(contentTypeId) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureIsAuthorized().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
exports.ContentTypeOperations = ContentTypeOperations;
