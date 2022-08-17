"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
class ProjectOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get() {
        let url = contensis_core_api_1.UrlBuilder.create('/api/delivery/projects/:projectId')
            .setParams(this.paramsProvider.getParams())
            .toUrl();
        return this.httpClient.request(url);
    }
}
exports.ProjectOperations = ProjectOperations;
