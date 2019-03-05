import '../polyfills';
import { ClientParams } from '../models';

function hasProp(o: any, key: string) {
	return !!o && typeof o[key] !== 'undefined';
}

function toQuery(values: { [key: string]: any }): string {
	let keys = Object.keys(values)
		.filter((key) => key && (values[key] !== null) && (values[key] !== ''));
	keys.sort(); // sort keys for easier testing

	let query = keys
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(values[key]));

	return (query.length > 0)
		? '?' + query.join('&')
		: '';
}

export interface UrlFn {
	(options: any, params: ClientParams): string;
}

export interface MapperFn {
	(value: any, options: any, params: ClientParams): any;
}

export class UrlBuilder {

	private paramMatcher = /(:\b\D\w*)/g;
	private options: any;
	private clientParams: ClientParams;
	private mappers: { [key: string]: MapperFn } = {};

	static create(url: string | UrlFn, query: { [key: string]: any } = null) {
		return new UrlBuilder(url, query);
	}

	constructor(private url: string | UrlFn, private query: { [key: string]: any }) {

	}

	setOptions(options: any, defaultParamName: string = null) {
		this.options = typeof options === 'string' ? { [defaultParamName]: options } : options;
		return this;
	}

	setParams(clientParams: ClientParams) {
		this.clientParams = clientParams;
		return this;
	}

	addMappers(mappers: { [key: string]: MapperFn }) {
		if (mappers) {
			Object.keys(mappers).forEach(key => {
				this.mappers[key] = mappers[key];
			});
		}
		return this;
	}

	toUrl(): string {
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
