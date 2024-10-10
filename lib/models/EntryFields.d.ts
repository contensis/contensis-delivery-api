import { EntryAsset } from './Entry';
export interface Asset extends EntryAsset {
    altText?: string;
    description?: string;
    keywords?: string[];
    thumbnail?: string;
    title: string;
}
export interface Image {
    altText?: string;
    transformations?: string;
    caption?: string;
    asset: Asset;
}
export interface Composer<T extends string = string, V = any> {
    type: T;
    value: V;
}
export interface DateRange {
    from: string;
    to: string;
}
export interface Quote {
    text: string;
    source: string;
}
export interface Location {
    lon: number;
    lat: number;
}
export interface Taxonomy {
    path: string;
    key: string;
    hasChildren: boolean;
    name: string;
    children: Taxonomy[] | [];
}
