/**
 * @section base
 * @section fs
 * @version 5.0.0
 * @see [vitals.get](https://github.com/imaginate/vitals/wiki/vitals.get)
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


  /**
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
   * @param {*} val
   * @return {boolean}
   */
  function isEmpty(val) {

    /** @type {string} */
    var key;

    if (!val)
      return YES;

    if (typeof val === 'function')
      return val['length'] === 0;

    if (typeof val !== 'object')
      return NO;

    if ($objStr(val) === '[object Array]')
      return val['length'] === 0;

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


  /**
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


  /**
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
 * @param {!RegExp} src
 * @param {boolean=} forceGlobal
 * @return {!RegExp}
 */
var $getFlags = (function $getFlagsPrivateScope() {

  /**
   * @private
   * @const {!RegExp}
   */
  var _GLOBAL = /g/;

  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var _FLAGS = (function _FLAGS_PrivateScope() {

    /**
     * @type {!Object<string, string>}
     * @dict
     */
    var flags;

    flags = {};
    flags['ignoreCase'] = 'i';
    flags['multiline'] = 'm';
    flags['global'] = 'g';

    if ('sticky' in REGX_PROTO)
      flags['sticky'] = 'y';
    if ('unicode' in REGX_PROTO)
      flags['unicode'] = 'u';

    return flags;
  })();

  /**
   * @private
   * @param {!RegExp} src
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function $getFlags(src, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in _FLAGS) {
      if ( $own(_FLAGS, key) && src[key] )
        flags += _FLAGS[key];
    }

    return !!forceGlobal && !_GLOBAL['test'](flags)
      ? flags + 'g'
      : flags;
  }

  return $getFlags;
})();
/**
 * @private
 * @param {!RegExp} src
 * @param {string=} flags
 * @return {!RegExp}
 */
var $cloneRegx = (function $cloneRegxPrivateScope() {

  /**
   * @private
   * @param {string} src
   * @return {string}
   */
  var _escape = (function _escapePrivateScope() {
    return /\n/['source'] !== '\\n'
      ? function _escape(src) {
          return src['replace'](/\\/g, '\\\\');
        }
      : function _escape(src) {
          return src;
        };
  })();

  /**
   * @param {!RegExp} src
   * @param {string=} flags
   * @return {!RegExp}
   */
  function $cloneRegx(src, flags) {

    /** @type {string} */
    var source;

    source = _escape(src['source']);
    return flags
      ? new REGX(source, flags)
      : new REGX(source);
  }

  return $cloneRegx;
})();
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
 * @private
 * @param {string} source
 * @return {string}
 */
function $escRegx(source) {
  return source['replace'](/[\\^$.*+?|(){}[\]]/g, '\\$&');
}
/**
 * @private
 * @param {string} path
 * @return {!Array<string>}
 */
var $readDir = FS['readdirSync'];
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
 * @param {string} path
 * @param {string=} encoding
 * @return {(!Buffer|string)}
 */
var $readFile = FS['readFileSync'];

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var get = (function getPrivateScope() {

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   * @param {*=} val
   * @return {!Array}
   */
  function get(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined');

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        return $is._arr(source)
          ? _allIndexes(source)
          : _allKeys(source);

      default:
        if ( $is.str(source) )
          return $is.regx(val)
            ? _strVals(source, val)
            : _strIndexes(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        return $is._arr(source)
          ? _byValIndexes(source, val)
          : $is.regx(val)
            ? _byKeyObjVals(source, val)
            : _byValKeys(source, val);
    }
  }

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {*=} val
   * @return {!Array}
   */
  function getKeys(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys');

      case 1:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys');

        return _allKeys(source);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys');

        return $is.regx(val)
          ? _byKeyKeys(source, val)
          : _byValKeys(source, val);
    }
  }
  get['keys'] = getKeys;

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {!Array<string>}
   */
  function getKeysByKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys.byKey');

      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'keys.byKey');

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys.byKey');

        return _byKeyKeys(source, key);
    }
  }
  get['keys']['byKey'] = getKeysByKey;

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {!Array}
   */
  function getKeysByValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys.byValue');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'keys.byValue');

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'keys.byValue');

        return _byValKeys(source, val);
    }
  }
  get['keys']['byValue'] = getKeysByValue;
  get['keys']['byVal'] = getKeysByValue;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   * @param {*=} val
   * @return {!Array}
   */
  function getIndexes(source, val) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'indexes');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined', 'indexes');
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)',
            'indexes');

        return _allIndexes(source);

      default:
        if ( $is.str(source) )
          return _strIndexes(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'indexes');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)',
            'indexes');

        return _byValIndexes(source, val);
    }
  }
  get['indexes'] = getIndexes;
  get['ii'] = getIndexes;

  /**
   * @public
   * @param {(!Object|!Function|string)} source
   * @param {*=} val
   * @return {!Array}
   */
  function getValues(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'values');

      case 1:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #val defined', 'values');
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|string', 'values');

        return _allObjVals(source);

      default:
        if ( $is.str(source) )
          return _strVals(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|string', 'values');

        return _byKeyObjVals(source, val);
    }
  }
  get['values'] = getValues;
  get['vals'] = getValues;

  /**
   * @public
   * @param {string} path
   * @param {(?Object|?boolean)=} opts
   * @param {boolean=} opts.buffer
   * @param {?string=} opts.encoding
   * @param {?string=} opts.encode
   * @param {?string=} opts.eol
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

  /**
   * @public
   * @param {string} source
   * @param {(?Object|?boolean)=} opts
   * @param {boolean=} opts.deep
   * @param {boolean=} opts.recursive
   * @param {boolean=} opts.base
   * @param {boolean=} opts.basepath
   * @param {boolean=} opts.abs
   * @param {boolean=} opts.absolute
   * @param {boolean=} opts.glob
   * @param {boolean=} opts.wildcard
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid
   * @param {boolean=} opts.extendValidDirs
   * @param {boolean=} opts.extendValid
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid
   * @param {boolean=} opts.extendInvalidDirs
   * @param {boolean=} opts.extendInvalid
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

  /**
   * @public
   * @param {string} source
   * @param {(?Object|?boolean)=} opts
   * @param {boolean=} opts.deep
   * @param {boolean=} opts.recursive
   * @param {boolean=} opts.base
   * @param {boolean=} opts.basepath
   * @param {boolean=} opts.abs
   * @param {boolean=} opts.absolute
   * @param {boolean=} opts.glob
   * @param {boolean=} opts.wildcard
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.valid
   * @param {boolean=} opts.extendValid
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalid
   * @param {boolean=} opts.extendInvalid
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validDirs
   * @param {boolean=} opts.extendValidDirs
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidDirs
   * @param {boolean=} opts.extendInvalidDirs
   * @param {(?RegExp|?Array<string>|?string)=} opts.validExts
   * @param {boolean=} opts.extendValidExts
   * @param {(?RegExp|?Array<string>|?string)=} opts.invalidExts
   * @param {boolean=} opts.extendInvalidExts
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.validFiles
   * @param {boolean=} opts.extendValidFiles
   * @param {(?RegExp|?Array<string>|?string|?function(string=, string=, string=): *)=} opts.invalidFiles
   * @param {boolean=} opts.extendInvalidFiles
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
   * @param {(!Object|!Function)} src
   * @return {!Array<string>}
   */
  function _allKeys(src) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    keys = [];
    for (key in src) {
      if ( $own(src, key) )
        keys['push'](key);
    }
    return keys;
  }

  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(src, pattern) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    if ( !$is.regx(pattern) )
      pattern = $mkStr(pattern);

    keys = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        keys['push'](key);
    }
    return keys;
  }

  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(src, val) {

    /** @type {!Array<string>} */
    var keys;
    /** @type {string} */
    var key;

    keys = [];
    for (key in src) {
      if ( $own(src, key) && (src[key] === val) )
        keys['push'](key);
    }
    return keys;
  }

  /**
   * @private
   * @param {(!Object|!Function)} src
   * @return {!Array<*>}
   */
  function _allObjVals(src) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    vals = [];
    for (key in src) {
      if ( $own(src, key) )
        vals['push'](src[key]);
    }
    return vals;
  }

  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(src, pattern) {

    /** @type {!Array<*>} */
    var vals;
    /** @type {string} */
    var key;

    if ( !$is.regx(pattern) )
      pattern = $mkStr(pattern);

    vals = [];
    for (key in src) {
      if ( $own(src, key) && $match(key, pattern) )
        vals['push'](src[key]);
    }
    return vals;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} src
   * @return {!Array<number>}
   */
  function _allIndexes(src) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = src['length'];
    indexes = new ARR(len);
    i = -1;
    while (++i < len)
      indexes[i] = i;
    return indexes;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} src
   * @param {*} val
   * @return {!Array<number>}
   */
  function _byValIndexes(src, val) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    indexes = [];
    len = src['length'];
    i = -1;
    while (++i < len) {
      if (src[i] === val)
        indexes['push'](i);
    }
    return indexes;
  }

  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _strIndexes(src, pattern) {
    return $is.regx(pattern)
      ? _byRegexStrIndexes(src, pattern)
      : _byStrStrIndexes(src, pattern);
  }

  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _strVals(src, pattern) {
    return $is.regx(pattern)
      ? _byRegexStrVals(src, pattern)
      : _byStrStrVals(src, pattern);
  }

  /**
   * @private
   * @param {string} src
   * @param {!RegExp} patt
   * @return {!Array<number>}
   */
  function _byRegexStrIndexes(src, patt) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {(?Array|?Object)} */
    var result;
    /** @type {string} */
    var flags;

    flags = $getFlags(patt, YES);
    patt = $cloneRegx(patt, flags);

    indexes = [];
    result = patt['exec'](src);
    while (result) {
      indexes['push'](result['index']);
      result = patt['exec'](src);
    }
    return indexes;
  }

  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _byStrStrIndexes(src, pattern) {

    /** @type {!Array<number>} */
    var indexes;
    /** @type {number} */
    var i;

    pattern = $mkStr(pattern);
    indexes = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      indexes['push'](i);
      i = src['indexOf'](pattern, ++i);
    }
    return indexes;
  }

  /**
   * @private
   * @param {string} src
   * @param {!RegExp} patt
   * @return {!Array<string>}
   */
  function _byRegexStrVals(src, patt) {

    /** @type {(?Array|?Object)} */
    var result;
    /** @type {string} */
    var flags;
    /** @type {!Array<string>} */
    var vals;

    flags = $getFlags(patt, YES);
    patt = $cloneRegx(patt, flags);

    vals = [];
    result = patt['exec'](src);
    while (result) {
      vals['push'](result[0]);
      result = patt['exec'](src);
    }
    return vals;
  }

  /**
   * @private
   * @param {string} src
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byStrStrVals(src, pattern) {

    /** @type {!Array<string>} */
    var vals;
    /** @type {number} */
    var i;

    pattern = $mkStr(pattern);
    vals = [];
    i = src['indexOf'](pattern);
    while (i !== -1) {
      vals['push'](pattern);
      i = src['indexOf'](pattern, ++i);
    }
    return vals;
  }

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
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var _mkRangeErr = _MK_ERR.rangeError;

  return get;
})();

var vitals = get;
vitals['get'] = get;
  vitals['VERSION'] = VERSION;
  module.exports = vitals;
})(this);



