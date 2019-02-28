"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_builder_1 = require("../http/url-builder");
class ProjectOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get() {
        let url = url_builder_1.UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
exports.ProjectOperations = ProjectOperations;
