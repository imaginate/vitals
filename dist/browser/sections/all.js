/**
 * @section all
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
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @return {!Array}
 */
function $cloneArr(src) {

  /** @type {!Array} */
  var clone;
  /** @type {string} */
  var key;

  clone = new ARR(src['length']);
  for (key in src) {
    if ( $own(src, key) )
      clone[key] = src[key];
  }
  return clone;
}
/**
 * @private
 * @param {!Function} func
 * @return {!Function}
 */
function $cloneFun(func) {

  /** @type {!Function} */
  function funcCopy() {
    return func['apply'](NIL, arguments);
  }
  /** @type {string} */
  var key;

  for (key in func) {
    if ( $own(func, key) )
      funcCopy[key] = func[key];
  }
  return funcCopy;
}
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
 * @param {string} source
 * @return {string}
 */
function $escRegx(source) {
  return source['replace'](/[\\^$.*+?|(){}[\]]/g, '\\$&');
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
 * @param {(!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
function $inObj(src, val) {

  /** @type {string} */
  var key;

  for (key in src) {
    if ( $own(src, key) && src[key] === val )
      return YES;
  }
  return NO;
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
 * @param {*} key
 * @return {boolean}
 */
var $ownEnum = (function $ownEnumPrivateScope() {


  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasEnum = OBJ_PROTO['propertyIsEnumerable'];

  /**
   * @param {(!Object|!Function)} src
   * @param {*} key
   * @return {boolean}
   */
  function $ownEnum(src, key) {
    return $own(src, key) && _hasEnum['call'](src, key);
  }

  return $ownEnum;
})();
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
 * @param {string} src
 * @param {number=} start
 * @param {number=} end
 * @return {string}
 */
function $sliceStr(src, start, end) {

  /** @type {number} */
  var len;

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

  return start >= end
    ? ''
    : src['substring'](start, end);
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
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isNull(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'null');
      case 1:
        return $is.nil(val);
      default:
        return _are(arguments, $is.nil);
    }
  }
  is['null'] = isNull;
  is['nil'] = isNull;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isUndefined(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'undefined');
      case 1:
        return $is.void(val);
      default:
        return _are(arguments, $is.none);
    }
  }
  is['undefined'] = isUndefined;
  is['void'] = isUndefined;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isBoolean(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'boolean');
      case 1:
        return $is.bool(val);
      default:
        return _are(arguments, $is.bool);
    }
  }
  is['boolean'] = isBoolean;
  is['bool'] = isBoolean;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isString(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'string');
      case 1:
        return $is.str(val);
      default:
        return _are(arguments, $is.str);
    }
  }
  is['string'] = isString;
  is['str'] = isString;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isNonEmptyString(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_string');
      case 1:
        return $is._str(val);
      default:
        return _are(arguments, $is._str);
    }
  }
  is['_string'] = isNonEmptyString;
  is['_str'] = isNonEmptyString;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'number');
      case 1:
        return $is.num(val);
      default:
        return _are(arguments, $is.num);
    }
  }
  is['number'] = isNumber;
  is['num'] = isNumber;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isNonZeroNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_number');
      case 1:
        return $is._num(val);
      default:
        return _are(arguments, $is._num);
    }
  }
  is['_number'] = isNonZeroNumber;
  is['_num'] = isNonZeroNumber;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isNan(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'nan');
      case 1:
        return $is.nan(val);
      default:
        return _are(arguments, $is.nan);
    }
  }
  is['nan'] = isNan;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isObject(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'object');
      case 1:
        return $is.obj(val);
      default:
        return _are(arguments, $is.obj);
    }
  }
  is['object'] = isObject;
  is['obj'] = isObject;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isObjectOrFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_object');
      case 1:
        return $is._obj(val);
      default:
        return _are(arguments, $is._obj);
    }
  }
  is['_object'] = isObjectOrFunction;
  is['_obj'] = isObjectOrFunction;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'function');
      case 1:
        return $is.fun(val);
      default:
        return _are(arguments, $is.fun);
    }
  }
  is['func'] = isFunction;
  is['fun'] = isFunction;
  try {
    is['fn'] = isFunction;
    is['function'] = isFunction;
  }
  catch (e) {}

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isArray(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'array');
      case 1:
        return $is.arr(val);
      default:
        return _are(arguments, $is.arr);
    }
  }
  is['array'] = isArray;
  is['arr'] = isArray;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isArrayOrArguments(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_array');
      case 1:
        return $is._arr(val);
      default:
        return _are(arguments, $is._arr);
    }
  }
  is['_array'] = isArrayOrArguments;
  is['_arr'] = isArrayOrArguments;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'regexp');
      case 1:
        return $is.regx(val);
      default:
        return _are(arguments, $is.regx);
    }
  }
  is['regexp'] = isRegExp;
  is['regex'] = isRegExp;
  is['regx'] = isRegExp;
  is['re'] = isRegExp;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isDate(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'date');
      case 1:
        return $is.date(val);
      default:
        return _are(arguments, $is.date);
    }
  }
  is['date'] = isDate;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isError(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'error');
      case 1:
        return $is.err(val);
      default:
        return _are(arguments, $is.err);
    }
  }
  is['error'] = isError;
  is['err'] = isError;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isArguments(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'args');
      case 1:
        return $is.args(val);
      default:
        return _are(arguments, $is.args);
    }
  }
  is['args'] = isArguments;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isDocument(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'document');
      case 1:
        return $is.doc(val);
      default:
        return _are(arguments, $is.doc);
    }
  }
  is['document'] = isDocument;
  is['doc'] = isDocument;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isElement(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'element');
      case 1:
        return $is.elem(val);
      default:
        return _are(arguments, $is.elem);
    }
  }
  is['element'] = isElement;
  is['elem'] = isElement;

  /**
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isEmpty(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'empty');
      case 1:
        return $is.empty(val);
      default:
        return _are(arguments, $is.empty);
    }
  }
  is['empty'] = isEmpty;

  /**
   * @public
   * @param {...(?Object|?Function)} source
   * @return {boolean}
   */
  function isFrozen(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'frozen');
      case 1:
        return _isFrozen(val);
      default:
        return _are(arguments, _isFrozen);
    }
  }
  is['frozen'] = isFrozen;

  /**
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  function isWholeNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'wholeNumber');
      case 1:
        return _isWhole(val);
      default:
        return _are(arguments, _isWhole);
    }
  }
  is['wholeNumber'] = isWholeNumber;
  is['whole'] = isWholeNumber;

  /**
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  function isOddNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'oddNumber');
      case 1:
        return _isOdd(val);
      default:
        return _are(arguments, _isOdd);
    }
  }
  is['oddNumber'] = isOddNumber;
  is['odd'] = isOddNumber;

  /**
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  function isEvenNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'evenNumber');
      case 1:
        return _isEven(val);
      default:
        return _are(arguments, _isEven);
    }
  }
  is['evenNumber'] = isEvenNumber;
  is['even'] = isEvenNumber;

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
   * @param {(?Object|?Function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( $is.nil(val) )
      return NO;

    if ( !$is._obj(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, '?Object|?Function',
        'frozen');

    return $is.frozen(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'wholeNumber');

    return $is.whole(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'oddNumber');
    if ( !$is.whole(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', '-?[0-9]+', 'oddNumber');

    return $is.odd(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'evenNumber');
    if ( !$is.whole(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', '-?[0-9]+', 'evenNumber');

    return $is.even(val);
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
vitals['is'] = is;
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
vitals['copy'] = copy;
/**
 * @public
 * @type {!Function<string, !Function>}
 * @dict
 */
var cut = (function cutPrivateScope() {

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   * @param {...*} val
   * @param {?Object=} thisArg
   * @return {(!Object|!Function|!Array|string)}
   */
  function cut(source, val, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        throw _mkErr(new ERR, 'no #val defined');

      case 2:
        if ( $is.str(source) )
          return $is.arr(val)
            ? _cutPatterns(source, val)
            : _cutPattern(source, val);

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(source) )
          source = $sliceArr(source);

        return $is.fun(val)
          ? $is.arr(source)
            ? _filterArr(source, val, VOID)
            : _filterObj(source, val, VOID)
          : $is.arr(val)
            ? _cutProps(source, val)
            : _cutProp(source, val);

      default:
        if ( $is.str(source) ) {
          val = $sliceArr(arguments, 1);
          return _cutPatterns(source, val);
        }

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(source) )
          source = $sliceArr(source);

        if ( $is.fun(val) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

          return $is.arr(source)
            ? _filterArr(source, val, thisArg)
            : _filterObj(source, val, thisArg);
        }

        val = $sliceArr(arguments, 1);
        return _cutProps(source, val);
    }
  }

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   * @param {*} val
   * @param {?Object=} thisArg
   * @return {(!Object|!Function|!Array)}
   */
  function cutProperty(source, val, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'property');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'property');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments', 'property');

        if ( $is.args(source) )
          source = $sliceArr(source);

        return $is.fun(val)
          ? $is.arr(source)
            ? _filterArr(source, val, VOID)
            : _filterObj(source, val, VOID)
          : _cutProp(source, val);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments', 'property');

        if ( $is.args(source) )
          source = $sliceArr(source);

        if ( $is.fun(val) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
              'property');

          return $is.arr(source)
            ? _filterArr(source, val, thisArg)
            : _filterObj(source, val, thisArg);
        }

        return _cutProp(source, val);
    }
  }
  cut['property'] = cutProperty;
  cut['prop'] = cutProperty;

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {(!Object|!Function)}
   */
  function cutKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'key');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'key');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object|!Function',
        'key');

    return _cutKey(source, key);
  }
  cut['key'] = cutKey;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {number} index
   * @param {(number|undefined)=} toIndex
   * @return {!Array}
   */
  function cutIndex(source, index, toIndex) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'index');

      case 1:
        throw _mkErr(new ERR, 'no #index defined', 'index');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function', 'index');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'index');
        if ( !$is.num(index) )
          throw _mkTypeErr(new TYPE_ERR, 'index', index, 'number', 'index');
        if ( !$is.whole(index) )
          throw _mkErr(new ERR, 'invalid #index `number` (' +
            'must be a whole `number`)', 'index');

        if ( !$is.arr(source) )
          source = $sliceArr(source);

        return _cutIndex(source, index, VOID);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function', 'index');
        if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'index');
        if ( !$is.num(index) )
          throw _mkTypeErr(new TYPE_ERR, 'index', index, 'number', 'index');
        if ( !$is.whole(index) )
          throw _mkErr(new ERR, 'invalid #index `number` (' +
            'must be a whole `number`)', 'index');

        if ( !$is.void(toIndex) ) {
          if ( !$is.num(toIndex) )
            throw _mkTypeErr(new TYPE_ERR, 'toIndex', toIndex, 'number',
              'index');
          if ( !$is.whole(index) )
            throw _mkErr(new ERR, 'invalid #toIndex `number` (' +
              'must be a whole `number`)', 'index');
        }

        if ( !$is.arr(source) )
          source = $sliceArr(source);

        return _cutIndex(source, index, toIndex);
    }
  }
  cut['index'] = cutIndex;
  cut['i'] = cutIndex;

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   * @param {string} type
   * @return {(!Object|!Function|!Array)}
   */
  function cutType(source, type) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'type');
      case 1:
        throw _mkErr(new ERR, 'no #type defined', 'type');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'type');
    if ( !$is.str(type) )
      throw _mkTypeErr(new TYPE_ERR, 'type', type, 'string', 'type');

    if ( $is.args(source) )
      source = $sliceArr(source);

    if ( $is.empty(source) ) {
      is(type, ''); // run once to catch any invalid types in #type
      return source;
    }

    return _cutType(source, type);
  }
  cut['type'] = cutType;

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   * @param {*} val
   * @return {(!Object|!Function|!Array)}
   */
  function cutValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'value');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value');
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'value');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return _cutVal(source, val);
  }
  cut['value'] = cutValue;
  cut['val'] = cutValue;

  /**
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function cutPattern(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'pattern');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'pattern');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'pattern');

    return _cutPattern(source, pattern);
  }
  cut['pattern'] = cutPattern;
  cut['patt'] = cutPattern;

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   * @param {...*} val
   * @return {(!Object|!Function|!Array)}
   */
  function cutProperties(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'properties');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'properties');
      case 2:
        break;
      default:
        val = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'properties');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return $is.arr(val)
      ? _cutProps(source, val)
      : _cutProp(source, val);
  }
  cut['properties'] = cutProperties;
  cut['props'] = cutProperties;

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {...*} key
   * @return {(!Object|!Function)}
   */
  function cutKeys(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'keys');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'keys');
      case 2:
        break;
      default:
        key = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object|!Function',
        'keys');

    return $is.arr(key)
      ? _cutKeys(source, key)
      : _cutKey(source, key);
  }
  cut['keys'] = cutKeys;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {(!Array<number>|...number)} index
   * @return {!Array}
   */
  function cutIndexes(source, index) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'indexes');
      case 1:
        throw _mkErr(new ERR, 'no #index defined', 'indexes');
      case 2:
        break;
      default:
        index = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function', 'indexes');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'indexes');

    if ( !$is.arr(source) )
      source = $sliceArr(source);

    if ( !$is.arr(index) ) {
      if ( !$is.num(index) )
        throw _mkTypeErr(new TYPE_ERR, 'index', index,
          '(!Array<number>|...number)', 'indexes');
      if ( !$is.whole(index) )
        throw _mkErr(new ERR, 'invalid #index `number` (' +
          'must be a whole `number`)', 'indexes');

      return _cutIndex(source, index);
    }

    if ( !_isNumArr(index) )
      throw _mkTypeErr(new TYPE_ERR, 'index', index,
        '(!Array<number>|...number)', 'indexes');
    if ( !_isWholeNumArr(index) )
      throw _mkErr(new ERR, 'an invalid #index `number` (' +
        'every #index must be a whole `number`)', 'indexes');

    return _cutIndexes(source, index);
  }
  cut['indexes'] = cutIndexes;
  cut['ii'] = cutIndexes;

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   * @param {...*} val
   * @return {(!Object|!Function|!Array)}
   */
  function cutValues(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'values');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'values');
      case 2:
        break;
      default:
        val = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments', 'values');

    if ( $is.args(source) )
      source = $sliceArr(source);

    return $is.arr(val)
      ? _cutVals(source, val)
      : _cutVal(source, val);
  }
  cut['values'] = cutValues;
  cut['vals'] = cutValues;

  /**
   * @public
   * @param {string} source
   * @param {...*} pattern
   * @return {string}
   */
  function cutPatterns(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'patterns');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'patterns');
      case 2:
        break;
      default:
        pattern = $sliceArr(arguments, 1);
        break;
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'patterns');

    return $is.arr(pattern)
      ? _cutPatterns(source, pattern)
      : _cutPattern(source, pattern);
  }
  cut['patterns'] = cutPatterns;
  cut['patts'] = cutPatterns;

  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {*} val
   * @return {(!Object|!Function|!Array)}
   */
  function _cutProp(source, val) {
    return $is.arr(source)
      ? $is.num(val) && $is.whole(val)
        ? _spliceKey(source, val)
        : _spliceVal(source, val)
      : $is.str(val) || $is.regx(val)
        ? _deleteKey(source, val)
        : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {!Array<*>} vals
   * @return {(!Object|!Function|!Array)}
   */
  function _cutProps(source, vals) {
    return $is.arr(source)
      ? _isIntArr(vals)
        ? _spliceKeys(source, vals)
        : _spliceVals(source, vals)
      : $is.str(vals[0]) || $is.regx(vals[0])
        ? _deleteKeys(source, vals)
        : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {(!Object|!Function)}
   */
  function _cutKey(source, key) {

    if ( $own(source, key) )
      delete source[key];

    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} keys
   * @return {(!Object|!Function)}
   */
  function _cutKeys(source, keys) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys['length'];
    i = -1;
    while (++i < len)
      source = _cutKey(source, keys[i]);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @param {number=} toKey
   * @return {!Array}
   */
  function _cutIndex(source, key, toKey) {

    /** @type {number} */
    var len;

    len = source['length'];

    if (key < 0)
      key += len;

    if (key >= len)
      return source;

    if ( $is.void(toKey) ) {
      if (key < 0)
        return source;
      source['splice'](key, 1);
      return source;
    }

    if (key < 0)
      key = 0;

    if (toKey > len)
      toKey = len;
    else if (toKey < 0)
      toKey += len;

    if (key >= toKey)
      return source;

    source['splice'](key, toKey - key);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _cutIndexes(source, keys) {
    return _spliceKeys(source, keys);
  }

  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {string} type
   * @return {(!Object|!Function|!Array)}
   */
  function _cutType(source, type) {
    return $is.arr(source)
      ? _spliceValByType(source, type)
      : _deleteValByType(source, type);
  }

  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {*} val
   * @return {(!Object|!Function|!Array)}
   */
  function _cutVal(source, val) {
    return $is.arr(source)
      ? _spliceVal(source, val)
      : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {(!Object|!Function|!Array)} source
   * @param {!Array<*>} vals
   * @return {(!Object|!Function|!Array)}
   */
  function _cutVals(source, vals) {
    return $is.arr(source)
      ? _spliceVals(source, vals)
      : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {string}
   */
  function _cutPattern(source, pattern) {
    if ( !$is.regx(pattern) ) {
      pattern = $mkStr(pattern);
      pattern = $escRegx(pattern);
      pattern = new REGX(pattern, 'g');
    }
    return source['replace'](pattern, '');
  }

  /**
   * @private
   * @param {string} source
   * @param {!Array} patterns
   * @return {string}
   */
  function _cutPatterns(source, patterns) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patterns['length'];
    i = -1;
    while (++i < len)
      source = _cutPattern(source, patterns[i]);
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @param {boolean=} useMatch
   * @return {(!Object|!Function)}
   */
  function _deleteKey(source, key, useMatch) {

    /** @type {!RegExp} */
    var pattern;

    if ( $is.void(useMatch) )
      useMatch = $is.regx(key);

    if (!useMatch) {
      if ( $own(source, key) )
        delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( $own(source, key) && $match(key, pattern) )
        delete source[key];
    }
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} keys
   * @return {(!Object|!Function)}
   */
  function _deleteKeys(source, keys) {

    /** @type {boolean} */
    var useMatch;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    useMatch = $is.regx(keys[0]);
    len = keys['length'];
    i = -1;
    while (++i < len)
      source = _deleteKey(source, keys[i], useMatch);
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _deleteVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) && source[key] === val )
        delete source[key];
    }
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {string} type
   * @return {(!Object|!Function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) && is(type, source[key]) )
        delete source[key];
    }
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!Array} vals
   * @return {(!Object|!Function)}
   */
  function _deleteVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      source = _deleteVal(source, vals[i]);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @return {!Array}
   */
  function _spliceKey(source, key) {

    /** @type {number} */
    var len;

    len = source['length'];

    if (key < 0)
      key += len;

    if (key < 0 || key >= len)
      return source;

    source['splice'](key, 1);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _spliceKeys(source, keys) {

    /** @type {number} */
    var first;
    /** @type {number} */
    var count;
    /** @type {number} */
    var i;

    if (!source['length'] || !keys['length'])
      return source;

    if (keys['length'] === 1)
      return _spliceKey(source, keys[0]);

    /**
     * @const {!Object<string, !Array<number>>}
     * @struct
     */
    var sorted = _sortIndexes(keys, source['length']);

    i = sorted.first['length'];
    while (i--) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source['splice'](first, count);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {*} val
   * @return {!Array}
   */
  function _spliceVal(source, val) {

    /** @type {number} */
    var i;

    i = source['length'];
    while (i--) {
      if (source[i] === val)
        source['splice'](i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {string} type
   * @return {!Array}
   */
  function _spliceValByType(source, type) {

    /** @type {number} */
    var i;

    i = source['length'];
    while (i--) {
      if ( is(type, source[i]) )
        source['splice'](i, 1);
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array} vals
   * @return {!Array}
   */
  function _spliceVals(source, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = source['length'];
    while (i--) {
      val = source[i];
      ii = len;
      while (ii--) {
        if (vals[ii] === val) {
          source['splice'](i, 1);
          break;
        }
      }
    }
    return source;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} filter
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function _filterObj(source, filter, thisArg) {

    /** @type {(!Object|!Function)} */
    var src;
    /** @type {string} */
    var key;

    if ( !$is.void(thisArg) )
      filter = _bind(filter, thisArg);

    src = filter['length'] > 2
      ? $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source)
      : source;

    switch (filter['length']) {
      case 0:
        for (key in src) {
          if ( $own(src, key) && !filter() )
            delete source[key];
        }
        break;
      case 1:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key]) )
            delete source[key];
        }
        break;
      case 2:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key], key) )
            delete source[key];
        }
        break;
      default:
        for (key in src) {
          if ( $own(src, key) && !filter(src[key], key, src) )
            delete source[key];
        }
        break;
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!function(*=, number=, !Array=): *} filter
   * @param {?Object=} thisArg
   * @return {!Array}
   */
  function _filterArr(source, filter, thisArg) {

    /** @type {!Array} */
    var src;
    /** @type {number} */
    var i;

    if ( !$is.void(thisArg) )
      filter = _bind(filter, thisArg);

    src = filter['length'] > 2
      ? $cloneArr(source)
      : source;
    i = src['length'];

    switch (filter['length']) {
      case 0:
        while (i--) {
          if ( !filter() )
            source['splice'](i, 1);
        }
        break;
      case 1:
        while (i--) {
          if ( !filter(src[i]) )
            source['splice'](i, 1);
        }
        break;
      case 2:
        while (i--) {
          if ( !filter(src[i], i) )
            source['splice'](i, 1);
        }
        break;
      default:
        while (i--) {
          if ( !filter(src[i], i, src) )
            source['splice'](i, 1);
        }
        break;
    }
    return source;
  }

  /**
   * @private
   * @param {!Array<number>} indexes
   * @param {number} sourceLen
   * @return {!Object<string, !Array<number>>}
   */
  var _sortIndexes = (function() {

    /**
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {!Object<string, !Array<number>>}
     */
    function sortIndexes(indexes, sourceLen) {
      setup();
      run(indexes, sourceLen);
      return result();
    }

    /**
     * @type {!Array<number>}
     */
    var $first;

    /**
     * @type {!Array<number>}
     */
    var $last;

    /**
     * @private
     * @return {void}
     */
    function setup() {
      $first = [];
      $last = [];
    }

    /**
     * @private
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {void}
     */
    function run(indexes, sourceLen) {

      /** @type {number} */
      var index;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = indexes['length'];
      i = 0;

      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len)
        index = parse(indexes[i], sourceLen);
      push(index);

      while (++i < len) {
        index = parse(indexes[i], sourceLen);
        if (index !== -1)
          sort(index, 0, $last['length']);
      }
    }

    /**
     * @private
     * @return {!Object<string, !Array<number>>}
     */
    function result() {

      /**
       * @const {!Object<string, !Array<number>>}
       * @struct
       */
      var SORTED_INDEXES = {
        first: $first,
        last: $last
      };

      return SORTED_INDEXES;
    }

    /**
     * @private
     * @param {number} index
     * @param {number} len
     * @return {number}
     */
    function parse(index, len) {

      if (index < 0)
        index += len;

      return index < 0 || index >= len
        ? -1
        : index;
    }

    /**
     * @private
     * @param {number} index
     * @return {void}
     */
    function push(index) {
      $first['push'](index);
      $last['push'](index);
    }

    /**
     * @private
     * @param {number} index
     * @return {void}
     */
    function unshift(index) {
      $first['unshift'](index);
      $last['unshift'](index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     * @return {void}
     */
    function insert(index, pos) {
      $first['splice'](pos, 0, index);
      $last['splice'](pos, 0, index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     * @return {void}
     */
    function remove(pos) {
      $first['splice'](pos, 1);
      $last['splice'](pos, 1);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} right
     * @return {void}
     */
    function sort(index, left, right) {

      /** @type {number} */
      var mid;
      /** @type {number} */
      var min;

      mid = (left + right) >>> 1;
      min = $first[mid];
      if (index < min)
        comparePrev(index, left, mid);
      else if (index > $last[mid])
        compareNext(index, mid, right);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} mid
     * @return {void}
     */
    function comparePrev(index, left, mid) {

      /** @type {number} */
      var prev;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      min = $first[mid];
      if (!mid) {
        if (index === --min)
          $first[mid] = index;
        else
          unshift(index);
        return;
      }
      prev = mid - 1;
      max = $last[prev];
      if (index === --min) {
        if (index === ++max) {
          $last[prev] = $last[mid];
          remove(mid);
        }
        else
          $first[mid] = index;
      }
      else if (index > max) {
        if (index === ++max)
          $last[prev] = index;
        else
          insert(index, mid);
      }
      else
        sort(index, left, prev);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} mid
     * @param {number} right
     * @return {void}
     */
    function compareNext(index, mid, right) {

      /** @type {number} */
      var next;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      next = mid + 1;
      max = $last[mid];
      if (next === $last['length']) {
        if (index === ++max)
          $last[mid] = index;
        else
          push(index);
        return;
      }
      min = $first[next];
      if (index === ++max) {
        if (index === --min) {
          $last[mid] = $last[next];
          remove(next);
        }
        else
          $last[mid] = index;
      }
      else if (index < min) {
        if (index === --min)
          $first[next] = index;
        else
          insert(index, next);
      }
      else
        sort(index, next, right);
    }

    return sortIndexes;
  })();

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bind(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function filter() {
          return func['call'](thisArg);
        };
      case 1:
        return function filter(val) {
          return func['call'](thisArg, val);
        };
      case 2:
        return function filter(val, key) {
          return func['call'](thisArg, val, key);
        };
    }
    return function filter(val, key, obj) {
      return func['call'](thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {!Array<*>} vals
   * @return {boolean} 
   */
  function _isIntArr(vals) {

    /** @type {*} */
    var propVal;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len) {
      propVal = vals[i];
      if ( !$is.num(propVal) || !$is.whole(propVal) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @param {*} val
   * @return {boolean} 
   */
  function _isNumArr(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if ( !$is.arr(val) )
      return NO;

    len = val['length'];
    i = -1;
    while (++i < len) {
      if ( !$is.num(val[i]) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @param {!Array<number>} nums
   * @return {boolean} 
   */
  function _isWholeNumArr(nums) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = nums['length'];
    i = -1;
    while (++i < len) {
      if ( !$is.whole(nums[i]) )
        return NO;
    }
    return YES;
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('cut');

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

  return cut;
})();
vitals['cut'] = cut;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var each = (function eachPrivateScope() {

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string|number)} source
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function|!Array|!Arguments|number)}
   */
  function each(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');
      case 2:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(*=, (string|number)=, (!Object|!Function|!Array)=)');

    if ( $is.num(source) ) {
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _eachCycle(source, iteratee, thisArg);
    }

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|string|number');

    return $is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function eachObject(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'object');
      case 2:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'object');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(*=, string=, (!Object|!Function)=)', 'object');
    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object|!Function',
        'object');

    return _eachObj(source, iteratee, thisArg);
  }
  each['object'] = eachObject;
  each['obj'] = eachObject;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   * @param {!function(*=, number=, !Array=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Array|!Arguments|!Object|!Function)}
   */
  function eachArray(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'array');
      case 2:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'array');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(*=, number=, !Array=)', 'array');

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function|string', 'array');
    else if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _eachArr(source, iteratee, thisArg);
  }
  each['array'] = eachArray;
  each['arr'] = eachArray;

  /**
   * @public
   * @param {number} cycles
   * @param {!function(number=, number=)} iteratee
   * @param {?Object=} thisArg
   * @return {number}
   */
  function eachCycle(cycles, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #cycles defined', 'cycle');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'cycle');
      case 2:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'cycle');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(number=, number=)', 'cycle');
    if ( !$is.num(cycles) )
      throw _mkTypeErr(new TYPE_ERR, 'cycles', cycles, 'number', 'cycle');
    if ( !$is.whole(cycles) )
      throw _mkErr(new ERR, 'invalid #cycles `number` (' +
        'must be whole `number`)', 'cycle');

    return _eachCycle(cycles, iteratee, thisArg);
  }
  each['cycle'] = eachCycle;
  each['time'] = eachCycle;

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function _eachObj(source, iteratee, thisArg) {

    /** @type {(!Object|!Function)} */
    var src;
    /** @type {string} */
    var key;

    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    src = iteratee['length'] > 2
      ? $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source)
      : source;

    switch (iteratee['length']) {
      case 0:
        for (key in src) {
          if ( $own(src, key) )
            iteratee();
        }
        break;
      case 1:
        for (key in src) {
          if ( $own(src, key) )
            iteratee(src[key]);
        }
        break;
      case 2:
        for (key in src) {
          if ( $own(src, key) )
            iteratee(src[key], key);
        }
        break;
     default:
       for (key in src) {
         if ( $own(src, key) )
           iteratee(src[key], key, src);
       }
       break;
    }

    return source;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Array|!Arguments|!Object|!Function)}
   */
  function _eachArr(source, iteratee, thisArg) {

    /** @type {(!Array|!Arguments|!Object|!Function)} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    src = iteratee['length'] > 2
      ? $cloneArr(source)
      : source;
    len = src['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          iteratee();
        break;
      case 1:
        while (++i < len)
          iteratee(src[i]);
        break;
      case 2:
        while (++i < len)
          iteratee(src[i], i);
        break;
      default:
        while (++i < len)
          iteratee(src[i], i, src);
        break;
    }

    return source;
  }

  /**
   * @private
   * @param {number} cycles
   * @param {!function(number=, number=)} iteratee
   * @param {?Object=} thisArg
   * @return {number}
   */
  function _eachCycle(cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          iteratee(cycle++, cycles);
        break;
    }

    return cycles;
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindMap(func, thisArg) {

    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(value) {
          func['call'](thisArg, value);
        };
      case 2:
        return function iteratee(value, key) {
          func['call'](thisArg, value, key);
        };
    }
    return function iteratee(value, key, source) {
      func['call'](thisArg, value, key, source);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindCycle(func, thisArg) {

    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
    }
    return function iteratee(cycle, cycles) {
      return func['call'](thisArg, cycle, cycles);
    };
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('each');

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

  return each;
})();
vitals['each'] = each;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var fill = (function fillPrivateScope() {

  /**
   * @public
   * @param {(?Array|?Object|?Function|?number)} source
   * @param {(!Array|string)=} keys
   * @param {*} val
   * @param {number=} start
   * @param {number=} end
   * @return {(?Array|?Object|?Function|?string)}
   */
  function fill(source, keys, val, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
    }

    if ( $is.nil(source) )
      return NIL;

    if ( $is.num(source) )
      return _fillStr(source, keys); // note: `_fillStr(source, val)`

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Object|?Function|?number');

    if ( $is.arr(source) ) {
      end = start;
      start = val;
      val = keys;

      if ( $is.num(start) ) {
        if ( !$is.whole(start) )
          throw _mkErr(new ERR, 'invalid #start `number` (' +
            'must be whole `number`)');
      }
      else if ( !$is.void(start) )
        throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');

      if ( $is.num(end) ) {
        if ( !$is.whole(end) )
          throw _mkErr(new ERR, 'invalid #end `number` (' +
            'must be whole `number`)');
      }
      else if ( !$is.void(end) )
        throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=');

      return _fillArr(source, val, start, end);
    }

    if (arguments['length'] === 2)
      return _fillObj(source, keys); // note: `_fillObj(source, val)`

    if ( $is.str(keys) )
      keys = $splitKeys(keys);
    else if ( !$is.arr(keys) )
      throw _mkTypeErr(new TYPE_ERR, 'keys', keys, '(!Array|string)=');

    return _fillKeys(source, keys, val);
  }

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {(!Array|string)=} keys
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function fillObject(source, keys, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'object');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');

        return _fillObj(source, keys); // note: `_fillObj(source, val)`

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');

        if ( $is.str(keys) )
          keys = $splitKeys(keys);
        else if ( !$is.arr(keys) )
          throw _mkTypeErr(new TYPE_ERR, 'keys', keys, '(!Array|string)=',
            'object');

        return _fillKeys(source, keys, val);
    }
  }
  fill['object'] = fillObject;
  fill['obj'] = fillObject;

  /**
   * @public
   * @param {(!Array|number)} source
   * @param {*} val
   * @param {number=} start
   * @param {number=} end
   * @return {!Array}
   */
  function fillArray(source, val, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 2:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        return _fillArr(source, val, VOID, VOID);

      case 3:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        if ( $is.num(start) ) {
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(start) )
          throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=', 'array');

        return _fillArr(source, val, start, VOID);

      default:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        if ( $is.num(start) ) {
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(start) )
          throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=', 'array');

        if ( $is.num(end) ) {
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(end) )
          throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'array');

        return _fillArr(source, val, start, end);
    }
  }
  fill['array'] = fillArray;
  fill['arr'] = fillArray;

  /**
   * @public
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function fillString(count, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #count defined', 'string');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'string');
    }

    if ( !$is.num(count) )
      throw _mkTypeErr(new TYPE_ERR, 'count', count, 'number', 'string');
    if ( !$is.whole(count) )
      throw _mkErr(new ERR, 'invalid #count `number` (' +
        'must be whole `number`)', 'string');

    return _fillStr(count, val);
  }
  fill['string'] = fillString;
  fill['str'] = fillString;

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) )
        obj[key] = val;
    }
    return obj;
  }

  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys['length'];
    i = -1;
    while (++i < len)
      obj[ keys[i] ] = val;
    return obj;
  }

  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start
   * @param {number=} end
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr['length'];

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
      return arr;

    i = start - 1;
    while (++i < end)
      arr[i] = val;
    return arr;
  }

  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    if (count < 1)
      return '';

    val = $mkStr(val);
    str = '';
    while (count--)
      str += val;
    return str;
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('fill');

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

  return fill;
})();
vitals['fill'] = fill;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var fuse = (function fusePrivateScope() {

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   * @param {...*} val
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuse(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined');

      case 1:
        throw _mkErr(new ERR, 'no #val defined');

      case 2:
        if ( $is.str(dest) )
          return $is.arr(val)
            ? _fuseStrs(dest, val)
            : _fuseStr(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArr(dest, val)
          : $is.arr(val)
            ? _fuseObjs(dest, val)
            : _fuseObj(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrs(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrs(dest, val)
          : _fuseObjs(dest, val);
    }
  }

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   * @param {...*} val
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuseValue(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined', 'value');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value');

      case 2:
        if ( $is.str(dest) )
          return _fuseStr(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrVal(dest, val)
          : _fuseObjVal(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrs(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrsVal(dest, val)
          : _fuseObjsVal(dest, val);
    }
  }
  fuse['value'] = fuseValue;
  fuse['val'] = fuseValue;

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   * @param {...*} val
   * @return {(!Object|!Function|!Array|string)}
   */
  function fuseValueStart(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined', 'value.start');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value.start');

      case 2:
        if ( $is.str(dest) )
          return _fuseStrTop(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value.start');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrValTop(dest, val)
          : _fuseObjValTop(dest, val);

      default:
        val = $sliceArr(arguments, 1);

        if ( $is.str(dest) )
          return _fuseStrsTop(dest, val);

        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest,
            '!Object|!Function|!Array|!Arguments|string', 'value.start');

        if ( $is.args(dest) )
          dest = $sliceArr(dest);

        return $is.arr(dest)
          ? _fuseArrsValTop(dest, val)
          : _fuseObjsValTop(dest, val);
    }
  }
  fuse['value']['start'] = fuseValueStart;
  fuse['value']['top'] = fuseValueStart;
  fuse['val']['start'] = fuseValueStart;
  fuse['val']['top'] = fuseValueStart;

  /**
   * @public
   * @param {(!Object|!Function)} dest
   * @param {...*} val
   * @return {(!Object|!Function)}
   */
  function fuseObject(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined', 'object');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'object');

      case 2:
        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, '!Object|!Function',
            'object');

        return $is.arr(val)
          ? _fuseObjs(dest, val)
          : _fuseObj(dest, val);

      default:
        if ( !$is._obj(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, '!Object|!Function',
            'object');

        val = $sliceArr(arguments, 1);
        return _fuseObjs(dest, val);
    }
  }
  fuse['object'] = fuseObject;
  fuse['obj'] = fuseObject;

  /**
   * @public
   * @param {(!Array|!Arguments)} dest
   * @param {...*} val
   * @return {!Array}
   */
  function fuseArray(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined', 'array');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 2:
        if ( $is.args(dest) )
          dest = $sliceArr(dest);
        else if ( !$is.arr(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, '!Array|!Arguments',
            'array');

        return _fuseArr(dest, val);

      default:
        if ( $is.args(dest) )
          dest = $sliceArr(dest);
        else if ( !$is.arr(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, '!Array|!Arguments',
            'array');

        val = $sliceArr(arguments, 1);
        return _fuseArrs(dest, val);
    }
  }
  fuse['array'] = fuseArray;
  fuse['arr'] = fuseArray;

  /**
   * @public
   * @param {string} dest
   * @param {...*} val
   * @return {string}
   */
  function fuseString(dest, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #dest defined', 'string');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'string');

      case 2:
        if ( !$is.str(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'string');

        return $is.arr(val)
          ? _fuseStrs(dest, val)
          : _fuseStr(dest, val);

      default:
        if ( !$is.str(dest) )
          throw _mkTypeErr(new TYPE_ERR, 'dest', dest, 'string', 'string');

        val = $sliceArr(arguments, 1);
        return _fuseStrs(dest, val);
    }
  }
  fuse['string'] = fuseString;
  fuse['str'] = fuseString;

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObj(dest, val) {

    if ( $is._obj(val) )
      return $merge(dest, val);

    if ( !$is.nil(val) )
      dest[val] = VOID;

    return dest;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseObj(dest, vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObjVal(dest, val) {
    dest[val] = VOID;
    return dest;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjsVal(dest, vals) {

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
      dest[val] = VOID;
    }
    return dest;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fuseObjValTop(dest, val) {

    if ( !$own(dest, val) )
      dest[val] = VOID;

    return dest;
  }

  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {!Array<*>} vals
   * @return {(!Object|!Function)}
   */
  function _fuseObjsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseObjValTop(dest, vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {

    if ( $is.arr(val) )
      return dest['concat'](val);

    if ( !$is.nil(val) )
      dest['push'](val);

    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = _fuseArr(dest, vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrVal(dest, val) {
    dest['push'](val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsVal(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest['push'](vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrValTop(dest, val) {
    dest['unshift'](val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest['unshift'](vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + $mkStr(val);
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest += $mkStr(vals[i]);
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStrTop(dest, val) {
    return $mkStr(val) + dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrsTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals['length'];
    i = -1;
    while (++i < len)
      dest = $mkStr(vals[i]) + dest;
    return dest;
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('fuse');

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

  return fuse;
})();
vitals['fuse'] = fuse;
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
vitals['get'] = get;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var has = (function hasPrivateScope() {

  /**
   * @public
   * @param {(?Object|?Function|?Array|?Arguments|?string)} source
   * @param {*} val
   * @return {boolean}
   */
  function has(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
    }

    if ( $is.nil(source) )
      return NO;

    if ( $is.str(source) )
      return $match(source, val);

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Object|?Function|?Array|?Arguments|?string');

    return $is._arr(source)
      ? $inArr(source, val)
      : $is.regx(val)
        ? _ownMatch(source, val)
        : $own(source, val);
  }

  /**
   * @public
   * @param {(?Object|?Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function hasKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'key');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'key');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '?Object|?Function',
        'key');

    return $own(source, key);
  }
  has['key'] = hasKey;

  /**
   * @public
   * @param {(?Object|?Function|?Array|?Arguments)} source
   * @param {*} val
   * @return {boolean}
   */
  function hasValue(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'value');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'value');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Object|?Function|?Array|?Arguments', 'value');

    return $is._arr(source)
      ? $inArr(source, val)
      : $inObj(source, val);
  }
  has['value'] = hasValue;
  has['val'] = hasValue;

  /**
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function hasPattern(source, pattern) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'pattern');
      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'pattern');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'pattern');

    return $match(source, pattern);
  }
  has['pattern'] = hasPattern;

  /**
   * @public
   * @param {string} source
   * @param {*} val
   * @return {boolean}
   */
  function hasSubstring(source, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'substring');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'substring');
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'substring');

    return $inStr(source, val);
  }
  has['substring'] = hasSubstring;
  has['substr'] = hasSubstring;

  /**
   * @public
   * @param {(?Object|?Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function hasEnumerableKey(source, key) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'enumerableKey');
      case 1:
        throw _mkErr(new ERR, 'no #key defined', 'enumerableKey');
    }

    if ( $is.nil(source) )
      return NO;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '?Object|?Function',
        'enumerableKey');

    return $ownEnum(source, key);
  }
  has['enumerableKey'] = hasEnumerableKey;
  has['enumerable'] = hasEnumerableKey;
  has['enumKey'] = hasEnumerableKey;
  try {
    has['enum'] = hasEnumerableKey;
  }
  catch (e) {}

  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {!RegExp} patt
   * @return {boolean}
   */
  function _ownMatch(src, patt) {

    /** @type {string} */
    var key;

    for (key in src) {
      if ( $own(src, key) && patt['test'](key) )
        return YES;
    }
    return NO;
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('has');

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

  return has;
})();
vitals['has'] = has;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var remap = (function remapPrivateScope() {

  /**
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   * @param {*} iteratee
   * @param {*=} replacement
   * @param {?Object=} thisArg
   * @return {(!Object|!Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');

      case 2:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #replacement defined');

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
           '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');

        return $is._arr(source)
          ? _remapArr(source, iteratee, VOID)
          : _remapObj(source, iteratee, VOID);

      case 3:
        if ( $is.str(source) )
          return _remapStr(source, iteratee, replacement, VOID);
        break;

      default:
        if ( $is.str(source) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

          return _remapStr(source, iteratee, replacement, thisArg);
        }
        break;
    }

    thisArg = replacement;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|string');
    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

    return $is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Object} 
   */
  function remapObject(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'object');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');

        return _remapObj(source, iteratee, VOID);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'object');

        return _remapObj(source, iteratee, thisArg);
    }
  }
  remap['object'] = remapObject;
  remap['obj'] = remapObject;

  /**
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Array}
   */
  function remapArray(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'array');

      case 2:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        else if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'array');

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');

        return _remapArr(source, iteratee, VOID);

      default:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        else if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'array');

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'array');

        return _remapArr(source, iteratee, thisArg);
    }
  }
  remap['array'] = remapArray;
  remap['arr'] = remapArray;

  /**
   * @public
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {?Object=} thisArg
   * @return {string}
   */
  function remapString(source, pattern, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'string');

      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'string');

      case 2:
        throw _mkErr(new ERR, 'no #replacement defined', 'string');

      case 3:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'string');

        return _remapStr(source, pattern, replacement, VOID);

      default:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'string');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'string');

        return _remapStr(source, pattern, replacement, thisArg);
    }
  }
  remap['string'] = remapString;
  remap['str'] = remapString;

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindIteratee(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key], key, source);
        }
        break;
    }

    return obj;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindIteratee(iteratee, thisArg);

    len = source['length'];
    arr = new ARR(len);
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          arr[i] = iteratee();
        break;
      case 1:
        while (++i < len)
          arr[i] = iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          arr[i] = iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          arr[i] = iteratee(source[i], i, source);
        break;
    }

    return arr;
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {?Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source)
      return source;

    if ( !$is.regx(pattern) ) {
      pattern = $mkStr(pattern);
      if (!pattern)
        return source;
      pattern = $escRegx(pattern);
      pattern = new REGX(pattern, 'g');
    }

    if ( !$is.fun(replacement) )
      replacement = $mkStr(replacement);
    else if ( !$is.void(thisArg) )
      replacement = _bindReplacement(replacement, thisArg);

    return source['replace'](pattern, replacement);
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindIteratee(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(value) {
          return func['call'](thisArg, value);
        };
      case 2:
        return function iteratee(value, key) {
          return func['call'](thisArg, value, key);
        };
    }
    return function iteratee(value, key, source) {
      return func['call'](thisArg, value, key, source);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function}
   */
  function _bindReplacement(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function replacement() {
          return func['call'](thisArg);
        };
      case 1:
        return function replacement(match) {
          return func['call'](thisArg, match);
        };
      case 2:
        return function replacement(match, offset) {
          return func['call'](thisArg, match, offset);
        };
      case 3:
        return function replacement(match, offset, source) {
          return func['call'](thisArg, match, offset, source);
        };
      case 4:
        return function replacement(match, p1, offset, source) {
          return func['call'](thisArg, match, p1, offset, source);
        };
      case 5:
        return function replacement(match, p1, p2, offset, source) {
          return func['call'](thisArg, match, p1, p2, offset, source);
        };
      case 6:
        return function replacement(match, p1, p2, p3, offset, source) {
          return func['call'](thisArg, match, p1, p2, p3, offset, source);
        };
    }
    return function replacement(match, p1, p2, p3, p4, offset, source) {
      return func['apply'](thisArg, arguments);
    };
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('remap');

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

  return remap;
})();
vitals['remap'] = remap;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var roll = (function rollPrivateScope() {

  /**
   * @public
   * @param {*=} base
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   * @param {!function(*=, *=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, *=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|number');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }

  /**
   * @public
   * @param {*=} base
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'up');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'up');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *', 'up');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=', 'up');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)', 'up');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)', 'up');

      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|number', 'up');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  }
  roll['up'] = rollUp;

  /**
   * @public
   * @param {*=} base
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function rollDown(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'down');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'down');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *', 'down');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=', 'down');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)', 'down');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)', 'down');

      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|number', 'down');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  }
  roll['down'] = rollDown;

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, *=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObj(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 3)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
      case 1: 
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 3:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, *=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObj(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 3)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
      case 1: 
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key]);
        }
        break;
      case 3:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key], key, source);
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObjUp(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee();
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjUp(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key], key, source);
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObjDown(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee();
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjDown(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key], key, source);
        }
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, *=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArr(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 3)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while (++i < len)
          result = iteratee(result);
        break;
      case 2:
        while (++i < len)
          result = iteratee(result, source[i]);
        break;
      case 3:
        while (++i < len)
          result = iteratee(result, source[i], i);
        break;
      default:
        while (++i < len)
          result = iteratee(result, source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, *=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArr(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 3)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while (++i < len)
          result = iteratee(result);
        break;
      case 2:
        while (++i < len)
          result = iteratee(result, source[i]);
        break;
      case 3:
        while (++i < len)
          result = iteratee(result, source[i], i);
        break;
      default:
        while (++i < len)
          result = iteratee(result, source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArrUp(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result += iteratee();
        break;
      case 1:
        while (++i < len)
          result += iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result += iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result += iteratee(source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrUp(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result += iteratee();
        break;
      case 1:
        while (++i < len)
          result += iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result += iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result += iteratee(source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArrDown(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result -= iteratee();
        break;
      case 1:
        while (++i < len)
          result -= iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result -= iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result -= iteratee(source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrDown(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result -= iteratee();
        break;
      case 1:
        while (++i < len)
          result -= iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result -= iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result -= iteratee(source[i], i, source);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(*=, number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycle(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindPrevCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while(count--)
          result = iteratee(result);
        break;
      case 2:
        cycle = 0;
        while(count--)
          result = iteratee(result, cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result = iteratee(result, cycle++, cycles);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycleUp(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          result += iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          result += iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result += iteratee(cycle++, cycles);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycleDown(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          result -= iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          result -= iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result -= iteratee(cycle++, cycles);
        break;
    }

    return result;
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindMap(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(propValue) {
          return func['call'](thisArg, propValue);
        };
      case 2:
        return function iteratee(propValue, key) {
          return func['call'](thisArg, propValue, key);
        };
    }
    return function iteratee(propValue, key, source) {
      return func['call'](thisArg, propValue, key, source);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindPrevMap(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(prevValue) {
          return func['call'](thisArg, prevValue);
        };
      case 2:
        return function iteratee(prevValue, propValue) {
          return func['call'](thisArg, prevValue, propValue);
        };
      case 3:
        return function iteratee(prevValue, propValue, key) {
          return func['call'](thisArg, prevValue, propValue, key);
        };
    }
    return function iteratee(prevValue, propValue, key, source) {
      return func['call'](thisArg, prevValue, propValue, key, source);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindCycle(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
    }
    return function iteratee(cycle, cycles) {
      return func['call'](thisArg, cycle, cycles);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindPrevCycle(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(prevValue) {
          return func['call'](thisArg, prevValue);
        };
      case 2:
        return function iteratee(prevValue, cycle) {
          return func['call'](thisArg, prevValue, cycle);
        };
    }
    return function iteratee(prevValue, cycle, cycles) {
      return func['call'](thisArg, prevValue, cycle, cycles);
    };
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('roll');

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

  return roll;
})();
vitals['roll'] = roll;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var same = (function samePrivateScope() {

  /**
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function same(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val1 defined');
      case 1:
        throw _mkErr(new ERR, 'no #val2 defined');
    }

    return val1 === val2;
  }

  /**
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function sameLoose(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val1 defined', 'loose');
      case 1:
        throw _mkErr(new ERR, 'no #val2 defined', 'loose');
    }

    return val1 == val2;
  }
  same['loose'] = sameLoose;
  same['ish'] = sameLoose;

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('same');

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

  return same;
})();
vitals['same'] = same;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var slice = (function slicePrivateScope() {

  /**
   * @public
   * @param {(?Array|?Arguments|?Object|?Function|?string)} source
   * @param {number=} start
   * @param {number=} end
   * @return {(?Array|?string)}
   */
  function slice(source, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)');
        }
    }

    if ( $is.nil(source) )
      return NIL;

    if ( $is.str(source) )
      return $sliceStr(source, start, end);

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Arguments|?Object|?Function|?string');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)');

    return $sliceArr(source, start, end);
  }

  /**
   * @public
   * @param {(?Array|?Arguments|?Object|?Function)} source
   * @param {number=} start
   * @param {number=} end
   * @return {?Array}
   */
  function sliceArray(source, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'array');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'array');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'array');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'array');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
    }

    if ( $is.nil(source) )
      return NIL;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Arguments|?Object|?Function', 'array');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return $sliceArr(source, start, end);
  }
  slice['array'] = sliceArray;
  slice['arr'] = sliceArray;

  /**
   * @public
   * @param {string} source
   * @param {number=} start
   * @param {number=} end
   * @return {string}
   */
  function sliceString(source, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'string');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'string');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'string');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'string');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'string');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'string');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'string');
        }
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'string');

    return $sliceStr(source, start, end);
  }
  slice['string'] = sliceString;
  slice['str'] = sliceString;

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('slice');

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

  return slice;
})();
vitals['slice'] = slice;
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

  /**
   * @public
   * @param {*} val
   * @param {(string|undefined)=} separator
   * @return {string}
   */
  function toString(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'string');

      case 1:
        return $mkStr(val);

      default:
        if ( $is.void(separator) )
          return $mkStr(val);

        if ( !$is.arr(val) )
          throw _mkErr(new ERR, 'invalid #separator defined (' +
            'only allowed with an `array` #val)', 'string');
        if ( !$is.str(separator) )
          throw _mkTypeErr(new TYPE_ERR, 'separator', separator, 'string=',
            'string');

        return val['join'](separator);
    }
  }
  to['string'] = toString;
  to['str'] = toString;

  /**
   * @public
   * @param {(?string|?number|?boolean)} val
   * @return {number}
   */
  function toNumber(val) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #val defined', 'number');

    if ( $is.num(val) )
      return val;
    if ( $is.nil(val) )
      return 0;
    if ( $is.bool(val) )
      return val
        ? 1
        : 0;

    if ( !$is.str(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, '?string|?number|?boolean',
        'number');

    val = NUM(val);

    if ( $is.nan(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', 'https://github.com/' +
        'imaginate/vitals/wiki/vitals.to#user-content-number', 'number');

    return val;
  }
  to['number'] = toNumber;
  to['num'] = toNumber;

  /**
   * @public
   * @param {*} val
   * @return {boolean}
   */
  function toBoolean(val) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #val defined', 'boolean');

    return !!val;
  }
  to['boolean'] = toBoolean;
  to['bool'] = toBoolean;

  /**
   * @public
   * @param {(string|number)} val
   * @param {*=} separator
   * @return {!Array}
   */
  function toArray(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 1:
        if ( $is.num(val) )
          return new ARR(val);

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        return $splitKeys(val);

      default:
        if ( $is.num(val) ) {
          if ( !$is.void(separator) )
            throw _mkErr(new ERR, 'invalid #separator defined (' +
              'only allowed with a `string` #val)', 'array');

          return new ARR(val);
        }

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        if ( !$is.regx(separator) )
          separator = $mkStr(separator);

        return val['split'](separator);
    }
  }
  to['array'] = toArray;
  to['arr'] = toArray;

  /**
   * @public
   * @param {string} source
   * @param {(string|undefined)=} flags
   * @return {!RegExp}
   */
  function toRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');

      case 1:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        return new REGX(source);

      default:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        if ( $is.void(flags) )
          return new REGX(source);

        if ( !$is.str(flags) )
          throw _mkTypeErr(new TYPE_ERR, 'flags', flags, 'string=', 'regexp');

        return new REGX(source, flags);
    }
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['re'] = toRegExp;

  /**
   * @public
   * @param {string} source
   * @return {string}
   */
  function toUpperCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'upperCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'upperCase');

    return source['toUpperCase']();
  }
  to['upperCase'] = toUpperCase;
  to['upper'] = toUpperCase;

  /**
   * @public
   * @param {string} source
   * @return {string}
   */
  function toLowerCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'lowerCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'lowerCase');

    return source['toLowerCase']();
  }
  to['lowerCase'] = toLowerCase;
  to['lower'] = toLowerCase;

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
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var _mkRangeErr = _MK_ERR.rangeError;

  return to;
})();
vitals['to'] = to;
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var until = (function untilPrivateScope() {

  /**
   * @public
   * @param {*} end
   * @param {(!Object|!Function|!Array|!Arguments|string|number|undefined)=} source
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function until(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');

      case 2:
        iteratee = source;

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
            '*=, (string|number)=, (!Object|!Function|!Array)=): *');

        return _untilEnd(end, iteratee);

      case 3:
        if ($is.fun(source)
            && ($is.nil(iteratee)
                || $is.void(iteratee)
                || $is.obj(iteratee) ) ) {
          thisArg = iteratee;
          iteratee = source;
          return _untilEnd(end, iteratee, thisArg);
        }
        break;

      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *');

    if ( $is.num(source) ) {
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _untilCycle(end, source, iteratee, thisArg);
    }

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '(!Object|!Function|!Array|!Arguments|string|number)=');

    return $is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }

  /**
   * @public
   * @param {*} end
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function untilObject(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'object');
      case 1:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'object');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'object');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, string=, (!Object|!Function)=): *', 'object');
    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '(!Object|!Function)',
        'object');

    return _untilObj(end, source, iteratee, thisArg);
  }
  until['object'] = untilObject;
  until['obj'] = untilObject;

  /**
   * @public
   * @param {*} end
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function untilArray(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'array');
      case 1:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'array');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'array');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, number=, !Array=): *', 'array');

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function|string', 'array');
    else if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _untilArr(end, source, iteratee, thisArg);
  }
  until['array'] = untilArray;
  until['arr'] = untilArray;

  /**
   * @public
   * @param {*} end
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function untilCycle(end, cycles, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'cycle');
      case 1:
        throw _mkErr(new ERR, 'no #cycles defined', 'cycle');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'cycle');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'cycle');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(number=, number=): *', 'cycle');
    if ( !$is.num(cycles) )
      throw _mkTypeErr(new TYPE_ERR, 'cycles', cycles, 'number', 'cycle');
    if ( !$is.whole(cycles) )
      throw _mkErr(new ERR, 'invalid #cycles `number` (' +
        'must be whole `number`)', 'cycle');

    return _untilCycle(end, cycles, iteratee, thisArg);
  }
  until['cycle'] = untilCycle;
  until['time'] = untilCycle;

  /**
   * @private
   * @param {*} end
   * @param {!function(number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, iteratee, thisArg) {

    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindEnd(iteratee, thisArg);

    if (iteratee['length'] > 0) {
      cycle = 0;
      while(iteratee(cycle++) !== end)
        ;
    }
    else {
      while(iteratee() !== end)
        ;
    }
    return YES;
  }

  /**
   * @private
   * @param {*} end
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee() === end)
              return YES;
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key]) === end)
              return YES;
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key], key) === end)
              return YES;
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key], key, source) === end)
              return YES;
          }
        }
        break;
    }
    return NO;
  }

  /**
   * @private
   * @param {*} end
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len) {
          if (iteratee() === end)
            return YES;
        }
        break;
      case 1:
        while (++i < len) {
          if (iteratee(source[i]) === end)
            return YES;
        }
        break;
      case 2:
        while (++i < len) {
          if (iteratee(source[i], i) === end)
            return YES;
        }
        break;
      default:
        while (++i < len) {
          if (iteratee(source[i], i, source) === end)
            return YES;
        }
        break;
    }
    return NO;
  }

  /**
   * @private
   * @param {*} end
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--) {
          if (iteratee() === end)
            return YES;
        }
        break;
      case 1:
        cycle = 0;
        while(count--) {
          if (iteratee(cycle++) === end)
            return YES;
        }
        break;
      default:
        cycle = 0;
        while(count--) {
          if (iteratee(cycle++, cycles) === end)
            return YES;
        }
        break;
    }
    return NO;
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindEnd(func, thisArg) {

    return func['length'] < 1
      ? function iteratee() {
          return func['call'](thisArg);
        }
      : function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindMap(func, thisArg) {

    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(value) {
          func['call'](thisArg, value);
        };
      case 2:
        return function iteratee(value, key) {
          func['call'](thisArg, value, key);
        };
    }
    return function iteratee(value, key, source) {
      func['call'](thisArg, value, key, source);
    };
  }

  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindCycle(func, thisArg) {

    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
    }
    return function iteratee(cycle, cycles) {
      return func['call'](thisArg, cycle, cycles);
    };
  }

  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('until');

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

  return until;
})();
vitals['until'] = until;
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



