"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contensis_core_api_1 = require("contensis-core-api");
class DeferredEntry {
    constructor(sys, versionStatus) {
        this.sys = sys;
        this.versionStatus = versionStatus;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.expression = contensis_core_api_1.Op.and(contensis_core_api_1.Op.equalTo('sys.id', sys.id), contensis_core_api_1.Op.equalTo('sys.language', sys.language), contensis_core_api_1.Op.equalTo('sys.versionStatus', this.versionStatus));
    }
    is(sys) {
        return !!(sys && sys.id && sys.language && (sys.id === this.sys.id) && (sys.language === this.sys.language));
    }
}
exports.DeferredEntry = DeferredEntry;
