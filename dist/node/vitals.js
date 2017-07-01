/**
 * ---------------------------------------------------------------------------
 * VITALS
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

;(function(/** (?Object|?Function|undefined) */ __THIS,
           /** undefined */ __VOID) {

  'use strict';

/**
 * @const {string}
 */
var VERSION = '5.0.0';
/**
 * @private
 * @const {!Object}
 * @struct
 */
var ENV = {
  HAS_EXPORTS: true,
  HAS_MODULE: true,
  HAS_GLOBAL: true,
  HAS_WINDOW: false,
  HAS_DEFINE: false,
  HAS_SELF: false,
  HAS_THIS: false,
  ROOT: global
};
/**
 * @private
 * @const {(!Object|!Function)}
 * @dict
 */
var ROOT = ENV.ROOT;
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var ARR = ROOT['Array'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var ARR_PROTO = ARR['prototype'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var ERR = ROOT['Error'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var FUN = ROOT['Function'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var FUN_PROTO = FUN['prototype'];
/**
 * @private
 * @const {null}
 */
var NIL = null;
/**
 * @private
 * @const {boolean}
 */
var NO = false;
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var NUM = ROOT['Number'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var NUM_PROTO = NUM['prototype'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var OBJ = ROOT['Object'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var OBJ_PROTO = OBJ['prototype'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var RANGE_ERR = ROOT['RangeError'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var REGX = ROOT['RegExp'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var REGX_PROTO = REGX['prototype'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var STR = ROOT['String'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var STR_PROTO = STR['prototype'];
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var TYPE_ERR = ROOT['TypeError'];
/**
 * @private
 * @const {undefined}
 */
var VOID = __VOID;
/**
 * @private
 * @const {boolean}
 */
var YES = true;
/**
 * @private
 * @const {!Function}
 * @constructor
 */
var BUFF = ROOT['Buffer'];
/**
 * @private
 * @const {!Object}
 * @dict
 */
var CP = require('child_process');
/**
 * @private
 * @const {!Object}
 * @dict
 */
var FS = require('fs');
/**
 * @private
 * @const {!Object}
 * @dict
 */
var PATH = require('path');
/**
 * @private
 * @param {!Object} source
 * @return {string}
 */
var $objStr = (function $objStrPrivateScope() {

  /**
   * @param {!Object} source
   * @return {string}
   */
  function $objStr(source) {
    return _objToStr['call'](source);
  }

  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var _objToStr = OBJ_PROTO['toString'];

  return $objStr;
})();
/**
 * @private
 * @param {(!Object|!Function)} source
 * @param {*} key
 * @return {boolean}
 */
var $own = (function $ownPrivateScope() {

  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

  /**
   * @description
   *   A safe way to call [Object.prototype.hasOwnProperty][own].
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function $own(source, key) {
    return _hasOwnProp['call'](source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProp = OBJ_PROTO['hasOwnProperty'];

  return $own;
})();
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var $is = (function $isPrivateScope() {


  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNull(val) {
    return val === NIL;
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    return val === VOID;
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNumber(val) {
    return typeof val === 'number' && val === val && isFinite(val);
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val && isFinite(val);
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isNan(val) {
    return val !== val;
  }



  /**
   * @param {*} val
   * @return {boolean}
   */
  function isObject(val) {
    return !!val && typeof val === 'object';
  }

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

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isFunction(val) {
    return !!val && typeof val === 'function';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArray(val) {
    return isObject(val) && $objStr(val) === '[object Array]';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return isObject(val) && $objStr(val) === '[object RegExp]';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDate(val) {
    return isObject(val) && $objStr(val) === '[object Date]';
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isError(val) {
    return isObject(val) && $objStr(val) === '[object Error]';
  }


  /**
   * @param {*} val
   * @return {boolean}
   */
  function isArguments(val) {
    return isObject(val) && $objStr(val) === '[object Arguments]';
  }

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

  /**
   * @param {*} val
   * @return {boolean}
   */
  var isBuffer = BUFF['isBuffer'];



  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomDocument(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 9;
  }

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDomElement(val) {
    return isObject(val) && 'nodeType' in val && val['nodeType'] === 1;
  }



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

  /**
   * @private
   * @const {!RegExp}
   */
  var _EOL = /^(?:cr|lf|crlf)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  function isEndOfLine(val) {
    return _EOL['test'](val);
  }

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

  /**
   * @param {string} val
   * @return {boolean}
   */
  function isRegExpFlags(val) {
    return _FLAGS['test'](val);
  }



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



  /**
   * @param {number} val
   * @return {boolean}
   */
  function isWholeNumber(val) {
    return !(val % 1);
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  function isOddNumber(val) {
    return !!(val % 2);
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  function isEvenNumber(val) {
    return !(val % 2);
  }



  /**
   * @param {string} path
   * @return {!Object}
   */
  var _getStats = FS['statSync'];

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


  /**
   * @const {!Object<string, !function>}
   * @struct
   */
  var $is = {

    nil:  isNull,
    void: isUndefined,
    bool: isBoolean,
    str:  isString,
    _str: isNonEmptyString,
    num:  isNumber,
    _num: isNonZeroNumber,
    nan:  isNan,

    obj:  isObject,
    _obj: isObjectOrFunction,
    fun:  isFunction,
    arr:  isArray,
    _arr: isArrayOrArguments,
    args: isArguments,
    regx: isRegExp,
    date: isDate,
    err:  isError,
    buff: isBuffer,

    doc:  isDomDocument,
    elem: isDomElement,

    arrish: isArrayLike,
    empty:  isEmpty,
    eol:    isEndOfLine,
    flags:  isRegExpFlags,

    extend: isExtensible,
    frozen: isFrozen,
    sealed: isSealed,

    // number states
    whole: isWholeNumber,
    odd:   isOddNumber,
    even:  isEvenNumber,

    dir:  isDirectory,
    file: isFile
  };

  return $is;
})();
/**
 * @private
 * @param {*} val
 * @return {string}
 */
function $mkStr(val) {
  return $is.str(val)
    ? val
    : $is.regx(val)
      ? val['toString']()
      : STR(val);
}
/**
 * @private
 * @param {*} val
 * @param {number=} depth
 * @return {string}
 */
var $print = (function $printPrivateScope() {

  /**
   * @param {*} val
   * @param {number=} depth
   * @return {string}
   */
  function _toStr(val, depth) {
    depth = depth || 0;
    return $is._obj(val)
      ? $is.regx(val)
        ? val['toString']();
        : _mapToStr(val, depth)
      : _primToStr(val);
  }


  /**
   * @private
   * @const {string}
   */
  var _INDENT = '    ';

  /**
   * @private
   * @const {!RegExp}
   */
  var _MAP_TYPE = /^\[object ([a-zA-Z0-9_\$]+)\]$/;

  /**
   * @private
   * @const {!RegExp}
   */
  var _LAST_SEP = /,\n$/;



  /**
   * @private
   * @param {(!Object|!Function)} val
   * @return {boolean}
   */
  function _emptyHashMap(val) {

    /** @type {string} */
    var key;

    for (key in val) {
      if ( $own(val, key) )
        return false;
    }
    return true;
  }

  /**
   * @private
   * @param {string} val
   * @return {string}
   */
  function _escStr(val) {
    val = val['replace'](/\\/g, '\\\\');
    val = val['replace'](/\n/g, '\\n');
    val = val['replace'](/\r/g, '\\r');
    val = val['replace'](/\t/g, '\\t');
    val = val['replace'](/\v/g, '\\v');
    val = val['replace'](/\0/g, '\\0');
    val = val['replace'](/\b/g, '\\b');
    val = val['replace'](/\f/g, '\\f');
    return val;
  }

  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _getMapType(val) {

    /** @type {string} */
    var type;

    if ( $is.fun(val) ) {
      type = 'Function';
      if (val['name'])
        type += '(' + val['name'] + ')';
      return type;
    }

    type = $objStr(val);
    return _MAP_TYPE['test'](type)
      ? type['replace'](_MAP_TYPE, '$1')
      : 'UnknownObjectType';
  }

  /**
   * @private
   * @param {number} depth
   * @return {string}
   */
  function _mkIndent(depth) {

    /** @type {string} */
    var indent;

    if (indent < 1)
      return '';

    indent = '';
    while (depth--)
      indent += _INDENT;
    return indent;
  }



  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function _primToStr(val) {

    if ( $is.bool(val) )
      return val
        ? 'true'
        : 'false';

    if ( $is.nil(val) )
      return 'null';

    if ( $is.void(val) )
      return 'undefined';

    if ( $is.nan(val) )
      return 'NaN';

    if ( $is.str(val) )
      return '"' + _escStr(val) + '"';

    return $mkStr(val);
  }



  /**
   * @private
   * @param {(!Array|!Arguments)} val
   * @param {number} depth
   * @return {string}
   */
  function _arrToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = val['length'];

    if (len < 1)
      return '[]';

    indent = _mkIndent(depth);
    depth += 1;

    result = '[\n';
    i = -1;
    while (++i < len) {
      result += indent + i + ': ';
      result += $print(val[i], depth) + ',\n';
    }
    result = result['replace'](_LAST_SEP, '\n');
    return result + ']';
  }

  /**
   * @private
   * @param {*} key
   * @return {string}
   */
  function _keyToStr(key) {
    return "'" + $mkStr(key) + "'";
  }

  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _mapToStr(val, depth) {

    /** @type {string} */
    var result;

    result = _getMapType(val) + ': ';
    result += $is._arr(val)
      ? _arrToStr(val, depth)
      : _ownToStr(val, depth);
    return result;
  }

  /**
   * @private
   * @param {(!Object|!Function)} val
   * @param {number} depth
   * @return {string}
   */
  function _ownToStr(val, depth) {

    /** @type {string} */
    var result;
    /** @type {string} */
    var indent;
    /** @type {string} */
    var key;

    if ( _emptyHashMap(val) )
      return '{}';

    indent = _mkIndent(depth);
    depth += 1;

    result = '{\n';
    for (key in val) {
      if ( $own(val, key) ) {
        result += indent;
        result += _keyToStr(key) + ': ';
        result += $print(val[key], depth) + ',\n';
      }
    }
    result = result['replace'](_LAST_SEP, '\n');
    return result + '}';
  }


  return $print;
})();
/**
 * @private
 * @param {string=} superMethod
 * @return {!Object<string, !function>}
 */
var $mkErrs = (function $mkErrsPrivateScope() {


  /**
   * @private
   * @const {!RegExp}
   */
  var _OPEN_HASH = /^#/;

  /**
   * @private
   * @const {!RegExp}
   */
  var _OPEN_VITALS = /^vitals\./;

  /**
   * @private
   * @const {!RegExp}
   */
  var _STRICT = /^\!/;



  /**
   * @private
   * @param {!Array} opts
   * @return {string}
   */
  function _mkOptions(opts) {

    /** @type {string} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = '';

    len = opts['length'];
    i = -1;
    while (++i < len)
      result += '\n- `' + $print(opts[i]) + '`';
    return result;
  }

  /**
   * @private
   * @param {(string|undefined)} name
   * @return {string}
   */
  function _prepSuper(name) {
    
    if ( $is.void(name) )
      return 'newVitals';

    name = name['replace'](_OPEN_VITALS, '');
    return 'vitals.' + name;
  }

  /**
   * @private
   * @param {string} name
   * @return {string}
   */
  function _prepParam(name) {

    if (!name)
      return '';

    if ( _STRICT['test'](name) )
      return name['replace'](_STRICT, '');

    name = name['replace'](_OPEN_HASH, '');
    return '#' + name;
  }

  /**
   * @private
   * @param {!Error} err
   * @param {string} name
   * @param {string} msg
   * @param {*=} val
   * @return {!Error}
   */
  function _setErrorProps(err, name, msg, val) {
    err['__vitals'] = true;
    err['vitals'] = true;
    err['name'] = name;
    switch (name) {
      case 'TypeError':
        err['__type'] = true;
        err['type'] = true;
        break;
      case 'RangeError':
        err['__range'] = true;
        err['range'] = true;
        break;
    }
    err['message'] = msg;
    err['msg'] = msg;
    if (arguments['length'] > 3) {
      err['value'] = val;
      err['val'] = val;
    }
    return err;
  }


  /**
   * @param {string=} superMethod
   * @return {!Object<string, !function>}
   */
  function $mkErrs(superMethod) {

    /**
     * @const {!Object<string, !function>}
     * @struct
     */
    var MK_ERR = {
      error: error,
      typeError: typeError,
      rangeError: rangeError
    };

    /**
     * @private
     * @const {string}
     */
    var _SUPER = _prepSuper(superMethod);

    /**
     * @private
     * @param {(string|undefined)} method
     * @return {string} 
     */
    function _prepMethod(method) {
      method = method
        ? _SUPER
        : _SUPER + '.' + method;
      return '`' + method + '`';
    }

    /**
     * @param {!Error} err
     * @param {string} msg
     * @param {string=} method
     * @return {!Error} 
     */
    function error(err, msg, method) {
      method = _prepMethod(method);
      msg += ' for ' + method + ' call';
      return _setErrorProps(err, 'Error', msg);
    }

    /**
     * @param {!TypeError} err
     * @param {string} paramName
     * @param {*} paramVal
     * @param {string} validTypes
     * @param {string=} methodName
     * @return {!TypeError} 
     */
    function typeError(err, paramName, paramVal, validTypes, methodName) {

      /** @type {string} */
      var method;
      /** @type {string} */
      var param;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var val;

      method = _prepMethod(methodName);
      param = _prepParam(paramName);
      val = $print(paramVal);
      msg = 'invalid ' + param + ' data type for ' + method + ' call\n';
      msg += 'valid data types: `' + validTypes + '`\n';
      msg += 'actual ' + param + ' value: `' + val + '`';
      return _setErrorProps(err, 'TypeError', msg, paramVal);
    }

    /**
     * @param {!RangeError} err
     * @param {string} paramName
     * @param {(!Array<*>|string|undefined)=} validRange
     *   An `array` of actual valid options or a `string` stating the valid
     *   range. If `undefined` this option is skipped.
     * @param {string=} methodName
     * @return {!RangeError} 
     */
    function rangeError(err, paramName, validRange, methodName) {

      /** @type {string} */
      var method;
      /** @type {string} */
      var param;
      /** @type {string} */
      var msg;

      method = _prepMethod(methodName);
      param = _prepParam(paramName);
      msg = 'out-of-range ' + param + ' for ' + method + ' call';
      if ( $is.str(validRange) )
        msg += '\nvalid range: `' + validRange + '`';
      else if ( $is.arr(validRange) )
        msg += '\nvalid options:' + _mkOptions(validRange);
      return _setErrorProps(err, 'RangeError', msg);
    }

    return MK_ERR;
  }

  return $mkErrs;
})();
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
function $inArr(src, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = src['length'];
  i = -1;
  while (++i < len) {
    if (src[i] === val)
      return YES;
  }
  return NO;
}
/**
 * @private
 * @param {(!Object|!Function)} dest
 * @param {(!Object|!Function)} src
 * @return {(!Object|!Function)}
 */
function $merge(dest, src) {

  /** @type {string} */
  var key;

  for (key in src) {
    if ( $own(src, key) )
      dest[key] = src[key];
  }
  return dest;
}
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
 * @return {!Array}
 */
function $sliceArr(src, start, end) {

  /** @type {!Array} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = src['length'];

  if ( $is.void(start) )
    start = 0;
  if ( $is.void(end) )
    end = len;

  if (start < 0)
    start += len;
  if (start < 0)
    start = 0;

  if (end > len)
    end = len;
  else if (end < 0)
    end += len;

  if (start >= end)
    return [];

  result = new ARR(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end)
    result[i++] = src[ii];
  return result;
}

/**
 * @public
 * @param {(!Array<string>|...string)=} method = `"all"`
 *   The @vitals super methods to include in the output. The methods may be
 *   included by section or individually.
 * @return {(!Object|!Function)}
 *   If only one #method is defined and it is a super method (i.e. not a
 *   section), only the one #method is returned. Otherwise, an `object` with
 *   each defined #method set for its property keys and values is returned.
 */
function newVitals(method) {

  /** @type {!Array<string>} */
  var sections;
  /** @type {!Array<string>} */
  var methods;
  /** @type {(!Object|!Function)} */
  var vitals;

  switch (arguments['length']) {
    case 0:
      method = [];
      break;

    case 1:
      break;

    default:
      method = $sliceArr(arguments);
      break;
  }

  if ( $is.arr(method) ) {
    switch (method['length']) {
      case 0:
        sections = [ 'all' ];
        methods = [];
        break;

      case 1:
        method = method[0];

        if ( !$is.str(method) )
          throw $mkTypeErr(new TYPE_ERR, 'method', method,
            '(!Array<string>|...string)=');
        else if (!method)
          throw $mkErr(new ERR, 'invalid empty #method `string`');

        if ( _isSection(method) ) {
          sections = _getSections([ method ]);
          methods = [];
        }
        else if ( !_isMethod(method) )
          throw $mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);
        else {
          sections = [];
          methods = [ method ];
        }
        break;

      default:
        if ( !_isStrArr(method) )
          throw $mkTypeErr(new TYPE_ERR, 'method', method,
            '(!Array<string>|...string)=');
        else if ( !_isFullStrArr(method) )
          throw $mkErr(new ERR, 'invalid empty #method `string`');
        else if ( !_isValidStrArr(method) )
          throw $mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);

        sections = _getSections(method);
        methods = _getMethods(method, sections);
        break;
    }
  }
  else if ( !$is.str(method) )
    throw $mkTypeErr(new TYPE_ERR, 'method', method,
      '(!Array<string>|...string)=');
  else if (!method)
    throw $mkErr(new ERR, 'invalid empty #method `string`');
  else if ( _isSection(method) ) {
    sections = _getSections([ method ]);
    methods = [];
  }
  else if ( !_isMethod(method) )
    throw $mkRangeErr(new RANGE_ERR, 'method', _VALID_RANGE);
  else {
    sections = [];
    methods = [ method ];
  }

  vitals = _loadSections(sections);
  vitals = _loadMethods(vitals, methods, sections);
  vitals['mkGlobal'] = _newMkGlobal(vitals, sections, methods);
  vitals['makeGlobal'] = vitals['mkGlobal'];
  vitals['construct'] = newVitals;
  vitals['newVitals'] = newVitals;
  return vitals;
}




/**
 * @private
 * @const {!Object<string, !RegExp>}
 * @dict
 */
var _SECTIONS = {
  'all':    /^all$/i,
  'base':   /^base$/i,
  'strict': /^strict$/i,
  'fs':     /^fs$|^file-?system$/i,
  'shell':  /^shell$/i
};

/**
 * @private
 * @const {!Object<string, boolean>}
 * @dict
 */
var _METHODS = {
  'amend':  YES,
  'copy':   YES,
  'create': YES,
  'cut':    YES,
  'each':   YES,
  'fill':   YES,
  'freeze': YES,
  'fuse':   YES,
  'get':    YES,
  'has':    YES,
  'is':     YES,
  'remap':  YES,
  'roll':   YES,
  'run':    YES,
  'same':   YES,
  'seal':   YES,
  'slice':  YES,
  'to':     YES,
  'until':  YES
};

/**
 * @private
 * @const {!Object<string, !Array<string>>}
 * @dict
 */
var _SECTION_METHODS = {
  'all': [
    'amend',
    'copy',
    'create',
    'cut',
    'each',
    'fill',
    'freeze',
    'fuse',
    'get',
    'has',
    'is',
    'remap',
    'roll',
    'run',
    'same',
    'seal',
    'slice',
    'to',
    'until'
  ],
  'base': [
    'copy',
    'cut',
    'each',
    'fill',
    'fuse',
    'get',
    'has',
    'is',
    'remap',
    'roll',
    'same',
    'slice',
    'to',
    'until'
  ],
  'strict': [
    'amend',
    'create',
    'freeze',
    'seal'
  ],
  'fs': [
    'copy',
    'get',
    'is',
    'to'
  ],
  'shell': [
    'run'
  ]
};

/**
 * @private
 * @const {!Array<string>}
 */
var _VALID_RANGE = [
  'all',
  'base',
  'strict',
  'fs',
  'shell',
  'amend',
  'copy',
  'create',
  'cut',
  'each',
  'fill',
  'freeze',
  'fuse',
  'get',
  'has',
  'is',
  'remap',
  'roll',
  'run',
  'same',
  'seal',
  'slice',
  'to',
  'until'
];



/**
 * @private
 * @param {(!Object|!Function)} VITALS
 * @param {!Array<string>} SECTIONS
 * @param {!Array<string>} METHODS
 * @return {!function}
 */
function _newMkGlobal(VITALS, SECTIONS, METHODS) {

  /**
   * @private
   * @param {!Array<string>} methods
   * @return {void}
   */
  function _setMethods(methods) {

    /** @type {string} */
    var method;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = methods['length'];
    i = -1;
    while (++i < len) {
      method = methods[i];
      ROOT[method] = VITALS[method];
    }
  }

  /**
   * @description
   *   This method appends the `vitals` instance and each of its super methods
   *   to the `global` `object`.
   * @public
   * @return {void}
   */
  function mkGlobal() {

    /** @type {string} */
    var section;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    ROOT['VITALS'] = VITALS;
    ROOT['Vitals'] = VITALS;
    ROOT['vitals'] = VITALS;

    _setMethods(METHODS);

    len = SECTIONS['length'];
    i = -1;
    while (++i < len) {
      section = sections[i];
      _setMethods(_SECTION_METHODS[section]);
    }
  }

  return mkGlobal;
}

/**
 * @private
 * @param {!Array<string>} opts
 * @param {!Array<string>} sections
 * @return {!Array<string>}
 */
function _getMethods(opts, sections) {

  /** @type {boolean} */
  var hasNoBaseFs;
  /** @type {!Array<string>} */
  var methods;
  /** @type {string} */
  var opt;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  hasNoBaseFs = !$inArr(sections, 'base') && $inArr(sections, 'fs');
  methods = [];
  len = opts['length'];
  i = -1;
  while (++i < len) {
    opt = opts[i];
    if ( _isMethod(opt) && !$inArr(methods, opt) ) {
      if ( ( hasNoBaseFs && _inFs(opt) ) || !_inSections(sections, opt) )
        methods['push'](opt);
    }
  }
  return methods;
}

/**
 * @private
 * @param {!Array<string>} opts
 * @return {!Array<string>}
 */
function _getSections(opts) {

  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var opt;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  sections = [];
  len = opts['length'];
  i = -1;
  while (++i < len) {
    opt = opts[i];
    if ( $own(_SECTIONS, opt) ) {
      if ( !$inArr(sections, opt) )
        sections['push'](opt);
    }
    else {
      for (key in _SECTIONS) {
        if ( $own(_SECTIONS, key) && _SECTIONS[key]['test'](opt) ) {
          if ( !$inArr(sections, key) )
            sections['push'](key);
        }
      }
    }
  }
  return sections;
}

/**
 * @private
 * @param {?Object} vitals
 * @param {!Array<string>} methods
 * @param {!Array<string>} sections
 * @return {!Object}
 */
function _loadMethods(vitals, methods, sections) {

  /** @type {string} */
  var method;
  /** @type {boolean} */
  var hasFs;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];

  if (len === 0)
    return vitals;

  if (!vitals) {
    vitals = len === 1
      ? _requireMethod(methods[0])
      : {};
  }

  hasFs = $inArr(sections, 'fs');
  i = -1;
  while (++i < len) {
    method = methods[i];
    vitals[method] = hasFs && _inFs(method)
      ? _requireMethod(method + '-fs')
      : _requireMethod(method);
  }
  return vitals;
}

/**
 * @private
 * @param {!Array<string>} sections
 * @return {!Object}
 */
var _loadSections = (function _loadSectionsPrivateScope() {

  /**
   * @private
   * @param {!Object} vitals
   * @param {!Object} section
   * @param {!Array<string>} methods
   * @return {void}
   */
  function _setMethods(vitals, section, methods) {

    /** @type {string} */
    var method;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = methods['length'];
    i = -1;
    while (++i < len) {
      method = methods[i];
      vitals[method] = section[method];
    }
  }

  /**
   * @param {!Array<string>} sections
   * @return {!Object}
   */
  function loadSections(sections) {

    /** @type {boolean} */
    var hasBaseFs;
    /** @type {!Object} */
    var vitals;
    /** @type {!Object} */
    var result;
    /** @type {string} */
    var key;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (sections['length'] === 0)
      return NIL;

    hasBaseFs = $inArr(sections, 'base') && $inArr(sections, 'fs');
    vitals = {};
    len = sections['length'];
    i = -1;
    while (++i < len) {
      key = sections[i];
      result = key === 'base' && hasBaseFs
        ? _requireSection('base-fs')
        : _requireSection(key);
      vitals[key] = result;
      if (key !== 'fs' || !hasBaseFs)
        _setMethods(vitals, result, _SECTION_METHODS[key]);
    }
    return vitals;
  }

  return loadSections;
})();

/**
 * @private
 * @param {string} method
 * @return {!Function}
 */
function _requireMethod(method) {
  return require('./methods/' + method + '.js');
}

/**
 * @private
 * @param {string} section
 * @return {!Object}
 */
function _requireSection(section) {
  return require('./sections/' + section + '.js');
}




/**
 * @private
 * @param {string} method
 * @return {boolean}
 */
function _inFs(method) {
  return $inArr(_SECTION_METHODS['fs'], method);
}

/**
 * @private
 * @param {!Array<string>} sections
 * @param {string} method
 * @return {boolean}
 */
function _inSections(sections, method) {

  /** @type {string} */
  var section;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = sections['length'];
  i = -1;
  while (++i < len) {
    section = sections[i];
    if ( $inArr(_SECTION_METHODS[section], method) )
      return YES;
  }
  return NO;
}



/**
 * @private
 * @param {string} method
 * @return {boolean}
 */
function _isMethod(method) {
  return $own(_METHODS, method);
}

/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
function _isSection(section) {

  /** @type {string} */
  var key;

  if ( $own(_SECTIONS, section) )
    return YES;

  for (key in _SECTIONS) {
    if ( $own(_SECTIONS, key) && _SECTIONS[key]['test'](section) )
      return YES;
  }
  return NO;
}

/**
 * @private
 * @param {!Array} methods
 * @return {boolean}
 */
function _isStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if ( !$is.str(methods[i]) )
      return NO;
  }
  return YES;
}

/**
 * @private
 * @param {!Array<string>} methods
 * @return {boolean}
 */
function _isFullStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if (!methods[i])
      return NO;
  }
  return YES;
}

/**
 * @private
 * @param {!Array<string>} methods
 * @return {boolean}
 */
function _isValidStrArr(methods) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = methods['length'];
  i = -1;
  while (++i < len) {
    if ( !_isSection(methods[i]) && !_isMethod(methods[i]) )
      return NO;
  }
  return YES;
}



/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var _MK_ERR = $mkErrs();

  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var _mkErr = _MK_ERR.error;

  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var _mkTypeErr = _MK_ERR.typeError;

  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var _mkRangeErr = _MK_ERR.rangeError;



newVitals['VERSION'] = VERSION;
newVitals['construct'] = newVitals;
newVitals['newVitals'] = newVitals;
module.exports = newVitals;
})(this);

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol

