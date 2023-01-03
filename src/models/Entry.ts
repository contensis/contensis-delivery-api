import { EntrySys } from './EntrySys';

export interface Entry {
	sys: EntrySys;
	[key: string]: any;

	entryTitle?: string;
	entryDescription?: string;
	entryThumbnail?: EntryThumbnail;
}

export interface EntryThumbnail {
	altText?: string;
	caption?: string;
	asset?: Entry;
}
