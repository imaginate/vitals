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



