/**
 * @section strict
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

;(function(/** (?Object|?Function|undefined) */ __THIS,
           /** undefined */ __VOID) {

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
var ENV = (function ENV_PrivateScope() {

  /**
   * @const {boolean}
   */
  var HAS_EXPORTS = _isObjFun(typeof exports) && _isValidNode(exports);

  /**
   * @const {boolean}
   */
  var HAS_MODULE = _isObjFun(typeof module) && _isValidNode(module);

  /**
   * @const {boolean}
   */
  var HAS_GLOBAL = HAS_EXPORTS
    && HAS_MODULE
    && _isObj(typeof global)
    && _isValidRoot(global);

  /**
   * @const {boolean}
   */
  var HAS_WINDOW = _isObjFun(typeof window) && _isValidRoot(window);

  /**
   * @const {boolean}
   */
  var HAS_DEFINE = _isFun(typeof define)
    && 'amd' in define
    && _isObj(typeof define['amd']);

  /**
   * @const {boolean}
   */
  var HAS_SELF = _isObjFun(typeof self) && _isValidRoot(self);

  /**
   * @const {boolean}
   */
  var HAS_THIS = _isObjFun(typeof __THIS) && _isValidRoot(__THIS);

  /**
   * @const {(!Object|!Function)}
   * @dict
   */
  var ROOT = HAS_GLOBAL
    ? global
    : HAS_WINDOW && window !== (__THIS && __THIS['window'])
      ? window
      : HAS_SELF
        ? self
        : HAS_THIS
          ? __THIS
          : Function('return this')();

  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isObj(typeOf) {
    return typeOf === 'object';
  }

  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isFun(typeOf) {
    return typeOf === 'function';
  }

  /**
   * @private
   * @param {string} typeOf
   * @return {boolean}
   */
  function _isObjFun(typeOf) {
    switch (typeOf) {
      case 'object':
      case 'function':
        return true;
    }
    return false;
  }

  /**
   * @private
   * @param {(?Object|?Function)} root
   * @return {boolean}
   */
  function _isValidRoot(root) {
    return !!root && root['Object'] === Object;
  }

  /**
   * @private
   * @param {(?Object|?Function)} node
   * @return {boolean}
   */
  function _isValidNode(node) {
    return !!node && (!('nodeType' in node) || !node['nodeType']);
  }

  /**
   * @const {!Object}
   * @struct
   */
  var ENV = {
    HAS_EXPORTS: HAS_EXPORTS,
    HAS_MODULE: HAS_MODULE,
    HAS_GLOBAL: HAS_GLOBAL,
    HAS_WINDOW: HAS_WINDOW,
    HAS_DEFINE: HAS_DEFINE,
    HAS_SELF: HAS_SELF,
    HAS_THIS: HAS_THIS,
    ROOT: ROOT
  };

  return ENV;
})();
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
   * @private
   * @const {!Object<string, boolean>}
   * @struct
   */
  var _HAS_ARGS = (function _HAS_ARGS_PrivateScope() {

    /**
     * @const {boolean}
     */
    var PRIMARY = (function _HAS_ARGS_PRIMARY_PrivateScope() {
      return $objStr(arguments) === '[object Arguments]';
    })();

    /**
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

    /**
     * @const {!Object<string, boolean>}
     * @struct
     */
    var HAS_ARGS = {
      PRIMARY: PRIMARY,
      POLYFILL: POLYFILL
    };

    return HAS_ARGS;
  })();

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
    even:  isEvenNumber

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
  function $print(val, depth) {
    depth = depth || 0;
    return $is._obj(val)
      ? $is.regx(val)
        ? val['toString']()
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
 * @param {number=} start
 * @param {number=} end
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
 * @private
 * @param {string} keys
 * @return {!Array<string>}
 */
function $splitKeys(keys) {

  /** @type {string} */
  var separator;

  if (!keys)
    return [ '' ];

  separator = $strIncl(keys, ', ')
    ? ', '
    : $strIncl(keys, ',')
      ? ','
      : $strIncl(keys, '|')
        ? '|'
        : ' ';
  return keys['split'](separator);
}
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var is = (function isPrivateScope() {

  /**
   * @public
   * @param {string} types
   * @param {...*} val
   * @return {boolean}
   */
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {?Array<!function>} */
    var checks;
    /** @type {boolean} */
    var vals;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #types defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
      case 2:
        vals = NO;
        break;
      default:
        vals = YES;
        break;
    }

    if ( !$is.str(types) )
      throw _mkTypeErr(new TYPE_ERR, 'types', types, 'string');
    if ( !types )
      throw _mkErr(new ERR, 'invalid empty #types `string`');

    if ( _hasSpecial('*', types) )
      return YES;

    checks = _getChecks(types);

    if (!checks)
      throw _mkRangeErr(new RANGE_ERR, 'types',
        'https://github.com/imaginate/vitals/wiki/vitals.is-types');

    nullable = _getNullable(types);
    return vals
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }

  /**
   * @private
   * @param {!Array<!function>} checks
   * @param {*} val
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVal(checks, val, nullable) {

    /** @type {number} */
    var i;

    i = checks['length'];
    while (i--) {
      if ( checks[i](val, nullable) )
        return YES;
    }
    return NO;
  }

  /**
   * @private
   * @param {!Array<!function>} checks
   * @param {!Arguments} vals
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVals(checks, vals, nullable) {

    /** @type {number} */
    var i;

    i = vals['length'];
    while (--i) {
      if ( !_checkVal(checks, vals[i], nullable) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @const {!Object<string, !function(*, boolean=): boolean>}
   * @dict
   */
  var _TYPES = (function _TYPES_PrivateScope() {

    /**
     * @type {!Object<string, !function(*, boolean=): boolean>}
     * @dict
     */
    var $types = {};

    /**
     * @private
     * @param {string} section
     * @param {!Object<string, !function(*): boolean>} types
     * @param {boolean=} nullableDefault
     * @return {void}
     */
    function _addTypes(section, types, nullableDefault) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( $own(types, type) )
          _addType(section, type, types[type], nullableDefault);
      }
    }

    /**
     * @private
     * @param {string} section
     * @param {string} type
     * @param {!function(*): boolean} check
     * @param {boolean=} nullableDefault
     * @return {void}
     */
    function _addType(section, type, check, nullableDefault) {

      if ( $own(_addType, section) )
        check = _addType[section](check);

      nullableDefault = nullableDefault !== NO;

      /**
       * @param {*} val
       * @param {boolean=} nullable
       * @return {boolean}
       */
      function typeCheck(val, nullable) {

        if ( !$is.bool(nullable) )
          nullable = nullableDefault;

        return $is.nil(val)
          ? nullable
          : check(val);
      }

      $types['_' + type] = typeCheck;
    }

    /**
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {void}
     */
    function _addShortcuts(shortcuts) {

      /** @type {string} */
      var shortcut;
      /** @type {string} */
      var type;

      for (shortcut in shortcuts) {
        if( $own(shortcuts, shortcut) ) {
          type = '_' + shortcuts[shortcut];
          shortcut = '_' + shortcut;
          $types[shortcut] = $types[type];
        }
      }
    }

    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     * @return {!function(*): boolean}
     */
    function _addArrayType(eachCheck) {

      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {number} */
        var i;

        if ( !$is.arr(val) )
          return NO;

        i = val['length'];
        while (i--) {
          if ( !eachCheck(val[i]) )
            return NO;
        }
        return YES;
      }

      return check;
    }
    _addType['arrays'] = _addArrayType;

    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     * @return {!function(*): boolean}
     */
    function _addMapType(eachCheck) {

      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {string} */
        var key;

        if ( !$is.obj(val) )
          return NO;

        for (key in val) {
          if( $own(val, key) && !eachCheck(val[key]) )
            return NO;
        }
        return YES;
      }

      return check;
    }
    _addType['maps'] = _addMapType;

    _addTypes('primitives', {
      'undefined': $is.void,
      'boolean':   $is.bool,
      'string':    $is.str,
      'number':    $is.num,
      'nan':       $is.nan
    }, NO);
    _addType('primitives', 'null', $is.nil);

    _addTypes('js_objects', {
      'object': $is.obj,
      'regexp': $is.regx,
      'array':  $is.arr,
      'error':  $is.err,
      'date':   $is.date
    });
    _addType('js_objects', 'arguments', $is.args);
    _addType('js_objects', 'function', $is.fun, NO);

    _addTypes('dom_objects', {
      'element':  $is.elem,
      'document': $is.doc
    });

    _addType('others', 'empty', $is.empty);

    _addTypes('arrays', {
      'undefineds': $is.void,
      'nulls':      $is.nil,
      'booleans':   $is.bool,
      'strings':    $is.str,
      'numbers':    $is.num,
      'nans':       $is.nan,
      'objects':    $is.obj,
      'functions':  $is.fun,
      'regexps':    $is.regx,
      'arrays':     $is.arr,
      'dates':      $is.date,
      'errors':     $is.err,
      'elements':   $is.elem,
      'documents':  $is.doc
    });

    _addTypes('maps', {
      'undefinedmap': $is.void,
      'nullmap':      $is.nil,
      'booleanmap':   $is.bool,
      'stringmap':    $is.str,
      'numbermap':    $is.num,
      'nanmap':       $is.nan,
      'objectmap':    $is.obj,
      'functionmap':  $is.func,
      'regexpmap':    $is.regex,
      'arraymap':     $is.arr,
      'datemap':      $is.date,
      'errormap':     $is.err,
      'elementmap':   $is.elem,
      'documentmap':  $is.doc
    });

    _addShortcuts({

      'nil':  'null',
      'bool': 'boolean',
      'str':  'string',
      'num':  'number',
      'void': 'undefined',

      'obj':   'object',
      'func':  'function',
      'fun':   'function',
      'fn':    'function',
      'regex': 'regexp',
      'regx':  'regexp',
      're':    'regexp',
      'arr':   'array',
      'err':   'error',
      'args':  'arguments',

      'elem': 'element',
      'doc':  'document',

      'undefinedes': 'undefineds',
      'voids':   'undefineds',
      'nils':    'nulls',
      'strs':    'strings',
      'nums':    'numbers',
      'bools':   'booleans',
      'objs':    'objects',
      'funcs':   'functions',
      'funs':    'functions',
      'fns':     'functions',
      'regexes': 'regexps',
      'regexs':  'regexps',
      'res':     'regexps',
      'arrs':    'arrays',
      'errs':    'errors',
      'elems':   'elements',
      'docs':    'documents',

      'voidmap':  'undefinedmap',
      'nilmap':   'nullmap',
      'strmap':   'stringmap',
      'nummap':   'numbermap',
      'boolmap':  'booleanmap',
      'objmap':   'objectmap',
      'funcmap':  'functionmap',
      'funmap':   'functionmap',
      'fnmap':    'functionmap',
      'regexmap': 'regexpmap',
      'regxmap':  'regexpmap',
      'remap':    'regexpmap',
      'arrmap':   'arraymap',
      'errmap':   'errormap',
      'elemmap':  'elementmap',
      'docmap':   'documentmap'

    });

    return $types;
  })();

  /**
   * @private
   * @type {!RegExp}
   */
  var _ALL_SPECIALS = /[^a-z\|]/g;

  /**
   * @private
   * @const {!Object<string, !function(string): boolean>}
   * @dict
   */
  var _SPECIALS = (function _SPECIALS_PrivateScope() {

    /**
     * @private
     * @const {!RegExp}
     */
    var _PIPE = /\|/;

    /**
     * @private
     * @const {!RegExp}
     */
    var _EXCLAMATION_POINT = /\!/;

    /**
     * @private
     * @const {!RegExp}
     */
    var _QUESTION_MARK = /\?/;

    /**
     * @private
     * @const {!RegExp}
     */
    var _EQUAL_SIGN = /\=/;

    /**
     * @private
     * @const {!RegExp}
     */
    var _ANY = /\*|any/;

    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasPipe(val) {
      return _PIPE['test'](val);
    }

    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasExPoint(val) {
      return _EXCLAMATION_POINT['test'](val);
    }

    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasQuestMark(val) {
      return _QUESTION_MARK['test'](val);
    }

    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasEqSign(val) {
      return _EQUAL_SIGN['test'](val);
    }

    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasAnyGlob(val) {
      return _ANY['test'](val);
    }

    /**
     * @const {!Object<string, !function(string): boolean>}
     * @dict
     */
    var SPECIALS = {
      '|': hasPipe,
      '!': hasExPoint,
      '?': hasQuestMark,
      '=': hasEqSign,
      '*': hasAnyGlob
    };

    return SPECIALS;
  })();

  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return _SPECIALS[special](types);
  }

  /**
   * @private
   * @param {string} types
   * @return {?Array<!function>}
   */
  function _getChecks(types) {

    /** @type {?Array<!function>} */
    var checks;
    /** @type {string} */
    var type;
    /** @type {number} */
    var i;

    if ( _hasSpecial('=', types) )
      types += '|undefined';

    types = types['toLowerCase']();
    types = types['replace'](_ALL_SPECIALS, '');
    checks = types['split']('|');

    i = checks['length'];
    while (i--) {
      type = '_' + checks[i];
      if ( !$own(_TYPES, type) )
        return NIL;
      checks[i] = _TYPES[type];
    }

    return checks['length']
      ? checks
      : NIL;
  }

  /**
   * @private
   * @param {string} types
   * @return {(undefined|boolean)}
   */
  function _getNullable(types) {

    /** @type {boolean} */
    var override;
    /** @type {boolean} */
    var ensure;
    /** @type {boolean} */
    var negate;

    ensure = _hasSpecial('?', types);
    negate = _hasSpecial('!', types);
    override = ensure && negate
      ? NO
      : ensure || negate;
    return override
      ? !negate && ensure
      : VOID;
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
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var _mkRangeErr = _MK_ERR.rangeError;

  return is;
})();
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var amend = (function amendPrivateScope() {

  /**
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function amend(source, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var byKey;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        throw _mkErr(new ERR, 'no #props defined');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string');

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #val defined');

        return _amendProps(source, props, VOID, VOID, VOID);

      case 3:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string');

        byKey = $is.arr(props);

        if (byKey)
          return _amendPropsByKey(source, props, val, VOID, VOID, VOID);

        descriptor = val;
        strongType = VOID;
        setter = VOID;

        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = VOID;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = VOID;
        }
        break;

      case 4:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = VOID;
          }
          else if ( $is.fun(descriptor) ) {
            setter = descriptor;
            descriptor = VOID;
          }
        }
        else {
          strongType = descriptor;
          descriptor = val;
          setter = VOID;
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        break;

      case 5:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        else {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string');

        byKey = $is.arr(props);

        if (!byKey) {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;
    }

    if ( !$is.void(descriptor) && !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object=');
    if ( !$is.void(strongType) && !$is.str(strongType) )
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=');
    if ( !$is.void(setter) && !$is.fun(setter) )
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(!function(*, *): *)=');

    if (strongType) {
      if (byKey) {
        if ( !is(strongType + '=', val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType + '=');
      }
      else if ( !_strongTypeCheckProps(strongType, props) )
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType);
    }

    return byKey
      ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
      : _amendProps(source, props, descriptor, strongType, setter);
  }

  /**
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   * @param {!Object=} descriptor
   * @return {!Object}
   */
  function amendConfig(source, props, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'config');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'config');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #descriptor defined', 'config');
        if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');
        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'config');

        return _amendConfigs(source, props);

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');

        if ( $is.arr(props) ) {
          if ( !$is.obj(descriptor) )
            throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor,
              '!Object=', 'config');

          props = _setupConfigs(props, descriptor);
        }
        else if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string', 'config');

        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'config');

        return _amendConfigs(source, props);
    }
  }
  amend['config'] = amendConfig;

  /**
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function amendProperty(source, key, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var byKey;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');

      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'property');

      case 2:
        throw _mkErr(new ERR, 'no #val or #descriptor defined', 'property');

      case 3:
        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;

      case 4:
        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = VOID;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = VOID;
        }

        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;

      case 5:
        if ( $is.fun(strongType) ) {
          setter = strongType;
          strongType = VOID;
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = VOID;
          }
        }

        if ( _isDescriptor(val) ) {
          descriptor = val;
          val = descriptor['value'];
        }
        break;
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'property');
    if ( !$is.str(key) )
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property');
    if ( !$is.void(descriptor) && !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object=',
        'property');
    if ( !$is.void(strongType) && !$is.str(strongType) )
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'property');
    if ( !$is.void(setter) && !$is.fun(setter) )
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(!function(*, *): *)=', 'property');
    if ( !!strongType && !is(strongType + '=', val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType + '=',
        'property');
    if (descriptor
        && (strongType || setter)
        && $own(descriptor, 'writable') )
      throw _mkErr(new ERR, 'invalid data #descriptor used with defined ' +
        '#strongType or #setter', 'property');

    return _amendProp(source, key, val, descriptor, strongType, setter);
  }
  amend['property'] = amendProperty;
  amend['prop'] = amendProperty;

  /**
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function amendPropertyConfig(source, key, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property.config');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'property.config');
      case 2:
        throw _mkErr(new ERR, 'no #descriptor defined', 'property.config');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
        'property.config');
    if ( !$is.str(key) )
      throw _mkTypeErr(new TYPE_ERR, 'key', key, 'string', 'property.config');
    if ( !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object',
        'property.config');
    if ( !$own(source, key) )
      throw _mkErr(new ERR, 'undefined #key name in #source',
        'property.config');

    return _amendConfig(source, key, descriptor);
  }
  amend['property']['config'] = amendPropertyConfig;
  amend['prop']['config'] = amendPropertyConfig;

  /**
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function amendProperties(
    source, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var byKey;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #val defined', 'properties');

        return _amendProps(source, props, VOID, VOID, VOID);

      case 3:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey)
          return _amendPropsByKey(source, props, val, VOID, VOID, VOID);

        descriptor = val;
        strongType = VOID;
        setter = VOID;

        if ( $is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = VOID;
        }
        else if ( $is.fun(descriptor) ) {
          setter = descriptor;
          descriptor = VOID;
        }
        break;

      case 4:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.str(descriptor) ) {
            strongType = descriptor;
            descriptor = VOID;
          }
          else if ( $is.fun(descriptor) ) {
            setter = descriptor;
            descriptor = VOID;
          }
        }
        else {
          strongType = descriptor;
          descriptor = val;
          setter = VOID;
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        break;

      case 5:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (byKey) {
          if ( $is.fun(strongType) ) {
            setter = strongType;
            strongType = VOID;
            if ( $is.str(descriptor) ) {
              strongType = descriptor;
              descriptor = VOID;
            }
          }
        }
        else {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, *>|!Array<string>|string', 'properties');

        byKey = $is.arr(props);

        if (!byKey) {
          setter = strongType;
          strongType = descriptor;
          descriptor = val;
        }
        break;
    }

    if ( !$is.void(descriptor) && !$is.obj(descriptor) )
      throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor, '!Object=',
        'properties');
    if ( !$is.void(strongType) && !$is.str(strongType) )
      throw _mkTypeErr(new TYPE_ERR, 'strongType', strongType, 'string=',
        'properties');
    if ( !$is.void(setter) && !$is.fun(setter) )
      throw _mkTypeErr(new TYPE_ERR, 'setter', setter,
        '(!function(*, *): *)=', 'properties');

    if (strongType) {
      if (byKey) {
        if ( !is(strongType + '=', val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, strongType + '=',
            'properties');
      }
      else if ( !_strongTypeCheckProps(strongType, props) )
        throw _mkTypeErr(new TYPE_ERR, 'props property value', props,
          strongType, 'properties');
    }

    return byKey
      ? _amendPropsByKey(source, props, val, descriptor, strongType, setter)
      : _amendProps(source, props, descriptor, strongType, setter);
  }
  amend['properties'] = amendProperties;
  amend['props'] = amendProperties;

  /**
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   * @param {!Object=} descriptor
   * @return {!Object}
   */
  function amendPropertiesConfig(source, props, descriptor) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties.config');

      case 1:
        throw _mkErr(new ERR, 'no #props defined', 'properties.config');

      case 2:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties.config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( $is.arr(props) )
          throw _mkErr(new ERR, 'no #descriptor defined','properties.config');
        if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');
        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'properties.config');

        return _amendConfigs(source, props);

      default:
        if ( !$is.obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object',
            'properties.config');

        if ( $is.str(props) )
          props = $splitKeys(props);

        if ( !$is.obj(props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');

        if ( $is.arr(props) ) {
          if ( !$is.obj(descriptor) )
            throw _mkTypeErr(new TYPE_ERR, 'descriptor', descriptor,
              '!Object=', 'properties.config');

          props = _setupConfigs(props, descriptor);
        }
        else if ( !is('!objMap', props) )
          throw _mkTypeErr(new TYPE_ERR, 'props', props,
            '!Object<string, !Object>|!Array<string>|string',
            'properties.config');

        if ( !_hasKeys(source, props) )
          throw _mkErr(new ERR, 'at least one property key name in the ' +
            '#props did not exist in the #source', 'properties.config');

        return _amendConfigs(source, props);
    }
  }
  amend['properties']['config'] = amendPropertiesConfig;
  amend['props']['config'] = amendPropertiesConfig;

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {
    descriptor = descriptor || NIL;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    descriptor = strongType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter)
      : _isAccessor(descriptor)
        ? $cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);
    return _ObjDefineProp(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, descriptor, strongType, setter) {
    descriptor = _getDescriptor(descriptor || NIL, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = !!strongType || !!setter
      ? _setupPropsWithSetter(props, descriptor, strongType, setter)
      : _setupProps(props, descriptor);
    return _ObjDefineProps(obj, props);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Array} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _amendPropsByKey(obj, props, val, descriptor, strongType, setter) {
    descriptor = _getDescriptor(descriptor || NIL, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = !!strongType || !!setter
      ? _setupPropsByKeyWithSetter(props, val, descriptor, strongType, setter)
      : _setupPropsByKey(props, val, descriptor);
    return _ObjDefineProps(obj, props);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(obj, key, descriptor) {
    return _ObjDefineProp(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjDefineProps(obj, props);
  }

  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _DATA_DESCRIPTOR = {
    'writable': YES,
    'enumerable': YES,
    'configurable': YES
  };

  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _ACCESSOR_DESCRIPTOR = {
    'enumerable': YES,
    'configurable': YES
  };

  /**
   * @private
   * @const {!Object<string, boolean>}
   * @dict
   */
  var _DESCRIPTOR_PROPS = {
    'get': YES,
    'set': YES,
    'value': YES,
    'writable': YES,
    'enumerable': YES,
    'configurable': YES
  };

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    val = _isDescriptor(val)
      ? val
      : { 'value': val };
    return $merge(prop, val);
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = $merge(prop, val);
      if ( $own(prop, 'writable') || _isAccessor(prop) )
        return prop;
      val = prop['value'];
      prop = _cloneAccessor(prop);
    }

    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptorByKey(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    prop['value'] = val;
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(
    val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = $cloneObj(descriptor);
    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function=} strongType
   * @param {!function=} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, strongType, setter) {
    descriptor['get'] = function get() {
      return val;
    };
    descriptor['set'] = strongType && setter
      ? function set(newVal) {
          if ( !strongType(newVal) )
            throw _mkStrongTypeErr(new TYPE_ERR,
              'invalid data type for property value: `' + newVal + '`');
          val = setter(newVal, val);
        }
      : strongType
        ? function set(newVal) {
            if ( !strongType(newVal) )
              throw _mkStrongTypeErr(new TYPE_ERR,
                'invalid data type for property value: `' + newVal + '`');
            val = newVal;
          }
        : function set(newVal) {
            val = setter(newVal, val);
          };
    return descriptor;
  }

  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function _isDescriptor(val) {

    /** @type {string} */
    var key;

    if ( !$is.obj(val) )
      return NO;

    for (key in val) {
      if ( $own(val, key) && !$own(_DESCRIPTOR_PROPS, key) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @param {?Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return $is.obj(obj) && ( $own(obj, 'value') || $own(obj, 'writable') );
  }

  /**
   * @private
   * @param {?Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return $is.obj(obj) && ( $own(obj, 'get') || $own(obj, 'set') );
  }

  /**
   * @private
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _cloneAccessor(descriptor) {

    /** @type {!Object} */
    var accessor;
    /** @type {string} */
    var key;

    accessor = {};
    for (key in descriptor) {
      if ( $own(descriptor, key) && key !== 'value' )
        accessor[key] = descriptor[key];
    }
    return accessor;
  }

  /**
   * @private
   * @param {?Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( $is.bool(descriptor['enumerable']) )
        defaultDescriptor['enumerable'] = descriptor['enumerable'];
      if ( $is.bool(descriptor['configurable']) )
        defaultDescriptor['configurable'] = descriptor['configurable'];
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? _ACCESSOR_DESCRIPTOR
      : _DATA_DESCRIPTOR;
    defaultDescriptor = $cloneObj(defaultDescriptor);
    return $merge(defaultDescriptor, descriptor);
  }

  /**
   * @private
   * @param {string=} strongType
   * @return {(!function|undefined)}
   */
  function _getStrongType(strongType) {
    return strongType && function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    };
  }

  /**
   * @private
   * @const {boolean}
   */
  var _HAS_DEFINE_PROPS = (function _HAS_DEFINE_PROPS_PrivateScope() {

    /** @type {!Object} */
    var descriptor;
    /** @type {string} */
    var name;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    name = 'defineProperties';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) )
      return NO;

    name = 'defineProperty';

    if ( !(name in OBJ) || !$is.fun(OBJ[name]) )
      return NO;

    /** @dict */ 
    obj = {};
    /** @dict */ 
    descriptor = {};

    descriptor['value'] = obj;
    descriptor['enumerable'] = NO;

    try {
      OBJ[name](obj, 'key', descriptor);
      for (key in obj) {
        if (key === 'key')
          return NO;
      }
    }
    catch (e) {
      return NO;
    }

    return obj['key'] === obj;
  })();

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _ObjDefineProp = (function _ObjDefinePropPrivateScope() {

    if (_HAS_DEFINE_PROPS)
      return OBJ['defineProperty'];

    return function defineProperty(obj, key, descriptor) {
      obj[key] = $own(descriptor, 'get')
        ? descriptor['get']()
        : descriptor['value'];
      return obj;
    };
  })();

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object<string, !Object>} props
   * @return {!Object}
   */
  var _ObjDefineProps = (function _ObjDefinePropsPrivateScope() {

    if (_HAS_DEFINE_PROPS)
      return OBJ['defineProperties'];

    return function defineProperties(obj, props) {

      /** @type {!Object} */
      var descriptor;
      /** @type {string} */
      var key;

      for (key in props) {
        if ( $own(props, key) ) {
          descriptor = props[key];
          obj[key] = $own(descriptor, 'get')
            ? descriptor['get']()
            : descriptor['value'];
        }
      }
      return obj;
    };
  })();

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupProps(props, descriptor) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( $own(props, key) )
        newProps[key] = _setupDescriptor(props[key], descriptor);
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {!function} strongType
   * @param {!function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, strongType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( $own(props, key) )
        newProps[key] = _setupDescriptorWithSetter(
          props[key], descriptor, strongType, setter);
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupPropsByKey(keys, val, descriptor) {

    /** @type {!function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) {
          return $cloneObj(desc);
        }
      : _setupDescriptorByKey;
    props = {};

    len = keys['length'];
    i = -1;
    while (++i < len)
      props[ keys[i] ] = setupDesc(val, descriptor);
    return props;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @param {!function} strongType
   * @param {!function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(
    keys, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys['length'];
    i = -1;
    while (++i < len)
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(
        val, descriptor, strongType, setter);
    return props;
  }

  /**
   * @private
   * @param {!Array} keys
   * @param {!Object} desc
   * @return {!Object}
   */
  function _setupConfigs(keys, desc) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};

    len = keys['length'];
    i = -1;
    while (++i < len)
      props[ keys[i] ] = desc;
    return props;
  }

  /**
   * @private
   * @param {!Object} source
   * @param {!Object} obj
   * @return {boolean}
   */
  function _hasKeys(source, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && !$own(source, key) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @param {string} strongType
   * @param {!Object} props
   * @return {boolean}
   */
  function _strongTypeCheckProps(strongType, props) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    strongType += '=';
    for (key in props) {
      if ( $own(props, key) ) {
        val = props[key];
        if ( _isDescriptor(val) ) {
          if ( $own(val, 'writable') )
            continue;
          val = val['value'];
        }
        if ( !is(strongType, val) )
          return NO;
      }
    }
    return YES;
  }

  /**
   * @private
   * @param {!TypeError} err
   * @param {string} msg
   * @return {!TypeError}
   */
  function _mkStrongTypeErr(err, msg) {
    err['__setter'] = YES;
    err['setter'] = YES;
    err['__type'] = YES;
    err['type'] = YES;
    err['name'] = 'TypeError';
    err['message'] = msg;
    err['msg'] = msg;
    return err;
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('amend');

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

  return amend;
})();
vitals['amend'] = amend;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var create = (function createPrivateScope() {

  /**
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

        return $mkObj(proto);

      default:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object');

        args = $sliceArr(arguments);
        args[0] = $mkObj(proto);
        return amend['apply'](NIL, args);
    }
  }

  /**
   * @public
   * @param {?Object} proto
   * @param {(!Object<string, *>|!Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {(!function(*, *): *)=} setter
   * @return {!Object}
   */
  function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #proto defined', 'object');

      case 1:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

        return $mkObj(proto);

      default:
        if ( !$is.nil(proto) && !$is.obj(proto) )
          throw _mkTypeErr(new TYPE_ERR, 'proto', proto, '?Object', 'object');

        args = $sliceArr(arguments);
        args[0] = $mkObj(proto);
        return amend['apply'](NIL, args);
    }
  }
  create['object'] = createObject;
  create['obj'] = createObject;

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('create');

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

  return create;
})();
vitals['create'] = create;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var freeze = (function freezePrivateScope() {

  /**
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   * @return {(?Object|?Function)}
   */
  function freeze(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return _freeze(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return deep
          ? _deepFreeze(obj)
          : _freeze(obj);
    }
  }

  /**
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   * @return {(?Object|?Function)}
   */
  function freezeObject(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined', 'object');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return _freeze(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return deep
          ? _deepFreeze(obj)
          : _freeze(obj);
    }
  }
  freeze['object'] = freezeObject;
  freeze['obj'] = freezeObject;

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _ObjectFreeze = (function _ObjectFreezePolyfillPrivateScope() {

    /** @type {!function} */
    var objectFreeze;

    if ( !('freeze' in OBJ) || !$is.fun(OBJ['freeze']) )
      return function freeze(obj) {
        return obj;
      };

    objectFreeze = OBJ['freeze'];

    try {
      objectFreeze(function(){});
      return objectFreeze;
    }
    catch (e) {
      return function freeze(obj) {
        return $is.fun(obj)
          ? obj
          : objectFreeze(obj);
      };
    }
  })();

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _freeze = _ObjectFreeze;

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  function _deepFreeze(obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && $is._obj(obj[key]) )
        _deepFreeze(obj[key]);
    }

    return _freeze(obj);
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('freeze');

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

  return freeze;
})();
vitals['freeze'] = freeze;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var seal = (function sealPrivateScope() {

  /**
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   * @return {(?Object|?Function)}
   */
  function seal(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return _seal(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }

  /**
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   * @return {(?Object|?Function)}
   */
  function sealObject(obj, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #obj defined', 'object');

      case 1:
        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return _seal(obj);

      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');

        if ( $is.nil(obj) )
          return NIL;

        if ( !$is._obj(obj) )
          throw _mkTypeErr(new TYPE_ERR, 'obj', obj, '?Object|?Function',
            'object');

        return deep
          ? _deepSeal(obj)
          : _seal(obj);
    }
  }
  seal['object'] = sealObject;
  seal['obj'] = sealObject;

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _ObjectSeal = (function _ObjectSealPolyfillPrivateScope() {

    /** @type {!function} */
    var objectSeal;

    if ( !('seal' in OBJ) || !$is.fun(OBJ['seal']) )
      return function seal(obj) {
        return obj;
      };

    objectSeal = OBJ['seal'];

    try {
      objectSeal(function(){});
      return objectSeal;
    }
    catch (e) {
      return function seal(obj) {
        return $is.fun(obj)
          ? obj
          : objectSeal(obj);
      };
    }
  })();

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  var _seal = _ObjectSeal;

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @return {(!Object|!Function)}
   */
  function _deepSeal(obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) && $is._obj(obj[key]) )
        _deepSeal(obj[key]);
    }

    return _seal(obj);
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('seal');

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

  return seal;
})();
vitals['seal'] = seal;
  vitals['VERSION'] = VERSION;
  (function __exportVitals() {

    if (ENV.HAS_WINDOW)
      _appendVitals(window);
    if (ENV.HAS_SELF)
      _appendVitals(self);

    _appendVitals(ROOT);

    if (ENV.HAS_EXPORTS && ENV.HAS_MODULE) {
      if (module.exports === exports)
        module.exports = vitals;
      else
        _appendVitals(exports);
    }

    if (ENV.HAS_DEFINE)
      define(function() {
        return vitals;
      });

    /**
     * @private
     * @param {(!Object|!Function)} obj
     * @return {void}
     */
    function _appendVitals(obj) {
      obj['vitals'] = vitals;
      obj['Vitals'] = vitals;
      obj['VITALS'] = vitals;
    }
  })();
})(this);



