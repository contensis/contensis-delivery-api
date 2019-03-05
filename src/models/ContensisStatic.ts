import { ClientStatic } from './ClientStatic';
import { ClientConfigFactory } from './ClientConfigFactory';
import { ContensisQueryFactory } from './ContensisQueryFactory';
import { ContensisQueryOperators } from './ContensisQueryOperators';
import { ContensisQueryOrderBy } from './ContensisQueryOrderBy';
export interface ContensisStatic {
	Client: ClientStatic;
	ClientConfig: ClientConfigFactory;
	Query: ContensisQueryFactory;
	Op: ContensisQueryOperators;
	OrderBy: ContensisQueryOrderBy;
}
