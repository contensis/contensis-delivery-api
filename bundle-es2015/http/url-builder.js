import '../polyfills';
import { hasProp, isString, toQuery } from '../utils';
export class UrlBuilder {
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
        if (isString(options) && !!defaultParamName) {
            this.options[defaultParamName] = options;
        }
        else {
            this.options = { ...this.options, ...options };
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
                if (hasProp(this.options, key)
                    && this.options[key] !== null) {
                    value = this.options[key];
                }
                else if (hasProp(this.clientParams, key)
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
            query = { ...this.query };
            Object.keys(this.query).forEach(paramName => {
                let value = query[paramName];
                if (hasProp(this.options, paramName)
                    && this.options[paramName] !== null) {
                    value = this.options[paramName];
                }
                else if (hasProp(this.clientParams, paramName)
                    && this.clientParams[paramName] !== null) {
                    value = this.clientParams[paramName];
                }
                query[paramName] = this.mappers[paramName] ?
                    this.mappers[paramName](value, this.options, this.clientParams) : value;
            });
        }
        let url = Object.keys(namedParams)
            .reduce((url, key) => url.replace(key, namedParams[key]), urlTemplate);
        let queryString = toQuery(query);
        return `${url}${queryString}`;
    }
}
