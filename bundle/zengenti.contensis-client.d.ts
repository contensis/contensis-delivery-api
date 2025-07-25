type Aggregate = number;
interface Aggregation {
    [fieldValue: string]: Aggregate;
}
{};

;
{};
//# sourceMappingURL=Aggregation.js.map
{"version":3,"file":"Aggregation.js","sourceRoot":"","sources":["../../../src/models/search/Aggregation.ts"],"names":[],"mappings":"AAEgE,CAAC"}
interface Aggregations {
    [aggregation: string]: Aggregation;
}

{};
//# sourceMappingURL=Aggregations.js.map
{"version":3,"file":"Aggregations.js","sourceRoot":"","sources":["../../../src/models/search/Aggregations.ts"],"names":[],"mappings":""}
interface ContensisQuery {
    aggregations?: QueryAggregations;
    fieldLinkDepths?: FieldLinkDepths;
    fields?: string[];
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    where: ILogicalExpression;
}

{};
//# sourceMappingURL=ContensisQuery.js.map
{"version":3,"file":"ContensisQuery.js","sourceRoot":"","sources":["../../../src/models/search/ContensisQuery.ts"],"names":[],"mappings":""}
interface ContensisQueryFactory {
    new (...whereExpressions: IExpression[]): ContensisQuery;
}

{};
//# sourceMappingURL=ContensisQueryFactory.js.map
{"version":3,"file":"ContensisQueryFactory.js","sourceRoot":"","sources":["../../../src/models/search/ContensisQueryFactory.ts"],"names":[],"mappings":""}
interface ContensisQueryOperators {
    and(...values: IExpression[]): ILogicalExpression;
    between(name: string, minimum: any, maximum: any): IExpression;
    not(expression: IExpression): ILogicalExpression;
    or(...values: IExpression[]): ILogicalExpression;
    contains(name: string, value: string): IExpression;
    endsWith(name: string, value: string): IExpression;
    equalTo(name: string, value: any): IExpression;
    exists(name: string, value: boolean): IExpression;
    freeText(name: string, term: string, fuzzy?: boolean, operator?: FreeTextSearchOperatorType): IExpression;
    greaterThan(name: string, value: any): IExpression;
    greaterThanOrEqualTo(name: string, value: any): IExpression;
    lessThan(name: string, value: any): IExpression;
    lessThanOrEqualTo(name: string, value: any): IExpression;
    startsWith(name: string, value: string): IExpression;
    in(name: string, ...values: any[]): IExpression;
    distanceWithin(name: string, lat: number, lon: number, distance: string): IExpression;
}

{};
//# sourceMappingURL=ContensisQueryOperators.js.map
{"version":3,"file":"ContensisQueryOperators.js","sourceRoot":"","sources":["../../../src/models/search/ContensisQueryOperators.ts"],"names":[],"mappings":""}
interface ContensisQueryOrderBy {
    asc(fieldName: string): ContensisQueryOrderBy;
    desc(fieldName: string): ContensisQueryOrderBy;
}

{};
//# sourceMappingURL=ContensisQueryOrderBy.js.map
{"version":3,"file":"ContensisQueryOrderBy.js","sourceRoot":"","sources":["../../../src/models/search/ContensisQueryOrderBy.ts"],"names":[],"mappings":""}
interface ContensisQueryOrderByDto {
    asc?: string;
    desc?: string;
}

{};
//# sourceMappingURL=ContensisQueryOrderByDto.js.map
{"version":3,"file":"ContensisQueryOrderByDto.js","sourceRoot":"","sources":["../../../src/models/search/ContensisQueryOrderByDto.ts"],"names":[],"mappings":""}
interface DistanceSearch {
    lat: number;
    lon: number;
    distance: string;
}

{};
//# sourceMappingURL=DistanceSearch.js.map
{"version":3,"file":"DistanceSearch.js","sourceRoot":"","sources":["../../../src/models/search/DistanceSearch.ts"],"names":[],"mappings":""}
type ExpressionValueType = 'single' | 'array' | 'unknown';
declare const ExpressionValueTypeEnum: {
    Single: ExpressionValueType;
    Array: ExpressionValueType;
    Unknown: ExpressionValueType;
};

var ExpressionValueTypeEnum = {
    Single: 'single',
    Array: 'array',
    Unknown: 'unknown'
};
//# sourceMappingURL=ExpressionValueType.js.map
{"version":3,"file":"ExpressionValueType.js","sourceRoot":"","sources":["../../../src/models/search/ExpressionValueType.ts"],"names":[],"mappings":"AAEA,MAAM,CAAC,IAAM,uBAAuB,GAAG;IACnC,MAAM,EAAE,QAA+B;IACvC,KAAK,EAAE,OAA8B;IACrC,OAAO,EAAE,SAAgC;CAC5C,CAAC"}
interface FieldLinkDepths {
    [field: string]: number;
}

{};
//# sourceMappingURL=FieldLinkDepths.js.map
{"version":3,"file":"FieldLinkDepths.js","sourceRoot":"","sources":["../../../src/models/search/FieldLinkDepths.ts"],"names":[],"mappings":""}
interface FreeTextSearch {
    term: string;
    fuzzy: boolean;
    operator: FreeTextSearchOperatorType;
}

{};
//# sourceMappingURL=FreeTextSearch.js.map
{"version":3,"file":"FreeTextSearch.js","sourceRoot":"","sources":["../../../src/models/search/FreeTextSearch.ts"],"names":[],"mappings":""}
type FreeTextSearchOperatorType = 'and' | 'or';
declare const FreeTextSearchOperatorTypeEnum: {
    And: FreeTextSearchOperatorType;
    Or: FreeTextSearchOperatorType;
};

var FreeTextSearchOperatorTypeEnum = {
    And: 'and',
    Or: 'or'
};
//# sourceMappingURL=FreeTextSearchOperatorType.js.map
{"version":3,"file":"FreeTextSearchOperatorType.js","sourceRoot":"","sources":["../../../src/models/search/FreeTextSearchOperatorType.ts"],"names":[],"mappings":"AAEA,MAAM,CAAC,IAAM,8BAA8B,GAAG;IAC1C,GAAG,EAAE,KAAmC;IACxC,EAAE,EAAE,IAAkC;CACzC,CAAC"}
interface IExpression {
    fieldName: string;
    operatorName: OperatorType;
    values: any[];
    valueType: ExpressionValueType;
    addValue(value: any): IExpression;
    weight(weight: number): IExpression;
    toJSON(): any;
}

{};
//# sourceMappingURL=IExpression.js.map
{"version":3,"file":"IExpression.js","sourceRoot":"","sources":["../../../src/models/search/IExpression.ts"],"names":[],"mappings":""}
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

{};
//# sourceMappingURL=ILogicalExpression.js.map
{"version":3,"file":"ILogicalExpression.js","sourceRoot":"","sources":["../../../src/models/search/ILogicalExpression.ts"],"names":[],"mappings":""}
* from './Aggregation';
* from './Aggregations';
* from './ContensisQuery';
* from './ContensisQueryFactory';
* from './ContensisQueryOperators';
* from './ContensisQueryOrderBy';
* from './ContensisQueryOrderByDto';
* from './ExpressionValueType';
* from './FieldLinkDepths';
* from './FreeTextSearchOperatorType';
* from './IExpression';
* from './ILogicalExpression';
* from './IZenqlQuery';
* from './ManagementQuery';
* from './ManagementZenqlQuery';
* from './Operators';
* from './OperatorType';
* from './PagedSearchList';
* from './query';
* from './QueryAggregation';
* from './QueryAggregations';
* from './QueryTypes';
* from './ZenqlQuery';
//# sourceMappingURL=index.js.map
{"version":3,"file":"index.js","sourceRoot":"","sources":["../../../src/models/search/index.ts"],"names":[],"mappings":"AAAA,cAAc,eAAe,CAAC;AAC9B,cAAc,gBAAgB,CAAC;AAC/B,cAAc,kBAAkB,CAAC;AACjC,cAAc,yBAAyB,CAAC;AACxC,cAAc,2BAA2B,CAAC;AAC1C,cAAc,yBAAyB,CAAC;AACxC,cAAc,4BAA4B,CAAC;AAC3C,cAAc,uBAAuB,CAAC;AACtC,cAAc,mBAAmB,CAAC;AAClC,cAAc,8BAA8B,CAAC;AAC7C,cAAc,eAAe,CAAC;AAC9B,cAAc,sBAAsB,CAAC;AACrC,cAAc,eAAe,CAAC;AAC9B,cAAc,mBAAmB,CAAC;AAClC,cAAc,wBAAwB,CAAC;AACvC,cAAc,aAAa,CAAC;AAC5B,cAAc,gBAAgB,CAAC;AAC/B,cAAc,mBAAmB,CAAC;AAClC,cAAc,SAAS,CAAC;AACxB,cAAc,oBAAoB,CAAC;AACnC,cAAc,qBAAqB,CAAC;AACpC,cAAc,cAAc,CAAC;AAC7B,cAAc,cAAc,CAAC"}
interface IZenqlQuery {
    aggregations?: QueryAggregations;
    fieldLinkDepths?: FieldLinkDepths;
    fields?: string[];
    pageIndex: number;
    pageSize: number;
    zenql: string;
}

