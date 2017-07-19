/**
 * @section base
 * @section fs
 * @version 5.0.0
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
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
 * @param {string} src
 * @param {*} val
 * @return {boolean}
 */
function $inStr(src, val) {
  val = $mkStr(val);
  return !src
    ? !val
    : !val
      ? YES
      : $strIncl(src, val);
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
 * @private
 * @param {string} path
 * @param {string} contents
 * @param {string=} encoding
 * @return {void}
 */
var $writeFile = FS['writeFileSync'];

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var copy = (function copyPrivateScope() {

  /**
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function copy(val, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');
    }

    return !$is._obj(val)
      ? val
      : $is.fun(val)
        ? _copyFunc(val, deep)
        : $is._arr(val)
          ? _copyArr(val, deep)
          : $is.regx(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /**
   * @public
   * @param {!Object} source
   * @param {boolean=} deep
   * @return {!Object}
   */
  function copyObject(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'object');

    return _copyObj(source, deep);
  }
  copy['object'] = copyObject;
  copy['obj'] = copyObject;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object)} source
   * @param {boolean=} deep
   * @return {!Array}
   */
  function copyArray(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'array');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '(!Array|!Arguments|!Object)', 'array');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _copyArr(source, deep);
  }
  copy['array'] = copyArray;
  copy['arr'] = copyArray;
  copy['args'] = copyArray;

  /**
   * @public
   * @param {!RegExp} source
   * @param {(string|undefined)=} flags
   * @return {!RegExp}
   */
  function copyRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');
      case 1:
        break;
      default:
        if ( $is.str(flags) ) {
          if ( !$is.flags(flags) )
            throw _mkErr(new ERR, 'invalid #flags `string` `' + flags + '` ' +
              '(must consist of only valid `RegExp` flags and if it starts ' +
              'with a mod flag, mod flags, `"+"` and `"-"`)', 'regexp');
        }
        else if ( !$is.void(flags) )
          throw _mkTypeErr(new TYPE_ERR, 'flags', flags, 'string=', 'regexp');
    }

    if ( !$is.regx(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!RegExp', 'regexp');

    return _copyRegex(source, flags);
  }
  copy['regexp'] = copyRegExp;
  copy['regex'] = copyRegExp;
  copy['regx'] = copyRegExp;
  copy['re'] = copyRegExp;

  /**
   * @public
   * @param {!Function} source
   * @param {boolean=} deep
   * @return {!Function}
   */
  function copyFunction(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'function');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=',
            'function');
    }

    if ( !$is.fun(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Function',
        'function');

    return _copyFunc(source, deep);
  }
  copy['func'] = copyFunction;
  copy['fun'] = copyFunction;
  try {
    copy['fn'] = copyFunction;
    copy['function'] = copyFunction;
  }
  catch (e) {}

  /**
   * @public
   * @param {string} source
   * @param {string} dest
   * @param {(?Object|?boolean)=} opts
   * @param {boolean=} opts.buffer
   * @param {?string=} opts.encoding
   * @param {?string=} opts.encode
   * @param {?string=} opts.eol
   * @return {(!Buffer|string)}
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

  /**
   * @public
   * @param {string} source
   * @param {string} dest
   * @param {(?Object|?boolean)=} opts
   * @param {boolean=} opts.deep
   * @param {boolean=} opts.recursive
   * @param {boolean=} opts.buffer
   * @param {?string=} opts.encoding
   * @param {?string=} opts.encode
   * @param {?string=} opts.eol
   * @return {!Array<string>}
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
   * @param {!Object} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep
      ? _mergeDeep({}, obj)
      : $merge({}, obj);
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object)} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new ARR(obj['length']);
    return deep
      ? _mergeDeep(arr, obj)
      : $merge(arr, obj);
  }

  /**
   * @private
   * @param {!RegExp} src
   * @param {(string|undefined)=} flags
   * @return {!RegExp}
   */
  function _copyRegex(src, flags) {

    /** @type {string} */
    var flags;

    flags = _getFlags(src, flags);
    return $cloneRegx(src, flags);
  }

  /**
   * @private
   * @param {!Function} func
   * @param {(boolean|undefined)=} deep
   * @return {!Function}
   */
  function _copyFunc(func, deep) {

    /** @type {!Function} */
    function funcCopy() {
      return func['apply'](NIL, arguments);
    }

    return deep
      ? _mergeDeep(funcCopy, func)
      : $merge(funcCopy, func);
  }

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
   * @const {!RegExp}
   */
  var _ADD_FLAG = /^\+/;

  /**
   * @private
   * @const {!RegExp}
   */
  var _MOD_FLAGS = /^[\+\-]/;

  /**
   * @private
   * @const {!RegExp}
   */
  var _RM_FLAG = /^\-/;

  /**
   * @private
   * @param {string} src
   * @param {string} mod
   * @return {string}
   */
  function _addFlags(src, mod) {

    /** @type {!Array<string>} */
    var flags;
    /** @type {string} */
    var flag;

    mod = mod['replace'](_ADD_FLAG, '');
    flags = mod['split']('');
    len = flags['length'];
    i = -1;
    while (++i < len) {
      flag = flags[i];
      if ( !$inStr(src, flag) )
        src += flag;
    }
    return src;
  }

  /**
   * @private
   * @param {!RegExp} src
   * @param {(string|undefined)} flags
   * @return {string}
   */
  function _getFlags(src, flags) {

    /** @type {(?Array|?Object)} */
    var result;
    /** @type {!RegExp} */
    var patt;
    /** @type {string} */
    var flag;

    if ( $is.void(flags) )
      return $getFlags(src);

    if ( !_MOD_FLAGS['test'](flags) )
      return flags;

    /** @const {string} */
    var FLAGS = flags;

    patt = /[\+\-][imgyu]+/g;
    flags = $getFlags(src);
    result = patt['exec'](FLAGS);
    while (result) {
      flag = result[0];
      flags = _ADD_FLAG['test'](flag)
        ? _addFlags(flags, flag)
        : _rmFlags(flags, flag);
      result = patt['exec'](FLAGS);
    }
    return flags;
  }

  /**
   * @private
   * @param {string} src
   * @param {string} mod
   * @return {string}
   */
  function _rmFlags(src, mod) {

    /** @type {!Array<string>} */
    var flags;
    /** @type {string} */
    var flag;
    /** @type {!RegExp} */
    var patt;

    mod = mod['replace'](_RM_FLAG, '');
    flags = mod['split']('');
    len = flags['length'];
    i = -1;
    while (++i < len) {
      flag = flags[i];
      if ( $inStr(src, flag) ) {
        patt = new REGX(flag, 'g');
        src['replace'](patt, '');
      }
    }
    return src;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {(!Object|!Function)} source
   * @return {(!Object|!Function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) )
        dest[key] = copy(source[key], YES);
    }
    return dest;
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
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var _mkRangeErr = _MK_ERR.rangeError;

  return copy;
})();

var vitals = copy;
vitals['copy'] = copy;
  vitals['VERSION'] = VERSION;
  module.exports = vitals;
})(this);



