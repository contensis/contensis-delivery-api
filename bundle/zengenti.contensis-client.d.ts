interface AssetUpload {
    fileId: string;
}

//# sourceMappingURL=AssetUpload.js.map
{"version":3,"file":"AssetUpload.js","sourceRoot":"","sources":["../../src/models/AssetUpload.ts"],"names":[],"mappings":""}
interface ClientError {
    status: number;
    statusText: string;
    url: string;
    data: any;
}

//# sourceMappingURL=ClientError.js.map
{"version":3,"file":"ClientError.js","sourceRoot":"","sources":["../../src/models/ClientError.ts"],"names":[],"mappings":""}
interface ClientParams {
    rootUrl: string;
    projectId: string;
    accessToken?: string;
    clientId?: string;
    clientSecret?: string;
    defaultHeaders?: {
        [key: string]: string;
    };
    language?: string;
    versionStatus?: VersionStatus;
    pageIndex?: number;
    pageSize?: number;
    responseHandler?: ResponseHandler;
}

//# sourceMappingURL=ClientParams.js.map
{"version":3,"file":"ClientParams.js","sourceRoot":"","sources":["../../src/models/ClientParams.ts"],"names":[],"mappings":""}
interface Component {
    id: string;
    projectId: string;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    fields: Field[];
    enabled: boolean;
    dataFormat: string;
    previewUrl: string;
    version: VersionInfo;
}

//# sourceMappingURL=Component.js.map
{"version":3,"file":"Component.js","sourceRoot":"","sources":["../../src/models/Component.ts"],"names":[],"mappings":""}
interface ContentType extends Component {
    entryTitleField: string;
    defaultLanguage: string;
    supportedLanguages: string[];
    workflowId: string;
}

//# sourceMappingURL=ContentType.js.map
{"version":3,"file":"ContentType.js","sourceRoot":"","sources":["../../src/models/ContentType.ts"],"names":[],"mappings":""}
interface Editor {
    id: string;
    instructions: {
        [key: string]: string;
    };
    properties: {
        [key: string]: any;
    };
}

//# sourceMappingURL=Editor.js.map
{"version":3,"file":"Editor.js","sourceRoot":"","sources":["../../src/models/Editor.ts"],"names":[],"mappings":""}
interface Entry {
    sys: Partial<EntrySys>;
    [key: string]: any;
}

//# sourceMappingURL=Entry.js.map
{"version":3,"file":"Entry.js","sourceRoot":"","sources":["../../src/models/Entry.ts"],"names":[],"mappings":""}
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

//# sourceMappingURL=EntrySys.js.map
{"version":3,"file":"EntrySys.js","sourceRoot":"","sources":["../../src/models/EntrySys.ts"],"names":[],"mappings":""}
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

//# sourceMappingURL=Field.js.map
{"version":3,"file":"Field.js","sourceRoot":"","sources":["../../src/models/Field.ts"],"names":[],"mappings":""}
interface IHttpClient {
    request<T>(url: string, request?: RequestInit): Promise<T>;
}

//# sourceMappingURL=IHttpClient.js.map
{"version":3,"file":"IHttpClient.js","sourceRoot":"","sources":["../../src/models/IHttpClient.ts"],"names":[],"mappings":""}
//# sourceMappingURL=index.js.map
{"version":3,"file":"index.js","sourceRoot":"","sources":["../../src/models/index.ts"],"names":[],"mappings":""}
interface IParamsProvider {
    getParams(): ClientParams;
}

//# sourceMappingURL=IParamsProvider.js.map
{"version":3,"file":"IParamsProvider.js","sourceRoot":"","sources":["../../src/models/IParamsProvider.ts"],"names":[],"mappings":""}
interface MapperFn {
    (value: any, options: any, params: ClientParams): any;
}

