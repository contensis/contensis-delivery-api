export interface ClientError {
    status: number;
    statusText: string;
    url: string;
    data: any;
}
