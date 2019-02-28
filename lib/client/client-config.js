"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientConfig {
    constructor(currentConfig, previousConfig) {
        this.currentConfig = currentConfig;
        this.previousConfig = previousConfig;
        this.rootUrl = null;
        this.accessToken = null;
        this.projectId = null;
        this.language = 'en-GB';
        this.versionStatus = 'published';
        this.pageSize = 25;
        this.rootUrl = this.getValue((c) => c.rootUrl);
        this.accessToken = this.getValue((c) => c.accessToken);
        this.projectId = this.getValue((c) => c.projectId);
        this.language = this.getValue((c) => c.language);
        this.versionStatus = this.getValue((c) => c.versionStatus);
        this.pageSize = this.getValue((c) => c.pageSize);
        while (this.rootUrl && this.rootUrl.substr(this.rootUrl.length - 1, 1) === '/') {
            this.rootUrl = this.rootUrl.substr(0, this.rootUrl.length - 1);
        }
    }
    toParams() {
        return {
            rootUrl: this.rootUrl,
            accessToken: this.accessToken,
            language: this.language,
            versionStatus: this.versionStatus,
            projectId: this.projectId,
            pageIndex: 0,
            pageSize: this.pageSize
        };
    }
    getValue(getter) {
        let result = null;
        if (this.currentConfig) {
            result = getter(this.currentConfig);
        }
        if (this.previousConfig && !result) {
            result = getter(this.previousConfig);
        }
        return result || getter(this);
    }
}
exports.ClientConfig = ClientConfig;
