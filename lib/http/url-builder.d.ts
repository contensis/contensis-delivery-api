import '../polyfills';
import { ClientParams, MapperFn, UrlFn } from '../models';
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
    addOptions(options: any, defaultParamName?: string): this;
    setParams(clientParams: ClientParams): this;
    addMappers(mappers: {
        [key: string]: MapperFn;
    }): this;
    toUrl(): string;
}
