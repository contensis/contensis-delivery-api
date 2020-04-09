import { EntrySys } from './EntrySys';
export interface Entry {
    sys: Partial<EntrySys>;
    [key: string]: any;
}
