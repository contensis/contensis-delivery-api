import { Op } from 'contensis-core-api';
export class DeferredEntry {
    constructor(sys, versionStatus) {
        this.sys = sys;
        this.versionStatus = versionStatus;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.expression = Op.and(Op.equalTo('sys.id', sys.id), Op.equalTo('sys.language', sys.language), Op.equalTo('sys.versionStatus', this.versionStatus));
    }
    is(sys) {
        return !!(sys && sys.id && sys.language && (sys.id === this.sys.id) && (sys.language === this.sys.language));
    }
}