{};
//# sourceMappingURL=IZenqlQuery.js.map
{"version":3,"file":"IZenqlQuery.js","sourceRoot":"","sources":["../../../src/models/search/IZenqlQuery.ts"],"names":[],"mappings":""}
declare class ManagementQuery implements Omit<ContensisQuery, 'fields' | 'fieldLinkDepths'> {
    where: WhereExpression;
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    includeArchived?: boolean;
    includeDeleted?: boolean;
    aggregations?: QueryAggregations;
    constructor(...whereExpressions: IExpression[]);
    toJSON(): any;
}

var ManagementQuery = /** @class */ (function () {
    function ManagementQuery() {
        var whereExpressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            whereExpressions[_i] = arguments[_i];
        }
        this.where = new WhereExpression();
        this.orderBy = [];
        this.pageIndex = 0;
        this.pageSize = 20;
        this.includeArchived = false;
        this.includeDeleted = false;
        this.aggregations = {};
        if (whereExpressions) {
            this.where.addRange(whereExpressions);
        }
    }
    ManagementQuery.prototype.toJSON = function () {
        var result = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;
        var orderByDtos = serializeOrder(this.orderBy);
        if (orderByDtos && orderByDtos.length > 0) {
            result.orderBy = orderByDtos;
        }
        result.where = this.where;
        result.includeArchived = this.includeArchived;
        result.includeDeleted = this.includeDeleted;
        if (Object.keys(this.aggregations || {}).length)
            result.aggregations = this.aggregations;
        return result;
    };
    return ManagementQuery;
}());
{ ManagementQuery };
//# sourceMappingURL=ManagementQuery.js.map
{"version":3,"file":"ManagementQuery.js","sourceRoot":"","sources":["../../../src/models/search/ManagementQuery.ts"],"names":[],"mappings":"AAEA,OAAO,EAAE,eAAe,EAAE,MAAM,aAAa,CAAC;AAC9C,OAAO,EAAE,cAAc,EAAE,MAAM,cAAc,CAAC;AAE9C;IAUI;QAAY,0BAAkC;aAAlC,UAAkC,EAAlC,qBAAkC,EAAlC,IAAkC;YAAlC,qCAAkC;;QAR9C,UAAK,GAAoB,IAAI,eAAe,EAAE,CAAC;QAC/C,YAAO,GAA8C,EAAE,CAAC;QACxD,cAAS,GAAW,CAAC,CAAC;QACtB,aAAQ,GAAW,EAAE,CAAC;QACtB,oBAAe,GAAa,KAAK,CAAC;QAClC,mBAAc,GAAa,KAAK,CAAC;QACjC,iBAAY,GAAuB,EAAE,CAAC;QAGlC,IAAI,gBAAgB,EAAE;YAClB,IAAI,CAAC,KAAK,CAAC,QAAQ,CAAC,gBAAgB,CAAC,CAAC;SACzC;IACL,CAAC;IAED,gCAAM,GAAN;QACI,IAAM,MAAM,GAAQ,EAAE,CAAC;QACvB,MAAM,CAAC,SAAS,GAAG,IAAI,CAAC,SAAS,CAAC;QAClC,MAAM,CAAC,QAAQ,GAAG,IAAI,CAAC,QAAQ,CAAC;QAEhC,IAAM,WAAW,GAAG,cAAc,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC;QACjD,IAAI,WAAW,IAAI,WAAW,CAAC,MAAM,GAAG,CAAC,EAAE;YACvC,MAAM,CAAC,OAAO,GAAG,WAAW,CAAC;SAChC;QAED,MAAM,CAAC,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;QAE1B,MAAM,CAAC,eAAe,GAAG,IAAI,CAAC,eAAe,CAAC;QAC9C,MAAM,CAAC,cAAc,GAAG,IAAI,CAAC,cAAc,CAAC;QAE5C,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,IAAI,EAAE,CAAC,CAAC,MAAM;YAC3C,MAAM,CAAC,YAAY,GAAG,IAAI,CAAC,YAAY,CAAC;QAE5C,OAAO,MAAM,CAAC;IAClB,CAAC;IACL,sBAAC;AAAD,CAAC,AApCD,IAoCC"}
declare class ManagementZenqlQuery implements Omit<IZenqlQuery, 'fields' | 'fieldLinkDepths'> {
    zenql: string;
    pageIndex: number;
    pageSize: number;
    includeArchived?: boolean;
    includeDeleted?: boolean;
    aggregations?: QueryAggregations;
    constructor(zenql: string);
    toJSON(): any;
}

var ManagementZenqlQuery = /** @class */ (function () {
    function ManagementZenqlQuery(zenql) {
        this.zenql = '';
        this.pageIndex = 0;
        this.pageSize = 20;
        this.includeArchived = false;
        this.includeDeleted = false;
        this.aggregations = {};
        this.zenql = zenql;
    }
    ManagementZenqlQuery.prototype.toJSON = function () {
        var result = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;
        result.zenql = this.zenql;
        result.includeArchived = this.includeArchived;
        result.includeDeleted = this.includeDeleted;
        if (Object.keys(this.aggregations || {}).length)
            result.aggregations = this.aggregations;
        return result;
    };
    return ManagementZenqlQuery;
}());
{ ManagementZenqlQuery };
//# sourceMappingURL=ManagementZenqlQuery.js.map
{"version":3,"file":"ManagementZenqlQuery.js","sourceRoot":"","sources":["../../../src/models/search/ManagementZenqlQuery.ts"],"names":[],"mappings":"AAGA;IAQI,8BAAY,KAAa;QAPzB,UAAK,GAAW,EAAE,CAAC;QACnB,cAAS,GAAW,CAAC,CAAC;QACtB,aAAQ,GAAW,EAAE,CAAC;QACtB,oBAAe,GAAa,KAAK,CAAC;QAClC,mBAAc,GAAa,KAAK,CAAC;QACjC,iBAAY,GAAuB,EAAE,CAAC;QAGlC,IAAI,CAAC,KAAK,GAAG,KAAK,CAAC;IACvB,CAAC;IAED,qCAAM,GAAN;QACI,IAAM,MAAM,GAAQ,EAAE,CAAC;QACvB,MAAM,CAAC,SAAS,GAAG,IAAI,CAAC,SAAS,CAAC;QAClC,MAAM,CAAC,QAAQ,GAAG,IAAI,CAAC,QAAQ,CAAC;QAChC,MAAM,CAAC,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;QAC1B,MAAM,CAAC,eAAe,GAAG,IAAI,CAAC,eAAe,CAAC;QAC9C,MAAM,CAAC,cAAc,GAAG,IAAI,CAAC,cAAc,CAAC;QAE5C,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,IAAI,EAAE,CAAC,CAAC,MAAM;YAC3C,MAAM,CAAC,YAAY,GAAG,IAAI,CAAC,YAAY,CAAC;QAE5C,OAAO,MAAM,CAAC;IAClB,CAAC;IACL,2BAAC;AAAD,CAAC,AAzBD,IAyBC"}
declare abstract class ExpressionBase implements IExpression {
    fieldName: string;
    values: any[];
    operatorName: OperatorType;
    valueType: ExpressionValueType;
    private _weight;
    constructor(fieldName: string, values: any[], operatorName: OperatorType, valueType: ExpressionValueType);
    addValue(value: any): ExpressionBase;
    weight(weight: number): ExpressionBase;
    toJSON(): any;
}
declare abstract class LogicalExpression extends ExpressionBase implements ILogicalExpression {
    constructor(values: any[], operatorName: OperatorType, valueType: ExpressionValueType);
    getItem(index: number): IExpression;
    setItem(index: number, item: IExpression): WhereExpression;
    add(item: IExpression): WhereExpression;
    addRange(items: IExpression[]): WhereExpression;
    indexOf(item: IExpression): number;
    insert(index: number, item: IExpression): WhereExpression;
    remove(item: IExpression): boolean;
    removeAt(index: number): WhereExpression;
    clear(): WhereExpression;
    contains(item: IExpression): boolean;
    count(): number;
}
declare class WhereExpression extends LogicalExpression {
    constructor(values?: IExpression[]);
    toJSON(): any;
}
declare class Operators implements ContensisQueryOperators {
    and(...values: IExpression[]): ILogicalExpression;
    between(name: string, minimum: any, maximum: any): IExpression;
    contains(name: string, value: string): IExpression;
    distanceWithin(name: string, lat: number, lon: number, distance: string): IExpression;
    endsWith(name: string, value: string): IExpression;
    equalTo(name: string, value: any): IExpression;
    exists(name: string, value: boolean): IExpression;
    freeText(name: string, term: string, fuzzy?: boolean, operator?: FreeTextSearchOperatorType): IExpression;
    greaterThan(name: string, value: any): IExpression;
    greaterThanOrEqualTo(name: string, value: any): IExpression;
    in(name: string, ...values: any[]): IExpression;
    lessThan(name: string, value: any): IExpression;
    lessThanOrEqualTo(name: string, value: any): IExpression;
    not(expression: IExpression): ILogicalExpression;
    or(...values: IExpression[]): ILogicalExpression;
    startsWith(name: string, value: string): IExpression;
}

