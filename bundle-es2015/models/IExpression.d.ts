import { ExpressionValueType } from './ExpressionValueType';
import { OperatorType } from './OperatorType';
export interface IExpression {
    fieldName: string;
    operatorName: OperatorType;
    values: any[];
    valueType: ExpressionValueType;
    addValue(value: any): IExpression;
    weight(weight: number): IExpression;
    toJSON(): any;
}
