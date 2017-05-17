/**
 * ---------------------------------------------------------------------------
 * $IS HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

///////////////////////////////////////////////////////////////////////// {{{2
// $IS HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function _isPrivateScope() {

  /// {{{3
  /// @const IS
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var IS = {

    // primitives
    nil:  isNull,
    none: isUndefined,
    bool: isBoolean,
    str:  isString,
    _str: isNonEmptyString,
    num:  isNumber,
    _num: isNonZeroNumber,
    nan:  isNan,

    // js objects
    obj:  isObject,
    _obj: isObjectOrFunction,
    fun:  isFunction,
    arr:  isArray,
    _arr: isArrayOrArguments,
    regx: isRegExp,
    date: isDate,
    err:  isError,
    args: isArguments,

    // dom objects
    doc:  isDomDocument,
    elem: isDomElement,

    // miscellaneous
    empty: isEmpty,
    eol:   isEndOfLine,

    // object states
    frozen: isFrozen,

    // number states
    whole: isWholeNumber,
    odd:   isOddNumber,
    even:  isEvenNumber
  };

  ///////////////////////////////////////////////////// {{{3
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{4
  /// @func isNull
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNull(val) {
    return val === null;
  }

  /// {{{4
  /// @func isUndefined
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    return val === NONE;
  }

  /// {{{4
  /// @func isBoolean
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  /// {{{4
  /// @func isString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /// {{{4
  /// @func isNonEmptyString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  }

  /// {{{4
  /// @func isNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNumber(val) {
    return typeof val === 'number' && val === val;
  }

  /// {{{4
  /// @func isNonZeroNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val;
  }

  /// {{{4
  /// @func isNan
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNan(val) {
    return val !== val;
  }

  ///////////////////////////////////////////////////// {{{3
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var objToStr = Object.prototype.toString;

  /// {{{4
  /// @const ARGS1
  /**
   * Verify the platform's basic ability to test for `Arguments`.
   *
   * @private
   * @const {boolean}
   */
  var ARGS1 = (function() {
    return objToStr.call(arguments) === '[object Arguments]';
  })();

  /// {{{4
  /// @const ARGS2
  /**
   * Verify the platform's ability to use a polyfill to test for `Arguments`.
   *
   * @private
   * @const {boolean}
   */
  var ARGS2 = (function() {
    try {
      'callee' in {};
    }
    catch (e) {
      return false;
    }
    return 'callee' in arguments;
  })();

  /// {{{4
  /// @func isObject
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObject(val) {
    return !!val && typeof val === 'object';
  }

  /// {{{4
  /// @func isObjectOrFunction
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObjectOrFunction(val) {

    if (!val)
      return false;

    switch (typeof val) {
      case 'object':
      case 'function':
        return true;
      default:
        return false;
     }
  }

  /// {{{4
  /// @func isFunction
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isFunction(val) {
    return !!val && typeof val === 'function';
  }

  /// {{{4
  /// @func isArray
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArray(val) {
    return isObject(val) && objToStr.call(val) === '[object Array]';
  }

  /// {{{4
  /// @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArrayOrArguments = ARGS1
    ? function isArrayOrArguments(val) {

        if ( !isObject(val) )
          return false;

        switch ( objToStr.call(val) )
          case '[object Array]':
          case '[object Arguments]':
            return true;
          default:
            return false;
        }
      }
    : ARGS2
      ? function isArrayOrArguments(val) {
          return isObject(val)
            && (objToStr.call(val) === '[object Array]' || 'callee' in val);
        }
      : isArray;


  /// {{{4
  /// @func isRegExp
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return isObject(val) && objToStr.call(val) === '[object RegExp]';
  }

  /// {{{4
  /// @func isDate
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDate(val) {
    return isObject(val) && objToStr.call(val) === '[object Date]';
  }

  /// {{{4
  /// @func isError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isError(val) {
    return isObject(val) && objToStr.call(val) === '[object Error]';
  }

  /// {{{4
  /// @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArguments = ARGS1
    ? function isArguments(val) {
        return isObject(val) && objToStr.call(val) === '[object Arguments]';
      }
    : ARGS2
      ? function isArguments(val) {
          return isObject(val) && 'callee' in val;
        }
      : function isArguments(val) {
          return false;
        };

  ///////////////////////////////////////////////////// {{{3
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isDomDocument
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomDocument(val) {
    return isObject(val) && val['nodeType'] === 9;
  }

  /// {{{4
  /// @func isDomElement
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomElement(val) {
    return isObject(val) && val['nodeType'] === 1;
  }

  ///////////////////////////////////////////////////// {{{3
  // MISCELLANEOUS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func hasOwn
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /// {{{4
  /// @func isEmpty
  /**
   * Checks if a value is considered empty. The definition of empty is defined
   * as follows in order of priority (per #val data type):
   * - *`null`*!$
   *   `null` is considered empty.
   * - *`undefined`*!$
   *   `undefined` is considered empty.
   * - *`number`*!$
   *   Only `0` and `NaN` are considered empty.
   * - *`string`*!$
   *   Only `""` is considered empty.
   * - *`boolean`*!$
   *   Only `false` is considered empty.
   * - *`function`*!$
   *   The [length property][func-length] must be `0` to be considered empty.
   * - *`!Array`*!$
   *   The [length property][arr-length] must be `0` to be considered empty.
   * - *`!Object`*!$
   *   The `object` must [own][own] at least one property to be considered
   *   empty.
   * - *`*`*!$
   *   All other data types are **not** considered empty.
   *
   * @param {*} val
   * @return {boolean}
   */
  function isEmpty(val) {

    /** @type {string} */
    var key;

    // empty primitives - 0, "", null, undefined, false, NaN
    if (!val)
      return true;

    // functions
    if (typeof val === 'function')
      return val.length === 0;

    // remaining primitives
    if (typeof val !== 'object')
      return false;

    // arrays
    if (objToStr.call(val) === '[object Array]')
      return val.length === 0;

    // remaining objects
    for (key in val) {
      if ( hasOwn.call(val, key) )
        return false;
    }
    return true;
  }

  /// {{{4
  /// @const EOL
  /**
   * @private
   * @const {!RegExp}
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  /// {{{4
  /// @func isEndOfLine
  /**
   * @param {string} val
   * @return {boolean}
   */
  function isEndOfLine(val) {
    return EOL.test(val);
  }

  ///////////////////////////////////////////////////// {{{3
  // OBJECT STATES
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isFrozen
  /**
   * @param {(!Object|!function)} src
   * @return {boolean}
   */
  var isFrozen = (function() {

    /** @type {!function(!Object): boolean} */
    var ObjIsFrozen;

    if ( !('isFrozen' in Object) || !isFunction(Object.isFrozen) )
      return function isFrozen(src) {
        return false;
      };

    ObjIsFrozen = Object.isFrozen;

    try {
      Object.isFrozen(function(){});
      return Object.isFrozen;
    }
    catch (e) {
      return function isFrozen(src) {
        return typeof src === 'object' && ObjIsFrozen(src);
      };
    }
  })();

  ///////////////////////////////////////////////////// {{{3
  // NUMBER STATES
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isWholeNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isWholeNumber(val) {
    return !(val % 1);
  }

  /// {{{4
  /// @func isOddNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isOddNumber(val) {
    return !!(val % 2);
  }

  /// {{{4
  /// @func isEvenNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isEvenNumber(val) {
    return !(val % 2);
  }

  /// }}}3
  // END OF PRIVATE SCOPE FOR $IS
  return IS;
})();
/// }}}2

module.exports = $is;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
