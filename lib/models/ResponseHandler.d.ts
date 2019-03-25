export interface ResponseHandler {
    ['*']?: (response: Response) => any;
    [statusCode: number]: (response: Response) => any;
}
