import '../polyfills';
function hasProp(o, key) {
    return !!o && typeof o[key] !== 'undefined';
}
function toQuery(values) {
    let keys = Object.keys(values)
        .filter((key) => key && (values[key] !== null) && (values[key] !== ''));
    keys.sort(); // sort keys for easier testing
    let query = keys
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(values[key]));
    return (query.length > 0)
        ? '?' + query.join('&')
        : '';
}
export class UrlBuilder {
    constructor(url, query) {
        this.url = url;
        this.query = query;
        this.paramMatcher = /(:\b\D\w*)/g;
        this.mappers = {};
    }
    static create(url, query = null) {
        return new UrlBuilder(url, query);
    }
    setOptions(options, defaultParamName = null) {
        this.options = typeof options === 'string' ? { [defaultParamName]: options } : options;
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
                let value = hasProp(this.options, key)
                    ? this.options[key]
                    : (hasProp(this.clientParams, key) ? this.clientParams[key] : null);
                namedParams[paramName] = this.mappers[key] ? this.mappers[key](value, this.options, this.clientParams) : value;
            });
        }
        let query = {};
        if (this.query) {
            query = { ...this.query };
            Object.keys(this.query).forEach(paramName => {
                let value = hasProp(this.options, paramName)
                    ? this.options[paramName]
                    : (hasProp(this.clientParams, paramName) ? this.clientParams[paramName] : query[paramName]);
                query[paramName] = this.mappers[paramName] ? this.mappers[paramName](value, this.options, this.clientParams) : value;
            });
        }
        let url = Object.keys(namedParams)
            .reduce((url, key) => url.replace(key, namedParams[key]), urlTemplate);
        let queryString = toQuery(query);
        return `${url}${queryString}`;
    }
}
