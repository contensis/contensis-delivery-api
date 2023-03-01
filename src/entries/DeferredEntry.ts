import { Entry } from '../models';
import { IExpression, Op, VersionStatus } from 'contensis-core-api';

export class DeferredEntry {
    promise: Promise<Entry>;
    resolve: (entry: Entry) => void;
    reject: (e: any) => void;
    expression: IExpression;

    constructor(private sys: { id: string; language: string; }, private versionStatus: VersionStatus) {

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        this.expression = Op.and(
            Op.equalTo('sys.id', sys.id),
            Op.equalTo('sys.language', sys.language),
            Op.equalTo('sys.versionStatus', this.versionStatus)
        );
    }

    is(sys: { id: string; language: string; }): boolean {
        return !!(sys && sys.id && sys.language && (sys.id === this.sys.id) && (sys.language === this.sys.language));
    }
}
