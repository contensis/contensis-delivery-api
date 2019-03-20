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

export function isBrowser(): boolean {
	return typeof window !== 'undefined';
}

export let defaultMapperForLanguage: MapperFn = (value: string, options: any, params: ClientParams) =>
	!value && !!params ? params.language : value;

export let defaultMapperForVersionStatus: MapperFn = (value: string, options: any, params: ClientParams) =>
	(value === 'published') ? null : value;
