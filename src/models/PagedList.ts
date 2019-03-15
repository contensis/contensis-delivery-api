export interface PagedList<T> {
	pageIndex: number;
	pageSize: number;
	totalCount: number;
	items: T[];
}
