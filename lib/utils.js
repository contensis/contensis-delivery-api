"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasProp(o, key) {
    return !!o && typeof o[key] !== 'undefined';
}
exports.hasProp = hasProp;
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
exports.toQuery = toQuery;
function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
exports.isString = isString;
function isBrowser() {
    return typeof window !== 'undefined';
}
exports.isBrowser = isBrowser;
exports.defaultMapperForLanguage = (value, options, params) => !value && !!params ? params.language : value;
exports.defaultMapperForVersionStatus = (value, options, params) => (value === 'published') ? null : value;
