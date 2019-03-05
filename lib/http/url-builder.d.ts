import '../polyfills';
import { ClientParams } from '../models';
export interface UrlFn {
    (options: any, params: ClientParams): string;
}
export interface MapperFn {
    (value: any, options: any, params: ClientParams): any;
}
export declare class UrlBuilder {
    private url;
    private query;
    private paramMatcher;
    private options;
    private clientParams;
    private mappers;
    static create(url: string | UrlFn, query?: {
        [key: string]: any;
    }): UrlBuilder;
    constructor(url: string | UrlFn, query: {
        [key: string]: any;
    });
    setOptions(options: any, defaultParamName?: string): this;
    setParams(clientParams: ClientParams): this;
    addMappers(mappers: {
        [key: string]: MapperFn;
    }): this;
    toUrl(): string;
}
