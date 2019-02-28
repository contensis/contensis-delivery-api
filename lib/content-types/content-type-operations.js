"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("../http/url-builder");
class ContentTypeOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(contentTypeId) {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId/contentTypes/:contentTypeId')
            .setOptions(contentTypeId, 'contentTypeId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
exports.ContentTypeOperations = ContentTypeOperations;
