import { EntrySys } from './EntrySys';
export interface Entry {
    sys: EntrySys;
    [key: string]: any;
}
