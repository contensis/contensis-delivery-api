export function hasProp(o, key) {
    return !!o && typeof o[key] !== 'undefined';
}
export function toQuery(values) {
    let keys = Object.keys(values)
        .filter((key) => key && (values[key] !== null) && (values[key] !== ''));
    keys.sort(); // sort keys for easier testing
    let query = keys
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(values[key]));
    return (query.length > 0)
        ? '?' + query.join('&')
        : '';
}
export function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
export function isBrowser() {
    return typeof window !== 'undefined';
}
export let defaultMapperForLanguage = (value, options, params) => !value && !!params ? params.language : value;
export let defaultMapperForVersionStatus = (value, options, params) => (value === 'published') ? null : value;
