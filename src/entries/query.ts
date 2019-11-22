import {
    ContensisQuery, ContensisQueryOperators, ContensisQueryOrderBy, ContensisQueryOrderByDto,
    ExpressionValueType, IExpression, ILogicalExpression, OperatorType
} from '../models';

interface DistanceSearch {
    lat: number;
    lon: number;
    distance: string;
}

const ExpressionValueTypeEnum = {
    Single: 'single' as ExpressionValueType,
    Array: 'array' as ExpressionValueType,
    Unknown: 'unknown' as ExpressionValueType
};

const OperatorTypeEnum = {
    And: 'and' as OperatorType,
    Between: 'between' as OperatorType,
    Contains: 'contains' as OperatorType,
    EndsWith: 'endsWith' as OperatorType,
    EqualTo: 'equalTo' as OperatorType,
    Exists: 'exists' as OperatorType,
    FreeText: 'freeText' as OperatorType,
    GreaterThan: 'greaterThan' as OperatorType,
    GreaterThanOrEqualTo: 'greaterThanOrEqualTo' as OperatorType,
    In: 'in' as OperatorType,
    LessThan: 'lessThan' as OperatorType,
    LessThanOrEqualTo: 'lessThanOrEqualTo' as OperatorType,
    Not: 'not' as OperatorType,
    Or: 'or' as OperatorType,
    StartsWith: 'startsWith' as OperatorType,
    Where: 'where' as OperatorType,
    DistanceWithin: 'distanceWithin' as OperatorType
};

export abstract class ExpressionBase implements IExpression {

    private _weight: number = 0;

    constructor(public fieldName: string, public values: any[] = [],
        public operatorName: OperatorType, public valueType: ExpressionValueType) {
    }

    addValue(value: any): ExpressionBase {
        this.values[this.values.length] = value;
        return this;
    }

    weight(weight: number): ExpressionBase {
        this._weight = weight;
        return this;
    }

    toJSON(): any {
        let result: any = {};
        if (this.fieldName) {
            result.field = this.fieldName;
        }
        if (this.valueType === ExpressionValueTypeEnum.Single) {
            result[this.operatorName] = this.values[0];
        } else if (this.valueType === ExpressionValueTypeEnum.Array) {
            result[this.operatorName] = this.values;
        } else if (this.values && (this.values.length === 1)) {
            result[this.operatorName] = this.values[0];
        } else {
            result[this.operatorName] = this.values;
        }
        if (this._weight && (this._weight > 1)) {
            result.weight = this._weight;
        }
        return result;
    }
}

export abstract class LogicalExpression extends ExpressionBase implements ILogicalExpression {
    constructor(values: any[] = [], operatorName: OperatorType, valueType: ExpressionValueType) {
        super(null, values, operatorName, ExpressionValueTypeEnum.Array);
    }

    getItem(index: number): IExpression {
        return this.values[index];
    }

    setItem(index: number, item: IExpression): WhereExpression {
        this.values[index] = item;
        return this;
    }

    add(item: IExpression): WhereExpression {
        this.values[this.values.length] = item;
        return this;
    }

    addRange(items: IExpression[]): WhereExpression {
        Array.prototype.push.apply(this.values, items);
        return this;
    }

    indexOf(item: IExpression): number {
        return this.values.indexOf(item);
    }

    insert(index: number, item: IExpression): WhereExpression {
        this.values.splice(index, 0, item);
        return this;
    }

    remove(item: IExpression): boolean {
        let index = this.indexOf(item);
        if (index >= 0) {
            this.removeAt(index);
            return true;
        }
        return false;
    }

    removeAt(index: number): WhereExpression {
        this.values.splice(index, 1);
        return this;
    }

    clear(): WhereExpression {
        this.values.length = 0;
        return this;
    }

    contains(item: IExpression): boolean {
        return (this.indexOf(item) >= 0);
    }

    count(): number {
        return this.values.length;
    }

}

class AndExpression extends LogicalExpression {
    constructor(values: IExpression[]) {
        super(values, OperatorTypeEnum.And, ExpressionValueTypeEnum.Array);
    }
}

class BetweenExpression extends ExpressionBase {
    constructor(fieldName: string, minimum: any, maximum: any) {
        super(fieldName, [minimum, maximum], OperatorTypeEnum.Between, ExpressionValueTypeEnum.Array);
    }
}

class NotExpression extends LogicalExpression {
    constructor(value: IExpression) {
        super([value], OperatorTypeEnum.Not, ExpressionValueTypeEnum.Single);
    }
}

class OrExpression extends LogicalExpression {
    constructor(values: IExpression[]) {
        super(values, OperatorTypeEnum.Or, ExpressionValueTypeEnum.Array);
    }
}

class ContainsExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.Contains, ExpressionValueTypeEnum.Single);
    }
}

class EndsWithExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.EndsWith, ExpressionValueTypeEnum.Single);
    }
}

class EqualToExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.EqualTo, ExpressionValueTypeEnum.Single);
    }
}

class ExistsExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.Exists, ExpressionValueTypeEnum.Single);
    }
}

class FreeTextExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.FreeText, ExpressionValueTypeEnum.Single);
    }
}

class GreaterThanExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.GreaterThan, ExpressionValueTypeEnum.Single);
    }
}

class GreaterThanOrEqualToExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.GreaterThanOrEqualTo, ExpressionValueTypeEnum.Single);
    }
}

class LessThanExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.LessThan, ExpressionValueTypeEnum.Single);
    }
}

class InExpression extends ExpressionBase {
    constructor(fieldName: string, values: any[]) {
        super(fieldName, values, OperatorTypeEnum.In, ExpressionValueTypeEnum.Array);
    }
}

class LessThanOrEqualToExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.LessThanOrEqualTo, ExpressionValueTypeEnum.Single);
    }
}

class StartsWithExpression extends ExpressionBase {
    constructor(fieldName: string, value: any) {
        super(fieldName, [value], OperatorTypeEnum.StartsWith, ExpressionValueTypeEnum.Single);
    }
}

export class WhereExpression extends LogicalExpression {
    constructor(values: IExpression[] = []) {
        super(values, OperatorTypeEnum.Where, ExpressionValueTypeEnum.Array);
    }

    toJSON() {
        let result = super.toJSON();
        return result[OperatorTypeEnum.Where];
    }
}

class DistanceWithinExpression extends ExpressionBase {
    constructor(fieldName: string, value: DistanceSearch) {
        super(fieldName, [value], OperatorTypeEnum.DistanceWithin, ExpressionValueTypeEnum.Single);
    }
}


export class Operators implements ContensisQueryOperators {
    and(...values: IExpression[]): ILogicalExpression {
        return new AndExpression(values);
    }

    between(name: string, minimum: any, maximum: any): IExpression {
        return new BetweenExpression(name, minimum, maximum);
    }

    not(expression: IExpression): ILogicalExpression {
        return new NotExpression(expression);
    }

    or(...values: IExpression[]): ILogicalExpression {
        return new OrExpression(values);
    }

    contains(name: string, value: string): IExpression {
        return new ContainsExpression(name, value);
    }

    endsWith(name: string, value: string): IExpression {
        return new EndsWithExpression(name, value);
    }

    equalTo(name: string, value: any): IExpression {
        return new EqualToExpression(name, value);
    }

    exists(name: string, value: boolean): IExpression {
        return new ExistsExpression(name, value);
    }

    freeText(name: string, value: string): IExpression {
        return new FreeTextExpression(name, value);
    }

    greaterThan(name: string, value: any): IExpression {
        return new GreaterThanExpression(name, value);
    }

    greaterThanOrEqualTo(name: string, value: any): IExpression {
        return new GreaterThanOrEqualToExpression(name, value);
    }

    lessThan(name: string, value: any): IExpression {
        return new LessThanExpression(name, value);
    }

    lessThanOrEqualTo(name: string, value: any): IExpression {
        return new LessThanOrEqualToExpression(name, value);
    }

    startsWith(name: string, value: string): IExpression {
        return new StartsWithExpression(name, value);
    }

    in(name: string, ...values: any[]): IExpression {
        return new InExpression(name, values);
    }

    distanceWithin(name: string, lat: number, lon: number, distance: string): IExpression {
        return new DistanceWithinExpression(name, { lat, lon, distance });
    }
}

export const Op = new Operators();

class Ordering implements ContensisQueryOrderBy {
    private _items: ContensisQueryOrderByDto[] = [];

    asc(fieldName: string): ContensisQueryOrderBy {
        this._items.push({ 'asc': fieldName });
        return this;
    }

    desc(fieldName: string): ContensisQueryOrderBy {
        this._items.push({ 'desc': fieldName });
        return this;
    }

    toArray() {
        return this._items;
    }
}

class OrderByFactory implements ContensisQueryOrderBy {
    asc(fieldName: string): ContensisQueryOrderBy {
        return (new Ordering()).asc(fieldName);
    }

    desc(fieldName: string): ContensisQueryOrderBy {
        return (new Ordering()).desc(fieldName);
    }
}

export const OrderBy: ContensisQueryOrderBy = new OrderByFactory();

function toOrderBy(value: string): ContensisQueryOrderByDto {
    if (!value) {
        return null;
    }
    let firstChar = value.substr(0, 1);
    if (firstChar === '+' || firstChar === '-') {
        let direction = (firstChar === '-') ? 'desc' : 'asc';
        return { [direction]: value.substring(1) };
    }
    return { 'asc': value };
}

function serializeOrder(orderBy: string | string[] | ContensisQueryOrderBy): ContensisQueryOrderByDto[] {
    if (!orderBy) {
        return [];
    }
    let o;
    if (typeof orderBy === 'string') {
        o = toOrderBy(orderBy);
        return !!o ? [o] : [];
    }
    if (Array.isArray(orderBy)) {
        return orderBy.map(toOrderBy).filter(o => !!o);
    }
    return ((orderBy as Ordering).toArray) ? (orderBy as Ordering).toArray() : null;
}

export class Query implements ContensisQuery {
    where: WhereExpression = new WhereExpression();
    orderBy: string | string[] | ContensisQueryOrderBy = [];
    pageIndex: number = 0;
    pageSize: number = 20;
    fields: string[] = [];

    constructor(...whereExpressions: IExpression[]) {
        if (whereExpressions) {
            this.where.addRange(whereExpressions);
        }
    }

    toJSON() {
        let result: any = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;

        let orderByDtos = serializeOrder(this.orderBy);
        if (orderByDtos && orderByDtos.length > 0) {
            result.orderBy = orderByDtos;
        }

        result.where = this.where;

        if (this.fields && this.fields.length > 0) {
            result.fields = this.fields;
        }

        return result;
    }
}