var ExpressionBase = /** @class */ (function () {
    function ExpressionBase(fieldName, values, operatorName, valueType) {
        if (values === void 0) { values = []; }
        this.fieldName = fieldName;
        this.values = values;
        this.operatorName = operatorName;
        this.valueType = valueType;
        this._weight = 0;
    }
    ExpressionBase.prototype.addValue = function (value) {
        this.values[this.values.length] = value;
        return this;
    };
    ExpressionBase.prototype.weight = function (weight) {
        this._weight = weight;
        return this;
    };
    ExpressionBase.prototype.toJSON = function () {
        var result = {};
        if (this.fieldName) {
            result.field = this.fieldName;
        }
        if (this.valueType === ExpressionValueTypeEnum.Single) {
            result[this.operatorName] = this.values[0];
        }
        else if (this.valueType === ExpressionValueTypeEnum.Array) {
            result[this.operatorName] = this.values;
        }
        else if (this.values && (this.values.length === 1)) {
            result[this.operatorName] = this.values[0];
        }
        else {
            result[this.operatorName] = this.values;
        }
        if (this._weight && (this._weight > 1)) {
            result.weight = this._weight;
        }
        return result;
    };
    return ExpressionBase;
}());
{ ExpressionBase };
var LogicalExpression = /** @class */ (function (_super) {
    __extends(LogicalExpression, _super);
    function LogicalExpression(values, operatorName, valueType) {
        if (values === void 0) { values = []; }
        return _super.call(this, null, values, operatorName, ExpressionValueTypeEnum.Array) || this;
    }
    LogicalExpression.prototype.getItem = function (index) {
        return this.values[index];
    };
    LogicalExpression.prototype.setItem = function (index, item) {
        this.values[index] = item;
        return this;
    };
    LogicalExpression.prototype.add = function (item) {
        this.values[this.values.length] = item;
        return this;
    };
    LogicalExpression.prototype.addRange = function (items) {
        Array.prototype.push.apply(this.values, items);
        return this;
    };
    LogicalExpression.prototype.indexOf = function (item) {
        return this.values.indexOf(item);
    };
    LogicalExpression.prototype.insert = function (index, item) {
        this.values.splice(index, 0, item);
        return this;
    };
    LogicalExpression.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0) {
            this.removeAt(index);
            return true;
        }
        return false;
    };
    LogicalExpression.prototype.removeAt = function (index) {
        this.values.splice(index, 1);
        return this;
    };
    LogicalExpression.prototype.clear = function () {
        this.values.length = 0;
        return this;
    };
    LogicalExpression.prototype.contains = function (item) {
        return (this.indexOf(item) >= 0);
    };
    LogicalExpression.prototype.count = function () {
        return this.values.length;
    };
    return LogicalExpression;
}(ExpressionBase));
{ LogicalExpression };
var AndExpression = /** @class */ (function (_super) {
    __extends(AndExpression, _super);
    function AndExpression(values) {
        return _super.call(this, values, OperatorTypeEnum.And, ExpressionValueTypeEnum.Array) || this;
    }
    return AndExpression;
}(LogicalExpression));
var BetweenExpression = /** @class */ (function (_super) {
    __extends(BetweenExpression, _super);
    function BetweenExpression(fieldName, minimum, maximum) {
        return _super.call(this, fieldName, [minimum, maximum], OperatorTypeEnum.Between, ExpressionValueTypeEnum.Array) || this;
    }
    return BetweenExpression;
}(ExpressionBase));
var ContainsExpression = /** @class */ (function (_super) {
    __extends(ContainsExpression, _super);
    function ContainsExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.Contains, ExpressionValueTypeEnum.Single) || this;
    }
    return ContainsExpression;
}(ExpressionBase));
var DistanceWithinExpression = /** @class */ (function (_super) {
    __extends(DistanceWithinExpression, _super);
    function DistanceWithinExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.DistanceWithin, ExpressionValueTypeEnum.Single) || this;
    }
    return DistanceWithinExpression;
}(ExpressionBase));
var EndsWithExpression = /** @class */ (function (_super) {
    __extends(EndsWithExpression, _super);
    function EndsWithExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.EndsWith, ExpressionValueTypeEnum.Single) || this;
    }
    return EndsWithExpression;
}(ExpressionBase));
var EqualToExpression = /** @class */ (function (_super) {
    __extends(EqualToExpression, _super);
    function EqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.EqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return EqualToExpression;
}(ExpressionBase));
var ExistsExpression = /** @class */ (function (_super) {
    __extends(ExistsExpression, _super);
    function ExistsExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.Exists, ExpressionValueTypeEnum.Single) || this;
    }
    return ExistsExpression;
}(ExpressionBase));
var FreeTextExpression = /** @class */ (function (_super) {
    __extends(FreeTextExpression, _super);
    function FreeTextExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.FreeText, ExpressionValueTypeEnum.Single) || this;
    }
    return FreeTextExpression;
}(ExpressionBase));
var GreaterThanExpression = /** @class */ (function (_super) {
    __extends(GreaterThanExpression, _super);
    function GreaterThanExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.GreaterThan, ExpressionValueTypeEnum.Single) || this;
    }
    return GreaterThanExpression;
}(ExpressionBase));
var GreaterThanOrEqualToExpression = /** @class */ (function (_super) {
    __extends(GreaterThanOrEqualToExpression, _super);
    function GreaterThanOrEqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.GreaterThanOrEqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return GreaterThanOrEqualToExpression;
}(ExpressionBase));
var InExpression = /** @class */ (function (_super) {
    __extends(InExpression, _super);
    function InExpression(fieldName, values) {
        return _super.call(this, fieldName, values, OperatorTypeEnum.In, ExpressionValueTypeEnum.Array) || this;
    }
    return InExpression;
}(ExpressionBase));
var LessThanExpression = /** @class */ (function (_super) {
    __extends(LessThanExpression, _super);
    function LessThanExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.LessThan, ExpressionValueTypeEnum.Single) || this;
    }
    return LessThanExpression;
}(ExpressionBase));
var LessThanOrEqualToExpression = /** @class */ (function (_super) {
    __extends(LessThanOrEqualToExpression, _super);
    function LessThanOrEqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.LessThanOrEqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return LessThanOrEqualToExpression;
}(ExpressionBase));
var NotExpression = /** @class */ (function (_super) {
    __extends(NotExpression, _super);
    function NotExpression(value) {
        return _super.call(this, [value], OperatorTypeEnum.Not, ExpressionValueTypeEnum.Single) || this;
    }
    return NotExpression;
}(LogicalExpression));
var OrExpression = /** @class */ (function (_super) {
    __extends(OrExpression, _super);
    function OrExpression(values) {
        return _super.call(this, values, OperatorTypeEnum.Or, ExpressionValueTypeEnum.Array) || this;
    }
    return OrExpression;
}(LogicalExpression));
var StartsWithExpression = /** @class */ (function (_super) {
    __extends(StartsWithExpression, _super);
    function StartsWithExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.StartsWith, ExpressionValueTypeEnum.Single) || this;
    }
    return StartsWithExpression;
}(ExpressionBase));
var WhereExpression = /** @class */ (function (_super) {
    __extends(WhereExpression, _super);
    function WhereExpression(values) {
        if (values === void 0) { values = []; }
        return _super.call(this, values, OperatorTypeEnum.Where, ExpressionValueTypeEnum.Array) || this;
    }
    WhereExpression.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        return result[OperatorTypeEnum.Where];
    };
    return WhereExpression;
}(LogicalExpression));
{ WhereExpression };
var Operators = /** @class */ (function () {
    function Operators() {
    }
    Operators.prototype.and = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new AndExpression(values);
    };
    Operators.prototype.between = function (name, minimum, maximum) {
        return new BetweenExpression(name, minimum, maximum);
    };
    Operators.prototype.contains = function (name, value) {
        return new ContainsExpression(name, value);
    };
    Operators.prototype.distanceWithin = function (name, lat, lon, distance) {
        return new DistanceWithinExpression(name, { lat: lat, lon: lon, distance: distance });
    };
    Operators.prototype.endsWith = function (name, value) {
        return new EndsWithExpression(name, value);
    };
    Operators.prototype.equalTo = function (name, value) {
        return new EqualToExpression(name, value);
    };
    Operators.prototype.exists = function (name, value) {
        return new ExistsExpression(name, value);
    };
    Operators.prototype.freeText = function (name, term, fuzzy, operator) {
        if (fuzzy === void 0) { fuzzy = false; }
        if (operator === void 0) { operator = FreeTextSearchOperatorTypeEnum.And; }
        return new FreeTextExpression(name, { term: term, fuzzy: fuzzy, operator: operator });
    };
    Operators.prototype.greaterThan = function (name, value) {
        return new GreaterThanExpression(name, value);
    };
    Operators.prototype.greaterThanOrEqualTo = function (name, value) {
        return new GreaterThanOrEqualToExpression(name, value);
    };
    Operators.prototype.in = function (name) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return new InExpression(name, values);
    };
    Operators.prototype.lessThan = function (name, value) {
        return new LessThanExpression(name, value);
    };
    Operators.prototype.lessThanOrEqualTo = function (name, value) {
        return new LessThanOrEqualToExpression(name, value);
    };
    Operators.prototype.not = function (expression) {
        return new NotExpression(expression);
    };
    Operators.prototype.or = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new OrExpression(values);
    };
    Operators.prototype.startsWith = function (name, value) {
        return new StartsWithExpression(name, value);
    };
    return Operators;
}());
{ Operators };
//# sourceMappingURL=Operators.js.map
{"version":3,"file":"Operators.js","sourceRoot":"","sources":["../../../src/models/search/Operators.ts"],"names":[],"mappings":"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"}
type OperatorType = 'and' | 'between' | 'contains' | 'endsWith' | 'equalTo' | 'exists' | 'freeText' | 'greaterThan' | 'greaterThanOrEqualTo' | 'in' | 'lessThan' | 'lessThanOrEqualTo' | 'not' | 'or' | 'startsWith' | 'where' | 'distanceWithin';
declare const OperatorTypeEnum: {
    And: OperatorType;
    Between: OperatorType;
    Contains: OperatorType;
    EndsWith: OperatorType;
    EqualTo: OperatorType;
    Exists: OperatorType;
    FreeText: OperatorType;
    GreaterThan: OperatorType;
    GreaterThanOrEqualTo: OperatorType;
    In: OperatorType;
    LessThan: OperatorType;
    LessThanOrEqualTo: OperatorType;
    Not: OperatorType;
    Or: OperatorType;
    StartsWith: OperatorType;
    Where: OperatorType;
    DistanceWithin: OperatorType;
};

var OperatorTypeEnum = {
    And: 'and',
    Between: 'between',
    Contains: 'contains',
    EndsWith: 'endsWith',
    EqualTo: 'equalTo',
    Exists: 'exists',
    FreeText: 'freeText',
    GreaterThan: 'greaterThan',
    GreaterThanOrEqualTo: 'greaterThanOrEqualTo',
    In: 'in',
    LessThan: 'lessThan',
    LessThanOrEqualTo: 'lessThanOrEqualTo',
    Not: 'not',
    Or: 'or',
    StartsWith: 'startsWith',
    Where: 'where',
    DistanceWithin: 'distanceWithin'
};
//# sourceMappingURL=OperatorType.js.map
{"version":3,"file":"OperatorType.js","sourceRoot":"","sources":["../../../src/models/search/OperatorType.ts"],"names":[],"mappings":"AAIA,MAAM,CAAC,IAAM,gBAAgB,GAAG;IAC5B,GAAG,EAAE,KAAqB;IAC1B,OAAO,EAAE,SAAyB;IAClC,QAAQ,EAAE,UAA0B;IACpC,QAAQ,EAAE,UAA0B;IACpC,OAAO,EAAE,SAAyB;IAClC,MAAM,EAAE,QAAwB;IAChC,QAAQ,EAAE,UAA0B;IACpC,WAAW,EAAE,aAA6B;IAC1C,oBAAoB,EAAE,sBAAsC;IAC5D,EAAE,EAAE,IAAoB;IACxB,QAAQ,EAAE,UAA0B;IACpC,iBAAiB,EAAE,mBAAmC;IACtD,GAAG,EAAE,KAAqB;IAC1B,EAAE,EAAE,IAAoB;IACxB,UAAU,EAAE,YAA4B;IACxC,KAAK,EAAE,OAAuB;IAC9B,cAAc,EAAE,gBAAgC;CACnD,CAAC"}
declare class OrderByFactory implements ContensisQueryOrderBy {
    asc(fieldName: string): ContensisQueryOrderBy;
    desc(fieldName: string): ContensisQueryOrderBy;
}

var OrderByFactory = /** @class */ (function () {
    function OrderByFactory() {
    }
    OrderByFactory.prototype.asc = function (fieldName) {
        return (new Ordering()).asc(fieldName);
    };
    OrderByFactory.prototype.desc = function (fieldName) {
        return (new Ordering()).desc(fieldName);
    };
    return OrderByFactory;
}());
{ OrderByFactory };
//# sourceMappingURL=OrderByFactory.js.map
{"version":3,"file":"OrderByFactory.js","sourceRoot":"","sources":["../../../src/models/search/OrderByFactory.ts"],"names":[],"mappings":"AACA,OAAO,EAAE,QAAQ,EAAE,MAAM,YAAY,CAAC;AAEtC;IAAA;IAQA,CAAC;IAPG,4BAAG,GAAH,UAAI,SAAiB;QACjB,OAAO,CAAC,IAAI,QAAQ,EAAE,CAAC,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC;IAC3C,CAAC;IAED,6BAAI,GAAJ,UAAK,SAAiB;QAClB,OAAO,CAAC,IAAI,QAAQ,EAAE,CAAC,CAAC,IAAI,CAAC,SAAS,CAAC,CAAC;IAC5C,CAAC;IACL,qBAAC;AAAD,CAAC,AARD,IAQC"}
declare class Ordering implements ContensisQueryOrderBy {
    private _items;
    asc(fieldName: string): ContensisQueryOrderBy;
    desc(fieldName: string): ContensisQueryOrderBy;
    toArray(): ContensisQueryOrderByDto[];
}

var Ordering = /** @class */ (function () {
    function Ordering() {
        this._items = [];
    }
    Ordering.prototype.asc = function (fieldName) {
        this._items.push({ 'asc': fieldName });
        return this;
    };
    Ordering.prototype.desc = function (fieldName) {
        this._items.push({ 'desc': fieldName });
        return this;
    };
    Ordering.prototype.toArray = function () {
        return this._items;
    };
    return Ordering;
}());
{ Ordering };
//# sourceMappingURL=Ordering.js.map
{"version":3,"file":"Ordering.js","sourceRoot":"","sources":["../../../src/models/search/Ordering.ts"],"names":[],"mappings":"AAEA;IAAA;QACY,WAAM,GAA+B,EAAE,CAAC;IAepD,CAAC;IAbG,sBAAG,GAAH,UAAI,SAAiB;QACjB,IAAI,CAAC,MAAM,CAAC,IAAI,CAAC,EAAE,KAAK,EAAE,SAAS,EAAE,CAAC,CAAC;QACvC,OAAO,IAAI,CAAC;IAChB,CAAC;IAED,uBAAI,GAAJ,UAAK,SAAiB;QAClB,IAAI,CAAC,MAAM,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,SAAS,EAAE,CAAC,CAAC;QACxC,OAAO,IAAI,CAAC;IAChB,CAAC;IAED,0BAAO,GAAP;QACI,OAAO,IAAI,CAAC,MAAM,CAAC;IACvB,CAAC;IACL,eAAC;AAAD,CAAC,AAhBD,IAgBC"}
interface PagedSearchList<T> extends PagedList<T> {
    aggregations?: Aggregations;
}

{};
//# sourceMappingURL=PagedSearchList.js.map
{"version":3,"file":"PagedSearchList.js","sourceRoot":"","sources":["../../../src/models/search/PagedSearchList.ts"],"names":[],"mappings":""}
declare class Query implements ContensisQuery {
    where: WhereExpression;
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    fieldLinkDepths?: FieldLinkDepths;
    fields?: string[];
    aggregations?: QueryAggregations;
    constructor(...whereExpressions: IExpression[]);
    toJSON(): any;
}

var Query = /** @class */ (function () {
    function Query() {
        var whereExpressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            whereExpressions[_i] = arguments[_i];
        }
        this.where = new WhereExpression();
        this.orderBy = [];
        this.pageIndex = 0;
        this.pageSize = 20;
        this.fieldLinkDepths = {};
        this.fields = [];
        this.aggregations = {};
        if (whereExpressions) {
            this.where.addRange(whereExpressions);
        }
    }
    Query.prototype.toJSON = function () {
        var result = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;
        var orderByDtos = serializeOrder(this.orderBy);
        if (orderByDtos && orderByDtos.length > 0) {
            result.orderBy = orderByDtos;
        }
        result.where = this.where;
        if (this.fields && this.fields.length > 0) {
            result.fields = this.fields;
        }
        if (this.fieldLinkDepths && Object.keys(this.fieldLinkDepths).length > 0) {
            result.fieldLinkDepths = this.fieldLinkDepths;
        }
        if (this.aggregations && Object.keys(this.aggregations).length > 0) {
            result.aggregations = this.aggregations;
        }
        return result;
    };
    return Query;
}());
{ Query };
//# sourceMappingURL=query.js.map
{"version":3,"file":"query.js","sourceRoot":"","sources":["../../../src/models/search/query.ts"],"names":[],"mappings":"AAEA,OAAO,EAAE,eAAe,EAAE,MAAM,aAAa,CAAC;AAC9C,OAAO,EAAE,cAAc,EAAE,MAAM,cAAc,CAAC;AAE9C;IASI;QAAY,0BAAkC;aAAlC,UAAkC,EAAlC,qBAAkC,EAAlC,IAAkC;YAAlC,qCAAkC;;QAR9C,UAAK,GAAoB,IAAI,eAAe,EAAE,CAAC;QAC/C,YAAO,GAA8C,EAAE,CAAC;QACxD,cAAS,GAAW,CAAC,CAAC;QACtB,aAAQ,GAAW,EAAE,CAAC;QACtB,oBAAe,GAAqB,EAAE,CAAC;QACvC,WAAM,GAAc,EAAE,CAAC;QACvB,iBAAY,GAAuB,EAAE,CAAC;QAGlC,IAAI,gBAAgB,EAAE;YAClB,IAAI,CAAC,KAAK,CAAC,QAAQ,CAAC,gBAAgB,CAAC,CAAC;SACzC;IACL,CAAC;IAED,sBAAM,GAAN;QACI,IAAM,MAAM,GAAQ,EAAE,CAAC;QACvB,MAAM,CAAC,SAAS,GAAG,IAAI,CAAC,SAAS,CAAC;QAClC,MAAM,CAAC,QAAQ,GAAG,IAAI,CAAC,QAAQ,CAAC;QAEhC,IAAM,WAAW,GAAG,cAAc,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC;QACjD,IAAI,WAAW,IAAI,WAAW,CAAC,MAAM,GAAG,CAAC,EAAE;YACvC,MAAM,CAAC,OAAO,GAAG,WAAW,CAAC;SAChC;QAED,MAAM,CAAC,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;QAE1B,IAAI,IAAI,CAAC,MAAM,IAAI,IAAI,CAAC,MAAM,CAAC,MAAM,GAAG,CAAC,EAAE;YACvC,MAAM,CAAC,MAAM,GAAG,IAAI,CAAC,MAAM,CAAC;SAC/B;QACD,IAAI,IAAI,CAAC,eAAe,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,eAAe,CAAC,CAAC,MAAM,GAAG,CAAC,EAAE;YACtE,MAAM,CAAC,eAAe,GAAG,IAAI,CAAC,eAAe,CAAC;SACjD;QACD,IAAI,IAAI,CAAC,YAAY,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC,MAAM,GAAG,CAAC,EAAE;YAChE,MAAM,CAAC,YAAY,GAAG,IAAI,CAAC,YAAY,CAAC;SAC3C;QAED,OAAO,MAAM,CAAC;IAClB,CAAC;IACL,YAAC;AAAD,CAAC,AAvCD,IAuCC"}
interface QueryAggregation {
    missing?: string;
    field: string;
    size?: number;
}

{};
//# sourceMappingURL=QueryAggregation.js.map
{"version":3,"file":"QueryAggregation.js","sourceRoot":"","sources":["../../../src/models/search/QueryAggregation.ts"],"names":[],"mappings":""}
interface QueryAggregations {
    [name: string]: QueryAggregation;
}

{};
//# sourceMappingURL=QueryAggregations.js.map
{"version":3,"file":"QueryAggregations.js","sourceRoot":"","sources":["../../../src/models/search/QueryAggregations.ts"],"names":[],"mappings":""}
declare const Op: Operators;
declare const OrderBy: ContensisQueryOrderBy;
declare function serializeOrder(orderBy: string | string[] | ContensisQueryOrderBy | ContensisQueryOrderBy[]): ContensisQueryOrderByDto[];

var Op = new Operators();
var OrderBy = new OrderByFactory();
function toOrderByDto(value) {
    var _a;
    if (!value) {
        return null;
    }
    if (typeof value === 'string') {
        var firstChar = value.substring(0, 1);
        if (firstChar === '+' || firstChar === '-') {
            var direction = (firstChar === '-') ? 'desc' : 'asc';
            return _a = {}, _a[direction] = value.substring(1), _a;
        }
        return { 'asc': value };
    }
    return value;
}
function serializeOrder(orderBy) {
    if (!orderBy) {
        return [];
    }
    if (typeof orderBy === 'string') {
        var o = toOrderByDto(orderBy);
        return !!o ? [o] : [];
    }
    if (Array.isArray(orderBy)) {
        return orderBy.map(toOrderByDto).filter(function (o) { return !!o; });
    }
    var orderByAsOrdering = orderBy instanceof Ordering ? orderBy : null;
    if (orderByAsOrdering === null) {
        return [];
    }
    return orderByAsOrdering.toArray();
}
//# sourceMappingURL=QueryTypes.js.map
{"version":3,"file":"QueryTypes.js","sourceRoot":"","sources":["../../../src/models/search/QueryTypes.ts"],"names":[],"mappings":"AACA,OAAO,EAAE,SAAS,EAAE,MAAM,aAAa,CAAC;AACxC,OAAO,EAAE,cAAc,EAAE,MAAM,kBAAkB,CAAC;AAClD,OAAO,EAAE,QAAQ,EAAE,MAAM,YAAY,CAAC;AAGtC,MAAM,CAAC,IAAM,EAAE,GAAG,IAAI,SAAS,EAAE,CAAC;AAElC,MAAM,CAAC,IAAM,OAAO,GAA0B,IAAI,cAAc,EAAE,CAAC;AAEnE,SAAS,YAAY,CAAC,KAAwC;;IAC1D,IAAI,CAAC,KAAK,EAAE;QACR,OAAO,IAAI,CAAC;KACf;IAED,IAAI,OAAO,KAAK,KAAK,QAAQ,EAAE;QAC3B,IAAI,SAAS,GAAG,KAAK,CAAC,SAAS,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;QACtC,IAAI,SAAS,KAAK,GAAG,IAAI,SAAS,KAAK,GAAG,EAAE;YACxC,IAAI,SAAS,GAAG,CAAC,SAAS,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,CAAC;YACrD,gBAAS,GAAC,SAAS,IAAG,KAAK,CAAC,SAAS,CAAC,CAAC,CAAC,KAAG;SAC9C;QACD,OAAO,EAAE,KAAK,EAAE,KAAK,EAAE,CAAC;KAC3B;IAED,OAAO,KAAiC,CAAC;AAC7C,CAAC;AAED,MAAM,UAAU,cAAc,CAAC,OAA4E;IACvG,IAAI,CAAC,OAAO,EAAE;QACV,OAAO,EAAE,CAAC;KACb;IAED,IAAI,OAAO,OAAO,KAAK,QAAQ,EAAE;QAC7B,IAAI,CAAC,GAAG,YAAY,CAAC,OAAO,CAAC,CAAC;QAC9B,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC;KACzB;IAED,IAAI,KAAK,CAAC,OAAO,CAAC,OAAO,CAAC,EAAE;QACxB,OAAQ,OAAe,CAAC,GAAG,CAAC,YAAY,CAAC,CAAC,MAAM,CAAC,UAAA,CAAC,IAAI,OAAA,CAAC,CAAC,CAAC,EAAH,CAAG,CAAC,CAAC;KAC9D;IAED,IAAI,iBAAiB,GAAG,OAAO,YAAY,QAAQ,CAAC,CAAC,CAAC,OAAmB,CAAC,CAAC,CAAC,IAAI,CAAC;IACjF,IAAI,iBAAiB,KAAK,IAAI,EAAE;QAC5B,OAAO,EAAE,CAAC;KACb;IAED,OAAO,iBAAiB,CAAC,OAAO,EAAE,CAAC;AACvC,CAAC"}
declare class ZenqlQuery implements IZenqlQuery {
    zenql: string;
    pageIndex: number;
    pageSize: number;
    fieldLinkDepths?: FieldLinkDepths;
    fields?: string[];
    aggregations?: QueryAggregations;
    constructor(zenql: string);
    toJSON(): any;
}

