/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - STRICT METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.1.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */


////////////////////////////////////////////////////////////////////////////////
// EXPORT VITALS
////////////////////////////////////////////////////////////////////////////////

;(function(/** Object= */ root, /** !Object */ vitals) {

  /** @type {!Object} */
  var checks = {
    exp: isObj(typeof exports) && getObj(exports, true),
    mod: isObj(typeof module) && getObj(module, true),
    glo: isObj(typeof global, true) && getObj(global),
    win: isObj(typeof window) && getObj(window),
    sel: isObj(typeof self) && getObj(self),
    roo: isObj(typeof root) && getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && setVitals(window);
  checks.sel && setVitals(self);
  setVitals(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = vitals;
    }
    else {
      setVitals(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return vitals;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {!Object} obj
   */
  function setVitals(obj) {
    obj.vitals = vitals;
    obj.Vitals = vitals;
  }

})(this,

(function(undefined) {


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: cloneObj
////////////////////////////////////////////////////////////////////////////////

var cloneObj = (function cloneObjPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
 * @param {!Object} obj
 * @return {!Object}
   */
  function cloneObj(obj) {

    /** @type {!Object} */
    var clone;
    /** @type {string} */
    var key;

    clone = {};
    for (key in obj) {
      if ( hasOwn.call(obj, key) ) clone[key] = obj[key];
    }
    return clone;
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: cloneObj
  return cloneObj;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: inStr
////////////////////////////////////////////////////////////////////////////////

var inStr = (function inStrPrivateScope() {

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var baseInStr = !!String.prototype.includes
    ? function baseInStr(source, str) { return source.includes(str); }
    : function baseInStr(source, str) { return source.indexOf(str) !== -1; };

  /**
   * A shortcut for `String.prototype.includes`.
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return baseInStr(source, str);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: inStr
  return inStr;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: _is
////////////////////////////////////////////////////////////////////////////////

var _is = (function _isPrivateScope() {

  /** @type {!Object} */
  var is = {};

  //////////////////////////////////////////////////////////
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil = function isNull(val) {
    return val === null;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    return val === undefined;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.bool = function isBoolean(val) {
    return typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.str = function isString(val) {
    return typeof val === 'string';
  };

  /**
   * Empty strings return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._str = function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.num = function isNumber(val) {
    return typeof val === 'number' && val === val;
  };

  /**
   * Zeros return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._num = function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    return val !== val;
  };

  //////////////////////////////////////////////////////////
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.obj = function isObject(val) {
    return !!val && typeof val === 'object';
  };

  /**
   * Functions return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._obj = function isObjectOrFunction(val) {
    val = !!val && typeof val;
    return val && (val === 'object' || val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    return !!val && typeof val === 'function';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.arr = function isArray(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
  };

  /**
   * Arguments return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._arr = function isArrayOrArguments(val) {
      if ( !is.obj(val) ) return false;
      val = toStr.call(val);
      return val === '[object Array]' || val === '[object Arguments]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.regex = function isRegExp(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.err = function isError(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Arguments]';
  };

  // BROWSER ONLY
  (function() {
    // check JS engine for accuracy
    if ( is.args(arguments) ) return;

    /**
     * @param {*} val
     * @return {boolean}
     */
    is._arr = function isArrayOrArguments(val) {
      return !!val && typeof val === 'object' && (
        toStr.call(val) === '[object Array]' || 'callee' in val
      );
    };

    /**
     * @param {*} val
     * @return {boolean}
     */
    is.args = function isArguments(val) {
      return !!val && typeof val === 'object' && 'callee' in val;
    };

    try {
      is.args({});
    }
    catch (e) {
      is._arr = is.arr;
      is.args = function isArguments(){ return false; };
    }
  })();
  // BROWSER ONLY END

  //////////////////////////////////////////////////////////
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.doc = function isDOMDocument(val) {
    return !!val && typeof val === 'object' && val.nodeType === 9;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.elem = function isDOMElement(val) {
    return !!val && typeof val === 'object' && val.nodeType === 1;
  };

  //////////////////////////////////////////////////////////
  // MISCELLANEOUS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * Checks if a value is considered empty.
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ` 0, "", {}, [], null, undefined, false, NaN, function(){} `
   *   Note that for functions this method checks whether it has any defined
   *   params: ` function empty(){}; function notEmpty(param){}; `
   */
  is.empty = function isEmpty(val) {

    /** @type {string} */
    var key;

    // handle empty primitives - 0, "", null, undefined, false, NaN
    if (!val) return true;

    // handle functions
    if (typeof val === 'function') return !val.length;

    // handle non-empty primitives
    if (typeof val !== 'object') return false;

    // handle arrays
    if (toStr.call(val) === '[object Array]') return !val.length;

    // handle all other objects
    for (key in val) {
      if ( hasOwn.call(val, key) ) return false;
    }
    return true;
  };

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  is.eol = function isEol(val) {
    return EOL.test(val);
  };

  //////////////////////////////////////////////////////////
  // OBJECT STATES
  //////////////////////////////////////////////////////////

  /**
   * `Object.isFrozen` or a proper polyfill.
   * @param {(!Object|function)} obj
   * @return {boolean}
   */
  is.frozen = (function() {

    if (!Object.isFrozen) return function isFrozen(obj) { return false; };

    try {
      Object.isFrozen( function(){} );
      return Object.isFrozen;
    }
    catch (err) {
      return function isFrozen(obj) {
        return typeof obj === 'object' && Object.isFrozen(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // NUMBER STATES
  //////////////////////////////////////////////////////////

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.whole = function isWholeNumber(val) {
    return !(val % 1);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    return !!(val % 2);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    return !(val % 2);
  };

  //////////////////////////////////////////////////////////
  // OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.bool = function isUndefinedOrBoolean(val) {
    return val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.str = function isUndefinedOrString(val) {
    return val === undefined || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.num = function isUndefinedOrNumber(val) {
    return val === undefined || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.obj = function isUndefinedOrObject(val) {
    return val === undefined || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.func = function isUndefinedOrFunction(val) {
    return val === undefined || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.arr = function isUndefinedOrArray(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.regex = function isUndefinedOrRegExp(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.bool = function isNullOrBoolean(val) {
    return val === null || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.str = function isNullOrString(val) {
    return val === null || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.num = function isNullOrNumber(val) {
    return val === null || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.obj = function isNullOrObject(val) {
    return val === null || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.func = function isNullOrFunction(val) {
    return val === null || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.arr = function isNullOrArray(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.regex = function isNullOrRegExp(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.nil.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.bool = function isNullOrUndefinedOrBoolean(val) {
    return val === null || val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.str = function isNullOrUndefinedOrString(val) {
    return val === null || val === undefined || typeof  val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.num = function isNullOrUndefinedOrNumber(val) {
    return val === null || val === undefined || (
      typeof val === 'number' && val === val
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.obj = function isNullOrUndefinedOrObject(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.func = function isNullOrUndefinedOrFunction(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'undefined'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.arr = function isNullOrUndefinedOrArray(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.regex = function isNullOrUndefinedOrRegExp(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: _is
  return is;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: match
////////////////////////////////////////////////////////////////////////////////

var match = (function matchPrivateScope() {

  /**
   * A shortcut for `String.prototype.includes` and `RegExp.prototype.test`.
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function match(source, pattern) {
    return isRegex(pattern)
      ? pattern.test(source)
      : inStr(source, pattern);
  }

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function isRegex(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  }

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var baseInStr = !!String.prototype.includes
    ? function baseInStr(source, str) { return source.includes(str); }
    : function baseInStr(source, str) { return source.indexOf(str) !== -1; };

  /**
   * @private
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return baseInStr(source, str);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: match
  return match;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: merge
////////////////////////////////////////////////////////////////////////////////

var merge = (function mergePrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * @param {(!Object|function)} dest
   * @param {(!Object|function)} source
   * @return {(!Object|function)}
   */
  function merge(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( hasOwn.call(source, key) ) dest[key] = source[key];
    }
    return dest;
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: merge
  return merge;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: newErrorMaker
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} main - A vitals method.
 * @return {function}
 */
function newErrorMaker(main) {

  main = 'vitals.' + main;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var maker = function error(msg, method) {

    /** @type {!Error} */
    var err;

    method = method ? main : main + '.' + method;
    err = new Error(msg + ' for ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  maker.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var err;

    param += ' param';
    method = method ? main : main + '.' + method;
    err = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  maker.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method ? main : main + '.' + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    err = new RangeError(msg);
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  return maker;
}

////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: own
////////////////////////////////////////////////////////////////////////////////

var own = (function ownPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * @param {(Object|?function)} source
   * @param {*} key
   * @return {boolean}
   */
  function own(source, key) {
    return !!source && hasOwn.call(source, key);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: own
  return own;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: sliceArr
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {(!Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function sliceArr(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = end === undefined || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = source[ii];
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: splitKeys
////////////////////////////////////////////////////////////////////////////////

var splitKeys = (function splitKeysPrivateScope() {

  /**
   * @private
   * @param {string} keys
   * @param {string} str
   * @return {boolean}
   */
  var inStr = !!String.prototype.includes
    ? function inStr(keys, str) { return keys.includes(str); }
    : function inStr(keys, str) { return keys.indexOf(str) !== -1; };

  /**
   * @param {string} keys - The keys are split using one of the values in the
   *   following list as the separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array<string>}
   */
  function splitKeys(keys) {

    /** @type {string} */
    var separator;

    if (!keys) return [ '' ];

    separator = inStr(keys, ', ')
      ? ', '  : inStr(keys, ',')
        ? ',' : inStr(keys, '|')
          ? '|' : ' ';
    return keys.split(separator);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: splitKeys
  return splitKeys;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: is
////////////////////////////////////////////////////////////////////////////////

var is = (function isPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is
  // - is.null      (is.nil)
  // - is.undefined
  // - is.boolean   (is.bool)
  // - is.string    (is.str)
  // - is._string   (is._str)
  // - is.number    (is.num)
  // - is._number   (is._num)
  // - is.nan
  // - is.object    (is.obj)
  // - is._object   (is._obj)
  // - is.func      (is.function|is.fn)
  // - is.array     (is.arr)
  // - is._array    (is._arr)
  // - is.regexp    (is.regex|is.re)
  // - is.date
  // - is.error     (is.err)
  // - is.args
  // - is.document  (is.doc)
  // - is.element   (is.elem)
  // - is.empty
  // - is.frozen
  // - is.whole
  // - is.odd
  // - is.even
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value(s) is one of the provided types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all available options. Note that all object types are nullable by
   *   default (i.e. `null` will return `true`).
   *
   * @public
   * @param {string} types - The valid data types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all options.
   * @param {...*} val - The value to evaluate. If multiple values are
   *   provided all must pass the type check to return true.
   * @return {boolean} The evaluation result.
   */
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {Array<function>} */
    var checks;

    if (arguments.length < 2) throw _error('No type or val');
    if ( !_is._str(types) ) throw _error.type('types');

    if ( _hasSpecial('*', types) ) return true;

    checks = _getChecks(types);

    if (!checks) throw _error.range('types', DOCS);

    nullable = _getNullable(types);
    return arguments.length > 2
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }

  /**
   * Checks if a value(s) is `null`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['null'] = function isNull(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'null');
      case 1:  return _is.nil(val);
      default: return _are(arguments, _is.nil);
    }
  };
  // define shorthand
  is.nil = is['null'];

  /**
   * Checks if a value(s) is `undefined`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'undefined');
      case 1:  return _is.undefined(val);
      default: return _are(arguments, _is.undefined);
    }
  };

  /**
   * Checks if a value(s) is a boolean.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['boolean'] = function isBoolean(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'boolean');
      case 1:  return _is.bool(val);
      default: return _are(arguments, _is.bool);
    }
  };
  // define shorthand
  is.bool = is['boolean'];

  /**
   * Checks if a value(s) is a string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.string = function isString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'string');
      case 1:  return _is.str(val);
      default: return _are(arguments, _is.str);
    }
  };
  // define shorthand
  is.str = is.string;

  /**
   * Checks if a value(s) is a non-empty string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._string = function isNonEmptyString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_string');
      case 1:  return _is._str(val);
      default: return _are(arguments, _is._str);
    }
  };
  // define shorthand
  is._str = is._string;

  /**
   * Checks if a value(s) is a number.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.number = function isNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'number');
      case 1:  return _is.num(val);
      default: return _are(arguments, _is.num);
    }
  };
  // define shorthand
  is.num = is.number;

  /**
   * Checks if a value(s) is a number and not `0`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._number = function isNonZeroNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_number');
      case 1:  return _is._num(val);
      default: return _are(arguments, _is._num);
    }
  };
  // define shorthand
  is._num = is._number;

  /**
   * Checks if a value(s) is `NaN`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'nan');
      case 1:  return _is.nan(val);
      default: return _are(arguments, _is.nan);
    }
  };

  /**
   * Checks if a value(s) is an object.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.object = function isObject(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'object');
      case 1:  return _is.obj(val);
      default: return _are(arguments, _is.obj);
    }
  };
  // define shorthand
  is.obj = is.object;

  /**
   * Checks if a value(s) is an object or function.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._object = function isObjectOrFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_object');
      case 1:  return _is._obj(val);
      default: return _are(arguments, _is._obj);
    }
  };
  // define shorthand
  is._obj = is._object;

  /**
   * Checks if a value(s) is a function. Note that `vitals.is.function` is not
   *   valid in ES3 and some ES5 browser environments. Use `vitals.is.func` for
   *   browser safety.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'function');
      case 1:  return _is.func(val);
      default: return _are(arguments, _is.func);
    }
  };
  // define shorthand
  is.fn = is.func;
  try {
    is['function'] = is.func;
  }
  catch (error) {}

  /**
   * Checks if a value(s) is an `Array` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.array = function isArray(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'array');
      case 1:  return _is.arr(val);
      default: return _are(arguments, _is.arr);
    }
  };
  // define shorthand
  is.arr = is.array;

  /**
   * Checks if a value(s) is an `Array` or `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._array = function isArrayOrArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_array');
      case 1:  return _is._arr(val);
      default: return _are(arguments, _is._arr);
    }
  };
  // define shorthand
  is._arr = is._array;

  /**
   * Checks if a value(s) is a `RegExp` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.regexp = function isRegExp(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'regexp');
      case 1:  return _is.regex(val);
      default: return _are(arguments, _is.regex);
    }
  };
  // define shorthand
  is.regex = is.regexp;
  is.re = is.regexp;

  /**
   * Checks if a value(s) is a `Date` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'date');
      case 1:  return _is.date(val);
      default: return _are(arguments, _is.date);
    }
  };

  /**
   * Checks if a value(s) is an `Error` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.error = function isError(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'error');
      case 1:  return _is.err(val);
      default: return _are(arguments, _is.err);
    }
  };
  // define shorthand
  is.err = is.error;

  /**
   * Checks if a value(s) is an `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'args');
      case 1:  return _is.args(val);
      default: return _are(arguments, _is.args);
    }
  };

  /**
   * Checks if a value(s) is a DOM `Document` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.document = function isDocument(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'document');
      case 1:  return _is.doc(val);
      default: return _are(arguments, _is.doc);
    }
  };
  // define shorthand
  is.doc = is.document;

  /**
   * Checks if a value(s) is a DOM `Element` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.element = function isElement(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'element');
      case 1:  return _is.elem(val);
      default: return _are(arguments, _is.elem);
    }
  };
  // define shorthand
  is.elem = is.element;

  /**
   * Checks if a value(s) is considered empty.
   *
   * @public
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ```
   *   0, "", {}, [], null, undefined, false, NaN, function(){...}
   *   ```
   *   Note that for functions this method checks whether it has any defined
   *   params:
   *   ```
   *   function empty(){}
   *   function notEmpty(param){}
   *   ```
   */
  is.empty = function isEmpty(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'empty');
      case 1:  return _is.empty(val);
      default: return _are(arguments, _is.empty);
    }
  };

  /**
   * Checks if a value(s) is [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen).
   *
   * @public
   * @param {...(Object|?function)} val
   * @return {boolean}
   */
  is.frozen = function isFrozen(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'frozen');
      case 1:  return _isFrozen(val);
      default: return _are(arguments, _isFrozen);
    }
  };

  /**
   * Checks if a number(s) is whole (i.e. has no decimal). Zero and non-decimal
   *   negative numbers will return `true`.
   *
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  is.whole = function isWholeNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'whole');
      case 1:  return _isWhole(val);
      default: return _are(arguments, _isWhole);
    }
  };

  /**
   * Checks if a number(s) is odd.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'odd');
      case 1:  return _isOdd(val);
      default: return _are(arguments, _isOdd);
    }
  };

  /**
   * Checks if a number(s) is even.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'even');
      case 1:  return _isEven(val);
      default: return _are(arguments, _isEven);
    }
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Arguments} vals
   * @param {function} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check(vals[i]) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - IS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(Object|?function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( _is.nil(val) ) return false;

    if ( !_is._obj(val) ) throw _error.type('val', 'frozen');

    return _is.frozen(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'whole');

    return _is.whole(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'odd');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'odd');

    return _is.odd(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'even');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'even');

    return _is.even(val);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - CHECKS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array<function>} checks
   * @param {*} val
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVal(checks, val, nullable) {

    /** @type {number} */
    var i;

    i = checks.length;
    while (i--) {
      if ( checks[i](val, nullable) ) return true;
    }
    return false;
  }

  /**
   * @private
   * @param {!Array<function>} checks
   * @param {!Arguments} vals
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVals(checks, vals, nullable) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (--i) {
      if ( !_checkVal(checks, vals[i], nullable) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - TYPES
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!Object<string, function(*, boolean=): boolean>} DataTypes
   */

  /**
   * @private
   * @type {DataTypes}
   */
  var TYPES = (function() {

    /**
     * @type {DataTypes}
     */
    var _types = {};

    /**
     * Adds types to the _types hash map with a check method that evaluates
     *   nullable properties and invokes their type section's method.
     * @private
     * @param {string} section - The category for the types.
     * @param {!Object<string, function(*): boolean>} types - Each type's
     *   "key => value" pair should be expressed as "typeName => checkMethod".
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addTypes(section, types, nullable) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( own(types, type) ) addType(section, type, types[type], nullable);
      }
      return _types;
    }

    /**
     * Adds type to the _types hash map with a check method that evaluates
     *   nullable properties and invokes its type section's method.
     * @private
     * @param {string} section - The type's category.
     * @param {string} type - The type's name.
     * @param {function(*): boolean} check - The type's check method.
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addType(section, type, check, nullable) {
      check = own(addType, section) ? addType[section](check) : check;
      nullable = nullable !== false;
      _types['_' + type] = function(val, _nullable) {
        _nullable = _is.bool(_nullable) ? _nullable : nullable;
        return _is.nil(val) ? _nullable : check(val);
      };
      return _types;
    }

    /**
     * Adds the type shortcuts to the _types hash map.
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {DataTypes}
     */
    function addShortcuts(shortcuts) {

      /** @type {string} */
      var shortcut;
      /** @type {string} */
      var type;

      for (shortcut in shortcuts) {
        if( own(shortcuts, shortcut) ) {
          type = '_' + shortcuts[shortcut];
          shortcut = '_' + shortcut;
          _types[shortcut] = _types[type];
        }
      }
      return _types;
    }

    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the array's values.
     * @return {function(*): boolean} The array type's check method.
     */
    addType.arrays = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(arr) {

        /** @type {number} */
        var i;

        if ( !_is.arr(arr) ) return false;

        i = arr.length;
        while (i--) {
          if ( !eachCheck(arr[i]) ) return false;
        }
        return true;
      };
    };

    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the hash map's properties.
     * @return {function(*): boolean} The hash map type's check method.
     */
    addType.maps = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(obj) {

        /** @type {string} */
        var prop;

        if ( !_is.obj(obj) ) return false;

        for (prop in obj) {
          if( own(obj, prop) && !eachCheck(obj[prop]) ) return false;
        }
        return true;
      };
    };

    _types = addTypes('primitives', {
      'undefined': _is.undefined,
      'boolean':   _is.bool,
      'string':    _is.str,
      'number':    _is.num,
      'nan':       _is.nan
    }, false);
    _types = addType('primitives', 'null', _is.nil);

    _types = addTypes('js_objects', {
      'object': _is.obj,
      'regexp': _is.regex,
      'array':  _is.arr,
      'date':   _is.date,
      'error':  _is.err
    });
    _types = addType('js_objects', 'arguments', _is.args);
    _types = addType('js_objects', 'function', _is.func, false);

    _types = addTypes('dom_objects', {
      'element':  _is.elem,
      'document': _is.doc
    });

    _types = addType('others', 'empty', _is.empty);

    _types = addTypes('arrays', {
      'nulls':     _is.nil,
      'booleans':  _is.bool,
      'strings':   _is.str,
      'numbers':   _is.num,
      'nans':      _is.nan,
      'objects':   _is.obj,
      'functions': _is.func,
      'regexps':   _is.regex,
      'arrays':    _is.arr,
      'dates':     _is.date,
      'errors':    _is.err,
      'elements':  _is.elem,
      'documents': _is.doc
    });

    _types = addTypes('maps', {
      'nullmap':     _is.nil,
      'booleanmap':  _is.bool,
      'stringmap':   _is.str,
      'numbermap':   _is.num,
      'nanmap':      _is.nan,
      'objectmap':   _is.obj,
      'functionmap': _is.func,
      'regexpmap':   _is.regex,
      'arraymap':    _is.arr,
      'datemap':     _is.date,
      'errormap':    _is.err,
      'elementmap':  _is.elem,
      'documentmap': _is.doc
    });

    _types = addShortcuts({
      // primitives
      nil:  'null',
      bool: 'boolean',
      str:  'string',
      num:  'number',

      // js objects
      obj:   'object',
      func:  'function',
      fn:    'function',
      regex: 'regexp',
      re:    'regexp',
      arr:   'array',
      err:   'error',
      args:  'arguments',

      // dom objects
      elem: 'element',
      doc:  'document',

      // arrays
      nils:   'nulls',
      strs:   'strings',
      nums:   'numbers',
      bools:  'booleans',
      objs:   'objects',
      funcs:  'functions',
      fns:    'functions',
      regexs: 'regexps',
      res:    'regexps',
      arrs:   'arrays',
      errs:   'errors',
      elems:  'elements',
      docs:   'documents',

      // maps
      nilmap:   'nullmap',
      strmap:   'stringmap',
      nummap:   'numbermap',
      boolmap:  'booleanmap',
      objmap:   'objectmap',
      funcmap:  'functionmap',
      fnmap:    'functionmap',
      regexmap: 'regexpmap',
      remap:    'regexpmap',
      arrmap:   'arraymap',
      errmap:   'errormap',
      elemmap:  'elementmap',
      docmap:   'documentmap'
    });

    return _types;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!RegExp}
   */
  var ALL_SPECIALS = /[^a-z\|]/g;

  /**
   * @private
   * @type {!Object<string, function(string): boolean>}
   */
  var SPECIALS = (function(pipe, exPoint, quesMark, equals, asterisk) {
    return {
      '|': function(str) { return pipe.test(str);     },
      '!': function(str) { return exPoint.test(str);  },
      '?': function(str) { return quesMark.test(str); },
      '=': function(str) { return equals.test(str);   },
      '*': function(str) { return asterisk.test(str); }
    };
  })(/\|/, /\!/, /\?/, /\=/, /\*|any/);

  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return SPECIALS[special](types);
  }

  /**
   * @private
   * @param {string} types
   * @return {Array<function>}
   */
  function _getChecks(types) {

    /** @type {Array<function>} */
    var checks;
    /** @type {string} */
    var type;
    /** @type {number} */
    var i;

    if ( _hasSpecial('=', types) ) types += '|undefined';

    types = types.toLowerCase();
    types = types.replace(ALL_SPECIALS, '');
    checks = types.split('|');

    i = checks.length;
    while (i--) {
      type = '_' + checks[i];
      if ( !own(TYPES, type) ) return null;
      checks[i] = TYPES[type];
    }

    return checks.length ? checks : null;
  }

  /**
   * Method checks whether "!" or "?" exists in the types.
   * @private
   * @param {string} types
   * @return {(undefined|boolean)} If undefined no override exists.
   */
  function _getNullable(types) {

    /** @type {boolean} */
    var override;
    /** @type {boolean} */
    var ensure;
    /** @type {boolean} */
    var negate;

    ensure = _hasSpecial('?', types);
    negate = _hasSpecial('!', types);
    override = ensure && negate ? false : ensure || negate;
    return override ? !negate && ensure : undefined;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('is');

  /**
   * @private
   * @type {string}
   */
  var DOCS = 'https://github.com/imaginate/vitals/wiki/vitals.is-types';

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
  return is;
})();



// *****************************************************************************
// SECTION: STRICT METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: amend
////////////////////////////////////////////////////////////////////////////////

var amend = (function amendPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - amend
  // - amend.config
  // - amend.property          (amend.prop)
  // - amend.property.config   (amend.prop.config)
  // - amend.properties        (amend.props)
  // - amend.properties.config (amend.props.config)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  strongType) ) throw _error.type('strongType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  }

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.config = function amendConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'config');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) throw _error.type('descriptor', 'config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) ) throw _error.type('props', 'config');

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'config');
    }

    return _amendConfigs(obj, props);
  };

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val - A val is required if a descriptor is not supplied.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} strongType - If defined the new property is assigned
   *   an accessor descriptor that includes a setter that throws an error if the
   *   new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined the new property is
   *   assigned an accessor descriptor that includes a setter that sets the
   *   property to the value returned by this setter method. The setter method
   *   will receive two params, the new value and the current value. If a
   *   strongType is defined this setter will not get called until the new value
   *   passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !_is.str(key) ) throw _error.type('key', 'property');

    len = arguments.length;

    if (len < 3) throw _error('No val or descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, strongType, setter);
      val = args[0];
      descriptor = args[1];
      strongType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor', 'property');
    if ( !is('str=',  strongType) ) throw _error.type('strongType', 'property');
    if ( !is('func=', setter)     ) throw _error.type('setter',     'property');

    if ( strongType && !is(strongType + '=', val) ) {
      throw _error('The val param is not a valid strongType', 'property');
    }
    if ( descriptor && (strongType || setter) && own(descriptor, 'writable') ){
      throw _error('A data descriptor may not be used with a strongType/setter', 'property');
    }

    return _amendProp(obj, key, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.prop = amend.property;

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
   *   that only updates the descriptor of an existing property.
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property.config = function amendPropertyConfig(obj, key, descriptor) {

    if ( !_is.obj(obj)       ) throw _error.type('obj',       'property.config');
    if ( !_is.str(key)       ) throw _error.type('key',       'property.config');
    if ( !_is.obj(descriptor)) throw _error.type('descriptor','property.config');

    if ( !own(obj, key) ) {
      throw _error('The key was not defined in the obj', 'property.config');
    }

    return _amendConfig(obj, key, descriptor);
  };
  // define shorthand
  amend.prop.config = amend.property.config;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.properties = function amendProperties(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined', 'properties');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor)) throw _error.type('descriptor','properties');
    if ( !is('str=',  strongType)) throw _error.type('strongType','properties');
    if ( !is('func=', setter)    ) throw _error.type('setter',    'properties');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType', 'properties');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType', 'properties');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.properties.config = function amendPropertiesConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties.config');

    if ( _is.str(props) ) props = splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties.config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) throw _error.type('descriptor', 'properties.config');
      props = _setupConfigs(props, descriptor);
    }
    else if ( !is('objMap', props) ) throw _error.type('props', 'properties.config');

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'properties.config');
    }

    return _amendConfigs(obj, props);
  };
  // define shorthand
  amend.props.config = amend.properties.config;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN ARG PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {number} len
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    if ( _is.obj(val) && _isDescriptor(val) ) {
      descriptor = val;
      val = descriptor.value;
    }

    return [ val, descriptor, strongType, setter ];
  }

  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProps(len, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    return [ descriptor, strongType, setter ];
  }

  /**
   * @private
   * @param {string} strongType
   * @param {!Object} props
   * @return {boolean}
   */
  function _strongTypeCheckProps(strongType, props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    strongType += '=';
    for (key in props) {
      if ( own(props, key) ) {
        val = props[key];
        if ( _is.obj(val) && _isDescriptor(val) ) {
          if ( own(val, 'writable') ) continue;
          val = val.value;
        }
        if ( !is(strongType, val) ) return false;
      }
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);

    descriptor = strongType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter)
      : _isAccessor(descriptor)
        ? cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);

    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = _is.arr(props)
      ? strongType || setter
        ? _setupPropsByKeyWithSetter(props, val, descriptor, strongType, setter)
        : _setupPropsByKey(props, val, descriptor)
      : strongType || setter
        ? _setupPropsWithSetter(props, descriptor, strongType, setter)
        : _setupProps(props, descriptor);

    return _ObjectDefineProperties(obj, props);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(obj, key, descriptor) {
    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjectDefineProperties(obj, props);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PROPERTIES SETUP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupProps(props, descriptor) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( own(props, key) ) {
        newProps[key] = _setupDescriptor(props[key], descriptor);
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, strongType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( own(props, key) ) {
        newProps[key] = _setupDescriptorWithSetter(props[key], descriptor, strongType, setter);
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsByKey(keys, val, descriptor) {

    /** @type {function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) { return cloneObj(desc); }
      : _setupDescriptorByKey;
    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = setupDesc(val, descriptor);
    }
    return props;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(keys, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter);
    }
    return props;
  }

  /**
   * @private
   * @param {!Array} keys
   * @param {!Object} desc
   * @return {!Object}
   */
  function _setupConfigs(keys, desc) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = desc;
    }
    return props;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS SETUP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {string}
   * @const
   */
  var INVALID_STRONG_TYPE = 'Invalid type for object property value.';

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    val = _isDescriptor(val) ? val : { value: val };
    return merge(prop, val);
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = merge(prop, val);
      if ( own(prop, 'writable') || _isAccessor(prop) ) return prop;
      val = prop.value;
      prop = _cloneAccessor(prop);
    }

    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptorByKey(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    prop.value = val;
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = cloneObj(descriptor);
    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, strongType, setter) {

    /** @type {!Error} */
    var error;

    descriptor.get = function() { return val; };
    descriptor.set = strongType && setter
      ? function(newVal) {
          if ( !strongType(newVal) ) {
            error = new TypeError(INVALID_STRONG_TYPE);
            error.__setter = true;
            error.__type = true;
            throw error;
          }
          val = setter(newVal, val);
        }
      : strongType
        ? function(newVal) {
            if ( !strongType(newVal) ) {
              error = new TypeError(INVALID_STRONG_TYPE);
              error.__setter = true;
              error.__type = true;
              throw error;
            }
            val = newVal;
          }
        : function(newVal) { val = setter(newVal, val); };
    return descriptor;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DESCRIPTORS HELPERS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DATA_DESCRIPTOR = {
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ACCESSOR_DESCRIPTOR = {
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DESCRIPTOR_PROPS = {
    get: true,
    set: true,
    value: true,
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var key;

    if ( !_is.obj(obj) ) return false;

    for (key in obj) {
      if ( own(obj, key) && !own(DESCRIPTOR_PROPS, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return own(obj, 'value') || own(obj, 'writable');
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return own(obj, 'get') || own(obj, 'set');
  }

  /**
   * @private
   * @param {Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( _is.bool( descriptor.enumerable ) ) {
        defaultDescriptor.enumerable = descriptor.enumerable;
      }
      if ( _is.bool( descriptor.configurable ) ) {
        defaultDescriptor.configurable = descriptor.configurable;
      }
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = cloneObj(defaultDescriptor);

    return merge(defaultDescriptor, descriptor);
  }

  /**
   * @private
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _cloneAccessor(descriptor) {

    /** @type {!Object} */
    var accessor;
    /** @type {string} */
    var key;

    accessor = {};
    for (key in descriptor) {
      if ( own(descriptor, key) && key !== 'value' ) {
        accessor[key] = descriptor[key];
      }
    }
    return accessor;
  }

  /**
   * @private
   * @param {string=} strongType
   * @return {(function|undefined)}
   */
  function _getStrongType(strongType) {
    return strongType && function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    };
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.DEFINE_PROPERTIES POLYFILLS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_DEFINE_PROPS = !!Object.defineProperties && (function () {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    descriptor = {
      enumerable: false,
      value: obj
    };

    try {
      Object.defineProperty(obj, 'prop', descriptor);
      for (key in obj) {
        if (key === 'prop') return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj.prop === obj;
  })();

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _ObjectDefineProperty = HAS_DEFINE_PROPS
    ? Object.defineProperty
    : function ObjectDefineProperty(obj, key, descriptor) {
      obj[key] = own(descriptor, 'get') ? descriptor.get() : descriptor.value;
      return obj;
    };

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  var _ObjectDefineProperties = HAS_DEFINE_PROPS
    ? Object.defineProperties
    : function ObjectDefineProperties(obj, props) {

      /** @type {!Object} */
      var prop;
      /** @type {string} */
      var key;

      for (key in props) {
        if ( own(props, key) ) {
          prop = props[key];
          obj[key] = own(prop, 'get') ? prop.get() : prop.value;
        }
      }
      return obj;
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} source
   * @param {!Object} obj
   * @return {boolean}
   */
  function _hasKeys(source, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( own(obj, key) && !own(source, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: create
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) ) throw _error.type('proto');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) ) throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  // define shorthand
  create.obj = create.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = Object.create || function ObjectCreate(proto) {

    /** @type {!Object} */
    var obj;

    _Object.prototype = proto;
    obj = new _Object();
    _Object.prototype = null;
    return obj;
  };

  /**
   * @private
   * @constructor
   */
  function _Object(){}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: freeze
////////////////////////////////////////////////////////////////////////////////

var freeze = (function freezePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - freeze
  // - freeze.object (freeze.obj)
  //////////////////////////////////////////////////////////

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  function freeze(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  }

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  freeze.object = function freezeObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'object');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'object');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  };
  // define shorthand
  freeze.obj = freeze.object;

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  function _deepFreeze(obj, noFreeze) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( own(obj, key) && _is._obj( obj[key] ) ) {
        _deepFreeze( obj[key] );
      }
    }
    return _ObjectFreeze(obj);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  var _ObjectFreeze = (function() {

    if (!Object.freeze) return function freeze(obj) { return obj; };

    try {
      Object.freeze(function(){});
      return Object.freeze;
    }
    catch (e) {
      return function freeze(obj) {
        return _is.func(obj) ? obj : Object.freeze(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('freeze');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: seal
////////////////////////////////////////////////////////////////////////////////

var seal = (function sealPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - seal
  // - seal.object (seal.obj)
  //////////////////////////////////////////////////////////

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepSeal(obj) : _seal(obj);
  }

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  seal.object = function sealObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'seal');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'seal');

    return deep ? _deepSeal(obj) : _seal(obj);
  };
  // define shorthand
  seal.obj = seal.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  var _seal = !Object.seal
    ? function ObjectSeal(obj) { return obj; }
    : Object.seal;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  var _deepSeal = !Object.seal
    ? function _deepSeal(obj) { return obj; }
    : function _deepSeal(obj) {

      /** @type {string} */
      var key;

      for (key in obj) {
        if ( own(obj, key) && _is._obj(obj[key]) ) _deepSeal(obj[key]);
      }
      return _seal(obj);
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('seal');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

  return {
    amend:  amend,
    create: create,
    freeze: freeze,
    seal:   seal
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
