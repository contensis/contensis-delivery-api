import { EntryAsset } from './Entry';

/**
 * Normalised focal point of an image asset, relative to the original asset
 * (independent of any field transformation). `{0,0}` is top-left, `{1,1}` is
 * bottom-right, `{0.5,0.5}` is the centre.
 */
export interface FocalPoint {
    x: number;
    y: number;
}

export interface Asset extends EntryAsset {
    altText?: string;
    description?: string;
    focalPoint?: FocalPoint | null;
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
