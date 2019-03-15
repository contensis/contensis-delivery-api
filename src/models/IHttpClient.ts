export interface IHttpClient {
	request<T>(url: string, request?: RequestInit): Promise<T>;
}