var ZenqlQuery = /** @class */ (function () {
    function ZenqlQuery(zenql) {
        this.zenql = '';
        this.pageIndex = 0;
        this.pageSize = 20;
        this.fieldLinkDepths = {};
        this.fields = [];
        this.aggregations = {};
        this.zenql = zenql;
    }
    ZenqlQuery.prototype.toJSON = function () {
        var result = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;
        result.zenql = this.zenql;
        if (this.fields && this.fields.length > 0) {
            result.fields = this.fields;
        }
        if (this.fieldLinkDepths && Object.keys(this.fieldLinkDepths).length > 0) {
            result.fieldLinkDepths = this.fieldLinkDepths;
        }
        if (this.aggregations && Object.keys(this.aggregations).length > 0) {
            result.aggregations = this.aggregations;
        }
        return result;
    };
    return ZenqlQuery;
}());
{ ZenqlQuery };
//# sourceMappingURL=ZenqlQuery.js.map
{"version":3,"file":"ZenqlQuery.js","sourceRoot":"","sources":["../../../src/models/search/ZenqlQuery.ts"],"names":[],"mappings":"AAGA;IAQI,oBAAY,KAAa;QAPzB,UAAK,GAAW,EAAE,CAAC;QACnB,cAAS,GAAW,CAAC,CAAC;QACtB,aAAQ,GAAW,EAAE,CAAC;QACtB,oBAAe,GAAqB,EAAE,CAAC;QACvC,WAAM,GAAc,EAAE,CAAC;QACvB,iBAAY,GAAuB,EAAE,CAAC;QAGlC,IAAI,CAAC,KAAK,GAAG,KAAK,CAAC;IACvB,CAAC;IAED,2BAAM,GAAN;QACI,IAAM,MAAM,GAAQ,EAAE,CAAC;QACvB,MAAM,CAAC,SAAS,GAAG,IAAI,CAAC,SAAS,CAAC;QAClC,MAAM,CAAC,QAAQ,GAAG,IAAI,CAAC,QAAQ,CAAC;QAChC,MAAM,CAAC,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;QAE1B,IAAI,IAAI,CAAC,MAAM,IAAI,IAAI,CAAC,MAAM,CAAC,MAAM,GAAG,CAAC,EAAE;YACvC,MAAM,CAAC,MAAM,GAAG,IAAI,CAAC,MAAM,CAAC;SAC/B;QACD,IAAI,IAAI,CAAC,eAAe,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,eAAe,CAAC,CAAC,MAAM,GAAG,CAAC,EAAE;YACtE,MAAM,CAAC,eAAe,GAAG,IAAI,CAAC,eAAe,CAAC;SACjD;QACD,IAAI,IAAI,CAAC,YAAY,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC,MAAM,GAAG,CAAC,EAAE;YAChE,MAAM,CAAC,YAAY,GAAG,IAAI,CAAC,YAAY,CAAC;SAC3C;QAED,OAAO,MAAM,CAAC;IAClB,CAAC;IACL,iBAAC;AAAD,CAAC,AA9BD,IA8BC"}
interface AssetUpload {
    fileId: string;
}

{};
//# sourceMappingURL=AssetUpload.js.map
{"version":3,"file":"AssetUpload.js","sourceRoot":"","sources":["../../src/models/AssetUpload.ts"],"names":[],"mappings":""}
interface ClientCredentialsGrant {
    clientId: string;
    clientSecret: string;
}

{};
//# sourceMappingURL=ClientCredentialsGrant.js.map
{"version":3,"file":"ClientCredentialsGrant.js","sourceRoot":"","sources":["../../src/models/ClientCredentialsGrant.ts"],"names":[],"mappings":""}
type ClientGrantType = 'client_credentials' | 'contensis_classic' | 'contensis_classic_refresh_token' | 'none';
type ClientGrants = ClientCredentialsGrant | ContensisClassicGrant | ContensisClassicRefreshTokenGrant;

{};
//# sourceMappingURL=ClientGrants.js.map
{"version":3,"file":"ClientGrants.js","sourceRoot":"","sources":["../../src/models/ClientGrants.ts"],"names":[],"mappings":""}
interface ClientParams {
    rootUrl: string;
    projectId: string;
    accessToken?: string;
    clientDetails?: ClientGrants;
    clientType?: ClientGrantType;
    defaultHeaders?: {
        [key: string]: string;
    };
    language?: string;
    versionStatus?: VersionStatus;
    pageIndex?: number;
    pageSize?: number;
    responseHandler?: ResponseHandler;
}

{};
//# sourceMappingURL=ClientParams.js.map
{"version":3,"file":"ClientParams.js","sourceRoot":"","sources":["../../src/models/ClientParams.ts"],"names":[],"mappings":""}
interface Component extends ContentTypeBase<'component'> {
}

{};
//# sourceMappingURL=Component.js.map
{"version":3,"file":"Component.js","sourceRoot":"","sources":["../../src/models/Component.ts"],"names":[],"mappings":""}
interface ContensisClassicGrant {
    username: string;
    password: string;
}

{};
//# sourceMappingURL=ContensisClassicGrant.js.map
{"version":3,"file":"ContensisClassicGrant.js","sourceRoot":"","sources":["../../src/models/ContensisClassicGrant.ts"],"names":[],"mappings":""}
interface ContensisClassicRefreshTokenGrant {
    refreshToken: string;
}

{};
//# sourceMappingURL=ContensisClassicRefreshTokenGrant.js.map
{"version":3,"file":"ContensisClassicRefreshTokenGrant.js","sourceRoot":"","sources":["../../src/models/ContensisClassicRefreshTokenGrant.ts"],"names":[],"mappings":""}
interface ContentType extends ContentTypeBase<'entry' | 'asset'> {
    defaultLanguage?: string;
    entryTitleField?: string;
    entryDescriptionField?: string;
    supportedLanguages?: string[];
    workflowId?: string;
    previewUrl?: string;
    defaultParentNodeId?: string;
    groups?: ContentTypeGroup[];
}

{};
//# sourceMappingURL=ContentType.js.map
{"version":3,"file":"ContentType.js","sourceRoot":"","sources":["../../src/models/ContentType.ts"],"names":[],"mappings":""}
interface ContentTypeBase<TFormat extends ContentTypeFormat> {
    description?: LocalisedString;
    enabled?: boolean;
    id: string;
    name: LocalisedString;
    projectId?: string;
    version?: VersionInfo;
    uuid?: string;
    fields?: Field[];
    dataFormat?: TFormat;
}
interface ContentTypeGroup extends LocalisedIdAndValue {
}

{};
//# sourceMappingURL=ContentTypeBase.js.map
{"version":3,"file":"ContentTypeBase.js","sourceRoot":"","sources":["../../src/models/ContentTypeBase.ts"],"names":[],"mappings":""}
type ContentTypeFormatMap<T> = {
    entry: T;
    component: T;
    asset: T;
    form: T;
};
type ContentTypeFormat = keyof ContentTypeFormatMap<any>;
{};

{};
//# sourceMappingURL=ContentTypeFormat.js.map
{"version":3,"file":"ContentTypeFormat.js","sourceRoot":"","sources":["../../src/models/ContentTypeFormat.ts"],"names":[],"mappings":""}
interface Editor {
    id?: string;
    instructions?: LocalisedString;
    properties?: EditorProperties;
}
interface EditorProperties {
    readOnly?: boolean;
    showSlug?: boolean;
    repeatableItemDefault?: LocalisedValue<any>;
    placeholderText?: LocalisedString | string;
    trueText?: LocalisedString | string;
    falseText?: LocalisedString | string;
    fromPlaceholderText?: LocalisedString | string;
    toPlaceholderText?: LocalisedString | string;
    decimalPlaces?: number;
    size?: 'small' | 'medium' | 'large' | 'auto';
    headingLevel?: string;
    showSearch?: boolean;
    showLatLon?: boolean;
    lat?: number;
    lon?: number;
    allowFullScreen?: boolean;
    enableToolbar?: boolean;
    enableStatusBar?: boolean;
    useDarkTheme?: boolean;
    quotePlaceholderText?: LocalisedString | string;
    sourcePlaceholderText?: LocalisedString | string;
    uploadPath?: string;
    filterPaths?: string[];
    displayCaption?: boolean;
    displayAltText?: boolean;
    displayField?: string;
}
{};

