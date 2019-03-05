import { IExpression } from './IExpression';
export interface ILogicalExpression extends IExpression {
	getItem(index: number): IExpression;
	setItem(index: number, item: IExpression);
	add(item: IExpression): void;
	addRange(items: IExpression[]);
	indexOf(item: IExpression): number;
	insert(index: number, item: IExpression): void;
	remove(item: IExpression): boolean;
	removeAt(index: number): void;
	clear(): void;
	contains(item: IExpression): boolean;
	count(): number;
}
