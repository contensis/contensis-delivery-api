import { ILogicalExpression } from './ILogicalExpression';
import { ContensisQueryOrderBy } from './ContensisQueryOrderBy';
export interface ContensisQuery {
    where: ILogicalExpression;
    orderBy: string | string[] | ContensisQueryOrderBy;
    pageIndex: number;
    pageSize: number;
    fields: string[];
}
