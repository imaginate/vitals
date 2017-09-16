/**
 * ---------------------------------------------------------------------------
 * $IS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $is
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function __vitals$is__() {

  /// #{{{ @group primitives

  /// #{{{ @func isNull
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNull(val) {
    return val === $NIL;
  }
  /// #}}} @func isNull

  /// #{{{ @func isUndefined
  /**
   * @param {*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    return val === $VOID;
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

  /// #}}} @group primitives

  /// #{{{ @group js-objects

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

    if (!val) {
      return $NO;
    }

    switch (typeof val) {
      case 'object':
      case 'function':
        return $YES;
    }
    return $NO;
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

  /// #{{{ @func isArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArguments = $ENV.HAS.ARGUMENTS_CLASS
    ? function isArguments(val) {
        return isObject(val) && $objStr(val) === '[object Arguments]';
      }
    /// #if{{{ @env ARGS_POLYFILL
    : $ENV.HAS.ARGUMENTS_CALLEE
      ? function isArguments(val) {
          return isObject(val) && 'callee' in val;
        }
      : function isArguments(val) {
          return $NO;
        };
    /// #if}}} @env ARGS_POLYFILL
    /// #ifnot{{{ @env ARGS_POLYFILL
    : function isArguments(val) {
        return $NO;
      };
    /// #ifnot}}} @env ARGS_POLYFILL
  /// #}}} @func isArguments

  /// #{{{ @func isArrayOrArguments
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isArrayOrArguments = $ENV.HAS.ARGUMENTS_CLASS
    ? function isArrayOrArguments(val) {

        if ( !isObject(val) ) {
          return $NO;
        }

        switch ( $objStr(val) ) {
          case '[object Array]':
          case '[object Arguments]':
            return $YES;
        }
        return $NO;
      }
    /// #if{{{ @env ARGS_POLYFILL
    : $ENV.HAS.ARGUMENTS_CALLEE
      ? function isArrayOrArguments(val) {
          return isObject(val)
            && ( $objStr(val) === '[object Array]' || 'callee' in val );
        }
      : function isArrayOrArguments(val) {
          return isObject(val) && $objStr(val) === '[object Array]';
        };
    /// #if}}} @env ARGS_POLYFILL
    /// #ifnot{{{ @env ARGS_POLYFILL
    : function isArrayOrArguments(val) {
        return isObject(val) && $objStr(val) === '[object Array]';
      };
    /// #ifnot}}} @env ARGS_POLYFILL
  /// #}}} @func isArrayOrArguments

  /// #if{{{ @build NODE
  /// #{{{ @func isBuffer
  /**
   * @param {*} val
   * @return {boolean}
   */
  var isBuffer = $BUFF['isBuffer'];
  /// #}}} @func isBuffer
  /// #if}}} @build NODE

  /// #}}} @group js-objects

  /// #{{{ @group dom-objects

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

  /// #}}} @group dom-objects

  /// #{{{ @group special

  /// #{{{ @func isArrayLike
  /**
   * @param {(!Array|!Arguments|!Object|!Function)} val
   * @return {boolean}
   */
  function isArrayLike(val) {

    /** @type {number} */
    var len;

    if ( isArray(val) ) {
      return $YES;
    }

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
    if (!val) {
      return $YES;
    }

    if (typeof val === 'function') {
      return val['length'] === 0;
    }

    // remaining primitives
    if (typeof val !== 'object') {
      return $NO;
    }

    // arrays
    if ($objStr(val) === '[object Array]') {
      return val['length'] === 0;
    }

    // remaining objects
    for (key in val) {
      if ( $own(val, key) ) {
        return $NO;
      }
    }
    return $YES;
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
  var _FLAGS = (function __vitals$is_FLAGS__() {

    /** @type {!RegExp} */
    var pattern;
    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    flags = 'img';

    if ('sticky' in $REGX_PROTO) {
      flags += 'y';
    }

    if ('unicode' in $REGX_PROTO) {
      flags += 'u';
    }

    source = '^(?:'
      + '[\\+\\-][' + flags + '\\+\\-]*'
      + '|'
      + '[' + flags + ']*'
      + ')$';

    pattern = new $REGX(source);
    pattern.FLAGS = flags;
    pattern.SRC = '/' + source + '/';

    return pattern;
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
  isRegExpFlags.FLAGS = _FLAGS.FLAGS;
  isRegExpFlags.SRC = _FLAGS.SRC;
  /// #}}} @func isRegExpFlags

  /// #}}} @group special

  /// #{{{ @group object-states

  /// #{{{ @func isExtensible
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isExtensible = $ENV.HAS.FUNCTION_IS_EXTENSIBLE
    ? $OBJ['isExtensible']
    : $ENV.HAS.OBJECT_IS_EXTENSIBLE
      ? (function __vitals$isObjectIsExtensiblePolyfill__() {

          /// #{{{ @func _isExtensible
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isExtensible = $OBJ['isExtensible'];
          /// #}}} @func _isExtensible

          /// #{{{ @func isExtensible
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isExtensible(src) {
            return typeof src === 'object' && _isExtensible(src);
          }
          /// #}}} @func isExtensible

          return isExtensible;
        })()
      : function isExtensible(src) {
          return $NO;
        };
  /// #}}} @func isExtensible

  /// #{{{ @func isFrozen
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isFrozen = $ENV.HAS.FUNCTION_IS_FROZEN
    ? $OBJ['isFrozen']
    : $ENV.HAS.OBJECT_IS_FROZEN
      ? (function __vitals$isObjectIsFrozenPolyfill__() {

          /// #{{{ @func _isFrozen
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isFrozen = $OBJ['isFrozen'];
          /// #}}} @func _isFrozen

          /// #{{{ @func isFrozen
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isFrozen(src) {
            return typeof src === 'object' && _isFrozen(src);
          }
          /// #}}} @func isFrozen

          return isFrozen;
        })()
      : function isFrozen(src) {
          return $NO;
        };
  /// #}}} @func isFrozen

  /// #{{{ @func isSealed
  /**
   * @param {(!Object|!Function)} src
   * @return {boolean}
   */
  var isSealed = $ENV.HAS.FUNCTION_IS_SEALED
    ? $OBJ['isSealed']
    : $ENV.HAS.OBJECT_IS_SEALED
      ? (function __vitals$isObjectIsSealedPolyfill__() {

          /// #{{{ @func _isSealed
          /**
           * @private
           * @param {!Object} src
           * @return {boolean}
           */
          var _isSealed = $OBJ['isSealed'];
          /// #}}} @func _isSealed

          /// #{{{ @func isSealed
          /**
           * @param {(!Object|!Function)} src
           * @return {boolean}
           */
          function isSealed(src) {
            return typeof src === 'object' && _isSealed(src);
          }
          /// #}}} @func isSealed

          return isSealed;
        })()
      : function isSealed(src) {
          return $NO;
        };
  /// #}}} @func isSealed

  /// #}}} @group object-states

  /// #{{{ @group number-states

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

  /// #}}} @group number-states

  /// #if{{{ @build NODE
  /// #{{{ @group file-system

  /// #{{{ @func _getLinkStats
  /**
   * @param {string} path
   * @return {!Object}
   */
  var _getLinkStats = $FS['lstatSync'];
  /// #}}} @func _getLinkStats

  /// #{{{ @func _getStats
  /**
   * @param {string} path
   * @return {!Object}
   */
  var _getStats = $FS['statSync'];
  /// #}}} @func _getStats

  /// #{{{ @func isDirectory
  /**
   * @param {*} path
   * @return {boolean}
   */
  function isDirectory(path) {

    /** @type {*} */
    var err;

    if ( !path || !isString(path) ) {
      return $NO;
    }

    try {
      return _getStats(path)['isDirectory']();
    }
    catch (err) {
      return $NO;
    }
  }
  /// #}}} @func isDirectory

  /// #{{{ @func isFile
  /**
   * @param {string} path
   * @return {boolean}
   */
  function isFile(path) {

    /** @type {*} */
    var err;

    if ( !path || !isString(path) ) {
      return $NO;
    }

    try {
      return _getStats(path)['isFile']();
    }
    catch (err) {
      return $NO;
    }
  }
  /// #}}} @func isFile

  /// #{{{ @func isSymLink
  /**
   * @param {string} path
   * @return {boolean}
   */
  function isSymLink(path) {

    /** @type {*} */
    var err;

    if ( !path || !isString(path) ) {
      return $NO;
    }

    try {
      return _getLinkStats(path)['isSymbolicLink']();
    }
    catch (err) {
      return $NO;
    }
  }
  /// #}}} @func isSymLink

  /// #}}} @group file-system
  /// #if}}} @build NODE

  /// #{{{ @const $is
  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $is = {
    /// #{{{ @group primitives
    nil:  isNull,
    void: isUndefined,
    bool: isBoolean,
    str:  isString,
    _str: isNonEmptyString,
    num:  isNumber,
    _num: isNonZeroNumber,
    nan:  isNan,
    /// #}}} @group primitives

    /// #{{{ @group js-objects
    obj:  isObject,
    _obj: isObjectOrFunction,
    fun:  isFunction,
    arr:  isArray,
    _arr: isArrayOrArguments,
    args: isArguments,
    regx: isRegExp,
    date: isDate,
    err:  isError,
    /// #if{{{ @build NODE
    buff: isBuffer,
    /// #if}}} @build NODE
    /// #}}} @group js-objects

    /// #{{{ @group dom-objects
    doc:  isDomDocument,
    elem: isDomElement,
    /// #}}} @group dom-objects

    /// #{{{ @group special
    arrish: isArrayLike,
    empty:  isEmpty,
    eol:    isEndOfLine,
    flags:  isRegExpFlags,
    /// #}}} @group special

    /// #{{{ @group object-states
    extend: isExtensible,
    frozen: isFrozen,
    sealed: isSealed,
    /// #}}} @group object-states

    /// #{{{ @group number-states
    whole: isWholeNumber,
    odd:   isOddNumber,
    /// #ifnot{{{ @build NODE
    even:  isEvenNumber
    /// #ifnot}}} @build NODE
    /// #if{{{ @build NODE
    even:  isEvenNumber,
    /// #if}}} @build NODE
    /// #}}} @group number-states

    /// #if{{{ @build NODE
    /// #{{{ @group file-system
    dir:     isDirectory,
    file:    isFile,
    symlink: isSymLink
    /// #}}} @group file-system
    /// #if}}} @build NODE
  };
  /// #}}} @const $is

  return $is;
})();
/// #}}} @helper $is

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
