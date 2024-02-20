import { Entry } from '../models';
interface ResolvedEntry {
    entries: Entry[];
    value: any;
}
export declare class EntryResolver {
    private entry;
    private paths;
    private getEntry;
    constructor(entry: Entry, paths: string[], getEntry: (id: string, language: string) => Promise<Entry>);
    resolve(): Promise<Entry>;
    next(resolvedEntry: ResolvedEntry, path: string): Promise<any>;
    private resolveField;
    private resolveComposerField;
    private resolveEntry;
    private resolveImage;
}
export {};
