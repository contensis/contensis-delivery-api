import { BaseSys } from './BaseSys';
import { EntryMetadata } from './EntryMetadata';
export interface EntrySys extends BaseSys<'entry'> {
    allUris: string[];
    metadata: EntryMetadata;
    properties: {
        [key: string]: any;
    };
}
