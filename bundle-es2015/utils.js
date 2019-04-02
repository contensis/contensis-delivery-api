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
/** Checks if the runtime context is a browser */
export function isBrowser() {
    return typeof window !== 'undefined';
}
/**
 * Checks if the current browser is IE.
 *
 * Support: IE 9-11 only
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
export function isIE() {
    let msie; // holds major version number for IE, or NaN if UA is not IE.
    msie = (window && window.document && window.document.documentMode) ? window.document.documentMode : null;
    return !!msie && msie <= 11;
}
export let defaultMapperForLanguage = (value, options, params) => !value && !!params ? params.language : value;
export let defaultMapperForVersionStatus = (value, options, params) => (value === 'published') ? null : value;