//# sourceMappingURL=MapperFn.js.map
{"version":3,"file":"MapperFn.js","sourceRoot":"","sources":["../../src/models/MapperFn.ts"],"names":[],"mappings":""}
interface PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    items: T[];
}

//# sourceMappingURL=PagedList.js.map
{"version":3,"file":"PagedList.js","sourceRoot":"","sources":["../../src/models/PagedList.ts"],"names":[],"mappings":""}
interface PageOptions {
    pageIndex?: number;
    pageSize?: number;
}

//# sourceMappingURL=PageOptions.js.map
{"version":3,"file":"PageOptions.js","sourceRoot":"","sources":["../../src/models/PageOptions.ts"],"names":[],"mappings":""}
interface Project {
    id: string;
    name: string;
    description: string;
    primaryLanguage: string;
    supportedLanguages: string[];
}

//# sourceMappingURL=Project.js.map
{"version":3,"file":"Project.js","sourceRoot":"","sources":["../../src/models/Project.ts"],"names":[],"mappings":""}
declare type ResponseHandlerFunction = (response: Response, clientError: ClientError) => any;
interface ResponseHandler {
    ['*']?: ResponseHandlerFunction;
    [statusCode: number]: ResponseHandlerFunction;
}

//# sourceMappingURL=ResponseHandler.js.map
{"version":3,"file":"ResponseHandler.js","sourceRoot":"","sources":["../../src/models/ResponseHandler.ts"],"names":[],"mappings":""}
interface SysAssetFile {
    fileId: string;
    parentNodePath?: string;
}

//# sourceMappingURL=SysAssetFile.js.map
{"version":3,"file":"SysAssetFile.js","sourceRoot":"","sources":["../../src/models/SysAssetFile.ts"],"names":[],"mappings":""}
interface UrlFn {
    (options: any, params: ClientParams): string;
}

//# sourceMappingURL=UrlFn.js.map
{"version":3,"file":"UrlFn.js","sourceRoot":"","sources":["../../src/models/UrlFn.ts"],"names":[],"mappings":""}
interface VersionInfo {
    createdBy: string;
    created: string;
    modifiedBy: string;
    modified: string;
    publishedBy: string;
    published: string;
    versionNo: string;
}

//# sourceMappingURL=VersionInfo.js.map
{"version":3,"file":"VersionInfo.js","sourceRoot":"","sources":["../../src/models/VersionInfo.ts"],"names":[],"mappings":""}
declare type VersionStatus = 'published' | 'latest';

//# sourceMappingURL=VersionStatus.js.map
{"version":3,"file":"VersionStatus.js","sourceRoot":"","sources":["../../src/models/VersionStatus.ts"],"names":[],"mappings":""}
interface ClientConfigFactory {
    new (value: Config, previous: Config): Config;
}

interface ClientStatic {
    defaultClientConfig: Config;
    create(config?: Config): ContensisClient;
    configure(config: Config): any;
}

interface Config {
    rootUrl?: string;
    accessToken?: string;
    defaultHeaders?: {
        [key: string]: string;
    };
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
    responseHandler?: ResponseHandler;
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
    distanceWithin(name: string, lat: number, lon: number, distance: string): IExpression;
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

declare type ExpressionValueType = 'single' | 'array' | 'unknown';

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

interface IProjectOperations {
    get(): Promise<Project>;
}

interface ITaxonomyOperations {
    getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode>;
    getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode>;
    resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode>;
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
    includeInMenu: boolean;
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
    allowPartialMatch?: boolean;
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

declare type OperatorType = 'and' | 'between' | 'contains' | 'endsWith' | 'equalTo' | 'exists' | 'freeText' | 'greaterThan' | 'greaterThanOrEqualTo' | 'in' | 'lessThan' | 'lessThanOrEqualTo' | 'not' | 'or' | 'startsWith' | 'where' | 'distanceWithin';

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

interface ZengentiStatic {
    Contensis: ContensisStatic;
}


declare var Zengenti: ZengentiStatic;