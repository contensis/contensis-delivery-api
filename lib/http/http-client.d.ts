import { IParamsProvider } from '../models';
export declare class HttpClient {
    private paramsProvider;
    constructor(paramsProvider: IParamsProvider);
    request<T>(url: string, request?: RequestInit): Promise<T>;
}