{};
//# sourceMappingURL=Editor.js.map
{"version":3,"file":"Editor.js","sourceRoot":"","sources":["../../src/models/Editor.ts"],"names":[],"mappings":""}
declare class ContensisApplicationError extends Error {
    constructor(message?: string);
}
declare class ContensisAuthenticationError extends Error {
    constructor(message?: string);
}

var ContensisApplicationError = /** @class */ (function (_super) {
    __extends(ContensisApplicationError, _super);
    function ContensisApplicationError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'ContensisApplicationError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ContensisApplicationError;
}(Error));
{ ContensisApplicationError };
var ContensisAuthenticationError = /** @class */ (function (_super) {
    __extends(ContensisAuthenticationError, _super);
    function ContensisAuthenticationError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'ContensisAuthenticationError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ContensisAuthenticationError;
}(Error));
{ ContensisAuthenticationError };
//# sourceMappingURL=errors.js.map
{"version":3,"file":"errors.js","sourceRoot":"","sources":["../../src/models/errors.ts"],"names":[],"mappings":";AAAA;IAA+C,6CAAK;IAChD,mCAAY,OAAgB;;QAA5B,YACI,kBAAM,OAAO,CAAC,SAGjB;QAFG,KAAI,CAAC,IAAI,GAAG,2BAA2B,CAAC;QACxC,MAAM,CAAC,cAAc,CAAC,KAAI,EAAE,WAAW,SAAS,CAAC,CAAC;;IACtD,CAAC;IACL,gCAAC;AAAD,CAAC,AAND,CAA+C,KAAK,GAMnD;;AAED;IAAkD,gDAAK;IACnD,sCAAY,OAAgB;;QAA5B,YACI,kBAAM,OAAO,CAAC,SAGjB;QAFG,KAAI,CAAC,IAAI,GAAG,8BAA8B,CAAC;QAC3C,MAAM,CAAC,cAAc,CAAC,KAAI,EAAE,WAAW,SAAS,CAAC,CAAC;;IACtD,CAAC;IACL,mCAAC;AAAD,CAAC,AAND,CAAkD,KAAK,GAMtD"}
type FieldDataTypeMap<T> = {
    'boolean': T;
    'booleanArray': T;
    'dateTime': T;
    'dateTimeArray': T;
    'decimal': T;
    'decimalArray': T;
    'integer': T;
    'integerArray': T;
    'object': T;
    'objectArray': T;
    'string': T;
    'stringArray': T;
};
type FieldDataFormatMap<T> = {
    'asset': T;
    'daterange': T;
    'embed': T;
    'entry': T;
    'field': T;
    'heading': T;
    'html': T;
    'image': T;
    'location': T;
    'markdown': T;
    'quote': T;
    'taxonomy': T;
    'component': T;
    'contenttype': T;
    'tag': T;
};
type FieldDataType = keyof FieldDataTypeMap<any>;
type FieldDataFormat = keyof FieldDataFormatMap<any> | string;
interface Field {
    id: string;
    name: LocalisedString;
    description?: LocalisedString;
    dataType: FieldDataType;
    dataFormat?: FieldDataFormat;
    default?: LocalisedValue<any>;
    groupId?: string;
    validations?: Validations<Field>;
    editor?: Editor;
    readonly fields?: Field[];
}
{};

{};
//# sourceMappingURL=Field.js.map
{"version":3,"file":"Field.js","sourceRoot":"","sources":["../../src/models/Field.ts"],"names":[],"mappings":""}
interface IHttpClient {
    request<T>(url: string, request?: RequestInit): Promise<T>;
}

{};
//# sourceMappingURL=IHttpClient.js.map
{"version":3,"file":"IHttpClient.js","sourceRoot":"","sources":["../../src/models/IHttpClient.ts"],"names":[],"mappings":""}
* from './AssetUpload';
* from './ClientCredentialsGrant';
* from './errors';
* from './ClientGrants';
* from './ClientParams';
* from './ContentTypeFormat';
* from './ContensisClassicGrant';
* from './ContensisClassicRefreshTokenGrant';
* from './Component';
* from './ContentType';
* from './Editor';
* from './Field';
* from './IHttpClient';
* from './IParamsProvider';
* from './Localised';
* from './MapperFn';
* from './PagedList';
* from './PageOptions';
* from './Project';
* from './ResponseContext';
* from './ResponseHandler';
* from './search';
* from './SysAssetFile';
* from './UrlFn';
* from './VersionInfo';
* from './VersionInfoBase';
* from './VersionStatus';
//# sourceMappingURL=index.js.map
{"version":3,"file":"index.js","sourceRoot":"","sources":["../../src/models/index.ts"],"names":[],"mappings":"AAAA,cAAc,eAAe,CAAC;AAC9B,cAAc,0BAA0B,CAAC;AACzC,cAAc,UAAU,CAAC;AACzB,cAAc,gBAAgB,CAAC;AAC/B,cAAc,gBAAgB,CAAC;AAC/B,cAAc,qBAAqB,CAAC;AACpC,cAAc,yBAAyB,CAAC;AACxC,cAAc,qCAAqC,CAAC;AACpD,cAAc,aAAa,CAAC;AAC5B,cAAc,eAAe,CAAC;AAC9B,cAAc,UAAU,CAAC;AACzB,cAAc,SAAS,CAAC;AACxB,cAAc,eAAe,CAAC;AAC9B,cAAc,mBAAmB,CAAC;AAClC,cAAc,aAAa,CAAC;AAC5B,cAAc,YAAY,CAAC;AAC3B,cAAc,aAAa,CAAC;AAC5B,cAAc,eAAe,CAAC;AAC9B,cAAc,WAAW,CAAC;AAC1B,cAAc,mBAAmB,CAAC;AAClC,cAAc,mBAAmB,CAAC;AAClC,cAAc,UAAU,CAAC;AACzB,cAAc,gBAAgB,CAAC;AAC/B,cAAc,SAAS,CAAC;AACxB,cAAc,eAAe,CAAC;AAC9B,cAAc,mBAAmB,CAAC;AAClC,cAAc,iBAAiB,CAAC"}
interface IParamsProvider {
    getParams(): ClientParams;
}

{};
//# sourceMappingURL=IParamsProvider.js.map
{"version":3,"file":"IParamsProvider.js","sourceRoot":"","sources":["../../src/models/IParamsProvider.ts"],"names":[],"mappings":""}
type LocalisedValue<T> = {
    [key: string]: T;
};
type LocalisedString = LocalisedValue<string>;
type LocalisedIdAndValue = {
    id: string;
    name: LocalisedString;
};

{};
//# sourceMappingURL=Localised.js.map
{"version":3,"file":"Localised.js","sourceRoot":"","sources":["../../src/models/Localised.ts"],"names":[],"mappings":""}
interface MapperFn {
    (value: any, options: any, params: ClientParams): any;
}

{};
//# sourceMappingURL=MapperFn.js.map
{"version":3,"file":"MapperFn.js","sourceRoot":"","sources":["../../src/models/MapperFn.ts"],"names":[],"mappings":""}
interface PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    pageCount: number;
    items: T[];
}

{};
//# sourceMappingURL=PagedList.js.map
{"version":3,"file":"PagedList.js","sourceRoot":"","sources":["../../src/models/PagedList.ts"],"names":[],"mappings":""}
interface PageOptions {
    pageIndex?: number;
    pageSize?: number;
}

{};
//# sourceMappingURL=PageOptions.js.map
{"version":3,"file":"PageOptions.js","sourceRoot":"","sources":["../../src/models/PageOptions.ts"],"names":[],"mappings":""}
interface Project {
    id: string;
    name: string;
    description: string;
    primaryLanguage: string;
    supportedLanguages: string[];
    deliverySysExclusions: string[];
}

{};
//# sourceMappingURL=Project.js.map
{"version":3,"file":"Project.js","sourceRoot":"","sources":["../../src/models/Project.ts"],"names":[],"mappings":""}
interface ResponseContext {
    status: number;
    statusText: string;
    url: string;
    data: any;
}

{};
//# sourceMappingURL=ResponseContext.js.map
{"version":3,"file":"ResponseContext.js","sourceRoot":"","sources":["../../src/models/ResponseContext.ts"],"names":[],"mappings":""}
type ResponseHandlerFunction = (response: Response, context: ResponseContext) => any;
interface ResponseHandler {
    ['*']?: ResponseHandlerFunction;
    [statusCode: number]: ResponseHandlerFunction;
}

{};
//# sourceMappingURL=ResponseHandler.js.map
{"version":3,"file":"ResponseHandler.js","sourceRoot":"","sources":["../../src/models/ResponseHandler.ts"],"names":[],"mappings":""}
interface SysAssetFile {
    fileId: string;
    parentNodePath?: string;
}

