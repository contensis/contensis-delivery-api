declare type ExpressionValueType = 'single' | 'array' | 'unknown';
declare type OperatorType = 'and' | 'between' | 'contains' | 'endsWith' | 'equalTo' | 'exists' | 'freeText' | 'greaterThan' | 'greaterThanOrEqualTo' | 'in' | 'lessThan' | 'lessThanOrEqualTo' | 'not' | 'or' | 'startsWith' | 'where';
interface IExpression {
    fieldName: string;
    operatorName: OperatorType;
    values: any[];
    valueType: ExpressionValueType;
    addValue(value: any): IExpression;
    weight(weight: number): IExpression;
    toJSON(): any;
}
interface ILogicalExpression extends IExpression {
    getItem(index: number): IExpression;
    setItem(index: number, item: IExpression): any;
    add(item: IExpression): void;
    addRange(items: IExpression[]): any;
    indexOf(item: IExpression): number;
    insert(index: number, item: IExpression): void;
    remove(item: IExpression): boolean;
    removeAt(index: number): void;
    clear(): void;
    contains(item: IExpression): boolean;
    count(): number;
}
interface VersionInfo {
    createdBy: string;
    created: string;
    modifiedBy: string;
    modified: string;
    publishedBy: string;
    published: string;
    versionNo: string;
}
interface EntrySys {
    id: string;
    uri: string;
    projectId: string;
    contentTypeId: string;
    dataFormat: string;
    language: string;
    metadata: {
        [key: string]: any;
    };
    properties: {
        [key: string]: any;
    };
    version: VersionInfo;
    owner: string;
}
interface Entry {
    sys: EntrySys;
    [key: string]: any;
}
interface Editor {
    id: string;
    instructions: {
        [key: string]: string;
    };
    properties: {
        [key: string]: any;
    };
}
interface Field {
    id: string;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    dataType: string;
    dataFormat: string;
    default: {
        [key: string]: any;
    };
    validations: {
        [key: string]: any;
    };
    editor: Editor;
}
interface ContentType {
    id: string;
    projectId: string;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
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
interface Project {
    id: string;
    name: string;
    description: string;
    primaryLanguage: string;
    supportedLanguages: string[];
}
interface TaxonomyNode {
    key: string;
    name: string;
    path: string;
    children?: TaxonomyNode[];
    hasChildren: boolean;
}
interface EntryGetOptions {
    id: string;
    language?: string;
    linkDepth?: number;
    fields?: string[];
}
interface EntryListOptions {
    contentTypeId?: string;
    language?: string;
    pageOptions?: PageOptions;
    order?: string[];
    linkDepth?: number;
    fields?: string[];
}
interface TaxonomyGetOptions {
    order?: 'alphabetical' | 'defined';
    childDepth?: number;
    language?: string;
}
interface TaxonomyGetNodeByKeyOptions extends TaxonomyGetOptions {
    key: string;
}
interface TaxonomyGetNodeByPathOptions extends TaxonomyGetOptions {
    path: string;
}
interface TaxonomyResolveChildrenOptions extends TaxonomyGetOptions {
    key?: string;
    node?: TaxonomyNode;
}
interface PageOptions {
    pageIndex?: number;
    pageSize?: number;
}
interface PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    items: T[];
}
interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(json: any, linkDepth?: number): Promise<PagedList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}
interface IContentTypeOperations {
    get(contentTypeId: string): Promise<ContentType>;
}
interface IProjectOperations {
    get(): Promise<Project>;
}
interface ITaxonomyOperations {
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}
interface IHttpClient {
    request<T>(url: string, request?: RequestInit): Promise<T>;
}
interface IParamsProvider {
    getParams(): ClientParams;
}
interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
}
declare type VersionStatus = 'published' | 'latest';
interface Config {
    rootUrl?: string;
    accessToken?: string;
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
}
interface ClientParams {
    rootUrl: string;
    accessToken: string;
    language: string;
    versionStatus: VersionStatus;
    projectId: string;
    pageIndex: number;
    pageSize: number;
}
interface ClientStatic {
    defaultClientConfig: Config;
    create(config?: Config): ContensisClient;
    configure(config: Config): any;
}
interface ClientConfigFactory {
    new (value: Config, previous: Config): Config;
}
interface ContensisQuery {
    where: ILogicalExpression;
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    fields: string[];
}
interface ContensisQueryFactory {
    new (...whereExpressions: IExpression[]): ContensisQuery;
}
interface ContensisQueryOperators {
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
interface ContensisQueryOrderByDto {
    asc?: string;
    desc?: string;
}
interface ContensisQueryOrderBy {
    asc(fieldName: string): ContensisQueryOrderBy;
    desc(fieldName: any): ContensisQueryOrderBy;
}
interface ContensisStatic {
    Client: ClientStatic;
    ClientConfig: ClientConfigFactory;
    Query: ContensisQueryFactory;
    Op: ContensisQueryOperators;
    OrderBy: ContensisQueryOrderBy;
}
interface ZengentiStatic {
    Contensis: ContensisStatic;
}


declare var Zengenti: ZengentiStatic;