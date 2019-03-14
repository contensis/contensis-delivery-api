import { ClientParams } from './ClientParams';
export interface MapperFn {
	(value: any, options: any, params: ClientParams): any;
}
