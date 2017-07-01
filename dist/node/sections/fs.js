/**
 * ---------------------------------------------------------------------------
 * VITALS
 * ---------------------------------------------------------------------------
 * @section fs
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
   * @public
   * @type {(!Object|!Function)}
   * @dict
   */
  var vitals = {};

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
 * @param {?Object} proto
 * @return {!Object}
 */
var $mkObj = (function $mkObjPrivateScope() {

  /// @docref [create]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

  /**
   * @description
   *   Polyfills [Object.create][create] if it does not exist.
   * @private
   * @param {?Object} proto
   * @return {!Object}
   */
  var _create = (function _createPrivateScope() {

    if ( 'create' in OBJ && $is.fun(OBJ['create']) )
      return OBJ['create'];

    /**
     * @private
     * @constructor
     */
    function _Obj(){}

    /**
     * @param {?Object} proto
     * @return {!Object}
     */
    function create(proto) {

      /** @type {!Object} */
      var obj;

      _Obj['prototype'] = proto;
      obj = new _Obj();
      _Obj['prototype'] = NIL;
      return obj;
    }

    return create;
  })();

  /**
   * @description
   *   Cross browser [Object.create][create] implementation.
   * @param {?Object} proto
   * @return {!Object}
   */
  function $mkObj(proto) {
    return _create(proto);
  }

  return $mkObj;
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
 * @param {string} src
 * @param {*} val
 * @return {boolean}
 */
var $strIncl = (function $strInclPrivateScope() {

  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

  /**
   * @description
   *   Polyfills [String.prototype.includes][includes] if it does not exist.
   * @param {string} src
   * @param {string} val
   * @return {boolean}
   */
  var $strIncl = 'includes' in STR_PROTO && $is.fun(STR_PROTO['includes'])
    ? function $strIncl(src, val) {
        return src['includes'](val);
      }
    : function $strIncl(src, val) {
        return src['indexOf'](val) !== -1;
      };

  return $strIncl;
})();
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function $cleanpath(path) {
  path['replace'](/\\+/g, '/');
  return path['replace'](/\/\/+/g, '/');
}
/**
 * @private
 * @param {(!Array<string|undefined>|!Arguments<string|undefined>|...string)=} path
 * @return {string}
 */
var $resolve = (function $resolvePrivateScope() {

  /// @docref [node]:(https://nodejs.org/)
  /// @docref [v0-10]:(https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
  /// @docref [v7-9]:(https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)

  /**
   * @private
   * @param {string} cwd
   * @param {(!Array<string|undefined>|!Arguments<string|undefined>)} paths
   * @return {!Array<string>}
   */
  function _mkPaths(cwd, paths) {

    /** @type {!Array<string>} */
    var result;
    /** @type {(string|undefined)} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = [ cwd ];
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      if ( $is._str(path) )
        result['push'](path);
    }
    return result;
  }

  /**
   * @description
   *   Resolves path segments into an absolute path. Note that older
   *   [node.js][node] versions of `path.resolve` such as [v0.10][v0-10]
   *   required a #path parameter (newer versions such as [v7.9][v7-9] do not
   *   require a #path parameter).
   * @private
   * @param {...string} path
   * @return {string}
   */
  var _resolve = PATH['resolve'];

  /**
   * @private
   * @param {string} cwd
   * @param {(!Array<string|undefined>|!Arguments<string|undefined>)} paths
   * @return {string}
   */
  function _resolvePaths(cwd, paths) {
    paths = _mkPaths(cwd, paths);
    return paths['length'] > 1
      ? _resolve['apply'](NIL, paths)
      : $cleanpath(cwd);
  }

  /**
   * @description
   *   Resolves path segments into an absolute path or returns the current
   *   working directory.
   * @param {(!Array<string|undefined>|!Arguments<string|undefined>|...string)=} path
   * @return {string}
   */
  function $resolve(path) {

    /** @type {string} */
    var cwd;

    cwd = process['cwd']();

    switch (arguments['length']) {
      case 0:
        return $cleanpath(cwd);

      case 1:
        if ( $is.void(path) )
          return $cleanpath(cwd);

        path = $is.str(path)
          ? _resolve(cwd, path)
          : _resolvePaths(cwd, path);
        return $cleanpath(path);

      default:
        path = _resolvePaths(cwd, arguments);
        return $cleanpath(path);
    }
  }

  return $resolve;
})();
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $addSlash = (function $addSlashPrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _END_SLASH = /\/$/;

  /**
   * @param {string} path
   * @return {string}
   */
  function $addSlash(path) {
    return _END_SLASH['test'](path)
      ? path
      : path + '/';
  }

  return $addSlash;
})();
/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function $cloneObj(obj) {

  /** @type {!Object} */
  var clone;
  /** @type {string} */
  var key;

  clone = {};
  for (key in obj) {
    if ( $own(obj, key) )
      clone[key] = obj[key];
  }
  return clone;
}
/**
 * @private
 * @param {string} source
 * @return {string}
 */
function $escRegx(source) {
  return source['replace'](/[\\^$.*+?|(){}[\]]/g, '\\$&');
}
/**
 * @private
 * @param {string} src
 * @param {string} eol
 * @return {string}
 */
var $fixEol = (function $fixEolPrivateScope() {

  /**
   * @private
   * @const {!Object<string, !function(string): string>}
   * @dict
   */
  var _EOLS = {
    'CRLF': function fixEolCRLF(src) {
      return src['replace'](/\r?\n|\r\n?/g, '\r\n');
    },
    'CR': function fixEolCR(src) {
      return src['replace'](/\r?\n/g, '\r');
    },
    'LF': function fixEolLF(src) {
      return src['replace'](/\r\n?/g, '\n');
    }
  };

  /**
   * @param {string} src
   * @param {string} eol
   * @return {string}
   */
  function $fixEol(src, eol) {
    return _EOLS[eol](src);
  }

  return $fixEol;
})();
/**
 * @private
 * @param {!Object<string, *>} opts
 * @param {string} opt
 * @return {boolean}
 */
function $hasOpt(opts, opt) {
  return $own(opts, opt) && !$is.void(opts[opt]);
}
/**
 * @description
 *   A cross-platform shortcut for `String.prototype.includes` and
 *   `RegExp.prototype.test`.
 * @private
 * @param {string} src
 * @param {*} patt
 * @return {boolean}
 */
function $match(src, patt) {

  if ( $is.regx(patt) )
    return patt['test'](src);

  patt = $mkStr(patt);
  return !src
    ? !patt
    : !patt
      ? YES
      : $strIncl(src, patt);
}
/**
 * @private
 * @param {string} path
 * @return {void}
 */
var $mkdir = (function $mkdirPrivateScope() {

  /**
   * @private
   * @param {string} path
   * @return {void}
   */
  var _mkdir = FS['mkdirSync'];

  /**
   * @param {string} path
   * @return {void}
   */
  function $mkdir(path) {
    if ( !$is.dir(path) )
      _mkdir(path);
  }

  return $mkdir;
})();
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $pathname = (function $pathnamePrivateScope() {

  /**
   * @private
   * @const {!RegExp}
   */
  var _DIRNAME = /^.*[\/\\]/;

  /**
   * @private
   * @const {!RegExp}
   */
  var _END_SLASH = /[\/\\]$/;

  /**
   * @param {string} path
   * @return {string}
   */
  function $pathname(path) {
    path = path['replace'](_END_SLASH, '');
    return path['replace'](_DIRNAME, '');
  }

  return $pathname;
})();
/**
 * @private
 * @param {string} path
 * @return {!Array<string>}
 */
var $readDir = FS['readdirSync'];
/**
 * @private
 * @param {string} path
 * @param {string=} encoding
 * @return {(!Buffer|string)}
 */
var $readFile = FS['readFileSync'];
/**
 * @private
 * @param {string} path
 * @param {string} contents
 * @param {string=} encoding
 * @return {void}
 */
var $writeFile = FS['writeFileSync'];
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var copy = (function copyPrivateScope() {


  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var copy = {};


  /// @section fs
  /// @method vitals.copy.file
  /**
   * @description
   *   Copy the contents of a file to a new or existing file.
   * @public
   * @param {string} source
   *   Must be a valid filepath to an existing file.
   * @param {string} dest
   *   Must be a valid filepath to a new or existing file, a valid dirpath to
   *   an existing directory, or a valid dirpath to a new directory noted by
   *   ending the #dest `string` with `"/"`.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.buffer option to
   *   its value.
   * @param {boolean=} opts.buffer = `true`
   *   If set to `true`, the #opts.buffer option directs @copy#file to not
   *   convert the `buffer` of the #source file's contents into a `string`
   *   before saving it to the #dest file (i.e. do not apply any normalization
   *   to the #source contents while copying). This also determines whether a
   *   `buffer` or `string` of the #source contents is returned.
   * @param {?string=} opts.encoding = `null`
   *   The #opts.encoding option sets the character encoding for the #source
   *   contents saved to the #dest file. If it is `null`, no character
   *   encoding is applied.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #source contents
   *   before they are saved to the #dest. If #opts.eol is set to `null`, no
   *   end of line character normalization is completed. The optional `string`
   *   values are as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   *   The #source file's contents.
   */
  function copyFile(source, dest, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'file');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'file');

      case 2:
        /** @dict */
        opts = $cloneObj(_DFLT_FILE_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'file');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'buffer') )
          opts['buffer'] = _DFLT_FILE_OPTS['buffer'];
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=', 'file');

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'file');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = $is.void(opts['encode'])
            ? _DFLT_FILE_OPTS['encoding']
            : opts['encode'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_FILE_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'file');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'file');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'file');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'file');
    else if ( !$is.file(source) )
      throw _mkErr(new ERR, 'invalid #source file path `' + source + '`',
        'file');

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'file');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'file');

    if ( _hasDirMark(dest) )
      $mkdir(dest);

    if ( $is.dir(dest) )
      dest = $resolve(dest, $pathname(source));

    return _copyFile(source, dest, opts);
  }
  copy['file'] = copyFile;

  /// @section fs
  /// @method vitals.copy.directory
  /// @alias vitals.copy.dir
  /**
   * @description
   *   Copy all of the files in a directory to another directory.
   * @public
   * @param {string} source
   *   Must be a valid directory path to an existing directory.
   * @param {string} dest
   *   Must be a valid directory path to an existing directory or a valid
   *   directory path to a new directory noted by ending the #dest `string`
   *   with `"/"`.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @copy#directory whether it should
   *   recursively copy all of the sub-directory trees within the #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.buffer = `true`
   *   If set to `true`, the #opts.buffer option directs @copy#directory to
   *   not convert the `buffer` of each #source file's contents into a
   *   `string` before saving it into the #dest directory (i.e. do not apply
   *   any normalization to the #source contents while copying).
   * @param {?string=} opts.encoding = `null`
   *   The #opts.encoding option sets the character encoding for each #source
   *   contents saved to each #dest file. If it is `null`, no character
   *   encoding is applied.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #source contents
   *   before they are saved to the #dest. If #opts.eol is set to `null`, no
   *   end of line character normalization is completed. The optional `string`
   *   values are as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {!Array<string>}
   *   An `array` of each file name copied from the #source to the #dest.
   */
  function copyDirectory(source, dest, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'directory');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'directory');

      case 2:
        /** @dict */
        opts = $cloneObj(_DFLT_DIR_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_DIR_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_DIR_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_DIR_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'directory');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_DIR_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'buffer') )
          opts['buffer'] = _DFLT_DIR_OPTS['buffer'];
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=', 'directory');

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'directory');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'directory');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = $is.void(opts['encode'])
            ? _DFLT_DIR_OPTS['encoding']
            : opts['encode'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'directory');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'directory');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_DIR_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'directory');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'directory');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'directory');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'directory');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'directory');

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'directory');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'directory');

    if ( _hasDirMark(dest) )
      $mkdir(dest);

    if ( !$is.dir(dest) )
      throw _mkErr(new ERR, 'invalid #dest directory path `' + source + '`',
        'directory');

    return _copyDir(source, dest, opts);
  }
  copy['directory'] = copyDirectory;
  copy['dir'] = copyDirectory;




  /**
   * @private
   * @param {string} source
   * @param {string} dest
   * @param {!Object} opts
   * @return {(!Buffer|string)}
   */
  function _copyFile(source, dest, opts) {

    /** @type {(!Buffer|string)} */
    var contents;
    /** @type {?string} */
    var encoding;
    /** @type {?string} */
    var eol;

    encoding = opts['encoding'];
    eol = opts['eol'];

    if (opts['buffer']) {
      contents = $readFile(source);
      if (encoding)
        $writeFile(dest, contents, encoding);
      else
        $writeFile(dest, contents);
    }
    else if (encoding) {
      contents = $readFile(source, encoding);
      if (eol)
        contents = $fixEol(contents, eol);
      $writeFile(dest, contents, encoding);
    }
    else if (eol) {
      contents = $readFile(source);
      contents = contents['toString']();
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents);
    }
    else {
      contents = $readFile(source);
      $writeFile(dest, contents);
      contents = contents['toString']();
    }
    return contents;
  }

  /**
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {!Object} opts
   * @return {!Array<string>}
   */
  function _copyDir(src, dest, opts) {

    /** @type {?string} */
    var encoding;
    /** @type {boolean} */
    var deep;
    /** @type {?string} */
    var eol;

    src = $resolve(src);
    dest = $resolve(dest);

    if (opts['deep'])
      _mkSubDirs(src, dest);

    eol = opts['eol'];
    deep = opts['deep'];
    encoding = opts['encoding'];

    return opts['buffer']
      ? encoding
        ? _copyDirByBuffWithEncode(src, dest, deep, encoding)
        : _copyDirByBuff(src, dest, deep)
      : encoding
        ? eol
          ? _copyDirByStrWithEncodeEol(src, dest, deep, encoding, eol)
          : _copyDirByStrWithEncode(src, dest, deep, encoding)
        : eol
          ? _copyDirByStrWithEol(src, dest, deep, eol)
          : _copyDirByStr(src, dest, deep);
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @return {!Array<string>}
   */
  function _copyDirByBuff(SRC, DEST, deep) {

    /** @type {!Buffer} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src);
      $writeFile(dest, contents);
    }
    return paths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @return {!Array<string>}
   */
  function _copyDirByBuffWithEncode(SRC, DEST, deep, encoding) {

    /** @type {!Buffer} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @return {!Array<string>}
   */
  function _copyDirByStr(SRC, DEST, deep) {

    /** @type {!Buffer} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src);
      $writeFile(dest, contents);
    }
    return paths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} eol
   * @return {!Array<string>}
   */
  function _copyDirByStrWithEol(SRC, DEST, deep, eol) {

    /** @type {string} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src)['toString']();
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents);
    }
    return paths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @return {!Array<string>}
   */
  function _copyDirByStrWithEncode(SRC, DEST, deep, encoding) {

    /** @type {string} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src, encoding);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @param {boolean} deep
   * @param {string} encoding
   * @param {string} eol
   * @return {!Array<string>}
   */
  function _copyDirByStrWithEncodeEol(SRC, DEST, deep, encoding, eol) {

    /** @type {string} */
    var contents;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {string} */
    var dest;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getFilepaths(SRC, deep);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      src = $resolve(SRC, path);
      dest = $resolve(DEST, path);
      contents = $readFile(src, encoding);
      contents = $fixEol(contents, eol);
      $writeFile(dest, contents, encoding);
    }
    return paths;
  }




  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': NIL,
    'buffer': YES,
    'encoding': NIL
  };

  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_DIR_OPTS = {
    'eol': NIL,
    'deep': NO,
    'buffer': YES,
    'encoding': NIL
  };



  /**
   * @private
   * @param {string} SRC
   * @param {string} dirpath
   * @param {!Array<string>} dirpaths
   * @return {void}
   */
  function _appendDirpaths(SRC, dirpath, dirpaths) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpath = $addSlash(dirpath);
    src = $resolve(SRC, dirpath);
    paths = _getDirpaths(src);
    len = paths['length'];
    i = -1;
    while (++i < len)
      dirpaths['push'](dirpath + paths[i]);
  }

  /**
   * @private
   * @param {string} SRC
   * @param {string} dirpath
   * @param {!Array<string>} filepaths
   * @return {void}
   */
  function _appendFilepaths(SRC, dirpath, filepaths) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpath = $addSlash(dirpath);
    src = $resolve(SRC, dirpath);
    paths = _getFilepaths(src);
    len = paths['length'];
    i = -1;
    while (++i < len)
      filepaths['push'](dirpath + paths[i]);
  }

  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getDirpaths(SRC) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {string} */
    var dirpath;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    dirpaths = [];
    paths = $readDir(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      dirpath = $cleanpath(paths[i]);
      path = $resolve(SRC, dirpath);
      if ( $is.dir(path) )
        dirpaths['push'](dirpath);
    }
    return dirpaths;
  }

  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getDirpathsDeep(SRC) {

    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {number} */
    var i;

    dirpaths = _getDirpaths(SRC);
    i = -1;
    while (++i < dirpaths['length'])
      _appendDirpaths(SRC, dirpaths[i], dirpaths);
    return dirpaths;
  }

  /**
   * @private
   * @param {string} SRC
   * @param {boolean=} deep
   * @return {!Array<string>}
   */
  function _getFilepaths(SRC, deep) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {string} */
    var filepath;
    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (deep)
      return _getFilepathsDeep(SRC);

    filepaths = [];
    paths = $readDir(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      filepath = $cleanpath(paths[i]);
      path = $resolve(SRC, filepath);
      if ( $is.file(path) )
        filepaths['push'](filepath);
    }
    return filepaths;
  }

  /**
   * @private
   * @param {string} SRC
   * @return {!Array<string>}
   */
  function _getFilepathsDeep(SRC) {

    /** @type {!Array<string>} */
    var filepaths;
    /** @type {!Array<string>} */
    var dirpaths;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    filepaths = _getFilepaths(SRC);
    dirpaths = _getDirpathsDeep(SRC);
    len = dirpaths['length'];
    i = -1;
    while (++i < len)
      _appendFilepaths(SRC, dirpaths[i], filepaths);
    return filepaths;
  }

  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  var _hasDirMark = (function _hasDirMarkPrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _DIR_MARK = /\/$/;

    /**
     * @param {string} path
     * @return {string}
     */
    function hasDirMark(path) {
      return $match(path, _DIR_MARK);
    }

    return hasDirMark;
  })();

  /**
   * @private
   * @param {string} SRC
   * @param {string} DEST
   * @return {void}
   */
  function _mkSubDirs(SRC, DEST) {

    /** @type {!Array<string>} */
    var paths;
    /** @type {string} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    paths = _getDirpathsDeep(SRC);
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = $resolve(DEST, paths[i]);
      $mkdir(path);
    }
  }



  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('copy');

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



  return copy;
})();
vitals['copy'] = copy;
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var get = (function getPrivateScope() {


  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var get = {};


  /// @section fs
  /// @method vitals.get.file
  /**
   * @description
   *   Gets the contents of a file.
   * @public
   * @param {string} path
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.buffer option to
   *   its value.
   * @param {boolean=} opts.buffer = `false`
   *   If set to `true`, the #opts.buffer option directs @get#file to not set
   *   an encoding when retrieving the #path file's contents and to not
   *   convert the `buffer` of the #path file's contents into a `string`
   *   before returning it (i.e. do not apply any normalization to the #path
   *   contents).
   * @param {?string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option only applies if #opts.buffer is `false`. It
   *   sets the character encoding for the #path contents returned. If it is
   *   `null`, no character encoding is applied.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option only applies if #opts.buffer is `false`. It sets
   *   the end of line character to use when normalizing the #path contents
   *   before they are returned. If #opts.eol is set to `null`, no end of line
   *   character normalization is completed. The optional `string` values are
   *   as follows (values are **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   */
  function getFile(path, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #path defined', 'file');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_FILE_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_FILE_OPTS);
            opts['buffer'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'file');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'buffer') )
          opts['buffer'] = _DFLT_FILE_OPTS['buffer'];
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=', 'file');

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'file');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = $is.void(opts['encode'])
            ? _DFLT_FILE_OPTS['encoding']
            : opts['encode'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_FILE_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'file');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'file');
    }

    if ( !$is.str(path) )
      throw _mkTypeErr(new TYPE_ERR, 'path', path, 'string', 'file');
    else if (!path)
      throw _mkErr(new ERR, 'invalid empty #path `string`', 'file');
    else if ( !$is.file(path) )
      throw _mkErr(new ERR, 'invalid #path file path `' + path + '`',
        'file');

    return _getFile(path, opts);
  }
  get['file'] = getFile;

  /// @section fs
  /// @method vitals.get.directoryPaths
  /// @alias vitals.get.directorypaths
  /// @alias vitals.get.directories
  /// @alias vitals.get.dirPaths
  /// @alias vitals.get.dirpaths
  /// @alias vitals.get.dirs
  /**
   * @description
   *   Gets all of the directory paths within a directory tree.
   * @public
   * @param {string} source
   *   Must be a valid directory path.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @get#dirpaths whether it should recursively
   *   retrieve all of the sub-directory paths within the #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.base = `false`
   *   The #opts.base option tells @get#dirpaths whether it should append the
   *   #source directory path to the base of each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.basepath
   *   An alias for the #opts.base option.
   * @param {boolean=} opts.abs = `false`
   *   The #opts.abs option only applies if #opts.base is `true`. It appends
   *   the absolute path of the #source to each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.absolute
   *   An alias for the #opts.abs option.
   * @param {boolean=} opts.glob = `true`
   *   The #opts.glob option defines whether a `string` value provided for
   *   #opts.validDirs or #opts.invalidDirs is allowed to contain the
   *   following wildcard values:
   *   - `"*"`!$
   *     This wildcard states that any `number` (`0` or more) of characters
   *     except for the directory separator, `"/"`, is allowed in its place.
   *     Use the backslash, `"\\"`, to escape a literal asterisk.
   * @param {boolean=} opts.wildcard
   *   An alias for the #opts.glob option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs = `null`
   *   The #opts.validDirs option limits the returned directory paths. The
   *   remaining details are as follows (per #opts.validDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validDirs contains
   *     a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `false`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validDirs `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validDirs is considered a filter `function` (i.e. if it
   *       returns `false`, the directory and its sub-directories are **not**
   *       added to the results). If the value returned by the filter is not a
   *       `boolean`, it is converted into a `boolean`. It has the following
   *       optional parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid
   *   An alias for the #opts.validDirs option.
   * @param {boolean=} opts.extendValidDirs = `false`
   *   The #opts.extendValidDirs option only applies if the #opts.validDirs
   *   default value is not `null` and #opts.validDirs is defined. If the
   *   #opts.extendValidDirs option is set to `true`, any value supplied to
   *   #opts.validDirs supplements as opposed to overwrites its default value.
   * @param {boolean=} opts.extendValid
   *   An alias for the #opts.extendValidDirs option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs = `/^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/`
   *   The #opts.invalidDirs option limits the returned directory paths. The
   *   remaining details are as follows (per #opts.invalidDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidDirs
   *     contains a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `true`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidDirs `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidDirs is considered a filter `function` (i.e. if it
   *       returns `true`, the directory and its sub-directories are **not**
   *       added to the results). If the value returned by the filter is not a
   *       `boolean`, it is converted into a `boolean`. It has the following
   *       optional parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid
   *   An alias for the #opts.invalidDirs option.
   * @param {boolean=} opts.extendInvalidDirs = `false`
   *   The #opts.extendInvalidDirs option only applies if the
   *   #opts.invalidDirs default value is not `null` and #opts.invalidDirs is
   *   defined. If the #opts.extendInvalidDirs option is set to `true`, any
   *   value supplied to #opts.invalidDirs supplements as opposed to
   *   overwrites its default value.
   * @param {boolean=} opts.extendInvalid
   *   An alias for the #opts.extendInvalidDirs option.
   * @return {!Array<string>}
   */
  function getDirectoryPaths(source, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'directoryPaths');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_DIRS_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_DIRS_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_DIRS_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_DIRS_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'directoryPaths');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_DIRS_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'basepath') )
          opts['basepath'] = VOID;
        else if ( !$is.bool(opts['basepath']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.basepath', opts['basepath'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'base') )
          opts['base'] = $is.bool(opts['basepath'])
            ? opts['basepath']
            : _DFLT_DIRS_OPTS['base'];
        else if ( !$is.bool(opts['base']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.base', opts['base'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'absolute') )
          opts['absolute'] = VOID;
        else if ( !$is.bool(opts['absolute']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.absolute', opts['absolute'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'abs') )
          opts['abs'] = $is.bool(opts['absolute'])
            ? opts['absolute']
            : _DFLT_DIRS_OPTS['abs'];
        else if ( !$is.bool(opts['abs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.abs', opts['abs'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'wildcard') )
          opts['wildcard'] = VOID;
        else if ( !$is.bool(opts['wildcard']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.wildcard', opts['wildcard'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'glob') )
          opts['glob'] = $is.bool(opts['wildcard'])
            ? opts['wildcard']
            : _DFLT_DIRS_OPTS['glob'];
        else if ( !$is.bool(opts['glob']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.glob', opts['glob'],
            'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'extendValid') )
          opts['extendValid'] = VOID;
        else if ( !$is.bool(opts['extendValid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValid',
            opts['extendValid'], 'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'extendValidDirs') )
          opts['extendValidDirs'] = $is.bool(opts['extendValid'])
            ? opts['extendValid']
            : _DFLT_DIRS_OPTS['extendValidDirs'];
        else if ( !$is.bool(opts['extendValidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidDirs',
            opts['extendValidDirs'], 'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'extendInvalid') )
          opts['extendInvalid'] = VOID;
        else if ( !$is.bool(opts['extendInvalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalid',
            opts['extendInvalid'], 'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'extendInvalidDirs') )
          opts['extendInvalidDirs'] = $is.bool(opts['extendInvalid'])
            ? opts['extendInvalid']
            : _DFLT_DIRS_OPTS['extendInvalidDirs'];
        else if ( !$is.bool(opts['extendInvalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidDirs',
            opts['extendInvalidDirs'], 'boolean=', 'directoryPaths');

        if ( !$hasOpt(opts, 'valid') )
          opts['valid'] = VOID;
        else if ( !_isPattOpt(opts['valid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.valid', opts['valid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'directoryPaths');

        if ( !$hasOpt(opts, 'validDirs') ) {
          if ( !$is.void(opts['valid']) )
            opts['validDirs'] = opts['valid'];
          else {
            opts['validDirs'] = _DFLT_DIRS_OPTS['validDirs'];
            opts['extendValidDirs'] = NO;
          }
        }
        else if ( !_isPattOpt(opts['validDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validDirs', opts['validDirs'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'directoryPaths');

        if ( !$hasOpt(opts, 'invalid') )
          opts['invalid'] = VOID;
        else if ( !_isPattOpt(opts['invalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalid', opts['invalid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'directoryPaths');

        if ( !$hasOpt(opts, 'invalidDirs') ) {
          if ( !$is.void(opts['invalid']) )
            opts['invalidDirs'] = opts['invalid'];
          else {
            opts['invalidDirs'] = _DFLT_DIRS_OPTS['invalidDirs'];
            opts['extendInvalidDirs'] = NO;
          }
        }
        else if ( !_isPattOpt(opts['invalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidDirs',
            opts['invalidDirs'], '(?RegExp|?Array<string>|?string|?function' +
            '(string=, string=, string=): *)=', 'directoryPaths');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
        'directoryPaths');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`',
        'directoryPaths');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'directoryPaths');

    return _getDirs(source, opts);
  }
  get['directoryPaths'] = getDirectoryPaths;
  get['directorypaths'] = getDirectoryPaths;
  get['directories'] = getDirectoryPaths;
  get['dirPaths'] = getDirectoryPaths;
  get['dirpaths'] = getDirectoryPaths;
  get['dirs'] = getDirectoryPaths;

  /// @section fs
  /// @method vitals.get.filePaths
  /// @alias vitals.get.filepaths
  /// @alias vitals.get.files
  /**
   * @description
   *   Gets all of the file paths within a directory tree.
   * @public
   * @param {string} source
   *   Must be a valid directory path.
   * @param {(?Object|?boolean)=} opts
   *   If the #opts is a `boolean` value, it sets the #opts.deep option to its
   *   value.
   * @param {boolean=} opts.deep = `false`
   *   The #opts.deep option tells @get#filepaths whether it should
   *   recursively retrieve all of the sub-directory file paths within the
   *   #source.
   * @param {boolean=} opts.recursive
   *   An alias for the #opts.deep option.
   * @param {boolean=} opts.base = `false`
   *   The #opts.base option tells @get#filepaths whether it should append the
   *   #source directory path to the base of each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.basepath
   *   An alias for the #opts.base option.
   * @param {boolean=} opts.abs = `false`
   *   The #opts.abs option only applies if #opts.base is `true`. It appends
   *   the absolute path of the #source to each of the resulting directory
   *   paths found.
   * @param {boolean=} opts.absolute
   *   An alias for the #opts.abs option.
   * @param {boolean=} opts.glob = `true`
   *   The #opts.glob option defines whether a `string` pattern provided for
   *   any valid or invalid #opts test option is allowed to contain the
   *   following wildcard values:
   *   - `"*"`!$
   *     This wildcard states that any `number` (`0` or more) of characters
   *     except for the directory separator, `"/"`, is allowed in its place.
   *     Use the backslash, `"\\"`, to escape a literal asterisk.
   * @param {boolean=} opts.wildcard
   *   An alias for the #opts.glob option.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid = `null`
   *   The #opts.valid option limits the returned file paths and the checked
   *   directory paths. The remaining details are as follows (per #opts.valid
   *   data type):
   *   - *`null`*!$
   *     All file and directory paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.valid contains a
   *     directory separator, `"/"`, each file and directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file and
   *     directory **name** is [tested][test] against the `RegExp`. If a
   *     [test][test] returns `false`, the file is **not** added to the
   *     results or the directory's children (if #opts.deep is enabled) are
   *     **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.valid `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.valid is considered a filter `function` (i.e. if it
   *       returns `false`, the file is **not** added to the results or the
   *       directory's children are **not** checked). If the value returned by
   *       the filter is not a `boolean`, it is converted into a `boolean`. It
   *       has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValid = `false`
   *   The #opts.extendValid option only applies if the #opts.valid default
   *   value is not `null` and #opts.valid is defined. If the
   *   #opts.extendValid option is set to `true`, any value supplied to
   *   #opts.valid supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid = `null`
   *   The #opts.invalid option limits the returned file paths and the checked
   *   directory paths. The remaining details are as follows (per
   *   #opts.invalid data type):
   *   - *`null`*!$
   *     All file and directory paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalid contains a
   *     directory separator, `"/"`, each file and directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file and
   *     directory **name** is [tested][test] against the `RegExp`. If a
   *     [test][test] returns `true`, the file is **not** added to the results
   *     or the directory's children (if #opts.deep is enabled) are **not**
   *     checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalid `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalid is considered a filter `function` (i.e. if it
   *       returns `true`, the file is **not** added to the results or the
   *       directory's children are **not** checked). If the value returned by
   *       the filter is not a `boolean`, it is converted into a `boolean`. It
   *       has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalid = `false`
   *   The #opts.extendValid option only applies if the #opts.valid default
   *   value is not `null` and #opts.valid is defined. If the
   *   #opts.extendValid option is set to `true`, any value supplied to
   *   #opts.valid supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs = `null`
   *   The #opts.validDirs option limits the checked directory paths. The
   *   remaining details are as follows (per #opts.validDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validDirs contains
   *     a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `false`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validDirs `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validDirs is considered a filter `function` (i.e. if it
   *       returns `false`, the directory and its sub-directories are **not**
   *       checked). If the value returned by the filter is not a `boolean`,
   *       it is converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValidDirs = `false`
   *   The #opts.extendValidDirs option only applies if the #opts.validDirs
   *   default value is not `null` and #opts.validDirs is defined. If the
   *   #opts.extendValidDirs option is set to `true`, any value supplied to
   *   #opts.validDirs supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs = `/^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/`
   *   The #opts.invalidDirs option limits the checked directory paths. The
   *   remaining details are as follows (per #opts.invalidDirs data type):
   *   - *`null`*!$
   *     All directory names and paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidDirs
   *     contains a directory separator, `"/"`, each directory **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each directory
   *     **name** is [tested][test] against the `RegExp`. If a [test][test]
   *     returns `true`, the directory and its sub-directories (if #opts.deep
   *     is enabled) are **not** checked.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidDirs `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidDirs is considered a filter `function` (i.e. if it
   *       returns `true`, the directory and its sub-directories are **not**
   *       checked). If the value returned by the filter is not a `boolean`,
   *       it is converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **dirname** *`string`*
   *       - **dirpath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalidDirs = `false`
   *   The #opts.extendInvalidDirs option only applies if the
   *   #opts.invalidDirs default value is not `null` and #opts.invalidDirs is
   *   defined. If the #opts.extendInvalidDirs option is set to `true`, any
   *   value supplied to #opts.invalidDirs supplements as opposed to
   *   overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string)=} opts.validExts = `null`
   *   The #opts.validExts option limits the returned file paths by checking
   *   their file extension. Note that a file extension is defined as the
   *   first period, `"."`, in a file name that is only followed by
   *   alpha-numerics (i.e. `/\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9)*$/`). The
   *   remaining details are as follows (per #opts.validExts data type):
   *   - *`null`*!$
   *     All file extensions are considered valid.
   *   - *`!RegExp`*!$
   *     Each file's extension is [tested][test] against #opts.validExts. If
   *     a [test][test] returns `false`, the file is **not** added to the
   *     results.
   *   - *`!Array<string>`*!$
   *     Each string must consist of only alpha-numerics, periods, and (if
   *     #opts.glob is enabled) any valid wildcard characters. All periods
   *     are escaped and a leading period is appended if it is missing for
   *     each `string`. After being cleaned each `string` is [joined][join]
   *     together with a [pipe character][pipe], `"|"`. Finally, the
   *     [joined][join] `string` is converted into a `RegExp` and all of the
   *     `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     Each string must consist of only alpha-numerics, periods, pipes, and
   *     (if #opts.glob is enabled) any valid wildcard characters. All periods
   *     and pipes are escaped and a leading period is appended to each file
   *     extension if it is missing for the `string`. Finally, the cleaned
   *     `string` is converted into a `RegExp` and all of the `RegExp` rules
   *     stated above apply.
   * @param {boolean=} opts.extendValidExts = `false`
   *   The #opts.extendValidExts option only applies if the #opts.validExts
   *   default value is not `null` and #opts.validExts is defined. If the
   *   #opts.extendValidExts option is set to `true`, any value supplied to
   *   #opts.validExts supplements as opposed to overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string)=} opts.invalidExts = `null`
   *   The #opts.invalidExts option limits the returned file paths by checking
   *   their file extension. Note that a file extension is defined as the
   *   first period, `"."`, in a file name that is only followed by
   *   alpha-numerics (i.e. `/\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9)*$/`). The
   *   remaining details are as follows (per #opts.invalidExts data type):
   *   - *`null`*!$
   *     All file extensions are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     Each file's extension is [tested][test] against #opts.invalidExts. If
   *     a [test][test] returns `true`, the file is **not** added to the
   *     results.
   *   - *`!Array<string>`*!$
   *     Each string must consist of only alpha-numerics, periods, and (if
   *     #opts.glob is enabled) any valid wildcard characters. All periods
   *     are escaped and a leading period is appended if it is missing for
   *     each `string`. After being cleaned each `string` is [joined][join]
   *     together with a [pipe character][pipe], `"|"`. Finally, the
   *     [joined][join] `string` is converted into a `RegExp` and all of the
   *     `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     Each string must consist of only alpha-numerics, periods, pipes, and
   *     (if #opts.glob is enabled) any valid wildcard characters. All periods
   *     and pipes are escaped and a leading period is appended to each file
   *     extension if it is missing for the `string`. Finally, the cleaned
   *     `string` is converted into a `RegExp` and all of the `RegExp` rules
   *     stated above apply.
   * @param {boolean=} opts.extendInvalidExts = `false`
   *   The #opts.extendInvalidExts option only applies if the
   *   #opts.invalidExts default value is not `null` and #opts.invalidExts is
   *   defined. If the #opts.extendInvalidExts option is set to `true`, any
   *   value supplied to #opts.invalidExts supplements as opposed to
   *   overwrites its default value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validFiles = `null`
   *   The #opts.validFiles option limits the returned file paths. The
   *   remaining details are as follows (per #opts.validFiles data type):
   *   - *`null`*!$
   *     All file paths are considered valid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.validFiles contains
   *     a directory separator, `"/"`, each file **path** is [tested][test]
   *     against the `RegExp`. Otherwise, each file **name** is [tested][test]
   *     against the `RegExp`. If a [test][test] returns `false`, the file is
   *     **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.validFiles `array`. Second, each `string` within the
   *     `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.validFiles is considered a filter `function` (i.e. if it
   *       returns `false`, the file is **not** added to the results). If the
   *       value returned by the filter is not a `boolean`, it is converted
   *       into a `boolean`. It has the following optional parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendValidFiles = `false`
   *   The #opts.extendValidFiles option only applies if the #opts.validFiles
   *   default value is not `null` and #opts.validFiles is defined. If the
   *   #opts.extendValidFiles option is set to `true`, any value supplied to
   *   #opts.validFiles supplements as opposed to overwrites its default
   *   value.
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidFiles = `null`
   *   The #opts.invalidFiles option limits the returned file paths. The
   *   remaining details are as follows (per #opts.invalidFiles data type):
   *   - *`null`*!$
   *     All file paths are **not** considered invalid.
   *   - *`!RegExp`*!$
   *     If the [RegExp.prototype.source][source] of #opts.invalidFiles
   *     contains a directory separator, `"/"`, each file **path** is
   *     [tested][test] against the `RegExp`. Otherwise, each file **name** is
   *     [tested][test] against the `RegExp`. If a [test][test] returns
   *     `true`, the file is **not** added to the results.
   *   - *`!Array<string>`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) are escaped for each `string`
   *     within the #opts.invalidFiles `array`. Second, each `string` within
   *     the `array` is [joined][join] together with a [pipe character][pipe],
   *     `"|"`. Third, the [joined][join] `string` is converted into a
   *     `RegExp` using its new value for the [RegExp source][source].
   *     Finally, all the `RegExp` rules stated above apply.
   *   - *`string`*!$
   *     First, all of the [special characters][special] (unless #opts.glob is
   *     enabled then its wildcard rules apply) expect for the
   *     [pipe character][pipe], `"|"`, are escaped. Second, the escaped
   *     `string` is converted into a `RegExp` using its value for the
   *     [RegExp source][source]. Finally, all the `RegExp` rules stated above
   *     apply.
   *   - *`function(string=, string=, string=): *`*!$
   *       The #opts.invalidFiles is considered a filter `function` (i.e. if
   *       it returns `true`, the file is **not** added to the results). If
   *       the value returned by the filter is not a `boolean`, it is
   *       converted into a `boolean`. It has the following optional
   *       parameters:
   *       - **filename** *`string`*
   *       - **filepath** *`string`*
   *       - **source** *`string`*
   * @param {boolean=} opts.extendInvalidFiles = `false`
   *   The #opts.extendInvalidFiles option only applies if the
   *   #opts.invalidFiles default value is not `null` and #opts.invalidFiles
   *   is defined. If the #opts.extendInvalidFiles option is set to `true`,
   *   any value supplied to #opts.invalidFiles supplements as opposed to
   *   overwrites its default value.
   * @return {!Array<string>}
   */
  function getFilePaths(source, opts) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'filePaths');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_FILES_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILES_OPTS);
          break;
        }

        if ( $is.bool(opts) ) {
          if (opts) {
            /** @dict */
            opts = $cloneObj(_DFLT_FILES_OPTS);
            opts['deep'] = YES;
          }
          else {
            /** @dict */
            opts = $cloneObj(_DFLT_FILES_OPTS);
            opts['deep'] = NO;
          }
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?boolean)=',
            'filePaths');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'recursive') )
          opts['recursive'] = VOID;
        else if ( !$is.bool(opts['recursive']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.recursive', opts['recursive'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'deep') )
          opts['deep'] = $is.bool(opts['recursive'])
            ? opts['recursive']
            : _DFLT_FILES_OPTS['deep'];
        else if ( !$is.bool(opts['deep']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.deep', opts['deep'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'basepath') )
          opts['basepath'] = VOID;
        else if ( !$is.bool(opts['basepath']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.basepath', opts['basepath'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'base') )
          opts['base'] = $is.bool(opts['basepath'])
            ? opts['basepath']
            : _DFLT_FILES_OPTS['base'];
        else if ( !$is.bool(opts['base']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.base', opts['base'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'absolute') )
          opts['absolute'] = VOID;
        else if ( !$is.bool(opts['absolute']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.absolute', opts['absolute'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'abs') )
          opts['abs'] = $is.bool(opts['absolute'])
            ? opts['absolute']
            : _DFLT_FILES_OPTS['abs'];
        else if ( !$is.bool(opts['abs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.abs', opts['abs'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'wildcard') )
          opts['wildcard'] = VOID;
        else if ( !$is.bool(opts['wildcard']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.wildcard', opts['wildcard'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'glob') )
          opts['glob'] = $is.bool(opts['wildcard'])
            ? opts['wildcard']
            : _DFLT_FILES_OPTS['glob'];
        else if ( !$is.bool(opts['glob']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.glob', opts['glob'],
            'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendValid') )
          opts['extendValid'] = _DFLT_FILES_OPTS['extendValid'];
        else if ( !$is.bool(opts['extendValid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValid',
            opts['extendValid'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendInvalid') )
          opts['extendInvalid'] = _DFLT_FILES_OPTS['extendInvalid'];
        else if ( !$is.bool(opts['extendInvalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalid',
            opts['extendInvalid'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendValidDirs') )
          opts['extendValidDirs'] = _DFLT_FILES_OPTS['extendValidDirs'];
        else if ( !$is.bool(opts['extendValidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidDirs',
            opts['extendValidDirs'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendInvalidDirs') )
          opts['extendInvalidDirs'] = _DFLT_FILES_OPTS['extendInvalidDirs'];
        else if ( !$is.bool(opts['extendInvalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidDirs',
            opts['extendInvalidDirs'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendValidExts') )
          opts['extendValidExts'] = _DFLT_FILES_OPTS['extendValidExts'];
        else if ( !$is.bool(opts['extendValidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidExts',
            opts['extendValidExts'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendInvalidExts') )
          opts['extendInvalidExts'] = _DFLT_FILES_OPTS['extendInvalidExts'];
        else if ( !$is.bool(opts['extendInvalidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidExts',
            opts['extendInvalidExts'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendValidFiles') )
          opts['extendValidFiles'] = _DFLT_FILES_OPTS['extendValidFiles'];
        else if ( !$is.bool(opts['extendValidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendValidFiles',
            opts['extendValidFiles'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'extendInvalidFiles') )
          opts['extendInvalidFiles'] = _DFLT_FILES_OPTS['extendInvalidFiles'];
        else if ( !$is.bool(opts['extendInvalidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.extendInvalidFiles',
            opts['extendInvalidFiles'], 'boolean=', 'filePaths');

        if ( !$hasOpt(opts, 'valid') ) {
          opts['valid'] = _DFLT_FILES_OPTS['valid'];
          opts['extendValid'] = NO;
        }
        else if ( !_isPattOpt(opts['valid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.valid', opts['valid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filePaths');

        if ( !$hasOpt(opts, 'invalid') ) {
          opts['invalid'] = _DFLT_FILES_OPTS['invalid'];
          opts['extendInvalid'] = NO;
        }
        else if ( !_isPattOpt(opts['invalid']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalid', opts['invalid'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filePaths');

        if ( !$hasOpt(opts, 'validDirs') ) {
          opts['validDirs'] = _DFLT_FILES_OPTS['validDirs'];
          opts['extendValidDirs'] = NO;
        }
        else if ( !_isPattOpt(opts['validDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validDirs', opts['validDirs'],
            '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filePaths');

        if ( !$hasOpt(opts, 'invalidDirs') ) {
          opts['invalidDirs'] = _DFLT_FILES_OPTS['invalidDirs'];
          opts['extendInvalidDirs'] = NO;
        }
        else if ( !_isPattOpt(opts['invalidDirs']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidDirs',
            opts['invalidDirs'], '(?RegExp|?Array<string>|?string|?function' +
            '(string=, string=, string=): *)=', 'filePaths');

        if ( !$hasOpt(opts, 'validExts') ) {
          opts['validExts'] = _DFLT_FILES_OPTS['validExts'];
          opts['extendValidExts'] = NO;
        }
        else if ( !_isExtOpt(opts['validExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validExts', opts['validExts'],
            '(?RegExp|?Array<string>|?string)=', 'filePaths');

        if ( !$hasOpt(opts, 'invalidExts') ) {
          opts['invalidExts'] = _DFLT_FILES_OPTS['invalidExts'];
          opts['extendInvalidExts'] = NO;
        }
        else if ( !_isExtOpt(opts['invalidExts']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidExts',
            opts['invalidExts'], '(?RegExp|?Array<string>|?string)=',
            'filePaths');

        if ( !$hasOpt(opts, 'validFiles') ) {
          opts['validFiles'] = _DFLT_FILES_OPTS['validFiles'];
          opts['extendValidFiles'] = NO;
        }
        else if ( !_isPattOpt(opts['validFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.validFiles',
            opts['validFiles'], '(?RegExp|?Array<string>|?string|?function(' +
            'string=, string=, string=): *)=', 'filePaths');

        if ( !$hasOpt(opts, 'invalidFiles') ) {
          opts['invalidFiles'] = _DFLT_FILES_OPTS['invalidFiles'];
          opts['extendInvalidFiles'] = NO;
        }
        else if ( !_isPattOpt(opts['invalidFiles']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.invalidFiles',
            opts['invalidFiles'], '(?RegExp|?Array<string>|?string|' +
            '?function(string=, string=, string=): *)=', 'filePaths');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'filePaths');
    else if (!source)
      throw _mkErr(new ERR, 'invalid empty #source `string`', 'filePaths');
    else if ( !$is.dir(source) )
      throw _mkErr(new ERR, 'invalid #source directory path `' + source + '`',
        'filePaths');

    return _getFiles(source, opts);
  }
  get['filePaths'] = getFilePaths;
  get['filepaths'] = getFilePaths;
  get['files'] = getFilePaths;





  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {(!Buffer|string)}
   */
  function _getFile(src, opts) {

    /** @type {string} */
    var contents;

    src = $resolve(src);

    if (opts['buffer'])
      return $readFile(src);

    contents = $readFile(src, opts['encoding']);

    if (opts['eol'])
      contents = $fixEol(contents, opts['eol']);

    return contents;
  }

  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {!Array<string>}
   */
  function _getDirs(src, opts) {

    /** @type {!_Dirs} */
    var dirs;

    dirs = new _Dirs(src, opts);
    return dirs.main();
  }

  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} opts
   * @return {!Array<string>}
   */
  function _getFiles(src, opts) {

    /** @type {!_Files} */
    var files;

    files = new _Files(src, opts);
    return files.main();
  }



  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': NIL,
    'buffer': NO,
    'encoding': 'utf8'
  };

  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_DIRS_OPTS = {
    'abs': NO,
    'deep': NO,
    'base': NO,
    'glob': YES,
    'validDirs': NIL,
    'invalidDirs': /^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/,
    'extendValidDirs': NO,
    'extendInvalidDirs': NO
  };

  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILES_OPTS = {
    'abs': NO,
    'deep': NO,
    'base': NO,
    'glob': YES,
    'valid': NIL,
    'invalid': NIL,
    'validDirs': NIL,
    'invalidDirs': /^(?:\.git|\.bak|\.backup|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/,
    'validExts': NIL,
    'invalidExts': NIL,
    'validFiles': NIL,
    'invalidFiles': NIL,
    'extendValid': NO,
    'extendInvalid': NO,
    'extendValidDirs': NO,
    'extendInvalidDirs': NO,
    'extendValidExts': NO,
    'extendInvalidExts': NO,
    'extendValidFiles': NO,
    'extendInvalidFiles': NO
  };



  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  var _isExtOpt = (function _isExtOptPrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _EXT_PATT = /^\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*$/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _EXTS_PATT = /^\|?\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*(?:\|\.?[a-zA-Z0-9\*]+(?:\.[a-zA-Z0-9\*]+)*)*\|?$/;
 
    /**
     * @private
     * @param {!Array} vals
     * @return {boolean}
     */
    function _isExtArr(vals) {

      /** @type {*} */
      var val;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = vals['length'];
      i = -1;
      while (++i < len) {
        val = vals[i];
        if ( !$is.str(val) || !_EXT_PATT['test'](val) )
          return NO;
      }
      return YES;
    }
 
    /**
     * @param {*} val
     * @return {boolean}
     */
    function isExtOpt(val) {
      return $is.nil(val) || $is.regx(val)
        ? YES
        : $is.str(val)
          ? _EXTS_PATT['test'](val)
          : $is.arr(val)
            ? _isExtArr(val)
            : NO;
    }
 
    return isExtOpt;
  })();

  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  var _isPattOpt = (function _isPattOptPrivateScope() {

    /**
     * @private
     * @param {!Array} vals
     * @return {boolean}
     */
    function _isStrArr(vals) {

      /** @type {*} */
      var val;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = vals['length'];
      i = -1;
      while (++i < len) {
        val = vals[i];
        if ( !$is.str(val) )
          return NO;
      }
      return YES;
    }
 
    /**
     * @param {*} val
     * @return {boolean}
     */
    function isPattOpt(val) {
      return $is.nil(val) || $is.str(val) || $is.regx(val) || $is.fun(val)
        ? YES
        : $is.arr(val)
          ? _isStrArr(val)
          : NO;
    }
 
    return isPattOpt;
  })();



  /**
   * @private
   * @param {string} source
   * @param {!Object<string, *>} opts
   * @constructor
   * @struct
   */
  function _Dirs(source, opts) {

    /** @type {boolean} */
    var base;
    /** @type {string} */
    var path;
    /** @type {string} */
    var src;
    /** @type {boolean} */
    var abs;

    source = $cleanpath(source);
    src = $resolve(source);
    base = opts['base'];
    abs = opts['abs'];
    path = abs
      ? src
      : source;

    /**
     * @const {string}
     */
    this.SOURCE = source;

    /**
     * @const {string}
     */
    this.SRC = src;

    /**
     * @const {boolean}
     */
    this.BASE = base;

    /**
     * @const {boolean}
     */
    this.ABS = abs;

    /**
     * @const {string}
     */
    this.PATH = $addSlash(path);

    /**
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    this.isValidDir = _mkValidTests(source, _DFLT_DIRS_OPTS, opts, 'Dirs');

    /**
     * @type {!Array<string>}
     */
    this.trees = [];

    /**
     * @type {!Array<string>}
     */
    this.paths = [];
  }
  _Dirs['prototype'] = $mkObj(NIL);
  _Dirs['prototype']['constructor'] = _Dirs;

  /**
   * @private
   * @return {!Array<string>}
   */
  _Dirs['prototype'].main = function main() {

    this.getDirs(this.SRC, '');

    if (this.DEEP)
      this.getDirsDeep(this.SRC);

    return this.BASE
      ? this.paths
      : this.trees;
  }

  /**
   * @private
   * @param {string} src
   * @param {string} tree
   * @return {void}
   */
  _Dirs['prototype'].getDirs = function getDirs(src, tree) {

    /** @type {!Array<string>} */
    var trees;
    /** @type {!Array<string>} */
    var paths;
    /** @type {!Array<string>} */
    var names;
    /** @type {string} */
    var name;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    /**
     * @private
     * @const {string}
     */
    var TREE = tree && $addSlash(tree);

    /**
     * @private
     * @const {string}
     */
    var PATH = this.PATH;

    /**
     * @private
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    var isValidDir = this.isValidDir;

    trees = this.trees;
    paths = this.paths;

    names = $readDir(SRC);
    len = names['length'];
    i = -1;
    while (++i < len) {
      name = names[i];
      src = SRC + name;
      if ( $is.dir(src) ) {
        tree = TREE + name;
        if ( isValidDir(name, tree) ) {
          trees['push'](tree);
          paths['push'](PATH + name);
        }
      }
    }
  }

  /**
   * @private
   * @param {string} src
   * @return {void}
   */
  _Dirs['prototype'].getDirsDeep = function getDirsDeep(src) {

    /** @type {!Array<string>} */
    var trees;
    /** @type {string} */
    var tree;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    trees = this.trees;
    i = -1;
    while (++i < trees['length']) {
      tree = trees[i];
      src = SRC + tree;
      this.getDirs(src, tree);
    }
  }



  /**
   * @private
   * @param {string} source
   * @param {!Object<string, *>} opts
   * @constructor
   * @struct
   */
  function _Files(source, opts) {

    /** @type {!function(string, string): boolean} */
    var _isValidFile;
    /** @type {!function(string): boolean} */
    var _isValidExt;
    /** @type {!function(string, string): boolean} */
    var _isValidDir;
    /** @type {!function(string, string): boolean} */
    var _isValid;
    /** @type {boolean} */
    var base;
    /** @type {string} */
    var path;
    /** @type {string} */
    var src;
    /** @type {boolean} */
    var abs;

    source = $cleanpath(source);
    src = $resolve(source);
    base = opts['base'];
    abs = opts['abs'];
    path = abs
      ? src
      : source;

    _isValid = _mkValidTests(source, _DFLT_FILES_OPTS, opts);
    _isValidDir = _mkValidTests(source, _DFLT_FILES_OPTS, opts, 'Dirs');
    _isValidExt = _mkValidExtTests(_DFLT_FILES_OPTS, opts, 'Exts');
    _isValidFile = _mkValidTests(source, _DFLT_FILES_OPTS, opts, 'Files');

    /**
     * @const {string}
     */
    this.SOURCE = source;

    /**
     * @const {string}
     */
    this.SRC = src;

    /**
     * @const {boolean}
     */
    this.BASE = base;

    /**
     * @const {boolean}
     */
    this.ABS = abs;

    /**
     * @const {string}
     */
    this.PATH = $addSlash(path);

    /**
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    this.isValidDir = function isValidDir(name, tree) {
      return _isValid(name, tree) && _isValidDir(name, tree);
    };

    /**
     * @param {string} name
     * @param {string} tree
     * @return {boolean}
     */
    this.isValidFile = function isValidFile(name, tree) {
      return _isValid(name, tree)
        && _isValidExt(name)
        && _isValidFile(name, tree);
    };

    /**
     * @type {!Array<string>}
     */
    this.files = [];

    /**
     * @type {!Array<string>}
     */
    this.trees = [];

    /**
     * @type {!Array<string>}
     */
    this.paths = [];
  }
  _Files['prototype'] = $mkObj(NIL);
  _Files['prototype']['constructor'] = _Files;

  /**
   * @private
   * @return {!Array<string>}
   */
  _Files['prototype'].main = function main() {

    this.getFiles(this.SRC, '');

    if (this.DEEP)
      this.getFilesDeep(this.SRC);

    return this.BASE
      ? this.paths
      : this.files;
  }

  /**
   * @private
   * @param {string} src
   * @param {string} tree
   * @return {void}
   */
  _Files['prototype'].getFiles = function getFiles(src, tree) {

    /** @type {!Array<string>} */
    var files;
    /** @type {!Array<string>} */
    var trees;
    /** @type {!Array<string>} */
    var paths;
    /** @type {!Array<string>} */
    var names;
    /** @type {string} */
    var name;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    /**
     * @private
     * @const {string}
     */
    var TREE = tree && $addSlash(tree);

    /**
     * @private
     * @const {string}
     */
    var PATH = this.PATH;

    /**
     * @private
     * @param {string} dirname
     * @param {string} dirtree
     * @return {boolean}
     */
    var isValidDir = this.isValidDir;

    /**
     * @private
     * @param {string} filename
     * @param {string} filetree
     * @return {boolean}
     */
    var isValidFile = this.isValidFile;

    files = this.files;
    trees = this.trees;
    paths = this.paths;

    names = $readDir(SRC);
    len = names['length'];
    i = -1;
    while (++i < len) {
      name = names[i];
      src = SRC + name;
      tree = TREE + name;
      if ( $is.file(src) ) {
        if ( isValidFile(name, tree) ) {
          files['push'](tree);
          paths['push'](PATH + name);
        }
      }
      else if ( $is.dir(src) ) {
        if ( isValidDir(name, tree) )
          trees['push'](tree);
      }
    }
  }

  /**
   * @private
   * @param {string} src
   * @return {void}
   */
  _Files['prototype'].getFilesDeep = function getFilesDeep(src) {

    /** @type {!Array<string>} */
    var trees;
    /** @type {string} */
    var tree;
    /** @type {number} */
    var i;

    /**
     * @private
     * @const {string}
     */
    var SRC = $addSlash(src);

    trees = this.trees;
    i = -1;
    while (++i < trees['length']) {
      tree = trees[i];
      src = SRC + tree;
      this.getFiles(src, tree);
    }
  }



  /**
   * @private
   * @param {string} filename
   * @return {string}
   */
  var _getFileExt = (function _getFileExtPrivateScope() {
  
    /**
     * @private
     * @const {!RegExp}
     */
    var _FILE_EXT = /^.+?(\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)$/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _HIDDEN = /^\./;
 
    /**
     * @param {string} filename
     * @return {string}
     */
    function getFileExt(filename) {
      
      if ( _HIDDEN['test'](filename) )
        filename = filename['replace'](_HIDDEN, '');

      return _FILE_EXT['test'](filename)
        ? filename['replace'](_FILE_EXT, '$1')
        : '';
    }

    return getFileExt;
  })();

  /**
   * @private
   * @param {string} src
   * @param {boolean} glob
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} valid
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} invalid
   * @return {?function(string, string): boolean}
   */
  var _mkValidTest = (function _mkValidTestPrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _END_ESC_CHAR = /\\$/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _END_ESC = /^(?:.*[^\\])?(?:\\\\)*\\$/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _GLOB = /\*/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _PIPE = /\|/;
 
    /**
     * @private
     * @const {!RegExp}
     */
    var _SLASH = /\//;
 
    /**
     * @private
     * @param {string} src
     * @param {boolean} glob
     * @param {boolean=} pipe
     * @return {string}
     */
    function _escape(src, glob, pipe) {
      return !!src
        ? !!glob
          ? !!pipe
            ? _escGlobPipe(src)
            : _escGlob(src)
          : !!pipe
            ? _escPipe(src)
            : $escRegx(src)
        : '';
    }

    /**
     * @private
     * @param {!Array<string>} vals
     * @param {boolean} glob
     * @return {string}
     */
    function _escArr(vals, glob) {

      /** @type {number} */
      var last;
      /** @type {string} */
      var src;
      /** @type {number} */
      var i;

      src = '';
      last = vals['length'] - 1;
      i = -1;
      while (++i < last) {
        src += _escape(vals[i], glob) + '|';
      }
      src += _escape(vals[last], glob);
      return src;
    }

    /**
     * @private
     * @param {string} src
     * @return {string}
     */
    function _escGlob(src) {

      /** @type {!Array<string>} */
      var parts;
      /** @type {string} */
      var part;
      /** @type {number} */
      var last;
      /** @type {number} */
      var i;

      if ( !_GLOB['test'](src) )
        return $escRegx(src);

      parts = src['split']('*');
      src = '';

      last = parts['length'] - 1;
      i = -1;
      while (++i < last) {
        part = parts[i] || '';
        if ( _END_ESC_PATT['test'](part) ) {
          part = part['replace'](_END_ESC_CHAR, '*');
          src += $escRegx(part);
        }
        else {
          part = part && $escRegx(part);
          src += part + '.*';
        }
      }
      part = parts[last] || '';
      src += part && $escRegx(part);
      return src;
    }

    /**
     * @private
     * @param {string} src
     * @return {string}
     */
    function _escPipe(src) {

      /** @type {!Array<string>} */
      var parts;
      /** @type {string} */
      var part;
      /** @type {number} */
      var last;
      /** @type {number} */
      var i;

      if ( !_PIPE['test'](src) )
        return $escRegx(src);

      parts = src['split']('|');
      src = '';

      last = parts['length'] - 1;
      i = -1;
      while (++i < last) {
        part = parts[i] || '';
        if ( _END_ESC_PATT['test'](part) ) {
          part = part['replace'](_END_ESC_CHAR, '|');
          src += $escRegx(part);
        }
        else {
          part = part && $escRegx(part);
          src += part + '|';
        }
      }
      part = parts[last] || '';
      src += part && $escRegx(part);
      return src;
    }

    /**
     * @private
     * @param {string} src
     * @return {string}
     */
    function _escGlobPipe(src) {

      /** @type {!Array<string>} */
      var parts;
      /** @type {string} */
      var part;
      /** @type {number} */
      var last;
      /** @type {number} */
      var i;

      if ( !_GLOB['test'](src) )
        return _escPipe(src);

      parts = src['split']('*');
      src = '';

      last = parts['length'] - 1;
      i = -1;
      while (++i < last) {
        part = parts[i] || '';
        if ( _END_ESC_PATT['test'](part) ) {
          part = part['replace'](_END_ESC_CHAR, '*');
          src += _escPipe(part);
        }
        else {
          part = part && _escPipe(part);
          src += part + '.*';
        }
      }
      part = parts[last] || '';
      src += part && _escPipe(part);
      return src;
    }

    /**
     * @private
     * @param {string} src
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} valid
     * @return {!function(string, string): boolean}
     */
    function _mkValid(src, glob, valid) {

      if ( $is.nil(valid) )
        return function isValid(name, tree) {
          return YES;
        };

      if ( $is.fun(valid) )
        return function isValid(name, tree) {
          return !!valid(name, tree, src);
        };

      if ( $is.arr(valid) ) {
        valid = _escArr(valid, glob);
        valid = '^(?:' + valid + ')$';
        valid = new REGX(valid);
      }
      else if ( $is.str(valid) ) {
        valid = _escape(valid, glob, YES);
        valid = '^(?:' + valid + ')$';
        valid = new REGX(valid);
      }

      return _SLASH['test'](valid['source'])
        ? function isValid(name, tree) {
            return valid['test'](tree);
          }
        : function isValid(name, tree) {
            return valid['test'](name);
          };
    }

    /**
     * @private
     * @param {string} src
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} invalid
     * @return {!function(string, string): boolean}
     */
    function _mkInvalid(src, glob, invalid) {

      if ( $is.nil(invalid) )
        return function isInvalid(name, tree) {
          return NO;
        };

      if ( $is.fun(invalid) )
        return function isInvalid(name, tree) {
          return !!invalid(name, tree, src);
        };

      if ( $is.arr(invalid) ) {
        invalid = _escArr(invalid, glob);
        invalid = '^(?:' + invalid + ')$';
        invalid = new REGX(invalid);
      }
      else if ( $is.str(invalid) ) {
        invalid = _escape(invalid, glob, YES);
        invalid = '^(?:' + invalid + ')$';
        invalid = new REGX(invalid);
      }

      return _SLASH['test'](invalid['source'])
        ? function isInvalid(name, tree) {
            return invalid['test'](tree);
          }
        : function isInvalid(name, tree) {
            return invalid['test'](name);
          };
    }

    /**
     * @param {string} src
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} valid
     * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)} invalid
     * @return {?function(string, string): boolean}
     */
    function mkValidTest(src, glob, valid, invalid) {

      /** @type {!function(string, string): boolean} */
      var _isInvalid;
      /** @type {!function(string, string): boolean} */
      var _isValid;

      if ( $is.nil(valid) && $is.nil(invalid) )
        return NIL;

      _isValid = _mkValid(src, glob, valid);
      _isInvalid = _mkInvalid(src, glob, invalid);
      return function isValid(name, tree) {
        return _isValid(name, tree) && !_isInvalid(name, tree);
      };
    }

    return mkValidTest;
  })();

  /**
   * @private
   * @param {string} src
   * @param {!Object<string, *>} dfltOpts
   * @param {!Object<string, *>} usrOpts
   * @param {string=} type
   * @return {!function(string, string): boolean}
   */
  function _mkValidTests(src, dfltOpts, usrOpts, type) {

    /** @type {?function(string, string): boolean} */
    var isValidDflt;
    /** @type {?function(string, string): boolean} */
    var isValidUsr;
    /** @type {boolean} */
    var extinvalid;
    /** @type {boolean} */
    var extvalid;
    /** @type {string} */
    var invalid;
    /** @type {string} */
    var valid;
    /** @type {boolean} */
    var glob;

    type = type || '';
    glob = usrOpts['glob'];
    valid = 'valid' + type;
    invalid = 'invalid' + type;
    extvalid = usrOpts['extendValid' + type];
    extinvalid = usrOpts['extendInvalid' + type];

    isValidDflt = extvalid
      ? extinvalid
        ? _mkValidTest(src, glob, dfltOpts[valid], dfltOpts[invalid])
        : _mkValidTest(src, glob, dfltOpts[valid], NIL)
      : extinvalid
        ? _mkValidTest(src, glob, NIL, dfltOpts[invalid])
        : NIL;
    isValidUsr = _mkValidTest(src, glob, usrOpts[valid], usrOpts[invalid]);

    return isValidDflt
      ? isValidUsr
        ? function isValid(name, tree) {
            return isValidDflt(name, tree) && isValidUsr(name, tree);
          }
        : function isValid(name, tree) {
            return isValidDflt(name, tree);
          }
      : isValidUsr
        ? function isValid(name, tree) {
            return isValidUsr(name, tree);
          }
        : function isValid(name, tree) {
            return YES;
          };
  }

  /**
   * @private
   * @param {string} src
   * @param {boolean} glob
   * @param {(?RegExp|?Array<string>|?string)} valid
   * @param {(?RegExp|?Array<string>|?string)} invalid
   * @return {?function(string): boolean}
   */
  var _mkValidExtTest = (function _mkValidExtTestPrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _LEAD_DOT = /^\./;
 
    /**
     * @private
     * @param {!Array<string>} exts
     * @param {boolean} glob
     * @return {string}
     */
    function _prepExts(exts, glob) {

      /** @type {string} */
      var result;
      /** @type {string} */
      var ext;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      result = '';

      len = exts['length'];
      i = -1;
      while (++i < len) {
        ext = _trimLead(exts[i] || '');
        if (ext) {
          if (result)
            result += '|';
          result += ext;
        }
      }

      result = result['replace'](/\./g, '\\.');
      return glob
        ? result['replace'](/\*/g, '.*')
        : result['replace'](/\*/g, '');
    }

    /**
     * @private
     * @param {string} ext
     * @return {string}
     */
    function _trimLead(ext) {
      return ext && ext['replace'](_LEAD_DOT, '');
    }

    /**
     * @private
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string)} valid
     * @return {!function(string): boolean}
     */
    function _mkValid(glob, valid) {

      if ( $is.nil(valid) )
        return function isValidExt(ext) {
          return YES;
        };

      if ( $is.str(valid) )
        valid = valid['split']('|');

      if ( $is.arr(valid) ) {
        valid = _prepExts(valid, glob);
        valid = '\\.(?:' + valid + ')$';
        valid = new REGX(valid);
      }

      return function isValidExt(ext) {
        return valid['test'](ext);
      };
    }

    /**
     * @private
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string)} invalid
     * @return {!function(string): boolean}
     */
    function _mkInvalid(glob, invalid) {

      if ( $is.nil(invalid) )
        return function isInvalidExt(ext) {
          return NO;
        };

      if ( $is.str(invalid) )
        invalid = invalid['split']('|');

      if ( $is.arr(invalid) ) {
        invalid = _prepExts(invalid, glob);
        invalid = '\\.(?:' + invalid + ')$';
        invalid = new REGX(invalid);
      }

      return function isInvalidExt(ext) {
        return invalid['test'](ext);
      };
    }

    /**
     * @param {boolean} glob
     * @param {(?RegExp|?Array<string>|?string)} valid
     * @param {(?RegExp|?Array<string>|?string)} invalid
     * @return {?function(string, string): boolean}
     */
    function mkValidExtTest(glob, valid, invalid) {

      /** @type {!function(string): boolean} */
      var _isInvalid;
      /** @type {!function(string): boolean} */
      var _isValid;

      if ( $is.nil(valid) && $is.nil(invalid) )
        return NIL;

      _isValid = _mkValid(glob, valid);
      _isInvalid = _mkInvalid(glob, invalid);
      return function isValidExt(ext) {
        return _isValid(ext) && !_isInvalid(ext);
      };
    }

    return mkValidExtTest;
  })();

  /**
   * @private
   * @param {!Object<string, *>} dfltOpts
   * @param {!Object<string, *>} usrOpts
   * @param {string=} type
   * @return {!function(string): boolean}
   */
  function _mkValidExtTests(dfltOpts, usrOpts, type) {

    /** @type {?function(string): boolean} */
    var isValidDflt;
    /** @type {?function(string): boolean} */
    var isValidUsr;
    /** @type {boolean} */
    var extinvalid;
    /** @type {boolean} */
    var extvalid;
    /** @type {string} */
    var invalid;
    /** @type {string} */
    var valid;
    /** @type {boolean} */
    var glob;

    type = type || '';
    glob = usrOpts['glob'];
    valid = 'valid' + type;
    invalid = 'invalid' + type;
    extvalid = usrOpts['extendValid' + type];
    extinvalid = usrOpts['extendInvalid' + type];

    isValidDflt = extvalid
      ? extinvalid
        ? _mkValidExtTest(glob, dfltOpts[valid], dfltOpts[invalid])
        : _mkValidExtTest(glob, dfltOpts[valid], NIL)
      : extinvalid
        ? _mkValidExtTest(glob, NIL, dfltOpts[invalid])
        : NIL;
    isValidUsr = _mkValidExtTest(glob, usrOpts[valid], usrOpts[invalid]);

    return isValidDflt
      ? isValidUsr
        ? function isValidExt(filename) {
            filename = _getFileExt(filename);
            return isValidDflt(filename) && isValidUsr(filename);
          }
        : function isValidExt(filename) {
            filename = _getFileExt(filename);
            return isValidDflt(filename);
          }
      : isValidUsr
        ? function isValidExt(filename) {
            filename = _getFileExt(filename);
            return isValidUsr(filename);
          }
        : function isValidExt(filename) {
            return YES;
          };
  }




  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('get');

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



  return get;
})();
vitals['get'] = get;
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var is = (function isPrivateScope() {


  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var is = {};


  /// @section fs
  /// @method vitals.is.buffer
  /// @alias vitals.is.buff
  /// @alias vitals.is.buf
  /**
   * @description
   *   Checks if a value or many values are a `Buffer` instance.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isBuffer(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'buffer');
      case 1:
        return $is.buff(val);
      default:
        return _are(arguments, $is.buff);
    }
  }
  is['buffer'] = isBuffer;
  is['buff'] = isBuffer;
  is['buf'] = isBuffer;

  /// @section fs
  /// @method vitals.is.directory
  /// @alias vitals.is.dir
  /**
   * @description
   *   Checks if a value or many values are a valid directory path.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isDirectory(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'directory');
      case 1:
        return $is.dir(val);
      default:
        return _are(arguments, $is.dir);
    }
  }
  is['directory'] = isDirectory;
  is['dir'] = isDirectory;

  /// @section fs
  /// @method vitals.is.file
  /**
   * @description
   *   Checks if a value or many values are a valid file path.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isFile(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'file');
      case 1:
        return $is.file(val);
      default:
        return _are(arguments, $is.file);
    }
  }
  is['file'] = isFile;



  /**
   * @private
   * @param {!Arguments} vals
   * @param {!function(*): boolean} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals['length'];
    while (i--) {
      if ( !check(vals[i]) )
        return NO;
    }
    return YES;
  }





  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('is');

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



  return is;
})();
vitals['is'] = is;
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var to = (function toPrivateScope() {


  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var to = {};


  /// @section fs
  /// @method vitals.to.file
  /**
   * @description
   *   Write the contents of a file to a new or existing file.
   * @public
   * @param {(!Buffer|string)} contents
   * @param {string} dest
   *   Must be a valid filepath to a new or existing file.
   * @param {(?Object|?string|undefined)=} opts
   *   If the #opts is `null` or a `string` value, it sets the #opts.encoding
   *   option to its value.
   * @param {?string=} opts.encoding = `"utf8"`
   *   The #opts.encoding option sets the character encoding for the
   *   #contents. If it is `null`, no character encoding is set.
   * @param {?string=} opts.encode
   *   An alias for the #opts.encoding option.
   * @param {?string=} opts.eol = `null`
   *   The #opts.eol option sets the end of line character to use when
   *   normalizing the #contents before they are saved to the #dest. If
   *   it is set to `null`, no end of line character normalization is
   *   completed. The optional `string` values are as follows (values are
   *   **not** case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @return {(!Buffer|string)}
   *   The original #contents (without any normalization applied).
   */
  function toFile(contents, dest, opts) {

    /** @type {string} */
    var encoding;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #contents defined', 'file');

      case 1:
        throw _mkErr(new ERR, 'no #dest defined', 'file');

      case 2:
        /** @dict */
        opts = $cloneObj(_DFLT_FILE_OPTS);
        break;

      default:
        if ( $is.void(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          break;
        }

        if ( $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          opts['encoding'] = NIL;
          break;
        }

        if ( $is.str(opts) ) {
          encoding = opts;

          if (!encoding)
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');

          /** @dict */
          opts = $cloneObj(_DFLT_FILE_OPTS);
          opts['encoding'] = encoding;
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '(?Object|?string)=',
            'file');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$hasOpt(opts, 'encode') )
          opts['encode'] = VOID;
        else if ( $is.str(opts['encode']) ) {
          if (!opts['encode'])
            throw _mkErr(new ERR, 'invalid empty #opts.encode `string`',
              'file');
        }
        else if ( !$is.nil(opts['encode']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encode', opts['encode'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'encoding') )
          opts['encoding'] = _DFLT_FILE_OPTS['encoding'];
        else if ( $is.str(opts['encoding']) ) {
          if (!opts['encoding'])
            throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`',
              'file');
        }
        else if ( !$is.nil(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            '?string=', 'file');

        if ( !$hasOpt(opts, 'eol') )
          opts['eol'] = _DFLT_FILE_OPTS['eol'];
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',
              [ 'LF', 'CR', 'CRLF' ], 'file');

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=',
            'file');
    }

    if ( !$is.str(dest) )
      throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'file');
    else if (!dest)
      throw _mkErr(new ERR, 'invalid empty #dest `string`', 'file');

    if ( $is.buff(contents) )
      return _toFileByBuff(contents, dest, opts);

    if ( !$is.str(contents) )
      throw _mkTypeErr(new TYPE_ERR, 'contents', contents, '!Buffer|string',
        'file');

    return _toFileByStr(contents, dest, opts);
  }
  to['file'] = toFile;



  /**
   * @private
   * @param {!Buffer} contents
   * @param {string} dest
   * @param {!Object} opts
   * @return {!Buffer}
   */
  function _toFileByBuff(contents, dest, opts) {

    /** @type {(!Buffer|string)} */
    var _contents;

    _contents = contents;

    if (opts['eol']) {
      _contents = _contents['toString']();
      _contents = $fixEol(_contents, opts['eol']);
    }

    if (opts['encoding'])
      $writeFile(dest, _contents, opts['encoding']);
    else
      $writeFile(dest, _contents);

    return contents;
  }

  /**
   * @private
   * @param {string} contents
   * @param {string} dest
   * @param {!Object} opts
   * @return {string}
   */
  function _toFileByStr(contents, dest, opts) {

    /** @type {string} */
    var _contents;

    _contents = contents;

    if (opts['eol'])
      _contents = $fixEol(_contents, opts['eol']);

    if (opts['encoding'])
      $writeFile(dest, _contents, opts['encoding']);
    else
      $writeFile(dest, _contents);

    return contents;
  }



  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_FILE_OPTS = {
    'eol': NIL,
    'encoding': 'utf8'
  };



  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('to');

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



  return to;
})();
vitals['to'] = to;
  vitals['VERSION'] = VERSION;
  module.exports = vitals;
})(this);

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol

