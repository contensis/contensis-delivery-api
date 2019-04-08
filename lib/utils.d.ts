import { MapperFn } from './models';
export declare function hasProp(o: any, key: string): boolean;
export declare function toQuery(values: {
    [key: string]: any;
}): string;
export declare function isString(obj: any): boolean;
/** Checks if the runtime context is a browser */
export declare function isBrowser(): boolean;
/**
 * Checks if the current browser is IE.
 *
 * Support: IE 9-11 only
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
export declare function isIE(): boolean;
export declare let defaultMapperForLanguage: MapperFn;
export declare let defaultMapperForVersionStatus: MapperFn;
