import { ClientError } from './ClientError';
export declare type ResponseHandlerFunction = (response: Response, clientError: ClientError) => any;
export interface ResponseHandler {
    ['*']?: ResponseHandlerFunction;
    [statusCode: number]: ResponseHandlerFunction;
}
