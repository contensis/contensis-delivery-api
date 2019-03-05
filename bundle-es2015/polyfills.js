if (!Object.keys) {
    Object.keys = function (o) {
        if (!o) {
            return [];
        }
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        let result = [];
        for (let prop in o) {
            if (hasOwnProperty.call(o, prop)) {
                result.push(prop);
            }
        }
        return result;
    };
}
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback) {
        let array = this;
        let len = array.length;
        for (let i = 0; i < len; i++) {
            callback(array[i], i, array);
        }
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callback) {
        let array = this;
        let len = array.length;
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
            result[i] = callback(array[i], i, array);
        }
        return result;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback) {
        let array = this;
        let len = array.length;
        let result = [];
        for (let i = 0; i < len; i++) {
            if (callback(array[i], i, array)) {
                result.push(array[i]);
            }
        }
        return result;
    };
}
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback, initialValue) {
        let array = this;
        let len = array.length;
        let start = 0;
        if (arguments.length < 2) {
            if (array.length > 0) {
                initialValue = array[0];
                start = 1;
            }
            else {
                return null;
            }
        }
        let result = initialValue;
        for (let i = start; i < len; i++) {
            result = callback(result, array[i], i, array);
        }
        return result;
    };
}
