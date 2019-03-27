import { IExpression } from './IExpression';
import { ILogicalExpression } from './ILogicalExpression';

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
	distanceWithin(name: string, lat: number, lon: number, distance: string): IExpression;
}
