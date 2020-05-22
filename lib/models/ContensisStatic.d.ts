import { ClientStatic } from './ClientStatic';
import { ClientConfigFactory } from './ClientConfigFactory';
import { ContensisQueryFactory, ContensisQueryOperators, ContensisQueryOrderBy } from 'contensis-core-api';
export interface ContensisStatic {
    Client: ClientStatic;
    ClientConfig: ClientConfigFactory;
    Query: ContensisQueryFactory;
    Op: ContensisQueryOperators;
    OrderBy: ContensisQueryOrderBy;
}
