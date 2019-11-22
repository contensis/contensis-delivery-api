const ExpressionValueTypeEnum = {
    Single: 'single',
    Array: 'array',
    Unknown: 'unknown'
};
const OperatorTypeEnum = {
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
export class ExpressionBase {
    constructor(fieldName, values = [], operatorName, valueType) {
        this.fieldName = fieldName;
        this.values = values;
        this.operatorName = operatorName;
        this.valueType = valueType;
        this._weight = 0;
    }
    addValue(value) {
        this.values[this.values.length] = value;
        return this;
    }
    weight(weight) {
        this._weight = weight;
        return this;
    }
    toJSON() {
        let result = {};
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
    }
}
export class LogicalExpression extends ExpressionBase {
    constructor(values = [], operatorName, valueType) {
        super(null, values, operatorName, ExpressionValueTypeEnum.Array);
    }
    getItem(index) {
        return this.values[index];
    }
    setItem(index, item) {
        this.values[index] = item;
        return this;
    }
    add(item) {
        this.values[this.values.length] = item;
        return this;
    }
    addRange(items) {
        Array.prototype.push.apply(this.values, items);
        return this;
    }
    indexOf(item) {
        return this.values.indexOf(item);
    }
    insert(index, item) {
        this.values.splice(index, 0, item);
        return this;
    }
    remove(item) {
        let index = this.indexOf(item);
        if (index >= 0) {
            this.removeAt(index);
            return true;
        }
        return false;
    }
    removeAt(index) {
        this.values.splice(index, 1);
        return this;
    }
    clear() {
        this.values.length = 0;
        return this;
    }
    contains(item) {
        return (this.indexOf(item) >= 0);
    }
    count() {
        return this.values.length;
    }
}
class AndExpression extends LogicalExpression {
    constructor(values) {
        super(values, OperatorTypeEnum.And, ExpressionValueTypeEnum.Array);
    }
}
class BetweenExpression extends ExpressionBase {
    constructor(fieldName, minimum, maximum) {
        super(fieldName, [minimum, maximum], OperatorTypeEnum.Between, ExpressionValueTypeEnum.Array);
    }
}
class NotExpression extends LogicalExpression {
    constructor(value) {
        super([value], OperatorTypeEnum.Not, ExpressionValueTypeEnum.Single);
    }
}
class OrExpression extends LogicalExpression {
    constructor(values) {
        super(values, OperatorTypeEnum.Or, ExpressionValueTypeEnum.Array);
    }
}
class ContainsExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.Contains, ExpressionValueTypeEnum.Single);
    }
}
class EndsWithExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.EndsWith, ExpressionValueTypeEnum.Single);
    }
}
class EqualToExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.EqualTo, ExpressionValueTypeEnum.Single);
    }
}
class ExistsExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.Exists, ExpressionValueTypeEnum.Single);
    }
}
class FreeTextExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.FreeText, ExpressionValueTypeEnum.Single);
    }
}
class GreaterThanExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.GreaterThan, ExpressionValueTypeEnum.Single);
    }
}
class GreaterThanOrEqualToExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.GreaterThanOrEqualTo, ExpressionValueTypeEnum.Single);
    }
}
class LessThanExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.LessThan, ExpressionValueTypeEnum.Single);
    }
}
class InExpression extends ExpressionBase {
    constructor(fieldName, values) {
        super(fieldName, values, OperatorTypeEnum.In, ExpressionValueTypeEnum.Array);
    }
}
class LessThanOrEqualToExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.LessThanOrEqualTo, ExpressionValueTypeEnum.Single);
    }
}
class StartsWithExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.StartsWith, ExpressionValueTypeEnum.Single);
    }
}
export class WhereExpression extends LogicalExpression {
    constructor(values = []) {
        super(values, OperatorTypeEnum.Where, ExpressionValueTypeEnum.Array);
    }
    toJSON() {
        let result = super.toJSON();
        return result[OperatorTypeEnum.Where];
    }
}
class DistanceWithinExpression extends ExpressionBase {
    constructor(fieldName, value) {
        super(fieldName, [value], OperatorTypeEnum.DistanceWithin, ExpressionValueTypeEnum.Single);
    }
}
export class Operators {
    and(...values) {
        return new AndExpression(values);
    }
    between(name, minimum, maximum) {
        return new BetweenExpression(name, minimum, maximum);
    }
    not(expression) {
        return new NotExpression(expression);
    }
    or(...values) {
        return new OrExpression(values);
    }
    contains(name, value) {
        return new ContainsExpression(name, value);
    }
    endsWith(name, value) {
        return new EndsWithExpression(name, value);
    }
    equalTo(name, value) {
        return new EqualToExpression(name, value);
    }
    exists(name, value) {
        return new ExistsExpression(name, value);
    }
    freeText(name, value) {
        return new FreeTextExpression(name, value);
    }
    greaterThan(name, value) {
        return new GreaterThanExpression(name, value);
    }
    greaterThanOrEqualTo(name, value) {
        return new GreaterThanOrEqualToExpression(name, value);
    }
    lessThan(name, value) {
        return new LessThanExpression(name, value);
    }
    lessThanOrEqualTo(name, value) {
        return new LessThanOrEqualToExpression(name, value);
    }
    startsWith(name, value) {
        return new StartsWithExpression(name, value);
    }
    in(name, ...values) {
        return new InExpression(name, values);
    }
    distanceWithin(name, lat, lon, distance) {
        return new DistanceWithinExpression(name, { lat, lon, distance });
    }
}
export const Op = new Operators();
class Ordering {
    constructor() {
        this._items = [];
    }
    asc(fieldName) {
        this._items.push({ 'asc': fieldName });
        return this;
    }
    desc(fieldName) {
        this._items.push({ 'desc': fieldName });
        return this;
    }
    toArray() {
        return this._items;
    }
}
class OrderByFactory {
    asc(fieldName) {
        return (new Ordering()).asc(fieldName);
    }
    desc(fieldName) {
        return (new Ordering()).desc(fieldName);
    }
}
export const OrderBy = new OrderByFactory();
function toOrderBy(value) {
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
function serializeOrder(orderBy) {
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
    return (orderBy.toArray) ? orderBy.toArray() : null;
}
export class Query {
    constructor(...whereExpressions) {
        this.where = new WhereExpression();
        this.orderBy = [];
        this.pageIndex = 0;
        this.pageSize = 20;
        this.fields = [];
        if (whereExpressions) {
            this.where.addRange(whereExpressions);
        }
    }
    toJSON() {
        let result = {};
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
