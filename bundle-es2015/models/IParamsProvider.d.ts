import { ClientParams } from './ClientParams';
export interface IParamsProvider {
    getParams(): ClientParams;
}