{};
//# sourceMappingURL=SysAssetFile.js.map
{"version":3,"file":"SysAssetFile.js","sourceRoot":"","sources":["../../src/models/SysAssetFile.ts"],"names":[],"mappings":""}
interface UrlFn {
    (options: any, params: ClientParams): string;
}

{};
//# sourceMappingURL=UrlFn.js.map
{"version":3,"file":"UrlFn.js","sourceRoot":"","sources":["../../src/models/UrlFn.ts"],"names":[],"mappings":""}
type ValidationMessage = {
    message?: LocalisedString;
};
type ValidationMessageAndValue<T> = ValidationMessage & {
    value: T;
};
interface Validations<TField> {
    required?: ValidationMessage;
    min?: ValidationMessageAndValue<number>;
    max?: ValidationMessageAndValue<number>;
    minLength?: ValidationMessageAndValue<number>;
    maxLength?: ValidationMessageAndValue<number>;
    minCount?: ValidationMessageAndValue<number>;
    maxCount?: ValidationMessageAndValue<number>;
    regex?: ValidationMessage & {
        pattern: string;
    };
    allowedValues?: ValidationMessage & {
        values: LocalisedString[];
    };
    taxonomyRoot?: ValidationMessage & {
        key: string;
    };
    contentType?: ValidationMessage & {
        contentType: string;
    };
    allowedContentTypes?: ValidationMessage & {
        contentTypes: string[];
    };
    pastDateTime?: ValidationMessage;
    decimalPlaces?: ValidationMessageAndValue<number>;
    imageDimensions?: ValidationMessage & {
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
    };
    captionRequired?: ValidationMessage;
    sourceRequired?: ValidationMessage;
    altTextRequired?: ValidationMessage;
    allowedFieldTypes?: ValidationMessage & {
        fields: TField[];
    };
    allowedDataFormats?: ValidationMessage & {
        dataFormats: Exclude<ContentTypeFormat[], 'component'>;
    };
    allowedIds?: ValidationMessage & {
        ids: string[];
    };
}
{};

{};
//# sourceMappingURL=Validations.js.map
{"version":3,"file":"Validations.js","sourceRoot":"","sources":["../../src/models/Validations.ts"],"names":[],"mappings":""}
/** Complete VersionInfo object for resources that support
 * publishing, recycling and archiving */
interface VersionInfo extends VersionInfoBase {
    publishedBy: string;
    published: string;
    deleted?: string;
    deletedBy?: string;
    archived?: string;
    archivedBy?: string;
}

{};
//# sourceMappingURL=VersionInfo.js.map
{"version":3,"file":"VersionInfo.js","sourceRoot":"","sources":["../../src/models/VersionInfo.ts"],"names":[],"mappings":""}
/** Contains base members for a VersionInfo object that
 * might not support publishing, archiving or recycling */
interface VersionInfoBase {
    createdBy: string;
    created: string;
    modifiedBy: string;
    modified: string;
    versionNo: string;
}

{};
//# sourceMappingURL=VersionInfoBase.js.map
{"version":3,"file":"VersionInfoBase.js","sourceRoot":"","sources":["../../src/models/VersionInfoBase.ts"],"names":[],"mappings":""}
type VersionStatus = 'published' | 'latest';

{};
//# sourceMappingURL=VersionStatus.js.map
{"version":3,"file":"VersionStatus.js","sourceRoot":"","sources":["../../src/models/VersionStatus.ts"],"names":[],"mappings":""}
interface AssetSys extends BaseSys<'asset'> {
    properties: {
        filename: string;
        fileSize: number;
        fileId: string;
        filePath: string;
        width?: number;
        height?: number;
    };
}

interface BaseSys<T extends ContentTypeFormat> {
    availableLanguages?: string[];
    contentTypeId: string;
    dataFormat: T;
    id: string;
    isPublished?: boolean;
    language: string;
    owner?: string;
    projectId?: string;
    slug?: string;
    uri?: string;
    version?: VersionInfo;
    versionStatus: VersionStatus;
    workflow?: Workflow;
    metadata?: EntryMetadata & EntryMetadataClassic;
}

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
    clientType?: ClientGrantType;
    clientDetails?: ClientGrants;
    defaultHeaders?: {
        [key: string]: string;
    };
    projectId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageSize?: number;
    responseHandler?: ResponseHandler;
    fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodeOperations;
    project: IProjectOperations;
    taxonomy: ITaxonomyOperations;
    getHeaders: (contentType?: string) => {
        [key: string]: string;
    };
    ensureIsAuthorized: () => Promise<string>;
}

interface ContensisStatic {
    Client: ClientStatic;
    ClientConfig: ClientConfigFactory;
    Query: ContensisQueryFactory;
    Op: ContensisQueryOperators;
    OrderBy: ContensisQueryOrderBy;
}

interface BaseEntryFields {
    entryTitle: string;
    entryDescription?: string;
    entryThumbnail?: Image;
    entryTags?: string[];
}
interface Entry extends StrictEntry {
    [key: string]: any;
}
interface EntryAsset extends BaseEntryFields {
    sys: AssetSys;
}
interface StrictEntry extends BaseEntryFields {
    sys: EntrySys;
}
{};

interface Asset extends EntryAsset {
    altText?: string;
    description?: string;
    keywords?: string[];
    thumbnail?: string;
    title: string;
}
interface Image {
    altText?: string;
    transformations?: string;
    caption?: string;
    asset: Asset;
}
interface Composer<T extends string = string, V = any> {
    type: T;
    value: V;
}
interface DateRange {
    from: string;
    to: string;
}
interface Quote {
    text: string;
    source: string;
}
interface Location {
    lon: number;
    lat: number;
}
interface Taxonomy {
    path: string;
    key: string;
    hasChildren: boolean;
    name: string;
    children: Taxonomy[] | [];
}

interface EntryGetOptions {
    id: string;
    language?: string;
    linkDepth?: number;
    fields?: string[];
    fieldLinkDepths?: FieldLinkDepths;
}

interface EntryListOptions {
    contentTypeId?: string;
    language?: string;
    pageOptions?: PageOptions;
    order?: string[];
    linkDepth?: number;
    fields?: string[];
    fieldLinkDepths?: FieldLinkDepths;
}

interface EntryMetadata {
    [key: string]: string | boolean | number | null | undefined;
}

interface EntryMetadataClassic {
    includeInAToZ?: boolean;
    includeInSearch?: boolean;
    includeInSiteMap?: boolean;
    includeInMenu?: boolean;
    nodeId?: string;
}

interface EntrySys extends BaseSys<'entry'> {
    allUris: string[];
    metadata: EntryMetadata;
    properties: {
        [key: string]: any;
    };
}

interface IContentTypeOperations {
    get(contentTypeId: string): Promise<ContentType>;
}

interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: string, linkDepth?: number): Promise<PagedList<Entry>>;
    search(query: Query | ZenqlQuery, linkDepth?: number): Promise<PagedSearchList<Entry>>;
    resolve<T extends Entry | Entry[] | PagedList<Entry>>(entryOrList: T, fields?: string[]): Promise<T>;
}

interface INodeOperations {
    getRoot(options?: NodeGetRootOptions): Promise<Node>;
    get(idOrPathOrOptions: string | NodeGetByIdOptions | NodeGetByPathOptions): Promise<Node>;
    getByEntry(options: NodeGetCanonicalByEntryOptions): Promise<Node>;
    getByEntry(options: NodeGetByEntryOptions): Promise<Node[]>;
    getByEntry(entry: Entry): Promise<Node[]>;
    getByEntry(entryId: string): Promise<Node[]>;
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

type NodeVersionInfo = Pick<VersionInfo, 'versionNo'>;
interface Node<TEntry extends StrictEntry = LooseEntry> {
    id: string;
    parentId?: string;
    projectId: string;
    slug: string;
    displayName: string;
    language: string;
    path: string;
    childCount: number;
    children?: Node[];
    entry?: TEntry;
    isCanonical: boolean;
    version: NodeVersionInfo;
    includeInMenu: boolean;
}

interface NodeDefaultOptions {
    language?: string;
    entryFields?: string[];
    entryLinkDepth?: number;
    entryFieldLinkDepths?: FieldLinkDepths;
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
    canonicalOnly?: boolean;
}
interface NodeGetCanonicalByEntryOptions extends NodeGetByEntryOptions, NodeDefaultWithDepthOptions {
    canonicalOnly: true;
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

interface Workflow {
    id: string;
    state: string;
}

interface ZengentiStatic {
    Contensis: ContensisStatic;
}


declare var Zengenti: ZengentiStatic;