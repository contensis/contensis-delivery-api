
if (!Object.keys) {
    Object.keys = function(o: any) {
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
    Array.isArray = function(arg: any): arg is Array<any> {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback: (item: any, index: number, array: any[]) => void) {
        let array: any[] = this;
        let len = array.length;
        for (let i = 0; i < len; i++) {
            callback(array[i], i, array);
        }
  };
}

if (!Array.prototype.map) {
    (Array.prototype as any).map = function(callback:  (value: any, index: number, array: any[]) => any) {
        let array: any[] = this;
        let len = array.length;
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
            result[i] = callback(array[i], i, array);
        }
        return result;
  };
}

if (!Array.prototype.filter) {
    (Array.prototype as any).filter = function(callback: (value: any, index: number, array: any[]) => any) {
        let array: any[] = this;
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
    (Array.prototype as any).reduce = function(callback: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any {
        let array: any[] = this;
        let len = array.length;
        let start = 0;
        if (arguments.length < 2) {
            if (array.length > 0) {
                initialValue = array[0];
                start = 1;
            } else {
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
