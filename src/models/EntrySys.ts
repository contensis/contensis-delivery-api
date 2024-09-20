import { BaseSys } from './BaseSys';

export interface EntrySys extends BaseSys<'entry'> {
	allUris: string[];
	metadata: { [key: string]: any };
	properties: { [key: string]: any };
}
