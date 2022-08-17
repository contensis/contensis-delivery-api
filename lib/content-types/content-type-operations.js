"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTypeOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
class ContentTypeOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(contentTypeId) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
exports.ContentTypeOperations = ContentTypeOperations;
