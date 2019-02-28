export type ExpressionValueType = 'single' | 'array' | 'unknown';

export type OperatorType = 'and' | 'between' | 'contains' | 'endsWith' | 'equalTo' | 'exists' | 'freeText' | 'greaterThan' | 'greaterThanOrEqualTo' | 'in' | 'lessThan' | 'lessThanOrEqualTo' | 'not' | 'or' | 'startsWith' | 'where';

export interface IExpression {
	fieldName: string;
	operatorName: OperatorType;
	values: any[];
	valueType: ExpressionValueType;
	addValue(value: any): IExpression;
	weight(weight: number): IExpression;
	toJSON(): any;
}

export interface ILogicalExpression extends IExpression {
	getItem(index: number): IExpression;
	setItem(index: number, item: IExpression);
	add(item: IExpression): void;
	addRange(items: IExpression[]);
	indexOf(item: IExpression): number;
	insert(index: number, item: IExpression): void;
	remove(item: IExpression): boolean;
	removeAt(index: number): void;
	clear(): void;
	contains(item: IExpression): boolean;
	count(): number;
}

export interface VersionInfo {
	createdBy: string;
	created: string;
	modifiedBy: string;
	modified: string;
	publishedBy: string;
	published: string;
	versionNo: string;
}

export interface EntrySys {
	id: string;
	uri: string;
	projectId: string;
	contentTypeId: string;
	dataFormat: string;
	language: string;
	metadata: { [key: string]: any };
	properties: { [key: string]: any };
	version: VersionInfo;
	owner: string;
}

export interface Entry {
	sys: EntrySys;
	[key: string]: any;
}

export interface Editor {
	id: string;
	instructions: { [key: string]: string };
	properties: { [key: string]: any };
}

export interface Field {
	id: string;
	name: { [key: string]: string };
	description: { [key: string]: string };
	dataType: string;
	dataFormat: string;
	default: { [key: string]: any };
	validations: { [key: string]: any };
	editor: Editor;
}

export interface ContentType {
	id: string;
	projectId: string;
	name: { [key: string]: string };
	description: { [key: string]: string };
	entryTitleField: string;
	fields: Field[];
	enabled: boolean;
	defaultLanguage: string;
	supportedLanguages: string[];
	workflowId: string;
	dataFormat: string;
	previewUrl: string;
	version: VersionInfo;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	primaryLanguage: string;
	supportedLanguages: string[];
}

export interface TaxonomyNode {
	key: string;
	name: string;
	path: string;
	children?: TaxonomyNode[];
	hasChildren: boolean;
}

export interface EntryGetOptions {
	id: string;
	language?: string;
	linkDepth?: number;
	fields?: string[];
}

export interface EntryListOptions {
	contentTypeId?: string;
	language?: string;
	pageOptions?: PageOptions;
	order?: string[];
	linkDepth?: number;
	fields?: string[];
}

export interface TaxonomyGetOptions {
	order?: 'alphabetical' | 'defined';
	childDepth?: number;
	language?: string;
}

export interface TaxonomyGetNodeByKeyOptions extends TaxonomyGetOptions {
	key: string;
}

export interface TaxonomyGetNodeByPathOptions extends TaxonomyGetOptions {
	path: string;
}

export interface TaxonomyResolveChildrenOptions extends TaxonomyGetOptions {
	key?: string;
	node?: TaxonomyNode;
}

export interface PageOptions {
	pageIndex?: number;
	pageSize?: number;
}

export interface PagedList<T> {
	pageIndex: number;
	pageSize: number;
	totalCount: number;
	items: T[];
}

export interface IEntryOperations {
	get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
	list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
	search(json: any, linkDepth?: number): Promise<PagedList<Entry>>;
	resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}

export interface IContentTypeOperations {
	get(contentTypeId: string): Promise<ContentType>;
}

export interface IProjectOperations {
	get(): Promise<Project>;
}

export interface ITaxonomyOperations {
	getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
	getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
	resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}

export interface IHttpClient {
	request<T>(url: string, request?: RequestInit): Promise<T>;
}

export interface IParamsProvider {
	getParams(): ClientParams;
}

export interface ContensisClient extends IParamsProvider {
	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	project: IProjectOperations;
	taxonomy: ITaxonomyOperations;
}

export type VersionStatus = 'published' | 'latest';

export interface Config {
	rootUrl?: string;
	accessToken?: string;
	projectId?: string;
	language?: string;
	versionStatus?: VersionStatus;
	pageSize?: number;
}

export interface ClientParams {
	rootUrl: string;
	accessToken: string;
	language: string;
	versionStatus: VersionStatus;
	projectId: string;
	pageIndex: number;
	pageSize: number;
}

export interface ClientStatic {
	defaultClientConfig: Config;
	create(config?: Config): ContensisClient;
	configure(config: Config);
}

export interface ClientConfigFactory {
	new (value: Config, previous: Config): Config;
}

export interface ContensisQuery {
	where: ILogicalExpression;
	orderBy: string | string[] | ContensisQueryOrderBy;
	pageIndex: number;
	pageSize: number;
	fields: string[];
}

export interface ContensisQueryFactory {
	new (...whereExpressions: IExpression[]): ContensisQuery;
}

export interface ContensisQueryOperators {
	and(...values: IExpression[]): ILogicalExpression;
	between(name: string, minimum: any, maximum: any): IExpression;
	not(expression: IExpression): ILogicalExpression;
	or(...values: IExpression[]): ILogicalExpression;
	contains(name: string, value: string): IExpression;
	endsWith(name: string, value: string): IExpression;
	equalTo(name: string, value: any): IExpression;
	exists(name: string, value: boolean): IExpression;
	freeText(name: string, value: string): IExpression;
	greaterThan(name: string, value: any): IExpression;
	greaterThanOrEqualTo(name: string, value: any): IExpression;
	lessThan(name: string, value: any): IExpression;
	lessThanOrEqualTo(name: string, value: any): IExpression;
	startsWith(name: string, value: string): IExpression;
	in(name: string, ...values: any[]): IExpression;
}

export interface ContensisQueryOrderByDto {
	asc?: string;
	desc?: string;
}

export interface ContensisQueryOrderBy {
	asc(fieldName: string): ContensisQueryOrderBy;
	desc(fieldName): ContensisQueryOrderBy;
}

export interface ContensisStatic {
	Client: ClientStatic;
	ClientConfig: ClientConfigFactory;
	Query: ContensisQueryFactory;
	Op: ContensisQueryOperators;
	OrderBy: ContensisQueryOrderBy;
}

export interface ZengentiStatic {
	Contensis: ContensisStatic;
}
