/**
 * ---------------------------------------------------------------------------
 * VITALS
 * ---------------------------------------------------------------------------
 * @section all
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
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
   * @private
   * @const {!Object<string, boolean>}
   * @struct
   */
  var _HAS_ARGS = (function _HAS_ARGS_PrivateScope() {

    /**
     * @description
     *   Verify the platform's ability to use the primary `Arguments` test.
     * @const {boolean}
     */
    var PRIMARY = (function _HAS_ARGS_PRIMARY_PrivateScope() {
      return $objStr(arguments) === '[object Arguments]';
    })();

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

    // number states
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
 * @description
 *   A cross-platform shortcut for `String.prototype.includes`.
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

  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [enum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasEnum = OBJ_PROTO['propertyIsEnumerable'];

  /**
   * @description
   *   A safe way to call [Object.prototype.hasOwnProperty][own] and
   *   [Object.prototype.propertyIsEnumerable][enum].
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
 * @private
 * @param {string} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
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
 *   The #keys are split using one of the values in the following list as the
 *   separator (values listed in order of rank):
 *   - `", "`
 *   - `","`
 *   - `"|"`
 *   - `" "`
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



  /// @section base
  /// @method vitals.is
  /**
   * @description
   *   Checks if a value or many values are a specific data type or types. See
   *   @is-types for a complete list of the available data types. Note that
   *   all `object` types are nullable by default (i.e. `is("object", null)`
   *   will return  `true`).
   * @public
   * @param {string} types
   *   The valid data types. See @is-types for a complete list of the
   *   available data types.
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.null
  /// @alias vitals.is.nil
  /**
   * @description
   *   Checks if a value or many values are [null][null].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.undefined
  /// @alias vitals.is.void
  /**
   * @description
   *   Checks if a value or many values are [undefined][void].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.boolean
  /// @alias vitals.is.bool
  /**
   * @description
   *   Checks if a value or many values are a [primitive boolean][bool-desc]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.string
  /// @alias vitals.is.str
  /**
   * @description
   *   Checks if a value or many values are a [primitive string][str-prim]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is._string
  /// @alias vitals.is._str
  /**
   * @description
   *   Checks if a value or many values are a [primitive string][str-prim]
   *   data type and not empty (e.g. `""`).
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.number
  /// @alias vitals.is.num
  /**
   * @description
   *   Checks if a value or many values are a [primitive][prim] [number][num]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is._number
  /// @alias vitals.is._num
  /**
   * @description
   *   Checks if a value or many values are a [primitive][prim] [number][num]
   *   data type and not `0`.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.nan
  /**
   * @description
   *   Checks if a value or many values are [NaN][nan].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.object
  /// @alias vitals.is.obj
  /**
   * @description
   *   Checks if a value or many values are an [object][obj] data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is._object
  /// @alias vitals.is._obj
  /**
   * @description
   *   Checks if a value or many values are an [object][obj] or
   *   [function][func] data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   * Checks if a value(s) is an object or function.
   *
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

  /// @section base
  /// @method vitals.is.func
  /// @alias vitals.is.fn
  /// @alias vitals.is.fun
  /// @alias vitals.is.function
  ///   Note that `vitals.is.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use `vitals.is.func` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Checks if a value or many values are a [function][func] data type. Note
   *   that `vitals.is.function` is not valid in [ES3][ecma3] and some
   *   [ES5][ecma5] browser and other platform environments. Use
   *   `vitals.is.func` for browser and platform safety.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.array
  /// @alias vitals.is.arr
  /**
   * @description
   *   Checks if a value or many values are an instance of the [array][arr]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is._array
  /// @alias vitals.is._arr
  /**
   * @description
   *   Checks if a value or many values are an instance of the [array][arr] or
   *   [arguments][args] `object` types.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.regexp
  /// @alias vitals.is.regex
  /// @alias vitals.is.regx
  /// @alias vitals.is.re
  /**
   * @description
   *   Checks if a value or many values are an instance of the [RegExp][regex]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.date
  /**
   * @description
   *   Checks if a value or many values are an instance of the [Date][date]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.error
  /// @alias vitals.is.err
  /**
   * @description
   *   Checks if a value or many values are an instance of the [Error][error]
   *   `object` types.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.args
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [arguments][args] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.document
  /// @alias vitals.is.doc
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [DOM Document][doc] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.element
  /// @alias vitals.is.elem
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [DOM Element][elem] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.empty
  /**
   * @description
   *   Checks if a value or many values are considered empty. The definition
   *   of empty is as follows in order of priority (per #val data type):
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
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be empty to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.frozen
  /**
   * @description
   *   Checks if an `object` or `function` is [frozen][frozen].
   * @public
   * @param {...(?Object|?Function)} source
   *   If more than one #source is provided, every #source must be
   *   [frozen][frozen] to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.wholeNumber
  /// @alias vitals.is.whole
  /**
   * @description
   *   Checks if a [number][num] is whole (i.e. has no fractional portion).
   *   All whole numbers less than one (e.g. `wholeNumber <= 0`) will return
   *   `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be a valid whole `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.oddNumber
  /// @alias vitals.is.odd
  /**
   * @description
   *   Checks if a [number][num] is odd. All odd numbers less than zero (e.g.
   *   `oddNumber < 0`) will return `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be an odd `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
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

  /// @section base
  /// @method vitals.is.evenNumber
  /// @alias vitals.is.even
  /**
   * @description
   *   Checks if a [number][num] is even. All even numbers less than one (e.g.
   *   `evenNumber <= 0`) will return `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be an even `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
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
     * @description
     *   Adds types to the *$types* hash map with a check method that
     *   evaluates nullable properties and invokes their type section's
     *   method.
     * @private
     * @param {string} section
     *   The category for the types.
     * @param {!Object<string, !function(*): boolean>} types
     *   Each property should use a type's name for its key and method for its
     *   value.
     * @param {boolean=} nullableDefault = `true`
     *   The default nullable value for each type in #types.
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
     * @description
     *   Adds a type to the *$types* hash map with a check method that
     *   evaluates nullable properties and invokes its type section's method.
     * @private
     * @param {string} section
     *   The type's category.
     * @param {string} type
     *   The type's name.
     * @param {!function(*): boolean} check
     *   The type's check method.
     * @param {boolean=} nullableDefault = `true`
     *   The type's default nullable value.
     * @return {void}
     */
    function _addType(section, type, check, nullableDefault) {

      if ( $own(_addType, section) )
        check = _addType[section](check);

      nullableDefault = nullableDefault !== NO;

      /**
       * @param {*} val
       * @param {boolean=} nullable = `nullableDefault`
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
     * @description
     *   Adds the type shortcuts to the *$types* hash map.
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
     *   The check method for each of an array's property values.
     * @return {!function(*): boolean}
     *   The check method for the `array` type.
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
     *   The check method for each of an hash map's property values.
     * @return {!function(*): boolean}
     *   The check method for the `object` or `function` hash map type.
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
   * @description
   *   Method checks whether `"!"` or `"?"` exists in the #types `string`.
   * @private
   * @param {string} types
   * @return {(undefined|boolean)}
   *   If `undefined` no override exists.
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
 * @const {!Function<string, !Function>}
 * @dict
 */
var copy = (function copyPrivateScope() {



  /// @section base
  /// @method vitals.copy
  /**
   * @description
   *   Makes a [copy][clone] of any value. Note that for `array` values @slice 
   *   only copies the indexed properties while @copy copies all of the
   *   properties.
   * @public
   * @param {*} val
   *   The value to copy.
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values for an `object` or
   *   `function`.
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

  /// @section base
  /// @method vitals.copy.object
  /// @alias vitals.copy.obj
  /**
   * @description
   *   Makes a [copy][clone] of an `object`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well.
   * @public
   * @param {!Object} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Object}
   *   A new `object` [copied][clone] from the #source.
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

  /// @section base
  /// @method vitals.copy.array
  /// @alias vitals.copy.arr
  /// @alias vitals.copy.args
  /**
   * @description
   *   Makes a [copy][clone] of an `array` or array-like `object`. Note that
   *   @slice#array only copies the indexed properties while @copy#array
   *   copies all of the indexed and [owned][own] properties. By default it
   *   shallowly copies all of the #source properties with the option to
   *   deeply [copy][clone] them as well.
   * @public
   * @param {(!Array|!Arguments|!Object)} source
   *   Must be an `array` or array-like `object`. The #source is considered
   *   array-like when it [owns][own] a property with the `"length"` key name
   *   (e.g. `source.length` like the `array` [length property][arr-length])
   *   whose value is a whole `number` that is greater than or equal to zero
   *   (e.g. `isWholeNumber(source.length) && source.length >= 0`).
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Array}
   *   A new `array` [copied][clone] from the #source.
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

  /// @section base
  /// @method vitals.copy.regexp
  /// @alias vitals.copy.regex
  /// @alias vitals.copy.regx
  /// @alias vitals.copy.re
  /**
   * @description
   *   Makes a [copy][clone] of a `RegExp`.
   * @public
   * @param {!RegExp} source
   * @param {(string|undefined)=} flags = `undefined`
   *   Override the #source `RegExp` flags when [copying][clone] it. If the
   *   #flags is `undefined`, the original #source flags are used. If the
   *   #flags `string` does **not** start with a plus, `"+"`, or minus, `"-"`,
   *   sign, the #flags value is used for the [copied][clone] `RegExp`.
   *   Otherwise, #flags `string` is parsed according to the following rules:
   *   - Each series of flag characters following a plus sign, `"+"`, are
   *     enabled for the [copied][clone] `RegExp`.
   *   - Each series of flag characters following a minus sign, `"-"`, are
   *     disabled for the [copied][clone] `RegExp`.
   * @return {!RegExp}
   *   A new `RegExp` with the [RegExp.prototype.source][regex-source] value
   *   and the `RegExp` flag settings of the provided #source `RegExp`.
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

  /// @section base
  /// @method vitals.copy.func
  /// @alias vitals.copy.fn
  /// @alias vitals.copy.fun
  /// @alias vitals.copy.function
  ///   Note that `vitals.copy.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use `vitals.copy.func` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Makes a [copy][clone] of a `function`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well. Note that the
   *   [length property][func-length] will be set to `0` and the
   *   [name property][func-name] will be set to `"funcCopy"` for
   *   [unminified][minify] `vitals` sources. Also note that
   *   `vitals.copy.function` is not valid in [ES3][ecma3] and some
   *   [ES5][ecma5] browser and other platform environments. Use
   *   `vitals.copy.func` for browser and platform safety.
   * @public
   * @param {!Function} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Function}
   *   A new `function` [copied][clone] from the #source.
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
 * @type {!Function<string, !Function>}
 * @dict
 */
var cut = (function cutPrivateScope() {


  /// @section base
  /// @method vitals.cut
  /**
   * @description
   *   Removes properties from an `object`, `array`, or `function` or
   *   characters from a `string` and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **The leading #val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) any
   *       #val.
   *     - **The leading #val is a `string`**!$
   *       This method will [delete][delete] all properties with a key that
   *       matches (via a [strict equality][equal] test) any #val.
   *     - **The leading #val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the [owned][own] property is [deleted][delete]). It has the
   *       following optional parameters:
   *       - **value** *`*`*
   *       - **key** *`string`*
   *       - **source** *`!Object|!Function`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `object` within the filter make sure you define the
   *       filter's third parameter so you can safely assume all references to
   *       the #source are its original values).
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     - **Every #val is a whole `number`**!$
   *       This method will [splice][splice] from the #source each property
   *       with an index that matches (via a [strict equality][equal] test)
   *       any #val. If a #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **The leading #val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the indexed property is [spliced][splice] from the
   *       #source). It has the following optional parameters:
   *       - **value** *`*`*
   *       - **index** *`number`*
   *       - **source** *`!Array`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `array` within the filter make sure you define the filter's
   *       third parameter so you can safely assume all references to the
   *       #source are its original values).
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all indexed
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`string`*!$
   *     Each `substring` of characters that matches any #val is removed from
   *     the #source. Each #val that is not a `RegExp` or `string` is
   *     converted to a `string` before checking the #source for any matches.
   * @param {?Object=} thisArg
   *   Only applicable when a filter `function` is defined for #val (i.e. the
   *   #source must be an `object`, `function`, or `array`, and the leading
   *   #val must be a `function`). If #thisArg is defined, the filter
   *   `function` is bound to its value. Note that the native
   *   [Function.prototype.bind][bind] is not used to bind the filter
   *   `function`. Instead the filter `function` is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   filter `function` with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the filter `function`
   *   (unless more than three parameters were defined for the filter
   *   `function` as the wrapper has a max value of `3`) and the
   *   [name property][func-name] value of `"filter"` (unless you are using a
   *   [minified][minify] version of `vitals`).
   * @return {(!Object|!Function|!Array|string)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.property
  /// @alias vitals.cut.prop
  /**
   * @description
   *   Removes a property from an `object`, `array`, or `function` and returns
   *   the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {*} val
   *   All details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **#val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) the
   *       #val.
   *     - **#val is a `string`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a [strict equality][equal]
   *       test) the #val.
   *     - **#val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the [owned][own] property is [deleted][delete]). It has the
   *       following optional parameters:
   *       - **value** *`*`*
   *       - **key** *`string`*
   *       - **source** *`!Object|!Function`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `object` within the filter make sure you define the
   *       filter's third parameter so you can safely assume all references to
   *       the #source are its original values).
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) the #val.
   *   - *`!Array|!Arguments`*!$
   *     - **#val is a whole `number`**!$
   *       This method will [splice][splice] from the #source the property
   *       with an index that matches (via a [strict equality][equal] test)
   *       the #val. If the #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **#val is a `function`**!$
   *       The #val is considered a filter `function` (i.e. if it returns
   *       `false` the property is [spliced][splice] from the #source). It has
   *       the following optional parameters:
   *       - **value** *`*`*
   *       - **index** *`number`*
   *       - **source** *`!Array`*
   *       Note that this method lazily [clones][clone] the #source based on
   *       the filter's [length property][func-length] (i.e. if you alter the
   *       #source `array` within the filter make sure you define the filter's
   *       third parameter so you can safely assume all references to the
   *       #source are its original values).
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all properties
   *       with a value that matches (via a [strict equality][equal] test)
   *       the #val.
   * @param {?Object=} thisArg
   *   Only applicable when a filter `function` is defined for #val. If
   *   #thisArg is defined, the filter `function` is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is not used to bind the
   *   filter `function`. Instead the filter `function` is wrapped with a
   *   regular new [Function][func] that uses [Function.prototype.call][call]
   *   to call the filter `function` with #thisArg. The new wrapper `function`
   *   has the same [length property][func-length] value as the filter
   *   `function` (unless more than three parameters were defined for the
   *   filter `function` as the wrapper has a max value of `3`) and the
   *   [name property][func-name] value of `"filter"` (unless you are using a
   *   [minified][minify] version of `vitals`).
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.key
  /**
   * @description
   *   Removes a property by key name from an `object` or `function` and
   *   returns the amended #source.
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   *   If a property with the #key value for its key name is [owned][own] by
   *   the #source, it is [deleted][delete].
   * @return {(!Object|!Function)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.index
  /// @alias vitals.cut.i
  /**
   * @description
   *   Removes properties by index from an `array` or array-like `object` and
   *   returns the amended #source. If an array-like `object` is supplied, it
   *   is copied via [slice][slice] (i.e. converted to an `array`) before
   *   removing any properties.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it [owns][own]
   *   a property with the `"length"` key name (e.g. `source.length` like the
   *   `array` [length property][arr-length]) whose value is a whole `number`
   *   that is greater than or equal to zero (e.g.
   *   `isWholeNumber(source.length) && source.length >= 0`). If an array-like
   *   #source is provided, it is [sliced][slice] into an `array` before any
   *   values are removed.
   * @param {number} index
   *   The #index must be a whole `number`. The following rules apply in order
   *   of priority (per #toIndex data type):
   *   - *`undefined`*!$
   *     The #index value sets the one matching property (if a property with
   *     an index value of the #index exists in the #source) to
   *     [splice][splice] from the #source. If the #index is negative, it is
   *     added to the #source [length][arr-length] before a matching property
   *     is searched for.
   *   - *`number`*!$
   *     The #index value sets the start of a range of indexes that are
   *     [spliced][splice] from the #source. If the #index is negative, it is
   *     added to the #source [length][arr-length]. The property with a
   *     matching index value of the #index is included (as well as starts the
   *     range of indexes) in the [spliced][splice] properties if it exists.
   * @param {(number|undefined)=} toIndex = `undefined`
   *   If the #toIndex is defined, it must be a whole `number`. The #toIndex
   *   `number` causes all property indexes from the #index to the #toIndex
   *   (not including the #toIndex) to be [spliced][splice] from #source. If
   *   the #toIndex is a negative `number`, it is added to the #source
   *   [length][arr-length] before being used.
   * @return {!Array}
   *   The amended #source or when an array-like `object` is defined for the
   *   #source, an amended copy (via [slice][slice]) of #source.
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

  /// @section base
  /// @method vitals.cut.type
  /**
   * @description
   *   Removes properties by their value's [data type][type] from an `object`,
   *   `function`, or `array` and returns the amended #source. @is#main is
   *   used to complete the type checks. See @is-types for all available data
   *   type options.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {string} type
   *   See @is-types for all valid #type options. The remaining details are as
   *   follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all [owned][own]
   *     properties with a value that matches (via a @is#main test) the #type.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all indexed
   *     properties with a value that matches (via a @is#main test) the #type.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.value
  /// @alias vitals.cut.val
  /**
   * @description
   *   Removes properties by value from an `object`, `function`, or `array`
   *   and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {*} val
   *   All details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all [owned][own]
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) the #val.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all indexed
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) the #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.pattern
  /// @alias vitals.cut.patt
  /**
   * @description
   *   Removes a pattern from a `string` and returns the amended #source.
   * @public
   * @param {string} source
   * @param {*} pattern
   *   Each `substring` of characters that matches #pattern is removed from
   *   the #source. If the #pattern is not a `RegExp` or `string`, it is
   *   converted into a `string` before checking the #source for any matches.
   * @return {string}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.properties
  /// @alias vitals.cut.props
  /**
   * @description
   *   Removes properties from an `object`, `array`, or `function` and returns
   *   the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     - **The leading #val is a `RegExp`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a @has#pattern test) any
   *       #val.
   *     - **The leading #val is a `string`**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a key that matches (via a [strict equality][equal]
   *       test) any #val.
   *     - **All other situations**!$
   *       This method will [delete][delete] from the #source all [owned][own]
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     - **Every #val is a whole `number`**!$
   *       This method will [splice][splice] from the #source each property
   *       with an index that matches (via a [strict equality][equal] test)
   *       any #val. If a #val is a negative `number`, it is added to the
   *       #source [length][arr-length] before checking for a matching
   *       property.
   *     - **All other situations**!$
   *       This method will [splice][splice] from the #source all indexed
   *       properties with a value that matches (via a
   *       [strict equality][equal] test) any #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.keys
  /**
   * @description
   *   Removes properties by key name from an `object` or `function` and
   *   returns the amended #source.
   * @public
   * @param {(!Object|!Function)} source
   * @param {...*} key
   *   If only one `array` #key is provided, it is considered an `array` of
   *   keys. For each #key value, if the #source [owns][own] a property with a
   *   matching key name, it is [deleted][delete].
   * @return {(!Object|!Function)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.indexes
  /// @alias vitals.cut.ii
  /**
   * @description
   *   Removes properties by index from an `array` or array-like `object` and
   *   returns the amended #source. If an array-like `object` is supplied, it
   *   is copied via [slice][slice] (i.e. converted to an `array`) before
   *   removing any properties.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it [owns][own]
   *   a property with the `"length"` key name (e.g. `source.length` like the
   *   `array` [length property][arr-length]) whose value is a whole `number`
   *   that is greater than or equal to zero (e.g.
   *   `isWholeNumber(source.length) && source.length >= 0`). If an array-like
   *   #source is provided, it is [sliced][slice] into an `array` before any
   *   values are removed.
   * @param {(!Array<number>|...number)} index
   *   Each #index `number` must be a whole `number`. If only one `array`
   *   #index is provided, it is considered an `array` of indexes. If a
   *   property with any #index exists in #source, it is [spliced][splice]
   *   from the #source. If an #index is a negative `number`, it is added to
   *   the #source [length][arr-length] before checking for a matching
   *   property.
   * @return {!Array}
   *   The amended #source or when an array-like `object` is defined for the
   *   #source, an amended copy (via [slice][slice]) of #source.
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

  /// @section base
  /// @method vitals.cut.values
  /// @alias vitals.cut.vals
  /**
   * @description
   *   Removes properties by value from an `object`, `function`, or `array`
   *   and returns the amended #source.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. All other details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will [delete][delete] from the #source all of the
   *     [owned][own] properties with a value that matches (via a
   *     [strict equality][equal] test) any #val.
   *   - *`!Array|!Arguments`*!$
   *     This method will [splice][splice] from the #source all of the indexed
   *     properties with a value that matches (via a [strict equality][equal]
   *     test) any #val.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
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

  /// @section base
  /// @method vitals.cut.patterns
  /// @alias vitals.cut.patts
  /**
   * @description
   *   Removes patterns from a `string` and returns the amended #source.
   * @public
   * @param {string} source
   * @param {...*} pattern
   *   If only one `array` #pattern is provided, it is considered an `array`
   *   of patterns. Each `substring` of characters that matches any #pattern
   *   is removed from the #source. If a #pattern is not a `RegExp` or
   *   `string`, it is converted into a `string` before checking the #source
   *   for any matches.
   * @return {string}
   *   The amended #source.
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

      // push 1st index
      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len)
        index = parse(indexes[i], sourceLen);
      push(index);

      // push remaining indexes
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
     *   If invalid #index is given `-1` is returned.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.each
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties, indexed
   *   `array` properties, or a defined `number` of cycles.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     Iterates over all [owned][own] properties in random order.
   *   - *`!Array|!Arguments`*!$
   *     Iterates over all indexed properties from `0` to `source.length`.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   *   - *`number`*!$
   *     Must be a whole `number`. Iterates over the `number` of cycles.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=)} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments|string`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments|string`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than two parameters were defined for the #iteratee as the
   *     wrapper has a max length of `2`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   * @return {(!Object|!Function|!Array|!Arguments|number)}
   *   The original #source value (unless the #source is a `string` which will
   *   result in an `array`).
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

  /// @section base
  /// @method vitals.each.object
  /// @alias vitals.each.obj
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties.
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|!Function`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#main based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {(!Object|!Function)}
   *   The original #source value.
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

  /// @section base
  /// @method vitals.each.array
  /// @alias vitals.each.arr
  /**
   * @description
   *   A shortcut for iterating over all of the indexed properties of an
   *   `array` or array-like `object` or `function`.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If the #source is a `string`, it is converted into an `array` using one
   *   of the following list of values for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {!function(*=, number=, !Array=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#array based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {(!Array|!Arguments|!Object|!Function)}
   *   The original #source value (unless the #source is a `string` which will
   *   result in an `array`).
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

  /// @section base
  /// @method vitals.each.cycle
  /// @alias vitals.each.time
  /**
   * @description
   *   A shortcut for iterating over a set `number` of cycles.
   * @public
   * @param {number} cycles
   *   Must be a whole `number`.
   * @param {!function(number=, number=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **cycle** *`number`*!$
   *     Note that this `number` is zero-based (i.e. the first *cycle* value
   *     is `0`).
   *   - **cycles** *`number`*!$
   *     The unchanged #cycles value.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than two parameters were defined for the #iteratee as the
   *   wrapper has a max length of `2`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {number}
   *   The original #cycles value.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.fill
  /**
   * @description
   *   Fills an `array`, `object`, or `string` with specified values.
   * @public
   * @param {(?Array|?Object|?Function|?number)} source
   *   If the #source is a `number`, @fill returns a new `string` filled with
   *   the `string` conversion of #val the #source `number` of times.
   * @param {(!Array|string)=} keys
   *   Only use with an `object` or `function` #source. If defined, #keys is
   *   considered an `array` of keys that will limit the fill action. If a
   *   `string` is defined for #keys, it is converted to an `array` using one
   *   of the values in the following list for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `array`, `object`, or `string` with.
   * @param {number=} start = `0`
   *   Only use with an `array` #source. It begins the range of indexes in the
   *   #source that are filled with the #val. If negative, the #start value is
   *   added to the #source [length][arr-length]. The #start index `number` is
   *   included in the range of filled properties if it exists.
   * @param {number=} end = `source.length`
   *   Only use with an `array` #source. It ends the range of indexes in the
   *   #source that are filled with the #val. If negative, the #end value is
   *   added to the #source [length][arr-length]. The #end index `number` is
   *   **not** included in the range of filled properties if it exists.
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

  /// @section base
  /// @method vitals.fill.object
  /// @alias vitals.fill.obj
  /**
   * @description
   *   Fills an existing `object` or `function` with specified keys and
   *   values.
   * @public
   * @param {(!Object|!Function)} source
   * @param {(!Array|string)=} keys
   *   If defined, #keys is considered an `array` of keys that will limit the
   *   fill action. If a `string` is defined for #keys, it is converted to an
   *   `array` using one of the values in the following list for the separator
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `object` or `function` with.
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

  /// @section base
  /// @method vitals.fill.array
  /// @alias vitals.fill.arr
  /**
   * @description
   *   Fills an existing or new `array` with specified values.
   * @public
   * @param {(!Array|number)} source
   *   If #source is a `number`, it makes a new `array` for #source using the
   *   #source `number` for the [array's length][arr-length].
   * @param {*} val
   *   The value to fill the #source `array` with.
   * @param {number=} start = `0`
   *   Begins the range of indexes in the #source that are filled with the
   *   #val. If negative, the #start value is added to the #source
   *   [length][arr-length]. The #start index `number` is included in the
   *   range of filled properties if it exists.
   * @param {number=} end = `arr.length`
   *   Ends the range of indexes in the #source that are filled with the #val.
   *   If negative, the #end value is added to the #source
   *   [length][arr-length]. The #end index `number` is **not** included in
   *   the range of filled properties if it exists.
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

  /// @section base
  /// @method vitals.fill.string
  /// @alias vitals.fill.str
  /**
   * @description
   *   Fills a new `string` with specified values.
   * @public
   * @param {number} count
   *   The [length][str-length] of the new `string`.
   * @param {*} val
   *   The value to fill the new `string` with. Any #val that is not a
   *   `string` is converted to a `string`.
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
   * @param {number=} start = `0`
   * @param {number=} end = `arr.length`
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.fuse
  /**
   * @description
   *   Merges objects, [concatenates][concat] arrays, appends properties to
   *   objects and arrays, and combines strings.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   All rules for #dest are shown in order of priority. The details are as
   *   follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each `null` #val is skipped. Each `object` or `function` #val
   *     is merged with the #dest. All other values are converted to a
   *     `string` and appended as a new property key (if the key exists in the
   *     #dest, the property's value is reset to `undefined`).
   *   - *`!Array|!Arguments`*!$
   *     Each `null` #val is skipped. Each `array` #val is
   *     [concatenated][concat] to the #dest. All other values are
   *     [pushed][push] to the #dest.
   *   - *`string`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each #val is converted to a `string` and appended to the
   *     #dest.
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

  /// @section base
  /// @method vitals.fuse.value
  /// @alias vitals.fuse.val
  /**
   * @description
   *   Appends properties to an `object`, `function`, or `array` or strings to
   *   a `string`.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an `arguments` instance, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
   *   - *`!Array|!Arguments`*!$
   *     Each #val is [pushed][push] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the #dest.
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

  /// @section base
  /// @method vitals.fuse.value.start
  /// @alias vitals.fuse.value.top
  /// @alias vitals.fuse.val.start
  /// @alias vitals.fuse.val.top
  /**
   * @description
   *   Appends to the #dest beginning properties for an `object`, `function`,
   *   or `array` or strings for a `string`.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|!Function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value remains unchanged).
   *   - *`!Array|!Arguments`*!$
   *     Each #val is [unshifted][unshift] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the beginning of
   *     the #dest.
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

  /// @section base
  /// @method vitals.fuse.object
  /// @alias vitals.fuse.obj
  /**
   * @description
   *   Appends and merges properties to an `object` or `function`.
   * @public
   * @param {(!Object|!Function)} dest
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. The remaining details are as follows in order of priority (per
   *   #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Object|!Function`*!$
   *     The #val is merged with the #dest. If a key exists in the #val and
   *     #dest the #dest property's value is with replaced with the #val
   *     property's value.
   *   - *`*`*!$
   *     The #val is converted to a `string` and appended to the #dest as a
   *     new property key (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
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

  /// @section base
  /// @method vitals.fuse.array
  /// @alias vitals.fuse.arr
  /**
   * @description
   *   [Pushes][push] values and [concatenates][concat] arrays to an `array`.
   * @public
   * @param {(!Array|!Arguments)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows in order of priority (per #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Array`*!$
   *     The #val is [concatenated][concat] to the #dest.
   *   - *`*`*!$
   *     The #val is [pushed][push] to the #dest.
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

  /// @section base
  /// @method vitals.fuse.string
  /// @alias vitals.fuse.str
  /**
   * @description
   *   Appends strings to a `string`.
   * @public
   * @param {string} dest
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. Each #val is converted to a `string` and appended to the #dest.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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



  /// @section base
  /// @method vitals.get
  /**
   * @description
   *   Retrieves keys and values from an `object` or `function`, indexes and
   *   values from an `array` or `arguments` instance, or indexes and
   *   substrings from a `string`.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   *   If no #val is defined, the following rules apply in order of priority
   *   (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     key names in the #source.
   *   - *`!Array|!Arguments`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|!Function`*!$
   *     If the #val is a `RegExp` this method returns an `array` of the
   *     [owned][own] property values in the #source where the key name
   *     matches (via a @has#pattern test) the #val. Otherwise it returns an
   *     `array` of the [owned][own] property key names in the #source where
   *     the value matches (via a [strict equality][equal] test) the #val.
   *   - *`!Array|!Arguments`*!$
   *     This method returns an `array` of the indexes in the #source where
   *     the property value matches (via a [strict equality][equal] test) the
   *     #val.
   *   - *`string`*!$
   *     If the #val is a `RegExp` this method returns an `array` of every
   *     substring in the #source that matches (via a @has#pattern test) the
   *     #val. Otherwise the #val is converted into a `string` with
   *     [String()][string], and this method returns an `array` of the
   *     starting indexes in the #source where a substring matches (via a
   *     [strict equality][equal] test) the #val.
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

  /// @section base
  /// @method vitals.get.keys
  /**
   * @description
   *   Retrieves keys from an `object` or `function`.
   * @public
   * @param {(!Object|!Function)} source
   *   If no #val is defined, this method returns an `array` of all of the
   *   [owned][own] property key names in the #source.
   * @param {*=} val
   *   If the #val is a `RegExp` this method returns an `array` of the
   *   [owned][own] property key names in the #source where the key name
   *   matches (via a @has#pattern test) the #val. Otherwise it returns an
   *   `array` of the [owned][own] property key names in the #source where
   *   the value matches (via a [strict equality][equal] test) the #val.
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

  /// @section base
  /// @method vitals.get.keys.byKey
  /**
   * @description
   *   Retrieves [owned][own] property key names from an `object` or
   *   `function` that have a matching key name. Note that @has#pattern is
   *   used to find key name matches.
   * @public
   * @param {(!Object|!Function)} source
   * @param {*} key
   *   If the #key is not a `RegExp`, it is converted into a `string` with
   *   [String()][string] before @has#pattern is called to check for any
   *   property key name matches in the #source.
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

  /// @section base
  /// @method vitals.get.keys.byValue
  /// @alias vitals.get.keys.byVal
  /**
   * @description
   *   Retrieves [owned][own] property key names from an `object` or
   *   `function` that have a matching property value. Note that a
   *   [strict equality][equal] test is used to find matches.
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

  /// @section base
  /// @method vitals.get.indexes
  /// @alias vitals.get.ii
  /**
   * @description
   *   Retrieves property indexes from an `array`, array-like `object`, or
   *   `string`.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns an `array` of all of the indexes in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns an `array` of the indexes in the #source where
   *     the property value matches (via a [strict equality][equal] test) the
   *     #val.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     the starting indexes in the #source where a substring matches (via
   *     a @has#pattern test) the #val.
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

  /// @section base
  /// @method vitals.get.values
  /// @alias vitals.get.vals
  /**
   * @description
   *   Retrieves property values from an `object` or `function` and substrings
   *   from a `string`.
   * @public
   * @param {(!Object|!Function|string)} source
   *   If no #val is defined, the following rules apply (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method returns an `array` of all of the [owned][own] property
   *     values in the #source.
   *   - *`string`*!$
   *     This method throws an [Error][error] because a #val must be defined.
   * @param {*=} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`!Object|!Function`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     the [owned][own] property values where the key name matches (via a
   *     @has#pattern test) the #val.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     with [String()][string]. This method will then return an `array` of
   *     every substring in the #source that matches (via a @has#pattern
   *     test) the #val.
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
 * @const {!Function<string, !Function>}
 * @dict
 */
var has = (function hasPrivateScope() {


  /// @section base
  /// @method vitals.has
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] a property, if an
   *   `array` or `arguments` instance contains a value, or a `string` matches
   *   a pattern or contains a substring.
   * @public
   * @param {(?Object|?Function|?Array|?Arguments|?string)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value (via a [strict equality][equal] test).
   *   - *`string`*!$
   *     If the #val is a `RegExp`, this method returns the result of a call
   *     to [RegExp.prototype.test][test] on the #source. Otherwise, it
   *     returns the result of a call to [String.prototype.includes][includes]
   *     or, in the case of an older platform that does not support
   *     [String.prototype.includes][includes], it returns a
   *     [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexof] (i.e.
   *     `return source.indexOf(val) !== -1;`).
   * @param {*} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #val does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     If the #val is a `RegExp`, each [owned][own] property is
   *     [tested][test] for a matching property key. If a match is found, this
   *     method immediately returns `true`. Otherwise, the #val is passed
   *     without any conversions to [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each indexed property value.
   *   - *`string`*!$
   *     If the #val is **not** a `RegExp`, it is converted into a `string`
   *     before [String.prototype.includes][includes] or, in the case of an
   *     older platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
   *   - *`string`*!$
   *     If the #val is a `RegExp`, this method returns the result of a call
   *     to [RegExp.prototype.test][test] on the #source. Otherwise, it
   *     returns the result of a call to [String.prototype.includes][includes]
   *     or, in the case of an older platform that does not support
   *     [String.prototype.includes][includes], it returns a
   *     [strict equality][equal] test for a non-negative
   *     index result from [String.prototype.indexOf][indexof] (i.e.
   *     `return source.indexOf(val) !== -1;`).
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

  /// @section base
  /// @method vitals.has.key
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] a property.
   * @public
   * @param {(?Object|?Function)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
   * @param {*} key
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #key does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #key is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own].
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own].
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

  /// @section base
  /// @method vitals.has.value
  /// @alias vitals.has.val
  /**
   * @description
   *   Checks if an `object` or `function` [owned][own] property or an `array`
   *   or `arguments` indexed property has a value.
   * @public
   * @param {(?Object|?Function|?Array|?Arguments)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method checks each [owned][own] property in the #source for one
   *     matching value.
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
   * @param {*} val
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #val does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each [owned][own] property value.
   *   - *`!Array|!Arguments`*!$
   *     The #val is **not** altered. A [strict equality][equal] test against
   *     the #val is used to evaluate each indexed property value.
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method checks each [owned][own] property in the #source for one
   *     matching value.
   *   - *`!Array|!Arguments`*!$
   *     This method checks each indexed property in the #source for one
   *     matching value.
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

  /// @section base
  /// @method vitals.has.pattern
  /**
   * @description
   *   Checks if a `string` matches a pattern or contains a substring.
   * @public
   * @param {string} source
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise, it returns the
   *   result of a call to [String.prototype.includes][includes] or, in the
   *   case of an older platform that does not support
   *   [String.prototype.includes][includes], it returns a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   * @param {*} pattern
   *   If the #pattern is **not** a `RegExp`, it is converted into a `string`
   *   before [String.prototype.includes][includes] or, in the case of an
   *   older platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   If the #val is a `RegExp`, this method returns the result of a call to
   *   [RegExp.prototype.test][test] on the #source. Otherwise, it returns the
   *   result of a call to [String.prototype.includes][includes] or, in the
   *   case of an older platform that does not support
   *   [String.prototype.includes][includes], it returns a
   *   [strict equality][equal] test for a non-negative index result from
   *   [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
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

  /// @section base
  /// @method vitals.has.substring
  /// @alias vitals.has.substr
  /**
   * @description
   *   Checks if a `string` contains a substring.
   * @public
   * @param {string} source
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform that does not support [String.prototype.includes][includes],
   *   it returns a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
   * @param {*} val
   *   The #val is converted into a `string` before
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform, [String.prototype.indexOf][indexof] is called.
   * @return {boolean}
   *   This method returns the result of a call to
   *   [String.prototype.includes][includes] or, in the case of an older
   *   platform that does not support [String.prototype.includes][includes],
   *   it returns a [strict equality][equal] test for a non-negative index
   *   result from [String.prototype.indexOf][indexof] (i.e.
   *   `return source.indexOf(val) !== -1;`).
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

  /// @section base
  /// @method vitals.has.enumerableKey
  /// @alias vitals.has.enumerable
  /// @alias vitals.has.enumKey
  /// @alias vitals.has.enum
  ///   Note that `vitals.has.enum` will fail in some ES3 and ES5 browser and
  ///   other platform environments. Use `vitals.has.enumerable` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Checks if an `object` or `function` [owns][own] an [enumerable][enum]
   *   property. Also note that `vitals.has.enum` is not valid in some
   *   [ES3][ecma3] and [ES5][ecma5] browser and other platform environments.
   *   Use `vitals.has.enumerable` for browser and platform safety.
   * @public
   * @param {(?Object|?Function)} source
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method automatically returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
   * @param {*} key
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     The value of #key does not matter and is not used.
   *   - *`!Object|!Function`*!$
   *     The #key is passed **without** any conversions to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
   * @return {boolean}
   *   The following rules apply in order of priority (per #source type):
   *   - *`null`*!$
   *     This method returns `false`.
   *   - *`!Object|!Function`*!$
   *     This method returns the result of a safe call to
   *     [Object.prototype.hasOwnProperty][own] and
   *     [Object.prototype.propertyIsEnumerable][enum].
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.remap
  /**
   * @description
   *   A shortcut for making a new `object`, `array`, or `string` by invoking
   *   an action over each [owned][own] `object` or `function` property,
   *   indexed `array` or `arguments` property, or matched `substring`
   *   pattern.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   * @param {*} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee must be a `function`. The value returned from each call
   *     to the #iteratee is set as the property value for the new `object`.
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee must be a `function`. The value returned from each call
   *     to the #iteratee is set as the property value for the new `array`.
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`string`*!$
   *     The #iteratee must be a `substring` pattern to search for within the
   *     #source. If the #iteratee is **not** a `RegExp`, it is converted into
   *     a `string` before running a search on the #source for any matches.
   * @param {*=} replacement
   *   Only allowed (and then required) when the #source is a `string`. If it
   *   is **not** a `function` the #replacement is converted into a `string`.
   *   If the #replacement is a `function`, it operates the same as any
   *   `function` parameter specified for [String.prototype.replace][replace].
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`string`*!$
   *     If #thisArg is defined and the #replacement is a `function`, the
   *     #replacement is bound to its value. Note that the native
   *     [Function.prototype.bind][bind] is **not** used to bind the
   *     #replacement. Instead the #replacement is wrapped with a regular new
   *     [Function][func] that uses [Function.prototype.call][call] or when
   *     seven or more parameters are defined for the #replacement,
   *     [Function.prototype.apply][apply] to call the #replacement with
   *     #thisArg. The new wrapper `function` has the same
   *     [length property][func-length] value as the #replacement (unless
   *     more than seven parameters were defined for the #replacement as the
   *     wrapper has a max length of `7`) and the [name property][func-name]
   *     value of `"replacement"` (unless you are using a [minified][minify]
   *     version of `vitals`).
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

  /// @section base
  /// @method vitals.remap.object
  /// @alias vitals.remap.obj
  /**
   * @description
   *   A shortcut for making a new `object` with the same [owned][own]
   *   property key names as an existing `object` or `function` and new values
   *   set by invoking an action with an #iteratee `function` upon each
   *   [owned][own] property of the existing `object`.
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   *   The #iteratee must be a `function`. The value returned from each call
   *   to the #iteratee is set as the property value for the new `object`.
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|!Function`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#main based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
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

  /// @section base
  /// @method vitals.remap.array
  /// @alias vitals.remap.arr
  /**
   * @description
   *   A shortcut for making a new `array` with the same [length][arr-length]
   *   of indexed properties as an existing `array` or array-like `object` and
   *   with new property values set by invoking an action with an #iteratee
   *   `function` upon each indexed property of the existing `array` or
   *   `object`.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If the #source is a `string`, it is converted into an `array` using one
   *   of the following values as the separator (values listed in order of
   *   rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {!function(*=, number=, !Array=): *} iteratee
   *   The #iteratee must be a `function`. The value returned from each call
   *   to the #iteratee is set as the property value for the new `array`.
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#array based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
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

  /// @section base
  /// @method vitals.remap.string
  /// @alias vitals.remap.str
  /**
   * @description
   *   A shortcut for replacing each matching `substring` with a new
   *   `substring` within a #source `string`.
   * @public
   * @param {string} source
   * @param {*} pattern
   *   The #pattern must be a `substring` pattern to search for within the
   *   #source. If the #pattern is **not** a `RegExp`, it is converted into
   *   a `string` before running a search on the #source for any matches. Note
   *   that a `string` #pattern will replace all of the `substring` matches in
   *   the #source (i.e. not just the first). To replace only one match use a
   *   `RegExp` #pattern that does not have the [global flag][global] set, a
   *   `RegExp` #pattern with an altered [lastIndex property][lastIndex], or a
   *   `function` #replacement that uses your own logic to decide whether to
   *   replace each #pattern occurrence.
   * @param {*} replacement
   *   If the #replacement is **not** a `function`, it is converted into a
   *   `string`. If the #replacement is a `function`, it operates the same as
   *   any `function` parameter specified for
   *   [String.prototype.replace][replace].
   * @param {?Object=} thisArg
   *   If #thisArg is defined and the #replacement is a `function`, the
   *   #replacement is bound to its value. Note that the native
   *   [Function.prototype.bind][bind] is **not** used to bind the
   *   #replacement. Instead the #replacement is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] or when
   *   seven or more parameters are defined for the #replacement,
   *   [Function.prototype.apply][apply] to call the #replacement with
   *   #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #replacement (unless
   *   more than seven parameters were defined for the #replacement as the
   *   wrapper has a max length of `7`) and the [name property][func-name]
   *   value of `"replacement"` (unless you are using a [minified][minify]
   *   version of `vitals`).
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.roll
  /**
   * @description
   *   A shortcut for deriving a result by carrying a value over each
   *   [owned][own] property of an `object` or `function`, each indexed
   *   property of an `array` or `arguments`, or each `number` of cycles.
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial carried value. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over each [owned][own]
   *     property in random order.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over each indexed
   *     property starting with `0` and ending at `source.length`.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over each `number` of
   *     cycles starting with `0` and ending at `source`.
   * @param {!function(*=, *=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **prevValue** *`*`*
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **prevValue** *`*`*
   *     - **propValue** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **prevValue** *`*`*
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than four parameters were defined for the #iteratee as the
   *     wrapper has a max length of `4`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
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

  /// @section base
  /// @method vitals.roll.up
  /**
   * @description
   *   A shortcut for deriving a summed total by adding each value returned by
   *   an #iteratee `function` call over each [owned][own] property of an
   *   `object` or `function`, each indexed property of an `array` or
   *   `arguments`, or each `number` of cycles.
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial total. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over every [owned][own]
   *     property in random order the sum of the #base (if defined) and each
   *     value returned by every #iteratee call.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over every indexed
   *     property starting with `0` and ending at `source.length` the sum of
   *     the #base (if defined) and each value returned by every #iteratee
   *     call.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over every `number` of
   *     cycles starting with `0` and ending at `source` the sum of the #base
   *     and each value returned by every #iteratee call.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than two parameters were defined for the #iteratee as the
   *     wrapper has a max length of `2`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
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

  /// @section base
  /// @method vitals.roll.down
  /**
   * @description
   *   A shortcut for deriving a reduced total by subtracting each value
   *   returned by an #iteratee `function` call over each [owned][own]
   *   property of an `object` or `function`, each indexed property of an
   *   `array` or `arguments`, or each `number` of cycles.
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial total. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over every [owned][own]
   *     property in random order the difference of the #base (if defined) and
   *     each value returned by every #iteratee call.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over every indexed
   *     property starting with `0` and ending at `source.length` the
   *     difference of the #base (if defined) and each value returned by every
   *     #iteratee call.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over every `number` of
   *     cycles starting with `0` and ending at `source` the difference of the
   *     #base and each value returned by every #iteratee call.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than two parameters were defined for the #iteratee as the
   *     wrapper has a max length of `2`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.same
  /**
   * @description
   *   A functional representation of [strict equality][equal].
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

  /// @section base
  /// @method vitals.same.loose
  /// @alias vitals.same.ish
  /**
   * @description
   *   A functional representation of [loose equality][equal].
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.slice
  /**
   * @description
   *   Makes a shallow [copy][clone] of specified indexed properties for an
   *   `array` or array-like `object` or indexed characters for a `string`.
   *   Note that @copy#array should be used to [copy][clone] all (not only
   *   indexed) properties or to deep [copy][clone] an `array` or array-like
   *   `object`. This method operates like a cross-platform safe shortcut for
   *   [Array.prototype.slice][arr-slice] and
   *   [String.prototype.slice][str-slice].
   * @public
   * @param {(?Array|?Arguments|?Object|?Function|?string)} source
   *   The details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method [slices][arr-slice] the #source.
   *   - *`string`*!$
   *     This method [slices][str-slice] the #source.
   *   - *`null`*!$
   *     This method returns `null`.
   * @param {number=} start = `0`
   *   The #start details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][arr-length]. The #start index `number` is included in the
   *     [copied][clone] properties if it exists.
   *   - *`string`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][str-length]. The #start index `number` is included in the
   *     [copied][clone] characters if it exists.
   *   - *`null`*!$
   *     The #start value is not used.
   * @param {number=} end = `source.length`
   *   The #end details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][arr-length]. The #end index `number` is **not** included in
   *     the [copied][clone] properties if it exists.
   *   - *`string`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][str-length]. The #end index `number` is **not** included in
   *     the [copied][clone] characters if it exists.
   *   - *`null`*!$
   *     The #end value is not used.
   * @return {(?Array|?string)}
   *   The return details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns the new [copied][clone] `array`.
   *   - *`string`*!$
   *     This method returns the new [copied][clone] `string`.
   *   - *`null`*!$
   *     This method returns `null`.
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

  /// @section base
  /// @method vitals.slice.array
  /// @alias vitals.slice.arr
  /**
   * @description
   *   Makes a shallow [copy][clone] of specified indexed properties for an
   *   `array` or array-like `object`. Note that @copy#array should be used to
   *   [copy][clone] all (not only indexed) properties or to deep
   *   [copy][clone] the #source. This method operates like a cross-platform
   *   safe shortcut for [Array.prototype.slice][arr-slice].
   * @public
   * @param {(?Array|?Arguments|?Object|?Function)} source
   *   The details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method [slices][arr-slice] the #source.
   *   - *`null`*!$
   *     This method returns `null`.
   * @param {number=} start = `0`
   *   The #start details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][arr-length]. The #start index `number` is included in the
   *     [copied][clone] properties if it exists.
   *   - *`null`*!$
   *     The #start value is not used.
   * @param {number=} end = `source.length`
   *   The #end details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][arr-length]. The #end index `number` is **not** included in
   *     the [copied][clone] properties if it exists.
   *   - *`null`*!$
   *     The #end value is not used.
   * @return {?Array}
   *   The return details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns the new [copied][clone] `array`.
   *   - *`null`*!$
   *     This method returns `null`.
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

  /// @section base
  /// @method vitals.slice.string
  /// @alias vitals.slice.str
  /**
   * @description
   *   Makes a [copy][clone] of a specified range of indexed characters in a
   *   `string`. This method operates like a cross-platform safe shortcut for
   *   [String.prototype.slice][str-slice].
   * @public
   * @param {string} source
   *   This method [slices][str-slice] the #source.
   * @param {number=} start = `0`
   *   Begins the range of indexes in the #source that are [copied][clone].
   *   If the #start `number` is negative, it is added to the #source
   *   [length][str-length]. The #start index `number` is included in the
   *   [copied][clone] characters if it exists.
   * @param {number=} end = `source.length`
   *   Ends the range of indexes in the #source that are [copied][clone]. If
   *   the #end `number` is negative, it is added to the #source
   *   [length][str-length]. The #end index `number` is **not** included in
   *   the [copied][clone] characters if it exists.
   * @return {string}
   *   This method returns the new [copied][clone] `string`.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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

  /// @section base
  /// @method vitals.to.string
  /// @alias vitals.to.str
  /**
   * @description
   *   Converts any value to a `string` with [String][string], the value's (if
   *   it is a `RegExp`) `toString` property, or optionally (if it is an
   *   `array`) [Array.prototype.join][join].
   * @public
   * @param {*} val
   * @param {(string|undefined)=} separator = `undefined`
   *   Only allowed for use if the #val is an `array`. If the #separator is
   *   defined, [Array.prototype.join][join] is called on the #val using the
   *   #separator value to join each indexed property.
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

  /// @section base
  /// @method vitals.to.number
  /// @alias vitals.to.num
  /**
   * @description
   *   Converts most [primitive][prim] values to a `number`.
   * @public
   * @param {(?string|?number|?boolean)} val
   *   If the #val is a `string`, [Number][number] is used to convert it to a
   *   `number`. Only [valid strings][str2num] are allowed.
   * @return {number}
   *   The return details are as follows (per #val data type):
   *   - *`boolean`*!$
   *     This method will return `1` for `true` or `0` for `false`.
   *   - *`number`*!$
   *     This method will return the value of #val.
   *   - *`string`*!$
   *     This method will return the result from [Number][number] unless it is
   *     `NaN`. If the result is `NaN`, an [Error][error] will be thrown.
   *   - *`null`*!$
   *     This method will return `0`.
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

  /// @section base
  /// @method vitals.to.boolean
  /// @alias vitals.to.bool
  /**
   * @description
   *   Converts any value into a `boolean`.
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

  /// @section base
  /// @method vitals.to.array
  /// @alias vitals.to.arr
  /**
   * @description
   *   Converts a `string` or `number` into an `array`.
   * @public
   * @param {(string|number)} val
   *   The #val details are as follows (per #val type):
   *   - *`string`*!$
   *     [String.prototype.split][split] is called on the #val.
   *   - *`number`*!$
   *     A new `array` with #val [length][arr-length] is created.
   * @param {*=} separator
   *   Only allowed for use if the #val is a `string`. The #separator is used
   *   to [split][split] the `string` into `array` properties. If the
   *   #separator is defined and is not a `RegExp`, it is converted into a
   *   `string`. If the #separator is **not** defined, one of the following
   *   values is used to [split][split] the `string` (values listed in order
   *   of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
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

  /// @section base
  /// @method vitals.to.regexp
  /// @alias vitals.to.regex
  /// @alias vitals.to.re
  /**
   * @description
   *   Converts a `string` into a `RegExp`.
   * @public
   * @param {string} source
   *   The [RegExp.prototype.source][regx-src] pattern for the new `RegExp`.
   * @param {(string|undefined)=} flags
   *   If #flags is defined, it is the [RegExp flags][regexp] to assign to the
   *   new `RegExp`.
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

  /// @section base
  /// @method vitals.to.upperCase
  /// @alias vitals.to.upper
  /**
   * @description
   *   Converts all characters in a `string` to upper case.
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

  /// @section base
  /// @method vitals.to.lowerCase
  /// @alias vitals.to.lower
  /**
   * @description
   *   Converts all characters in a `string` to lower case.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section base
  /// @method vitals.until
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties, indexed
   *   `array` properties, a defined `number` of cycles, or an unlimited
   *   `number` of cycles until a defined #end value is returned or all
   *   properties or cycles are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Object|!Function|!Array|!Arguments|string|number|undefined)=} source
   *   If the #source is **not** defined, this method will call the #iteratee
   *   until an #end match is found. It is recommended to define a maximum
   *   `number` of cycles for the #source instead of leaving it `undefined` to
   *   avoid an [infinite loop][endless] situation. If the #source is defined,
   *   the details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     Iterates over all [owned][own] properties in random order until an
   *     #end match is found or all properties are visited.
   *   - *`!Array|!Arguments`*!$
   *     Iterates over all indexed properties from `0` to `source.length`
   *     until an #end match is found or all properties are visited.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   *   - *`number`*!$
   *     Must be a whole `number`. Iterates over the `number` of cycles until
   *     an #end match is found or all cycles are completed.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments|string`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   *   - *`undefined`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments|string`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than two parameters were defined for the #iteratee as the
   *     wrapper has a max length of `2`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`undefined`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than one parameter was defined for the #iteratee as the wrapper
   *     has a max length of `1`) and the [name property][func-name] value of
   *     `"iteratee"` (unless you are using a [minified][minify] version of
   *     `vitals`).
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
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

  /// @section base
  /// @method vitals.until.object
  /// @alias vitals.until.obj
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties until a
   *   defined #end value is returned or all properties are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Object|!Function)} source
   *   Iterates over the [owned][own] #source properties in random order until
   *   an #end match is found or all properties are visited.
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|!Function`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#main based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
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

  /// @section base
  /// @method vitals.until.array
  /// @alias vitals.until.arr
  /**
   * @description
   *   A shortcut for iterating over indexed `array` or array-like `object` or
   *   `function` properties until a defined #end value is returned or all
   *   indexed properties are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   The #source details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Iterates over all indexed properties from `0` to `source.length`
   *     until an #end match is found or all indexed properties are visited.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!function(*=, number=, !Array=): *} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#array based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
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

  /// @section base
  /// @method vitals.until.cycle
  /// @alias vitals.until.time
  /**
   * @description
   *   A shortcut for iterating over a set `number` of cycles until a defined
   *   #end value is returned or all cycles are completed.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {number} cycles
   *   Must be a whole `number`. Iterates over the `number` of cycles until
   *   an #end match is found or all cycles are completed.
   * @param {!function(number=, number=): *} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **cycle** *`number`*!$
   *     Note that this `number` is zero-based (i.e. the first *cycle* value
   *     is `0`).
   *   - **cycles** *`number`*!$
   *     The unchanged #cycles value.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than two parameters were defined for the #iteratee as the
   *   wrapper has a max length of `2`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section strict
  /// @method vitals.amend
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that includes
   *   easier property value assignment, strong type declarations, and
   *   flexible default [descriptor][descriptor] options.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] or new value for its
   *     `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val
   *   Only define #val (and then required) if an `array` or `string` of
   *   property names is given for #props. #val sets the value of each
   *   property in #props regardless of #descriptor settings.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property in #props unless a
   *   [descriptor][descriptor] is used for a #props `value`.
   * @param {string=} strongType
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that throws an error if @is#main returns `false` for a new
   *   property `value`. See the below snippet for an example #strongType
   *   `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that sets the property to the value returned by #setter. The
   *   #setter function will receive two params, the new value and the current
   *   value. If #strongType is defined #setter will not get called until the
   *   new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
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

  /// @section strict
  /// @method vitals.amend.config
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the descriptors of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   *   The amended #source.
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

  /// @section strict
  /// @method vitals.amend.property
  /// @alias vitals.amend.prop
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop].
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {*=} val
   *   The #val is required if the #descriptor is not defined.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   * @param {string=} strongType
   *   If the #strongType is defined, the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   throws an error if @is#main returns `false` for a new property `value`.
   *   See the below snippet for an example #strongType `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined the new property is assigned an
   *   [accessor descriptor][descriptor] that includes a `set` function that
   *   sets the property to the value returned by #setter. The #setter
   *   function will receive two params, the new value and the current value.
   *   If #strongType is defined #setter will not get called until the new
   *   value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
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

  /// @section strict
  /// @method vitals.amend.property.config
  /// @alias vitals.amend.prop.config
  /**
   * @description
   *   A shortcut for [Object.defineProperty][define-prop] that only updates
   *   the [descriptor][descriptor] of an existing property.
   * @public
   * @param {!Object} source
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   *   The amended #source.
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

  /// @section strict
  /// @method vitals.amend.properties
  /// @alias vitals.amend.props
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that includes
   *   easier property value assignment, strong type declarations, and
   *   flexible default [descriptor][descriptor] options.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, *>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, *>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] or new value for its
   *     `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {*=} val
   *   Only define #val (and then required) if an `array` or `string` of
   *   property names is given for #props. #val sets the value of each
   *   property in #props regardless of #descriptor settings.
   * @param {!Object=} descriptor = `{ writable: true, enumerable: true, configurable: true }`
   *   The new [descriptor][descriptor] for each property in #props unless a
   *   [descriptor][descriptor] is used for a #props `value`.
   * @param {string=} strongType
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that throws an error if @is#main returns `false` for a new
   *   property `value`. See the below snippet for an example #strongType
   *   `set` function.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {(!function(*, *): *)=} setter
   *   If defined all new properties are assigned an
   *   [accessor descriptor][descriptor] (unless overridden in a #props
   *   `value`) that includes a `set` function (unless overridden in a #props
   *   `value`) that sets the property to the value returned by #setter. The
   *   #setter function will receive two params, the new value and the current
   *   value. If #strongType is defined #setter will not get called until the
   *   new value passes the @is#main test.
   *   ```
   *   descriptor.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) )
   *       throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   *   The amended #source.
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

  /// @section strict
  /// @method vitals.amend.properties.config
  /// @alias vitals.amend.props.config
  /**
   * @description
   *   A shortcut for [Object.defineProperties][define-props] that only
   *   updates the [descriptors][descriptor] of existing properties.
   * @public
   * @param {!Object} source
   * @param {(!Object<string, !Object>|!Array<string>|string)} props
   *   The details are as follows (per #props type):
   *   - *`!Object<string, !Object>`*!$
   *     For each `key => value` pair use the property's name for the `key`,
   *     and the property's [descriptor][descriptor] for its `value`.
   *   - *`!Array<string>`*!$
   *     For each element of the `array` define a property name.
   *   - *`string`*!$
   *     Should be a list of property names. It gets converted to an `array`
   *     of property names using one of the following values as the separator
   *     (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!Object=} descriptor
   *   Only define #descriptor (and then required) if an `array` or `string`
   *   of property names is given for #props.
   * @return {!Object}
   *   The amended #source.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section strict
  /// @method vitals.create
  /**
   * @description
   *   A shortcut for [Object.create][create] that includes easier property
   *   value assignment, strong type declarations, and flexible default
   *   [descriptor][descriptor] options. Note that this method uses
   *   @amend#main for assigning properties to the new `object`. See
   *   @amend#main for detailed documentation on all of the available options.
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

  /// @section strict
  /// @method vitals.create.object
  /// @alias vitals.create.obj
  /**
   * @description
   *   A shortcut for [Object.create][create] that includes easier property
   *   value assignment, strong type declarations, and flexible default
   *   [descriptor][descriptor] options. Note that this method uses
   *   @amend#main for assigning properties to the new `object`. See
   *   @amend#main for detailed documentation on all of the available options.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section strict
  /// @method vitals.freeze
  /**
   * @description
   *   [Freezes][freeze] an `object` or `function` with the option to
   *   recursively [freeze][freeze] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
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

  /// @section strict
  /// @method vitals.freeze.object
  /// @alias vitals.freeze.obj
  /**
   * @description
   *   [Freezes][freeze] an `object` or `function` with the option to
   *   recursively [freeze][freeze] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep
   *   Whether to recursively [freeze][freeze] the #obj properties.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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


  /// @section strict
  /// @method vitals.seal
  /**
   * @description
   *   [Seals][seal] an `object` or `function` with the option to
   *   recursively [seal][seal] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively [seal][seal] the #obj properties.
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

  /// @section strict
  /// @method vitals.seal.object
  /// @alias vitals.seal.obj
  /**
   * @description
   *   [Seals][seal] an `object` or `function` with the option to
   *   recursively [seal][seal] its properties. Note that incompatible
   *   interpreters are polyfilled to avoid failures in older environments.
   * @public
   * @param {(?Object|?Function)} obj
   * @param {boolean=} deep = `false`
   *   Whether to recursively [seal][seal] the #obj properties.
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
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
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

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol

