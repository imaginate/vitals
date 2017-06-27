/**
 * ---------------------------------------------------------------------------
 * $IS HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $is
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function $isPrivateScope() {

  /// #{{{ @group Primitives

  /// #{{{ @func isNull
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNull(val) {
    return val === NIL;
  }
  /// #}}} @func isNull

  /// #{{{ @func isUndefined
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    return val === VOID;
  }
  /// #}}} @func isUndefined

  /// #{{{ @func isBoolean
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isBoolean(val) {
    return typeof val === 'boolean';
  }
  /// #}}} @func isBoolean

  /// #{{{ @func isString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isString(val) {
    return typeof val === 'string';
  }
  /// #}}} @func isString

  /// #{{{ @func isNonEmptyString
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  }
  /// #}}} @func isNonEmptyString

  /// #{{{ @func isNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNumber(val) {
    return typeof val === 'number' && val === val && isFinite(val);
  }
  /// #}}} @func isNumber

  /// #{{{ @func isNonZeroNumber
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val && isFinite(val);
  }
  /// #}}} @func isNonZeroNumber

  /// #{{{ @func isNan
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNan(val) {
    return val !== val;
  }
  /// #}}} @func isNan

  /// #}}} @group Primitives

  /// #{{{ @group JS-Objects

  /// #{{{ @func isObject
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObject(val) {
    return !!val && typeof val === 'object';
  }
  /// #}}} @func isObject

  /// #{{{ @func isObjectOrFunction
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
  /// #}}} @func isObjectOrFunction

  /// #{{{ @func isFunction
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isFunction(val) {
    return !!val && typeof val === 'function';
  }
  /// #}}} @func isFunction

  /// #{{{ @func isArray
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArray(val) {
    return isObject(val) && $objStr(val) === '[object Array]';
  }
  /// #}}} @func isArray

  /// #{{{ @func isRegExp
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return isObject(val) && $objStr(val) === '[object RegExp]';
  }
  /// #}}} @func isRegExp

  /// #{{{ @func isDate
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDate(val) {
    return isObject(val) && $objStr(val) === '[object Date]';
  }
  /// #}}} @func isDate

  /// #{{{ @func isError
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isError(val) {
    return isObject(val) && $objStr(val) === '[object Error]';
  }
  /// #}}} @func isError

  /// #if{{{ @env ARGS_POLYFILL
  /// #{{{ @const _HAS_ARGS
  /**
   * @private
   * @const {!Object<string, boolean>}
   * @struct
   */
  var _HAS_ARGS = (function _HAS_ARGS_PrivateScope() {

    /// #{{{ @const PRIMARY
    /**
     * @description
     *   Verify the platform's ability to use the primary `Arguments` test.
     * @const {boolean}
     */
    var PRIMARY = (function _HAS_ARGS_PRIMARY_PrivateScope() {
      return $objStr(arguments) === '[object Arguments]';
    })();
    /// #}}} @const PRIMARY

    /// #{{{ @const POLYFILL
    /**
     * @description
     *   Verify the platform's ability to use a check for the `callee`
     *   property to test for `Arguments`.
     * @const {boolean}
     */
    var POLYFILL = (function _HAS_ARGS_POLYFILL_PrivateScope() {
      try {
        'callee' in {};
      }
      catch (e) {
        return false;
      }
      return 'callee' in arguments;
    })();
    /// #}}} @const POLYFILL

    /// #{{{ @const HAS_ARGS
    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var HAS_ARGS = {
      PRIMARY: PRIMARY,
      POLYFILL: POLYFILL
    };
    /// #}}} @const HAS_ARGS

    return HAS_ARGS;
  })();
  /// #}}} @const _HAS_ARGS

  /// #{{{ @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArguments = _HAS_ARGS.PRIMARY
    ? function isArguments(val) {
        return isObject(val) && $objStr(val) === '[object Arguments]';
      }
    : _HAS_ARGS.POLYFILL
      ? function isArguments(val) {
          return isObject(val) && 'callee' in val;
        }
      : function isArguments(val) {
          return false;
        };
  /// #}}} @func isArguments

  /// #{{{ @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArrayOrArguments = _HAS_ARGS.PRIMARY
    ? function isArrayOrArguments(val) {

        if ( !isObject(val) )
          return false;

        switch ( $objStr(val) ) {
          case '[object Array]':
          case '[object Arguments]':
            return true;
          default:
            return false;
        }
      }
    : _HAS_ARGS.POLYFILL
      ? function isArrayOrArguments(val) {
          return isObject(val)
            && ( $objStr(val) === '[object Array]' || 'callee' in val );
        }
      : function isArrayOrArguments(val) {
          return isObject(val) && $objStr(val) === '[object Array]';
        };
  /// #}}} @func isArrayOrArguments
  /// #if}}} @env ARGS_POLYFILL

  /// #ifnot{{{ @env ARGS_POLYFILL
  /// #{{{ @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArguments(val) {
    return isObject(val) && $objStr(val) === '[object Arguments]';
  }
  /// #}}} @func isArguments

  /// #{{{ @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArrayOrArguments(val) {

    if ( !isObject(val) )
      return false;

    switch ( $objStr(val) ) {
      case '[object Array]':
      case '[object Arguments]':
        return true;
      default:
        return false;
    }
  }
  /// #}}} @func isArrayOrArguments
  /// #ifnot}}} @env ARGS_POLYFILL

  /// #if{{{ @env NODE
  /// #{{{ @func isBuffer
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isBuffer = BUFF['isBuffer'];
  /// #}}} @func isBuffer
  /// #if}}} @env NODE

  /// #}}} @group JS-Objects

  /// #{{{ @group DOM-Objects

  /// #{{{ @func isDomDocument
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomDocument(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 9;
  }
  /// #}}} @func isDomDocument

  /// #{{{ @func isDomElement
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomElement(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 1;
  }
  /// #}}} @func isDomElement

  /// #}}} @group DOM-Objects

  /// #{{{ @group Special

  /// #{{{ @func isArrayLike
  /**
   * @param {(!Array|!Arguments|!Object|!Function)} val
   * @return {boolean}
   */
  function isArrayLike(val) {

    /** @type {number} */
    var len;

    if ( isArray(val) )
      return true;

    len = val['length'];
    return isNumber(len) && isWholeNumber(len) && len >= 0;
  }
  /// #}}} @func isArrayLike

  /// #{{{ @func isEmpty
  /**
   * @description
   *   Checks if a value is considered empty. The definition of empty is
   *   defined as follows in order of priority (per the #val data type):
   *   - *`null`*!$
   *     `null` is considered empty.
   *   - *`undefined`*!$
   *     `undefined` is considered empty.
   *   - *`number`*!$
   *     Only `0` and `NaN` are considered empty.
   *   - *`string`*!$
   *     Only `""` is considered empty.
   *   - *`boolean`*!$
   *     Only `false` is considered empty.
   *   - *`function`*!$
   *     The [length property][func-length] must be `0` to be considered
   *     empty.
   *   - *`!Array`*!$
   *     The [length property][arr-length] must be `0` to be considered empty.
   *   - *`!Object`*!$
   *     The `object` must **not** [own][own] any properties to be considered
   *     empty.
   *   - *`*`*!$
   *     All other data types are **not** considered empty.
   * @param {*} val
   * @return {boolean}
   */
  function isEmpty(val) {

    /** @type {string} */
    var key;

    // empty primitives - 0, "", null, undefined, false, NaN
    if (!val)
      return YES;

    // functions
    if (typeof val === 'function')
      return val['length'] === 0;

    // remaining primitives
    if (typeof val !== 'object')
      return NO;

    // arrays
    if ($objStr(val) === '[object Array]')
      return val['length'] === 0;

    // remaining objects
    for (key in val) {
      if ( $own(val, key) )
        return NO;
    }
    return YES;
  }
  /// #}}} @func isEmpty

  /// #{{{ @const _EOL
  /**
   * @private
   * @const {!RegExp}
   */
  var _EOL = /^(?:cr|lf|crlf)$/i;
  /// #}}} @const _EOL

  /// #{{{ @func isEndOfLine
  /**
   * @param {string} val
   * @return {boolean}
   */
  function isEndOfLine(val) {
    return _EOL['test'](val);
  }
  /// #}}} @func isEndOfLine

  /// #{{{ @const _FLAGS
  /**
   * @private
   * @const {!RegExp}
   */
  var _FLAGS = (function _FLAGS_PrivateScope() {

    /** @type {string} */
    var flags;

    flags = 'img';

    if ('sticky' in REGX_PROTO)
      flags += 'y';
    if ('unicode' in REGX_PROTO)
      flags += 'u';

    flags = '[\\+\\-][' + flags + '\\+\\-]*|[' + flags + ']*';
    return new REGX('^(?:' + flags + ')$');
  })();
  /// #}}} @const _FLAGS

  /// #{{{ @func isRegExpFlags
  /**
   * @param {string} val
   * @return {boolean}
   */
  function isRegExpFlags(val) {
    return _FLAGS['test'](val);
  }
  /// #}}} @func isRegExpFlags

  /// #}}} @group Special

  /// #{{{ @group Object-States

  /// #{{{ @func isExtensible
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isExtensible = (function $isExtensiblePolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsExtensible;

    if ( !('isExtensible' in OBJ) || !isFunction(OBJ['isExtensible']) )
      return function isExtensible(src) {
        return false;
      };

    objectIsExtensible = OBJ['isExtensible'];

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
  /// #}}} @func isExtensible

  /// #{{{ @func isFrozen
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isFrozen = (function $isFrozenPolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsFrozen;

    if ( !('isFrozen' in OBJ) || !isFunction(OBJ['isFrozen']) )
      return function isFrozen(src) {
        return false;
      };

    objectIsFrozen = OBJ['isFrozen'];

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
  /// #}}} @func isFrozen

  /// #{{{ @func isSealed
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isSealed = (function $isSealedPolyfillPrivateScope() {

    /** @type {!function(!Object): boolean} */
    var objectIsSealed;

    if ( !('isSealed' in OBJ) || !isFunction(OBJ['isSealed']) )
      return function isSealed(src) {
        return false;
      };

    objectIsSealed = OBJ['isSealed'];

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
  /// #}}} @func isSealed

  /// #}}} @group Object-States

  /// #{{{ @group Number-States

  /// #{{{ @func isWholeNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isWholeNumber(val) {
    return !(val % 1);
  }
  /// #}}} @func isWholeNumber

  /// #{{{ @func isOddNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isOddNumber(val) {
    return !!(val % 2);
  }
  /// #}}} @func isOddNumber

  /// #{{{ @func isEvenNumber
  /**
   * @param {number} val
   * @return {boolean}
   */
  function isEvenNumber(val) {
    return !(val % 2);
  }
  /// #}}} @func isEvenNumber

  /// #}}} @group Number-States

  /// #if{{{ @env NODE
  /// #{{{ @group File-System

  /// #{{{ @func _getStats
  /**
   * @param {string} path
   * @return {!Object}
   */
  var _getStats = FS['statSync'];
  /// #}}} @func _getStats

  /// #{{{ @func isDirectory
  /**
   * @param {string} path
   * @return {boolean}
   */
  function isDirectory(path) {

    if ( !path || !isString(path) )
      return NO;

    try {
      return _getStats(path)['isDirectory']();
    }
    catch (e) {
      return NO;
    }
  }
  /// #}}} @func isDirectory

  /// #{{{ @func isFile
  /**
   * @param {string} path
   * @return {boolean}
   */
  function isFile(path) {

    if ( !path || !isString(path) )
      return NO;

    try {
      return _getStats(path)['isFile']();
    }
    catch (e) {
      return NO;
    }
  }
  /// #}}} @func isFile

  /// #}}} @group File-System
  /// #if}}} @env NODE

  /// #{{{ @const $is
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $is = {

    /// #{{{ @group Primitives
    nil:  isNull,
    void: isUndefined,
    bool: isBoolean,
    str:  isString,
    _str: isNonEmptyString,
    num:  isNumber,
    _num: isNonZeroNumber,
    nan:  isNan,
    /// #}}} @group Primitives

    /// #{{{ @group JS-Objects
    obj:  isObject,
    _obj: isObjectOrFunction,
    fun:  isFunction,
    arr:  isArray,
    _arr: isArrayOrArguments,
    args: isArguments,
    regx: isRegExp,
    date: isDate,
    err:  isError,
    /// #if{{{ @env NODE
    buff: isBuffer,
    /// #if}}} @env NODE
    /// #}}} @group JS-Objects

    /// #{{{ @group DOM-Objects
    doc:  isDomDocument,
    elem: isDomElement,
    /// #}}} @group DOM-Objects

    /// #{{{ @group Special
    arrish: isArrayLike,
    empty:  isEmpty,
    eol:    isEndOfLine,
    flags:  isRegExpFlags,
    /// #}}} @group Special

    /// #{{{ @group Object-States
    extend: isExtensible,
    frozen: isFrozen,
    sealed: isSealed,
    /// #}}} @group Object-States

    /// #{{{ @group Number-States
    // number states
    whole: isWholeNumber,
    odd:   isOddNumber,
    /// #ifnot{{{ @env NODE
    even:  isEvenNumber
    /// #ifnot}}} @env NODE
    /// #if{{{ @env NODE
    even:  isEvenNumber,
    /// #if}}} @env NODE
    /// #}}} @group Number-States

    /// #if{{{ @env NODE
    /// #{{{ @group File-System
    dir:  isDirectory,
    file: isFile
    /// #}}} @group File-System
    /// #if}}} @env NODE
  };
  /// #}}} @const $is

  return $is;
})();
/// #}}} @helper $is

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
