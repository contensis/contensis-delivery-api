import { EntrySys } from './EntrySys';
import { AssetSys } from './AssetSys';
import { Image } from './ContensisFields';
interface BaseEntryFields {
	entryTitle: string;
	entryDescription?: string;
	entryThumbnail?: Image;
}

export interface Entry extends StrictEntry {
	[key: string]: any;
}

export interface EntryAsset extends BaseEntryFields {
	sys: AssetSys;
}

export interface StrictEntry extends BaseEntryFields {
	sys: EntrySys;
}

