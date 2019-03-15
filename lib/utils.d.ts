import { MapperFn } from './models';
export declare function hasProp(o: any, key: string): boolean;
export declare function toQuery(values: {
    [key: string]: any;
}): string;
export declare function isString(obj: any): boolean;
export declare let defaultMapperForLanguage: MapperFn;
export declare let defaultMapperForVersionStatus: MapperFn;
