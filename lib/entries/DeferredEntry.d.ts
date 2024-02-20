import { Entry } from '../models';
import { IExpression, VersionStatus } from 'contensis-core-api';
export declare class DeferredEntry {
    private sys;
    private versionStatus;
    promise: Promise<Entry>;
    resolve: (entry: Entry) => void;
    reject: (e: any) => void;
    expression: IExpression;
    constructor(sys: {
        id: string;
        language: string;
    }, versionStatus: VersionStatus);
    is(sys: {
        id: string;
        language: string;
    }): boolean;
}
