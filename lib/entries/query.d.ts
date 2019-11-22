import { ContensisQuery, ContensisQueryOperators, ContensisQueryOrderBy, ExpressionValueType, IExpression, ILogicalExpression, OperatorType } from '../models';
export declare abstract class ExpressionBase implements IExpression {
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
export declare abstract class LogicalExpression extends ExpressionBase implements ILogicalExpression {
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
export declare class WhereExpression extends LogicalExpression {
    constructor(values?: IExpression[]);
    toJSON(): any;
}
export declare class Operators implements ContensisQueryOperators {
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
export declare const Op: Operators;
export declare const OrderBy: ContensisQueryOrderBy;
export declare class Query implements ContensisQuery {
    where: WhereExpression;
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    fields: string[];
    constructor(...whereExpressions: IExpression[]);
    toJSON(): any;
}
