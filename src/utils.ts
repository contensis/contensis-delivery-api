import { MapperFn, ClientParams } from './models';

export function hasProp(o: any, key: string) {
	return !!o && typeof o[key] !== 'undefined';
}

export function toQuery(values: { [key: string]: any }): string {
	let keys = Object.keys(values)
		.filter((key) => key && (values[key] !== null) && (values[key] !== ''));
	keys.sort(); // sort keys for easier testing

	let query = keys
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(values[key]));

	return (query.length > 0)
		? '?' + query.join('&')
		: '';
}

export function isString(obj: any): boolean {
	return typeof obj === 'string' || obj instanceof String;
}

/** Checks if the runtime context is a browser */
export function isBrowser(): boolean {
	return typeof window !== 'undefined';
}


/**
 * Checks if the current browser is IE.
 *
 * Support: IE 9-11 only
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
export function isIE(): boolean {
	let msie; // holds major version number for IE, or NaN if UA is not IE.
	msie = (window && window.document && (window.document as any).documentMode) ? (window.document as any).documentMode : null;

	return !!msie && msie <= 11;
}

export let defaultMapperForLanguage: MapperFn = (value: string, options: any, params: ClientParams) =>
	!value && !!params ? params.language : value;

export let defaultMapperForVersionStatus: MapperFn = (value: string, options: any, params: ClientParams) =>
	(value === 'published') ? null : value;
