"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../polyfills");
const utils_1 = require("../utils");
class UrlBuilder {
    constructor(url, query) {
        this.url = url;
        this.query = query;
        this.paramMatcher = /(:\b\D\w*)/g;
        this.options = {};
        this.mappers = {};
    }
    static create(url, query = null) {
        return new UrlBuilder(url, query);
    }
    addOptions(options, defaultParamName = null) {
        if (utils_1.isString(options) && !!defaultParamName) {
            this.options[defaultParamName] = options;
        }
        else {
            this.options = Object.assign({}, this.options, options);
        }
        return this;
    }
    setParams(clientParams) {
        this.clientParams = clientParams;
        return this;
    }
    addMappers(mappers) {
        if (mappers) {
            Object.keys(mappers).forEach(key => {
                this.mappers[key] = mappers[key];
            });
        }
        return this;
    }
    toUrl() {
        let namedParams = {};
        let urlTemplate = typeof this.url === 'function' ? this.url(this.options, this.clientParams) : this.url;
        let paramNames = urlTemplate.match(this.paramMatcher);
        if (paramNames) {
            paramNames.forEach(paramName => {
                let key = paramName.substring(1);
                let value = null;
                if (utils_1.hasProp(this.options, key)
                    && this.options[key] !== null) {
                    value = this.options[key];
                }
                else if (utils_1.hasProp(this.clientParams, key)
                    && this.clientParams[key] !== null) {
                    value = this.clientParams[key];
                }
                let mapperValue = null;
                if (this.mappers[paramName]) {
                    mapperValue = this.mappers[paramName](value, this.options, this.clientParams);
                }
                namedParams[paramName] = mapperValue !== null ? mapperValue : value;
            });
        }
        let query = {};
        if (this.query) {
            query = Object.assign({}, this.query);
            Object.keys(this.query).forEach(paramName => {
                let value = query[paramName];
                if (utils_1.hasProp(this.options, paramName)
                    && this.options[paramName] !== null) {
                    value = this.options[paramName];
                }
                else if (utils_1.hasProp(this.clientParams, paramName)
                    && this.clientParams[paramName] !== null) {
                    value = this.clientParams[paramName];
                }
                query[paramName] = this.mappers[paramName] ?
                    this.mappers[paramName](value, this.options, this.clientParams) : value;
            });
        }
        let url = Object.keys(namedParams)
            .reduce((url, key) => url.replace(key, namedParams[key]), urlTemplate);
        let queryString = utils_1.toQuery(query);
        return `${url}${queryString}`;
    }
}
exports.UrlBuilder = UrlBuilder;
