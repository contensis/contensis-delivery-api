import { ClientParams } from './ClientParams';
export interface UrlFn {
    (options: any, params: ClientParams): string;
}
