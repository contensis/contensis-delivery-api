import { IExpression } from './IExpression';
import { ContensisQuery } from './ContensisQuery';
export interface ContensisQueryFactory {
	new(...whereExpressions: IExpression[]): ContensisQuery;
}
