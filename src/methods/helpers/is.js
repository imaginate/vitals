/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: _is
 * -----------------------------------------------------------------------------
 * @version 4.1.0
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


module.exports = _is;
