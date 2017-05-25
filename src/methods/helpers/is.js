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

/// @open ARGS_POLYFILL_OFF
'use strict';
/// @close ARGS_POLYFILL_OFF

///////////////////////////////////////////////////////////////////////// {{{2
// $IS HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function $isPrivateScope() {

  ///////////////////////////////////////////////////// {{{3
  // $IS HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{4
  /// @func _hasOwn
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwn = Object['prototype']['hasOwnProperty'];

  /// {{{4
  /// @func _objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var _objToStr = Object['prototype']['toString'];

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - PRIMITIVES
  //////////////////////////////////////////////////////////

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
  // $IS METHODS - JS OBJECTS
  //////////////////////////////////////////////////////////

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
    return isObject(val) && _objToStr['call'](val) === '[object Array]';
  }

  /// {{{4
  /// @func isRegExp
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return isObject(val) && _objToStr['call'](val) === '[object RegExp]';
  }

  /// {{{4
  /// @func isDate
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDate(val) {
    return isObject(val) && _objToStr['call'](val) === '[object Date]';
  }

  /// {{{4
  /// @func isError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isError(val) {
    return isObject(val) && _objToStr['call'](val) === '[object Error]';
  }

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - ARGUMENTS
  //////////////////////////////////////////////////////////

  /// @open ARGS_POLYFILL_ON
  /// {{{4 ARGS_POLYFILL_ON

  /// {{{5
  /// @const HAS_ARGS
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @struct
   */
  var HAS_ARGS = (function HAS_ARGS_PrivateScope() {

    /// {{{6
    /// @const PRIMARY
    /**
     * Verify the platform's ability to use the primary test for `Arguments`.
     *
     * @const {boolean}
     */
    var PRIMARY = (function PRIMARY_PrivateScope() {
      return _objToStr['call'](arguments) === '[object Arguments]';
    })();

    /// {{{6
    /// @const POLYFILL
    /**
     * Verify the platform's ability to use a check for the `callee` property
     * to test for `Arguments`.
     *
     * @const {boolean}
     */
    var POLYFILL = (function POLYFILL_PrivateScope() {
      try {
        'callee' in {};
      }
      catch (e) {
        return false;
      }
      return 'callee' in arguments;
    })();

    /// {{{6
    /// @const HAS_ARGS
    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var HAS_ARGS = {
      PRIMARY:  PRIMARY,
      POLYFILL: POLYFILL
    };
    /// }}}6

    // END OF PRIVATE SCOPE FOR $IS CONSTANT HAS_ARGS
    return HAS_ARGS;
  })();

  /// {{{5
  /// @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArguments = HAS_ARGS.PRIMARY
    ? function isArguments(val) {
        return isObject(val)
          && _objToStr['call'](val) === '[object Arguments]';
      }
    : HAS_ARGS.POLYFILL
      ? function isArguments(val) {
          return isObject(val) && 'callee' in val;
        }
      : function isArguments(val) {
          return false;
        };

  /// {{{5
  /// @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArrayOrArguments = HAS_ARGS.PRIMARY
    ? function isArrayOrArguments(val) {

        if ( !isObject(val) )
          return false;

        switch ( _objToStr['call'](val) ) {
          case '[object Array]':
          case '[object Arguments]':
            return true;
          default:
            return false;
        }
      }
    : HAS_ARGS.POLYFILL
      ? function isArrayOrArguments(val) {
          return isObject(val)
            && (_objToStr['call'](val) === '[object Array]'
                || 'callee' in val);
        }
      : function isArrayOrArguments(val) {
          return isObject(val) && _objToStr['call'](val) === '[object Array]';
        };

  /// }}}4
  /// @close ARGS_POLYFILL_ON

  /// @open ARGS_POLYFILL_OFF
  /// {{{4 ARGS_POLYFILL_OFF

  /// {{{5
  /// @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArguments(val) {
    return isObject(val) && _objToStr['call'](val) === '[object Arguments]';
  }

  /// {{{5
  /// @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArrayOrArguments(val) {

    if ( !isObject(val) )
      return false;

    switch ( _objToStr['call'](val) ) {
      case '[object Array]':
      case '[object Arguments]':
        return true;
      default:
        return false;
    }
  }

  /// }}}4
  /// @close ARGS_POLYFILL_OFF

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - DOM OBJECTS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isDomDocument
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomDocument(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 9;
  }

  /// {{{4
  /// @func isDomElement
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomElement(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 1;
  }

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - SPECIAL
  //////////////////////////////////////////////////////////

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
      return val['length'] === 0;

    // remaining primitives
    if (typeof val !== 'object')
      return false;

    // arrays
    if (_objToStr['call'](val) === '[object Array]')
      return val['length'] === 0;

    // remaining objects
    for (key in val) {
      if ( _hasOwn['call'](val, key) )
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
    return EOL['test'](val);
  }

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - OBJECT STATES
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func isExtensible
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isExtensible = (function $isExtensiblePolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsExtensible;

    if ( !('isExtensible' in Object) || !isFunction(Object['isExtensible']) )
      return function isExtensible(src) {
        return false;
      };

    objectIsExtensible = Object['isExtensible'];

    try {
      objectIsExtensible(function(){});
      return objectIsExtensible;
    }
    catch (e) {
      return function isExtensible(src) {
        return typeof src === 'object' && objectIsExtensible(src);
      };
    }
  })();

  /// {{{4
  /// @func isFrozen
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isFrozen = (function $isFrozenPolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsFrozen;

    if ( !('isFrozen' in Object) || !isFunction(Object['isFrozen']) )
      return function isFrozen(src) {
        return false;
      };

    objectIsFrozen = Object['isFrozen'];

    try {
      objectIsFrozen(function(){});
      return objectIsFrozen;
    }
    catch (e) {
      return function isFrozen(src) {
        return typeof src === 'object' && objectIsFrozen(src);
      };
    }
  })();

  /// {{{4
  /// @func isSealed
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isSealed = (function $isSealedPolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsSealed;

    if ( !('isSealed' in Object) || !isFunction(Object['isSealed']) )
      return function isSealed(src) {
        return false;
      };

    objectIsSealed = Object['isSealed'];

    try {
      objectIsSealed(function(){});
      return objectIsSealed;
    }
    catch (e) {
      return function isSealed(src) {
        return typeof src === 'object' && objectIsSealed(src);
      };
    }
  })();

  ///////////////////////////////////////////////////// {{{3
  // $IS METHODS - NUMBER STATES
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

  ///////////////////////////////////////////////////// {{{3
  // $IS SETUP
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const $IS
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $IS = {

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
    extend: isExtensible,
    frozen: isFrozen,
    sealed: isSealed,

    // number states
    whole: isWholeNumber,
    odd:   isOddNumber,
    even:  isEvenNumber
  };
  /// }}}3

  // END OF PRIVATE SCOPE FOR $IS
  return $IS;
})();
/// }}}2

module.exports = $is;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
