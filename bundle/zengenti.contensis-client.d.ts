interface ClientConfigFactory {
    new (value: Config, previous: Config): Config;
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

interface Config {
    rootUrl?: string;
    accessToken?: string;
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
}

interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodeOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
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

interface ContensisQueryOrderBy {
    asc(fieldName: string): ContensisQueryOrderBy;
    desc(fieldName: any): ContensisQueryOrderBy;
}

interface ContensisQueryOrderByDto {
    asc?: string;
    desc?: string;
}

interface ContensisStatic {
    Client: ClientStatic;
    ClientConfig: ClientConfigFactory;
    Query: ContensisQueryFactory;
    Op: ContensisQueryOperators;
    OrderBy: ContensisQueryOrderBy;
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

interface Editor {
    id: string;
    instructions: {
        [key: string]: string;
    };
    properties: {
        [key: string]: any;
    };
}

interface Entry {
    sys: EntrySys;
    [key: string]: any;
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

declare type ExpressionValueType = 'single' | 'array' | 'unknown';

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

interface IContentTypeOperations {
    get(contentTypeId: string): Promise<ContentType>;
}

interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(json: any, linkDepth?: number): Promise<PagedList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}

interface IExpression {
    fieldName: string;
    operatorName: OperatorType;
    values: any[];
    valueType: ExpressionValueType;
    addValue(value: any): IExpression;
    weight(weight: number): IExpression;
    toJSON(): any;
}

interface IHttpClient {
    request<T>(url: string, request?: RequestInit): Promise<T>;
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

interface INodeOperations {
    getRoot(options?: NodeGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node>;
    getByEntry(entryIdOrEntryOrOptions: string | Entry | NodeGetByEntryOptions): Promise<Node[]>;
    getChildren(idOrNodeOrOptions: string | Node | NodeGetChildrenOptions): Promise<Node[]>;
    getParent(idOrNodeOrOptions: string | Node | NodeGetParentOptions): Promise<Node>;
    getAncestorAtLevel(options: NodeGetAncestorAtLevelOptions): Promise<Node>;
    getAncestors(idOrNodeOrOptions: string | Node | NodeGetAncestorsOptions): Promise<Node[]>;
    getSiblings(idOrNodeOrOptions: string | Node | NodeGetSiblingOptions): Promise<Node[]>;
}

interface IParamsProvider {
    getParams(): ClientParams;
}

interface IProjectOperations {
    get(): Promise<Project>;
}

interface ITaxonomyOperations {
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
}

interface MapperFn {
    (value: any, options: any, params: ClientParams): any;
}

interface Node {
    id: string;
    projectId: string;
    title: string;
    slug: string;
    path: string;
    parentId?: string;
    language: string;
    entryId?: string;
    entry?: Entry;
    childCount: number;
}

interface NodeDefaultOptions {
    language?: string;
    entryFields?: string[];
    entryLinkDepth?: number;
}

interface NodeDefaultWithDepthOptions extends NodeDefaultOptions {
    depth?: number;
}

interface NodeGetAncestorAtLevelOptions extends NodeDefaultWithDepthOptions, NodeIdOptions {
    startLevel: number;
}

interface NodeGetAncestorsOptions extends NodeDefaultOptions, NodeIdOptions {
    startLevel?: number;
}

interface NodeGetByEntryOptions extends NodeDefaultOptions {
    entryId?: string;
    entry?: Entry;
}

interface NodeGetByIdOptions extends NodeDefaultWithDepthOptions {
    id: string;
}

interface NodeGetByPathOptions extends NodeDefaultWithDepthOptions {
    path: string;
}

interface NodeGetChildrenOptions extends NodeDefaultOptions, NodeIdOptions {
}

interface NodeGetParentOptions extends NodeDefaultWithDepthOptions, NodeIdOptions {
}

interface NodeGetRootOptions extends NodeDefaultWithDepthOptions {
}

interface NodeGetSiblingOptions extends NodeDefaultOptions, NodeIdOptions {
}

interface NodeIdOptions {
    id?: string;
    node?: Node;
}

declare type OperatorType = 'and' | 'between' | 'contains' | 'endsWith' | 'equalTo' | 'exists' | 'freeText' | 'greaterThan' | 'greaterThanOrEqualTo' | 'in' | 'lessThan' | 'lessThanOrEqualTo' | 'not' | 'or' | 'startsWith' | 'where';

interface PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    items: T[];
}

interface PageOptions {
    pageIndex?: number;
    pageSize?: number;
}

interface Project {
    id: string;
    name: string;
    description: string;
    primaryLanguage: string;
    supportedLanguages: string[];
}

interface TaxonomyGetNodeByKeyOptions extends TaxonomyGetOptions {
    key: string;
}

interface TaxonomyGetNodeByPathOptions extends TaxonomyGetOptions {
    path: string;
}

interface TaxonomyGetOptions {
    order?: 'alphabetical' | 'defined';
    childDepth?: number;
    language?: string;
}

interface TaxonomyNode {
    key: string;
    name: string;
    path: string;
    children?: TaxonomyNode[];
    hasChildren: boolean;
}

interface TaxonomyResolveChildrenOptions extends TaxonomyGetOptions {
    key?: string;
    node?: TaxonomyNode;
}

interface UrlFn {
    (options: any, params: ClientParams): string;
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

declare type VersionStatus = 'published' | 'latest';

interface ZengentiStatic {
    Contensis: ContensisStatic;
}


declare var Zengenti: ZengentiStatic;