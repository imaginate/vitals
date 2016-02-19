/**
 * -----------------------------------------------------------------------------
 * VITALS JS - BROWSER VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */


////////////////////////////////////////////////////////////////////////////////
// EXPORT VITALS
////////////////////////////////////////////////////////////////////////////////

;(function(/** Object= */ root, /** !Object */ vitals) {

  /** @type {!Object} */
  var checks = {
    exp: isObj(typeof exports) && getObj(exports, true),
    mod: isObj(typeof module) && getObj(module, true),
    glo: isObj(typeof global, true) && getObj(global),
    win: isObj(typeof window) && getObj(window),
    sel: isObj(typeof self) && getObj(self),
    roo: isObj(typeof root) && getObj(root)
  };
  checks.glo = checks.exp && checks.mod && checks.glo;

  root = ( checks.glo ?
    global : checks.win && window !== (root && root.window) ?
      window : checks.sel ?
        self : checks.roo ?
          root : Function('return this')()
  );

  // window | self | global | this
  checks.win && setVitals(window);
  checks.sel && setVitals(self);
  setVitals(root);

  // exports
  if (checks.exp && checks.mod) {
    if (module.exports === exports) {
      module.exports = vitals;
    }
    else {
      setVitals(exports);
    }
  }

  // AMD
  if (typeof define === 'function' && define.amd &&
      typeof define.amd === 'object') {
    define(function() {
      return vitals;
    });
  }

  /**
   * @private
   * @param {string} typeOf
   * @param {boolean=} noFunc
   * @return {boolean}
   */
  function isObj(typeOf, noFunc) {
    return typeOf === 'object' || (!noFunc && typeOf === 'function');
  }

  /**
   * @private
   * @param {(Object|?function)} obj
   * @param {boolean=} testNodeType
   * @return {boolean}
   */
  function getObj(obj, testNodeType) {
    obj = obj && testNodeType && obj.nodeType ? false : obj;
    return obj && !testNodeType && obj.Object !== Object ? false : !!obj;
  }

  /**
   * @private
   * @param {!Object} obj
   */
  function setVitals(obj) {
    obj.vitals = vitals;
    obj.Vitals = vitals;
  }

})(this,

(function(undefined) {


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - OWN
////////////////////////////////////////////////////////////////////////////////

var _own = (function _ownPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _own(source, key) {
    return !!source && _hasOwnProperty.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN
  return _own;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - CLONE-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} obj
 * @return {!Object}
 */
function _cloneObj(obj) {
  return _merge({}, obj);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ERROR-AID
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {function(string, string=): !Error} ErrorAid
 */

/**
 * The ErrorAid constructor.
 * @param {string} vitalsMethod
 * @return {!ErrorAid}
 */
function newErrorAid(vitalsMethod) {

  /** @type {!ErrorAid} */
  var errorAid;

  vitalsMethod = 'vitals.' + vitalsMethod;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  errorAid = function error(msg, method) {

    /** @type {!Error} */
    var error;

    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new Error(msg + ' for ' + method + ' call.');
    error.__vitals = true;
    return true;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var error;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    error = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    error.__vitals = true;
    return error;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var error;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    error = new RangeError(msg);
    error.__vitals = true;
    return error;
  };

  return errorAid;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ESCAPE
////////////////////////////////////////////////////////////////////////////////

var _escape = (function _escapePrivateScope() {

  /**
   * @param {string} source
   * @param {boolean=} anyChars
   * @param {?RegExp=} escapeChars
   * @return {string}
   */
  function _escape(source, anyChars, escapeChars) {
    return escapeChars
      ? source.replace(escapeChars, '\\$&')
      : anyChars
        ? anyEscape(source)
        : source.replace(ALL_ESCAPE_CHARS, '\\$&');
  }

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ALL_ESCAPE_CHARS = /[\\^$.*+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_ESCAPE_CHARS = /[\\^$.+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_REPLACE = /(\\+)\*/g;

  /**
   * @private
   * @param {string} source
   * @return {string}
   */
  function anyEscape(source) {
    source = source.replace(ANY_ESCAPE_CHARS, '\\$&');
    return ANY_REPLACE.test(source)
      ? source.replace(ANY_REPLACE, anyReplacer)
      : source;
  }

  /**
   * @private
   * @param {string} match
   * @param {?string=} capture
   * @return {string}
   */
  function anyReplacer(match, capture) {

    /** @type {number} */
    var len;

    len = capture.length >>> 1; // len = capture.length / 2;
    return len % 2 ? match.substr(1) : match; // is.odd(len) ? ...
  }

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ESCAPE
  return _escape;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} source
 * @param {*} val
 * @return {boolean}
 */
function _inArr(source, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = source.length;
  i = -1;
  while (++i < len) {
    if (source[i] === val) return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-OBJ
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function _inObj(source, val) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) && source[key] === val ) return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-STR
////////////////////////////////////////////////////////////////////////////////

var _inStr = (function _inStrPrivateScope() {

  /**
   * A shortcut for String.prototype.includes.
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function _inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return stringIncludes(source, str);
  }

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var stringIncludes = !!String.prototype.includes
    ? function stringIncludes(source, str) {
        return source.includes(str);
      }
    : function stringIncludes(source, str) {
        return source.indexOf(str) !== -1;
      };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IN-STR
  return _inStr;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IS
////////////////////////////////////////////////////////////////////////////////

var _is = (function _isPrivateScope() {

  /** @type {!Object} */
  var _is = {};

  /** @type {function} */
  var toStr = Object.prototype.toString;

  //////////////////////////////////////////////////////////
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil = function(val) {
    return val === null;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.undefined = function(val) {
    return val === undefined;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.bool = function(val) {
    return typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.str = function(val) {
    return typeof val === 'string';
  };

  /**
   * Empty strings return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._str = function(val) {
    return !!val && typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.num = function(val) {
    return typeof val === 'number' && val === val;
  };

  /**
   * Zeros return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._num = function(val) {
    return !!val && typeof val === 'number' && val === val;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nan = function(val) {
    return val !== val;
  };

  //////////////////////////////////////////////////////////
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.obj = function(val) {
    return !!val && typeof val === 'object';
  };

  /**
   * Functions return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._obj = function(val) {
    val = !!val && typeof val;
    return val && (val === 'object' || val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.func = function(val) {
    return !!val && typeof val === 'function';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.arr = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
  };

  /**
   * Arguments return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  _is._arr = function(val) {
      if ( !_is.obj(val) ) return false;
      val = toStr.call(val);
      return val === '[object Array]' || val === '[object Arguments]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.regex = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.date = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.err = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.args = function(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Arguments]';
  };

  // BROWSER ONLY
  (function() {
    // check JS engine for accuracy
    if ( _is.args(arguments) ) return;

    /**
     * @param {*} val
     * @return {boolean}
     */
    _is._arr = function(val) {
      return !!val && typeof val === 'object' && (
        toStr.call(val) === '[object Array]' || 'callee' in val
      );
    };

    /**
     * @param {*} val
     * @return {boolean}
     */
    _is.args = function(val) {
      return !!val && typeof val === 'object' && 'callee' in val;
    };

    try {
      _is.args({});
    }
    catch (e) {
      _is._arr = _is.arr;
      _is.args = function(){ return false; };
    }
  })();
  // BROWSER ONLY END

  //////////////////////////////////////////////////////////
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.doc = function(val) {
    return !!val && typeof val === 'object' && val.nodeType === 9;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.elem = function(val) {
    return !!val && typeof val === 'object' && val.nodeType === 1;
  };

  //////////////////////////////////////////////////////////
  // OTHERS
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value is considered empty. For a list of empty values see below.
   *   empty values: 0, "", {}, [], null, undefined, false, NaN, function(){...}
   *   note: for functions this method checks whether it has any defined params:
   *     function(){} => true | function(param){} => false
   * @param {*} val
   * @return {boolean}
   */
  _is.empty = function(val) {

    /** @type {string} */
    var prop;

    // return empty primitives - 0, "", null, undefined, false, NaN
    if ( !_is._obj(val) ) return !val;

    // return empty arrays and functions - [], function(){}
    if ( _is.arr(val) || _is.func(val) ) return !val.length;

    // return empty object - {}
    for (prop in val) {
      if ( _own(val, prop) ) return false;
    }
    return true;
  };

  /**
   * @param {(Object|?function)} obj
   * @return {boolean}
   */
  _is.frozen = (function() {

    if (!Object.isFrozen) return function isFrozen(obj) { return false; };

    try {
      Object.isFrozen(function(){});
      return Object.isFrozen;
    }
    catch (e) {
      return function isFrozen(obj) {
        return _is.obj(obj) && Object.isFrozen(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // NUMBER STATES
  //////////////////////////////////////////////////////////

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.whole = function(val) {
    return !(val % 1);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.odd = function(val) {
    return !!(val % 2);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  _is.even = function(val) {
    return !(val % 2);
  };

  //////////////////////////////////////////////////////////
  // OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  _is.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.bool = function(val) {
    return val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.str = function(val) {
    return val === undefined || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.num = function(val) {
    return val === undefined || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.obj = function(val) {
    return val === undefined || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.func = function(val) {
    return val === undefined || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.un.arr = function(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.bool = function(val) {
    return val === null || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.str = function(val) {
    return val === null || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.num = function(val) {
    return val === null || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.obj = function(val) {
    return val === null || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.func = function(val) {
    return val === null || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.arr = function(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  _is.nil.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.bool = function(val) {
    return val === null || val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.str = function(val) {
    return val === null || val === undefined || typeof  val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.num = function(val) {
    return val === null || val === undefined || (
      typeof val === 'number' && val === val
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.obj = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.func = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'undefined'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  _is.nil.un.arr = function(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
  return _is;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MATCH
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for String.prototype.includes and RegExp.prototype.test.
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
function _match(source, pattern) {
  return _is.regex(pattern) ? pattern.test(source) : _inStr(source, pattern);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MERGE
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {!(Object|function)} dest
 * @param {!(Object|function)} source
 * @return {!(Object|function)}
 */
function _merge(dest, source, deep) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( _own(source, key) ) {
      dest[key] = source[key];
    }
  }
  return dest;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - OWN-ENUM
////////////////////////////////////////////////////////////////////////////////

var _ownEnum = (function _ownEnumPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _ownEnum(source, key) {
    return !!source && _propertyIsEnumerable.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN-ENUM
  return _ownEnum;
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function _sliceArr(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = _is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = source[ii];
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-STR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= str.length]
 * @return {string}
 */
function _sliceStr(str, start, end) {

  /** @type {number} */
  var len;

  len = str.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = _is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  return start >= end ? '' : str.substring(start, end);
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SPLIT-KEYS
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} keys - One of the chars in the following list is used as
 *   the separator (chars listed in order of use):  ", "  ","  "|"  " "
 * @return {!Array<string>}
 */
function _splitKeys(keys) {

  /** @type {string} */
  var separator;

  separator = _inStr(keys, ', ')
    ? ', '  : _inStr(keys, ',')
      ? ',' : _inStr(keys, '|')
        ? '|' : ' ';
  return keys.split(separator);
}


// *****************************************************************************
// SECTION: BASE METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// IS
////////////////////////////////////////////////////////////////////////////////

var is = (function isPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is
  // - is.null      (is.nil)
  // - is.undefined
  // - is.boolean   (is.bool)
  // - is.string    (is.str)
  // - is._string   (is._str)
  // - is.number    (is.num)
  // - is._number   (is._num)
  // - is.nan
  // - is.object    (is.obj)
  // - is._object   (is._obj)
  // - is.func      (is.function|is.fn)
  // - is.array     (is.arr)
  // - is._array    (is._arr)
  // - is.regexp    (is.regex|is.re)
  // - is.date
  // - is.error     (is.err)
  // - is.args
  // - is.document  (is.doc)
  // - is.element   (is.elem)
  // - is.empty
  // - is.frozen
  // - is.whole
  // - is.odd
  // - is.even
  //////////////////////////////////////////////////////////

  /**
   * Checks if a value(s) is one of the provided types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all available options. Note that all object types are nullable by
   *   default (i.e. `null` will return `true`).
   *
   * @public
   * @param {string} types - The valid data types. See the [type docs](https://github.com/imaginate/vitals/wiki/vitals.is-types)
   *   for all options.
   * @param {...*} val - The value to evaluate. If multiple values are
   *   provided all must pass the type check to return true.
   * @return {boolean} The evaluation result.
   */
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {Array<function>} */
    var checks;

    if (arguments.length < 2) throw _error('No type or val');
    if ( !_is._str(types) ) throw _error.type('types');

    if ( _hasSpecial('*', types) ) return true;

    checks = _getChecks(types);

    if (!checks) throw _error.range('types', DOCS);

    nullable = _getNullable(types);
    return arguments.length > 2
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }

  /**
   * Checks if a value(s) is `null`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['null'] = function isNull(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'null');
      case 1:  return _is.nil(val);
      default: return _are(arguments, _is.nil);
    }
  };
  // define shorthand
  is.nil = is['null'];

  /**
   * Checks if a value(s) is `undefined`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'undefined');
      case 1:  return _is.undefined(val);
      default: return _are(arguments, _is.undefined);
    }
  };

  /**
   * Checks if a value(s) is a boolean.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is['boolean'] = function isBoolean(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'boolean');
      case 1:  return _is.bool(val);
      default: return _are(arguments, _is.bool);
    }
  };
  // define shorthand
  is.bool = is['boolean'];

  /**
   * Checks if a value(s) is a string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.string = function isString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'string');
      case 1:  return _is.str(val);
      default: return _are(arguments, _is.str);
    }
  };
  // define shorthand
  is.str = is.string;

  /**
   * Checks if a value(s) is a non-empty string.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._string = function isNonEmptyString(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_string');
      case 1:  return _is._str(val);
      default: return _are(arguments, _is._str);
    }
  };
  // define shorthand
  is._str = is._string;

  /**
   * Checks if a value(s) is a number.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.number = function isNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'number');
      case 1:  return _is.num(val);
      default: return _are(arguments, _is.num);
    }
  };
  // define shorthand
  is.num = is.number;

  /**
   * Checks if a value(s) is a number and not `0`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._number = function isNonZeroNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_number');
      case 1:  return _is._num(val);
      default: return _are(arguments, _is._num);
    }
  };
  // define shorthand
  is._num = is._number;

  /**
   * Checks if a value(s) is `NaN`.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'nan');
      case 1:  return _is.nan(val);
      default: return _are(arguments, _is.nan);
    }
  };

  /**
   * Checks if a value(s) is an object.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.object = function isObject(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'object');
      case 1:  return _is.obj(val);
      default: return _are(arguments, _is.obj);
    }
  };
  // define shorthand
  is.obj = is.object;

  /**
   * Checks if a value(s) is an object or function.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._object = function isObjectOrFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_object');
      case 1:  return _is._obj(val);
      default: return _are(arguments, _is._obj);
    }
  };
  // define shorthand
  is._obj = is._object;

  /**
   * Checks if a value(s) is a function. Note that `vitals.is.function` is not
   *   valid in ES3 and some ES5 browser environments. Use `vitals.is.func` for
   *   browser safety.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'function');
      case 1:  return _is.func(val);
      default: return _are(arguments, _is.func);
    }
  };
  // define shorthand
  is.fn = is.func;
  try {
    is['function'] = is.func;
  }
  catch (error) {}

  /**
   * Checks if a value(s) is an `Array` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.array = function isArray(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'array');
      case 1:  return _is.arr(val);
      default: return _are(arguments, _is.arr);
    }
  };
  // define shorthand
  is.arr = is.array;

  /**
   * Checks if a value(s) is an `Array` or `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is._array = function isArrayOrArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', '_array');
      case 1:  return _is._arr(val);
      default: return _are(arguments, _is._arr);
    }
  };
  // define shorthand
  is._arr = is._array;

  /**
   * Checks if a value(s) is a `RegExp` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.regexp = function isRegExp(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'regexp');
      case 1:  return _is.regex(val);
      default: return _are(arguments, _is.regex);
    }
  };
  // define shorthand
  is.regex = is.regexp;
  is.re = is.regexp;

  /**
   * Checks if a value(s) is a `Date` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'date');
      case 1:  return _is.date(val);
      default: return _are(arguments, _is.date);
    }
  };

  /**
   * Checks if a value(s) is an `Error` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.error = function isError(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'error');
      case 1:  return _is.err(val);
      default: return _are(arguments, _is.err);
    }
  };
  // define shorthand
  is.err = is.error;

  /**
   * Checks if a value(s) is an `Arguments` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'args');
      case 1:  return _is.args(val);
      default: return _are(arguments, _is.args);
    }
  };

  /**
   * Checks if a value(s) is a DOM `Document` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.document = function isDocument(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'document');
      case 1:  return _is.doc(val);
      default: return _are(arguments, _is.doc);
    }
  };
  // define shorthand
  is.doc = is.document;

  /**
   * Checks if a value(s) is a DOM `Element` instance.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  is.element = function isElement(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'element');
      case 1:  return _is.elem(val);
      default: return _are(arguments, _is.elem);
    }
  };
  // define shorthand
  is.elem = is.element;

  /**
   * Checks if a value(s) is considered empty.
   *
   * @public
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ```
   *   0, "", {}, [], null, undefined, false, NaN, function(){...}
   *   ```
   *   Note that for functions this method checks whether it has any defined
   *   params:
   *   ```
   *   function empty(){}
   *   function notEmpty(param){}
   *   ```
   */
  is.empty = function isEmpty(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'empty');
      case 1:  return _is.empty(val);
      default: return _are(arguments, _is.empty);
    }
  };

  /**
   * Checks if a value(s) is [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen).
   *
   * @public
   * @param {...(Object|?function)} val
   * @return {boolean}
   */
  is.frozen = function isFrozen(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'frozen');
      case 1:  return _isFrozen(val);
      default: return _are(arguments, _isFrozen);
    }
  };

  /**
   * Checks if a number(s) is whole (i.e. has no decimal). Zero and non-decimal
   *   negative numbers will return `true`.
   *
   * @public
   * @param {...number} val
   * @return {boolean}
   */
  is.whole = function isWholeNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'whole');
      case 1:  return _isWhole(val);
      default: return _are(arguments, _isWhole);
    }
  };

  /**
   * Checks if a number(s) is odd.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'odd');
      case 1:  return _isOdd(val);
      default: return _are(arguments, _isOdd);
    }
  };

  /**
   * Checks if a number(s) is even.
   *
   * @public
   * @param {...number} val - Each val must be a whole number.
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    switch (arguments.length) {
      case 0:  throw _error('Missing a val', 'even');
      case 1:  return _isEven(val);
      default: return _are(arguments, _isEven);
    }
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ARE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Arguments} vals
   * @param {function} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (i--) {
      if ( !check(vals[i]) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - IS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(Object|?function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( _is.nil(val) ) return false;

    if ( !_is._obj(val) ) throw _error.type('val', 'frozen');

    return _is.frozen(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'whole');

    return _is.whole(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'odd');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'odd');

    return _is.odd(val);
  }

  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !_is.num(val) ) throw _error.type('val', 'even');
    if ( !_is.whole(val) ) throw _error.range('val', 'whole numbers', 'even');

    return _is.even(val);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - CHECKS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array<function>} checks
   * @param {*} val
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVal(checks, val, nullable) {

    /** @type {number} */
    var i;

    i = checks.length;
    while (i--) {
      if ( checks[i](val, nullable) ) return true;
    }
    return false;
  }

  /**
   * @private
   * @param {!Array<function>} checks
   * @param {!Arguments} vals
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVals(checks, vals, nullable) {

    /** @type {number} */
    var i;

    i = vals.length;
    while (--i) {
      if ( !_checkVal(checks, vals[i], nullable) ) return false;
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - TYPES
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!Object<string, function(*, boolean=): boolean>} DataTypes
   */

  /**
   * @private
   * @type {DataTypes}
   */
  var TYPES = (function() {

    /**
     * @type {DataTypes}
     */
    var _types = {};

    /**
     * Adds types to the _types hash map with a check method that evaluates
     *   nullable properties and invokes their type section's method.
     * @private
     * @param {string} section - The category for the types.
     * @param {!Object<string, function(*): boolean>} types - Each type's
     *   "key => value" pair should be expressed as "typeName => checkMethod".
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addTypes(section, types, nullable) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( _own(types, type) ) addType(section, type, types[type], nullable);
      }
      return _types;
    }

    /**
     * Adds type to the _types hash map with a check method that evaluates
     *   nullable properties and invokes its type section's method.
     * @private
     * @param {string} section - The type's category.
     * @param {string} type - The type's name.
     * @param {function(*): boolean} check - The type's check method.
     * @param {boolean=} nullable - The type's default nullable value. Defaults
     *   to true if not set.
     * @return {DataTypes}
     */
    function addType(section, type, check, nullable) {
      check = _own(addType, section) ? addType[section](check) : check;
      nullable = nullable !== false;
      _types['_' + type] = function(val, _nullable) {
        _nullable = _is.bool(_nullable) ? _nullable : nullable;
        return _is.nil(val) ? _nullable : check(val);
      };
      return _types;
    }

    /**
     * Adds the type shortcuts to the _types hash map.
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {DataTypes}
     */
    function addShortcuts(shortcuts) {

      /** @type {string} */
      var shortcut;
      /** @type {string} */
      var type;

      for (shortcut in shortcuts) {
        if( _own(shortcuts, shortcut) ) {
          type = '_' + shortcuts[shortcut];
          shortcut = '_' + shortcut;
          _types[shortcut] = _types[type];
        }
      }
      return _types;
    }

    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the array's values.
     * @return {function(*): boolean} The array type's check method.
     */
    addType.arrays = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(arr) {

        /** @type {number} */
        var i;

        if ( !_is.arr(arr) ) return false;

        i = arr.length;
        while (i--) {
          if ( !eachCheck(arr[i]) ) return false;
        }
        return true;
      };
    };

    /**
     * @private
     * @param {function(*): boolean} eachCheck - The check method for each of
     *   the hash map's properties.
     * @return {function(*): boolean} The hash map type's check method.
     */
    addType.maps = function(eachCheck) {

      /** @type {function(*): boolean} */
      return function check(obj) {

        /** @type {string} */
        var prop;

        if ( !_is.obj(obj) ) return false;

        for (prop in obj) {
          if( _own(obj, prop) && !eachCheck(obj[prop]) ) return false;
        }
        return true;
      };
    };

    _types = addTypes('primitives', {
      'undefined': _is.undefined,
      'boolean':   _is.bool,
      'string':    _is.str,
      'number':    _is.num,
      'nan':       _is.nan
    }, false);
    _types = addType('primitives', 'null', _is.nil);

    _types = addTypes('js_objects', {
      'object': _is.obj,
      'regexp': _is.regex,
      'array':  _is.arr,
      'date':   _is.date,
      'error':  _is.err
    });
    _types = addType('js_objects', 'arguments', _is.args);
    _types = addType('js_objects', 'function', _is.func, false);

    _types = addTypes('dom_objects', {
      'element':  _is.elem,
      'document': _is.doc
    });

    _types = addType('others', 'empty', _is.empty);

    _types = addTypes('arrays', {
      'nulls':     _is.nil,
      'booleans':  _is.bool,
      'strings':   _is.str,
      'numbers':   _is.num,
      'nans':      _is.nan,
      'objects':   _is.obj,
      'functions': _is.func,
      'regexps':   _is.regex,
      'arrays':    _is.arr,
      'dates':     _is.date,
      'errors':    _is.err,
      'elements':  _is.elem,
      'documents': _is.doc
    });

    _types = addTypes('maps', {
      'nullmap':     _is.nil,
      'booleanmap':  _is.bool,
      'stringmap':   _is.str,
      'numbermap':   _is.num,
      'nanmap':      _is.nan,
      'objectmap':   _is.obj,
      'functionmap': _is.func,
      'regexpmap':   _is.regex,
      'arraymap':    _is.arr,
      'datemap':     _is.date,
      'errormap':    _is.err,
      'elementmap':  _is.elem,
      'documentmap': _is.doc
    });

    _types = addShortcuts({
      // primitives
      nil:  'null',
      bool: 'boolean',
      str:  'string',
      num:  'number',

      // js objects
      obj:   'object',
      func:  'function',
      fn:    'function',
      regex: 'regexp',
      re:    'regexp',
      arr:   'array',
      err:   'error',
      args:  'arguments',

      // dom objects
      elem: 'element',
      doc:  'document',

      // arrays
      nils:   'nulls',
      strs:   'strings',
      nums:   'numbers',
      bools:  'booleans',
      objs:   'objects',
      funcs:  'functions',
      fns:    'functions',
      regexs: 'regexps',
      res:    'regexps',
      arrs:   'arrays',
      errs:   'errors',
      elems:  'elements',
      docs:   'documents',

      // maps
      nilmap:   'nullmap',
      strmap:   'stringmap',
      nummap:   'numbermap',
      boolmap:  'booleanmap',
      objmap:   'objectmap',
      funcmap:  'functionmap',
      fnmap:    'functionmap',
      regexmap: 'regexpmap',
      remap:    'regexpmap',
      arrmap:   'arraymap',
      errmap:   'errormap',
      elemmap:  'elementmap',
      docmap:   'documentmap'
    });

    return _types;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!RegExp}
   */
  var ALL_SPECIALS = /[^a-z\|]/g;

  /**
   * @private
   * @type {!Object<string, function(string): boolean>}
   */
  var SPECIALS = (function(pipe, exPoint, quesMark, equals, asterisk) {
    return {
      '|': function(str) { return pipe.test(str);     },
      '!': function(str) { return exPoint.test(str);  },
      '?': function(str) { return quesMark.test(str); },
      '=': function(str) { return equals.test(str);   },
      '*': function(str) { return asterisk.test(str); }
    };
  })(/\|/, /\!/, /\?/, /\=/, /\*|any/);

  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return SPECIALS[special](types);
  }

  /**
   * @private
   * @param {string} types
   * @return {Array<function>}
   */
  function _getChecks(types) {

    /** @type {Array<function>} */
    var checks;
    /** @type {string} */
    var type;
    /** @type {number} */
    var i;

    if ( _hasSpecial('=', types) ) types += '|undefined';

    types = types.toLowerCase();
    types = types.replace(ALL_SPECIALS, '');
    checks = types.split('|');

    i = checks.length;
    while (i--) {
      type = '_' + checks[i];
      if ( !_own(TYPES, type) ) return null;
      checks[i] = TYPES[type];
    }

    return checks.length ? checks : null;
  }

  /**
   * Method checks whether "!" or "?" exists in the types.
   * @private
   * @param {string} types
   * @return {(undefined|boolean)} If undefined no override exists.
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
    override = ensure && negate ? false : ensure || negate;
    return override ? !negate && ensure : undefined;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('is');

  /**
   * @private
   * @type {string}
   */
  var DOCS = 'https://github.com/imaginate/vitals/blob/master/docs/is.js';

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS
  return is;
})();


////////////////////////////////////////////////////////////////////////////////
// COPY
////////////////////////////////////////////////////////////////////////////////

var copy = (function copyPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - copy
  // - copy.object (copy.obj)
  // - copy.array  (copy.arr|copy.args)
  // - copy.regexp (copy.re|copy.regex)
  // - copy.func   (copy.fn|copy.function*)
  //
  // * Note that copy.function will fail in all ES3 browser
  //   environments and even some ES5. Use copy.func for
  //   compatibility with older browser environments.
  //////////////////////////////////////////////////////////

  /**
   * Get a [copy](https://en.wikipedia.org/wiki/Cloning_(programming)) of any
   *   value. Note that for array values [vitals.slice](https://github.com/imaginate/vitals/wiki/vitals.slice)
   *   only copies the indexed properties while [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
   *   copies all of the properties.
   *
   * @public
   * @param {*} val
   * @param {boolean=} deep
   * @return {*}
   */
  function copy(val, deep) {

    if (!arguments.length) throw _error('Missing a val');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return !_is._obj(val)
      ? val
      : _is.func(val)
        ? _copyFunc(val, deep)
        : _is._arr(val)
          ? _copyArr(val, deep)
          : _is.regex(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }

  /**
   * [Clones](https://en.wikipedia.org/wiki/Cloning_(programming)) an object.
   *
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  copy.object = function copyObject(obj, deep) {

    if ( !_is.obj(obj)      ) throw _error.type('obj',  'object');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'object');

    return _copyObj(obj, deep);
  };
  // define shorthand
  copy.obj = copy.object;

  /**
   * [Clones](https://en.wikipedia.org/wiki/Cloning_(programming)) an array.
   *   Note that [vitals.slice.array](https://github.com/imaginate/vitals/wiki/vitals.slice#slicearray)
   *   only copies the indexed properties while [vitals.copy.array](https://github.com/imaginate/vitals/wiki/vitals.copy#copyarray)
   *   copies all of the properties.
   *
   * @public
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  copy.array = function copyArray(obj, deep) {

    if ( !_is.obj(obj)        ) throw _error.type('obj',        'array');
    if ( !_is.num(obj.length) ) throw _error.type('obj.length', 'array');
    if ( !_is.un.bool(deep)   ) throw _error.type('deep',       'array');

    return _copyArr(obj, deep);
  };
  // define shorthand
  copy.arr = copy.array;
  copy.args = copy.array;

  /**
   * [Clones](https://en.wikipedia.org/wiki/Cloning_(programming)) a `RegExp`.
   *
   * @public
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  copy.regexp = function copyRegexp(regex, forceGlobal) {

    if ( !_is.regex(regex)         ) throw _error.type('regex',       'regexp');
    if ( !_is.un.bool(forceGlobal) ) throw _error.type('forceGlobal', 'regexp');

    return _copyRegex(regex, forceGlobal);
  };
  // define shorthand
  copy.re = copy.regexp;
  copy.regex = copy.regexp;

  /**
   * [Clones](https://en.wikipedia.org/wiki/Cloning_(programming)) a function
   *   (i.e. creates a new function with all properties from the old function).
   *   Note that the copied function's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   will be set to `0`. Also note that `vitals.copy.function` is not valid in
   *   ES3 and some ES5 browser environments. Use `vitals.copy.func` for browser
   *   safety.
   *
   * @public
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  copy.func = function copyFunction(func, deep) {

    if ( !_is.func(func)    ) throw _error.type('func', 'function');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'function');

    return _copyFunc(func, deep);
  };
  // define shorthand
  try {
    copy.fn = copy.func;
    copy.function = copy.func;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep ? _mergeDeep({}, obj) : _merge({}, obj);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {boolean=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new Array(obj.length);
    return deep ? _mergeDeep(arr, obj) : _merge(arr, obj);
  }

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {!RegExp}
   */
  function _copyRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex.source);
    flags = _setupFlags(regex, forceGlobal);

    return flags ? new RegExp(source, flags) : new RegExp(source);
  }

  /**
   * @private
   * @param {function} func
   * @param {boolean=} deep
   * @return {function}
   */
  function _copyFunc(func, deep) {

    /** @type {function} */
    var copiedFunc;

    copiedFunc = function copiedFunction() {
      return func.apply(null, arguments);
    };
    return deep ? _mergeDeep(copiedFunc, func) : _merge(copiedFunc, func);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - COPY.REGEXP
  //////////////////////////////////////////////////////////

  /**
   * Returns a properly escaped RegExp.prototype.source.
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern = /\n/.source !== '\\n' ? /\\/g : null;

    return pattern
      ? function _escape(source) { return source.replace(pattern, '\\\\'); }
      : function _escape(source) { return source; };
  })();

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var FLAGS = _merge({
    ignoreCase: 'i',
    multiline:  'm',
    global:     'g'
  }, 'sticky' in RegExp.prototype ? { sticky: 'y' } : null);

  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in FLAGS) {
      if ( _own(FLAGS, key) && regex[key] ) {
        flags += FLAGS[key];
      }
    }

    if ( _is.undefined(forceGlobal) ) return flags;

    return _inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags.replace('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} source
   * @return {!(Object|function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) ) {
        dest[key] = copy(source[key], true);
      }
    }
    return dest;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('copy');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR COPY
  return copy;
})();


////////////////////////////////////////////////////////////////////////////////
// CUT
////////////////////////////////////////////////////////////////////////////////

var cut = (function cutPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - cut
  // - cut.property   (cut.prop)
  // - cut.key
  // - cut.index      (cut.i)
  // - cut.type
  // - cut.value      (cut.val)
  // - cut.pattern
  // - cut.properties (cut.props)
  // - cut.keys
  // - cut.indexes    (cut.ii)
  // - cut.values     (cut.vals)
  // - cut.patterns
  //////////////////////////////////////////////////////////

  /**
   * Removes properties from an object/array or substring patterns from a string
   *   and returns the amended source.
   *
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *   - object source:
   *     -- leading val is RegExp: This method will delete all properties with
   *       keys that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       each val. If any following vals are not a RegExp they are converted
   *       to a string.
   *     -- leading val is string: This method will delete all properties where
   *       `key === val`. All vals are converted to a string.
   *     -- leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is deleted). It has the
   *       optional params - value, key, source. Note this method lazily clones
   *       the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will delete all properties where
   *       `value === val`.
   *   - array source:
   *     -- all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *     -- leading val is function: The val is considered a filter function
   *       (i.e. if it returns false the property is spliced from the source).
   *       It has the optional params - value, index, source. Note this method
   *       lazily clones the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   *   - string source: All vals that are not a RegExp or string are converted
   *       to a string. Each matching substring is removed from the source.
   * @param {Object=} thisArg - If source is an object/array, val is a filter
   *   function, and thisArg is defined the filter is bound to its value.
   * @return {!(Object|function|Array|string)} The amended source.
   */
  function cut(source, vals, thisArg) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( _is.str(source) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return _is.arr(vals)
        ? _cutPatterns(source, vals)
        : _cutPattern(source, vals);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    source = _is.args(source) ? _sliceArr(source) : source;

    if ( _is.func(vals) ) {
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');
      return _is.arr(source)
        ? _filterArr(source, vals, thisArg)
        : _filterObj(source, vals, thisArg);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  }

  /**
   * Removes a property from an object/array and returns the object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val - The details are as follows (per source type):
   *   - object source:
   *     -- val is RegExp: This method will delete all properties with a key
   *       that [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       the val.
   *     -- val is string: This method will delete all properties where
   *       `key === val`.
   *     -- val is function: The val is considered a filter function (i.e. if it
   *       returns false the property is deleted). It has the optional params -
   *       value, key, source. Note this method lazily clones the source based
   *       on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will delete all properties where
   *       `value === val`.
   *   - array source:
   *     -- val is number: This method will splice the index from the source.
   *     -- val is function: The val is considered a filter function (i.e. if it
   *       returns false the property is spliced from the source). It has the
   *       optional params - value, index, source. Note this method lazily
   *       clones the source based on the filter's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *       (i.e. if you alter the source object within the filter ensure to
   *       define the filter's third param so you can safely assume all
   *       references to the source are its original values).
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   * @param {Object=} thisArg - If val is a filter function and thisArg is
   *   defined the filter is bound to its value.
   * @return {!(Object|function|Array)}
   */
  cut.property = function cutProperty(source, val, thisArg) {

    if ( !_is._obj(source) ) throw _error.type('source', 'property');
    if (arguments.length < 2) throw _error('No val defined', 'property');

    source = _is.args(source) ? _sliceArr(source) : source;

    if ( _is.func(val) ) {
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg', 'property');
      return _is.arr(source)
        ? _filterArr(source, val, thisArg)
        : _filterObj(source, val, thisArg);
    }

    return _cutProp(source, val);
  };
  // define shorthand
  cut.prop = cut.property;

  /**
   * Removes a property by key from an object and returns the object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {*} key - If the key is not a string it is converted to a string.
   *   If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.key = function cutKey(source, key) {

    if ( !_is._obj(source) ) throw _error.type('source', 'key');
    if (arguments.length < 2) throw _error('No key defined', 'key');

    return _cutKey(source, key);
  };

  /**
   * Removes a property by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before removing the property.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {number} index - The index to remove.
   * @param {number=} toIndex - If defined all indexes from index to toIndex
   *   (not including toIndex) are removed.
   * @return {!Array}
   */
  cut.index = function cutIndex(source, index, toIndex) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'index');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'index');
    if ( !_is.num(index)         ) throw _error.type('index',         'index');
    if ( !_is.un.num(toIndex)    ) throw _error.type('toIndex',       'index');

    source = _is.arr(source) ? source : _sliceArr(source);
    return _cutIndex(source, index, toIndex);
  };
  // define shorthand
  cut.i = cut.index;

  /**
   * Removes all properties from an object/array with a value that matches a
   *   given type and returns the object. This method uses [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   to complete type checks.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {string} type - The type to check for. Refer to [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   for acceptable options.
   * @return {!(Object|function|Array)}
   */
  cut.type = function cutType(source, type) {

    if ( !_is._obj(source) ) throw _error.type('source', 'type');
    if ( !_is.str(type)    ) throw _error.type('type',   'type');

    try {
      is(type, '_');
    }
    catch (err) {
      throw new RangeError(
        'Invalid type value for vitals.cut.type call. ' +
        'See error from are: ' + err.toString()
      );
    }

    source = _is.args(source) ? _sliceArr(source) : source;
    return _cutType(source, type);
  };

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  cut.value = function cutValue(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = _is.args(source) ? _sliceArr(source) : source;
    return _cutVal(source, val);
  };
  // define shorthand
  cut.val = cut.value;

  /**
   * Removes a pattern from a string and returns the amended string.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - If pattern is not a string or RegExp it is converted
   *   to a string.
   * @return {string}
   */
  cut.pattern = function cutPattern(source, pattern) {

    if ( !_is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _cutPattern(source, pattern);
  };

  /**
   * Removes properties from an object/array and returns the object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals. Details are as follows (per source type):
   *   - object source:
   *     -- leading val is RegExp: This method will delete all properties with
   *       keys that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *       each val. If any following vals are not a RegExp they are converted
   *       to a string.
   *     -- leading val is string: This method will delete all properties where
   *       `key === val`. All vals are converted to a string.
   *     -- all other cases: This method will delete all properties where
   *       `value === val`. 
   *   - array source:
   *     -- all vals are numbers: This method will splice from the source each
   *       corresponding index.
   *     -- all other cases: This method will splice from the source all
   *       properties where `value === val`.
   * @return {!(Object|function|Array)}
   */
  cut.properties = function cutProperties(source, vals) {

    if ( !_is._obj(source) ) throw _error.type('source', 'properties');
    if (arguments.length < 2) throw _error('No val defined', 'properties');

    source = _is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutProps(source, vals) : _cutProp(source, vals);
  };
  // define shorthand
  cut.props = cut.properties;

  /**
   * Removes properties by key from an object and returns the object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {...*} keys - If only one key is provided and it is an array it is
   *   considered an array of keys. If a key is not a string it is converted to
   *   a string. If the key exists in the source object it is deleted.
   * @return {!(Object|function)}
   */
  cut.keys = function cutKeys(source, keys) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys');
    if (arguments.length < 2) throw _error('No key defined', 'keys');

    keys = arguments.length > 2 ? _sliceArr(arguments, 1) : keys;
    return _is.arr(keys) ? _cutKeys(source, keys) : _cutKey(source, keys);
  };

  /**
   * Removes properties by index from an array and returns the array. If an
   *   array-like object is supplied it is sliced before completing the cut.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...number} indexes - If only one index is provided and it is an
   *   array it is considered an array of indexes. The indexes to remove.
   * @return {!Array}
   */
  cut.indexes = function cutIndexes(source, indexes) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'indexes');
    if (arguments.length < 2) throw _error('No index defined', 'indexes');

    source = _is.arr(source) ? source : _sliceArr(source);
    indexes = arguments.length > 2 ? _sliceArr(arguments, 1) : indexes;

    if ( !_is.arr(indexes) ) {
      if ( !_is.num(indexes) ) throw _error.type('index', 'indexes');
      return _cutIndex(source, indexes);
    }

    if ( !is('!nums', indexes) ) throw _error.type('index', 'indexes');

    return _cutIndexes(source, indexes);
  };
  // define shorthand
  cut.ii = cut.indexes;

  /**
   * Removes all properties from an object/array with a value and returns the
   *   object.
   *
   * @public
   * @param {!(Object|function|Array)} source
   * @param {...*} vals - If only one val is provided and it is an array it is
   *   considered an array of vals.
   * @return {!(Object|function|Array)}
   */
  cut.values = function cutValues(source, vals) {

    if ( !_is._obj(source) ) throw _error.type('source', 'value');
    if (arguments.length < 2) throw _error('No val defined', 'value');

    source = _is.args(source) ? _sliceArr(source) : source;
    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _cutVals(source, vals) : _cutVal(source, vals);
  };
  // define shorthand
  cut.vals = cut.values;

  /**
   * Removes patterns from a string and returns the amended string.
   *
   * @public
   * @param {string} source
   * @param {...*} patterns - If only one pattern is provided and it is an array
   *   it is considered an array of patterns. If a pattern is not a string or
   *   RegExp it is converted to a string.
   * @return {string}
   */
  cut.patterns = function cutPatterns(source, patterns) {

    if ( !_is.str(source) ) throw _error.type('source', 'patterns');
    if (arguments.length < 2) throw _error('No pattern defined', 'patterns');

    patterns = arguments.length > 2 ? _sliceArr(arguments, 1) : patterns;
    return _is.arr(patterns)
      ? _cutPatterns(source, patterns)
      : _cutPattern(source, patterns);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutProp(source, val) {
    return _is.arr(source)
      ? _is.num(val)
        ? _spliceKey(source, val)
        : _spliceVal(source, val)
      : is('!str|regex', val)
        ? _deleteKey(source, val)
        : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutProps(source, vals) {
    return _is.arr(source)
      ? is('nums', vals)
        ? _spliceKeys(source, vals)
        : _spliceVals(source, vals)
      : is('!str|regex', vals[0])
        ? _deleteKeys(source, vals)
        : _deleteVals(source, vals);
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @return {!(Object|function)}
   */
  function _cutKey(source, key) {
    delete source[key];
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _cutKeys(source, keys) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) delete source[ keys[i] ];
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

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key >= len) return source;

    if ( _is.undefined(toKey) ) {
      if (key < 0) return source;
      source.splice(key, 1);
      return source;
    }

    key = key < 0 ? 0 : key;
    toKey = toKey > len
      ? len
      : toKey < 0
        ? len + toKey
        : toKey;

    if (key >= toKey) return source;

    source.splice(key, toKey - key);
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
   * @param {!(Object|function|Array)} source
   * @param {string} type
   * @return {!(Object|function|Array)}
   */
  function _cutType(source, type) {
    return _is.arr(source)
      ? _spliceValByType(source, type)
      : _deleteValByType(source, type);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {*} val
   * @return {!(Object|function|Array)}
   */
  function _cutVal(source, val) {
    return _is.arr(source) ? _spliceVal(source, val) : _deleteVal(source, val);
  }

  /**
   * @private
   * @param {!(Object|function|Array)} source
   * @param {!Array<*>} vals
   * @return {!(Object|function|Array)}
   */
  function _cutVals(source, vals) {
    return _is.arr(source)
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
    if ( !_is.regex(pattern) ) {
      pattern = String(pattern);
      pattern = _escape(pattern);
      pattern = new RegExp(pattern, 'g');
    }
    return source.replace(pattern, '');
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

    len = patterns.length;
    i = -1;
    while (++i < len) {
      source = _cutPattern(source, patterns[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DELETE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @param {boolean=} match
   * @return {!(Object|function)}
   */
  function _deleteKey(source, key, match) {

    /** @type {!RegExp} */
    var pattern;

    match = _is.undefined(match) ? _is.regex(key) : match;

    if (!match) {
      if ( _own(source, key) ) delete source[key];
      return source;
    }

    pattern = key;
    for (key in source) {
      if ( _own(source, key) && _match(key, pattern) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} keys
   * @return {!(Object|function)}
   */
  function _deleteKeys(source, keys) {

    /** @type {boolean} */
    var match;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    match = _is.regex( keys[0] );
    len = keys.length;
    i = -1;
    while (++i < len) {
      source = _deleteKey(source, keys[i], match);
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _deleteVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && source[key] === val ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {string} type
   * @return {!(Object|function)}
   */
  function _deleteValByType(source, type) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && is(type, source[key]) ) {
        delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {!Array} vals
   * @return {!(Object|function)}
   */
  function _deleteVals(source, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      source = _deleteVal(source, vals[i]);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SPLICE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Array} source
   * @param {number} key
   * @return {!Array}
   */
  function _spliceKey(source, key) {

    /** @type {number} */
    var len;

    len = source.length;
    key = key < 0 ? len + key : key;

    if (key < 0 || key >= len) return source;

    source.splice(key, 1);
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {!Array<number>} keys
   * @return {!Array}
   */
  function _spliceKeys(source, keys) {

    /** @type {!Object} */
    var sorted;
    /** @type {number} */
    var first;
    /** @type {number} */
    var count;
    /** @type {number} */
    var i;

    if (!source.length || !keys.length) return source;

    if (keys.length < 2) return _spliceKey(source, keys[0]);

    sorted = _sortIndexes(keys, source.length);
    i = sorted.first.length;
    while (i--) {
      first = sorted.first[i];
      count = sorted.last[i] - first + 1;
      source.splice(first, count);
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

    i = source.length;
    while (i--) {
      if (source[i] === val) source.splice(i, 1);
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

    i = source.length;
    while (i--) {
      if ( is(type, source[i]) ) source.splice(i, 1);
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

    len = vals.length;
    i = source.length;
    while (i--) {
      val = source[i];
      ii = len;
      while (ii--) {
        if (vals[ii] === val) {
          source.splice(i, 1);
          break;
        }
      }
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - FILTER
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _filterObj(source, filter, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    filter = _is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    obj = filter.length > 2 ? copy(source) : source;
    switch (filter.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) && !filter() ) delete source[key];
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key]) ) delete source[key];
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key], key) ) delete source[key];
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) && !filter(obj[key], key, obj) ) delete source[key];
      }
    }
    return source;
  }

  /**
   * @private
   * @param {!Array} source
   * @param {function} filter
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _filterArr(source, filter, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var i;

    filter = _is.undefined(thisArg) ? filter : _bind(filter, thisArg);
    arr = filter.length > 2 ? copy.arr(source) : source;
    i = arr.length;
    switch (filter.length) {
      case 0:  while (i--) filter() || source.splice(i, 1);              break;
      case 1:  while (i--) filter(arr[i]) || source.splice(i, 1);        break;
      case 2:  while (i--) filter(arr[i], i) || source.splice(i, 1);     break;
      default: while (i--) filter(arr[i], i, arr) || source.splice(i, 1);
    }
    return source;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - SORT
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   first: !Array<number>,
   *   last:  !Array<number>
   * }} SortedIndexes
   */

  /**
   * @private
   * @param {!Array<number>} indexes
   * @param {number} sourceLen
   * @return {!SortedIndexes}
   */
  var _sortIndexes = (function() {

    /**
     * @private
     * @param {!Array<number>} indexes
     * @param {number} sourceLen
     * @return {!SortedIndexes}
     */
    function sortIndexes(indexes, sourceLen) {

      /** @type {number} */
      var index;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      setup();

      len = indexes.length;
      i = 0;

      // push 1st index
      index = parse(indexes[i], sourceLen);
      while (index === -1 && ++i < len) {
        index = parse(indexes[i], sourceLen);
      }
      push(index);

      // push remaining indexes
      while (++i < len) {
        index = parse(indexes[i], sourceLen);
        if (index !== -1) sort(index, 0, last.length);
      }

      return result();
    }

    //////////////////////////////
    // SORT MEMBERS
    // - FIRST
    // - LAST

    /** @type {!Array<number>} */
    var first;
    /** @type {!Array<number>} */
    var last;

    //////////////////////////////
    // SORT METHODS
    // - SETUP
    // - RESULT
    // - PARSE
    // - PUSH
    // - UNSHIFT
    // - INSERT
    // - REMOVE
    // - SORT
    // - COMPARE PREV
    // - COMPARE NEXT

    /**
     * @private
     * @type {function}
     */
    function setup() {
      first = [];
      last  = [];
    }

    /**
     * @private
     * @return {!SortedIndexes}
     */
    function result() {
      return {
        first: first,
        last:  last
      };
    }

    /**
     * @private
     * @param {number} index
     * @param {number} len
     * @return {number} If invalid index is given -1 is returned.
     */
    function parse(index, len) {
      index = index < 0 ? len + index : index;
      return index < 0 || index >= len ? -1 : index;
    }

    /**
     * @private
     * @param {number} index
     */
    function push(index) {
      first.push(index);
      last.push(index);
    }

    /**
     * @private
     * @param {number} index
     */
    function unshift(index) {
      first.unshift(index);
      last.unshift(index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function insert(index, pos) {
      first.splice(pos, 0, index);
      last.splice(pos, 0, index);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} pos
     */
    function remove(pos) {
      first.splice(pos, 1);
      last.splice(pos, 1);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} right
     */
    function sort(index, left, right) {

      /** @type {number} */
      var mid;
      /** @type {number} */
      var min;

      mid = (left + right) >>> 1;
      min = first[mid];
      if (index < min) comparePrev(index, left, mid);
      else if (index > last[mid]) compareNext(index, mid, right);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} left
     * @param {number} mid
     */
    function comparePrev(index, left, mid) {

      /** @type {number} */
      var prev;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      min = first[mid];
      if (!mid) {
        if (index === --min) first[mid] = index;
        else unshift(index);
        return;
      }
      prev = mid - 1;
      max = last[prev];
      if (index === --min) {
        if (index === ++max) {
          last[prev] = last[mid];
          remove(mid);
        }
        else first[mid] = index;
      }
      else if (index > max) {
        if (index === ++max) last[prev] = index;
        else insert(index, mid);
      }
      else sort(index, left, prev);
    }

    /**
     * @private
     * @param {number} index
     * @param {number} mid
     * @param {number} right
     */
    function compareNext(index, mid, right) {

      /** @type {number} */
      var next;
      /** @type {number} */
      var min;
      /** @type {number} */
      var max;

      next = mid + 1;
      max = last[mid];
      if (next === last.length) {
        if (index === ++max) last[mid] = index;
        else push(index);
        return;
      }
      min = first[next];
      if (index === ++max) {
        if (index === --min) {
          last[mid] = last[next];
          remove(next);
        }
        else last[mid] = index;
      }
      else if (index < min) {
        if (index === --min) first[next] = index;
        else insert(index, next);
      }
      else sort(index, next, right);
    }

    // END OF INDEX SORT PRIVATE SCOPE
    return sortIndexes;
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function filter() { return func.call(thisArg); };
      case 1:
      return function filter(val) { return func.call(thisArg, val); };
      case 2:
      return function filter(val, key) { return func.call(thisArg, val, key); };
    }
    return function filter(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('cut');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CUT
  return cut;
})();


////////////////////////////////////////////////////////////////////////////////
// EACH
////////////////////////////////////////////////////////////////////////////////

var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps, arrays, or cycles.
   *
   * @public
   * @param {!(Object|function|Array|number|string)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   *   - string source: Converted to an array source using one of the following
   *     list of values for the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {(Object|function|Array|undefined)}
   */
  function each(source, iteratee, thisArg) {

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    if ( _is.num(source) ) return _eachCycle(source, iteratee, thisArg);

    if ( _is.str(source) ) source = _splitKeys(source);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function)}
   */
  each.object = function eachObject(source, iteratee, thisArg) {

    if ( !_is._obj(source)        ) throw _error.type('source',   'object');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'object');

    return _eachObj(source, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for iterating over array-like objects.
   *
   * @public
   * @param {!(Object|function|string)} source - If source is a string it is
   *   converted to an array using one of the following list of values for the
   *   separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function|Array)}
   */
  each.array = function eachArray(source, iteratee, thisArg) {

    if ( _is.str(source) ) source = _splitKeys(source);

    if ( !_is._obj(source)        ) throw _error.type('source',        'array');
    if ( !_is.num(source.length)  ) throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee',      'array');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',       'array');

    return _eachArr(source, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /**
   * A shortcut for iterating over a set number of cycles.
   *
   * @public
   * @param {number} count
   * @param {function(number=)} iteratee
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   */
  each.cycle = function eachCycle(count, iteratee, thisArg) {

    if ( !_is.num(count)          ) throw _error.type('count',    'cycle');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'cycle');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'cycle');

    return _eachCycle(count, iteratee, thisArg);
  };
  // define shorthand
  each.time = each.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: for (key in obj) _own(obj, key) && iteratee();              break;
      case 1: for (key in obj) _own(obj, key) && iteratee(obj[key]);      break;
      case 2: for (key in obj) _own(obj, key) && iteratee(obj[key], key); break;
     default: for (key in obj) _own(obj, key) && iteratee(obj[key], key, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) iteratee();              break;
      case 1:  while (++i < len) iteratee(obj[i]);        break;
      case 2:  while (++i < len) iteratee(obj[i], i);     break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   */
  function _eachCycle(count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) iteratee(i++);
    }
    else {
      while(count--) iteratee();
    }
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('each');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


////////////////////////////////////////////////////////////////////////////////
// FILL
////////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fill
  // - fill.object (fill.obj)
  // - fill.array  (fill.arr)
  // - fill.string (fill.str)
  //////////////////////////////////////////////////////////

  /**
   * Fills an array, object, or string with specified values.
   *
   * @public
   * @param {?(Array|Object|function|number)} source - If source is a number
   *   returns a new string filled with the value x times.
   * @param {(!Array|string)=} keys - Only use with an object/function source.
   *   If defined it is considered an array of keys that will limit the fill
   *   action. If a string is defined it is converted to an array using one of
   *   the values in the following list for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val - The value to fill the array, object, or string with.
   * @param {number=} start - [default= 0] Only for use with source arrays.
   * @param {number=} end - [default= source.length] Only for use with source
   *   arrays.
   * @return {?(Array|Object|function|string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( _is.nil(source) ) return null;

    if ( _is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    if ( _is.arr(source) ) {
      end = start;
      start = val;
      val = keys;
      if ( !_is.un.num(start) ) throw _error.type('start');
      if ( !_is.un.num(end)   ) throw _error.type('end');
      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      keys = _is.str(keys) ? _splitKeys(keys) : keys;
      if ( !_is.arr(keys) ) throw _error.type('keys');
      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  }

  /**
   * Fills an existing object/function with specified keys and values.
   *
   * @public
   * @param {(!Object|function)} obj
   * @param {(!Array|string)=} keys - If defined it is considered an array of
   *   keys that will limit the fill action. If a string is defined it is
   *   converted to an array using one of the values in the following list for
   *   the separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   * @return {(!Object|function)}
   */
  fill.object = function fillObject(obj, keys, val) {

    if ( !_is._obj(obj) ) throw _error.type('obj', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      keys = _is.str(keys) ? _splitKeys(keys) : keys;
      if ( !_is.arr(keys) ) throw _error.type('keys', 'object');
      return _fillKeys(obj, keys, val);
    }

    val = keys;
    return _fillObj(obj, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills an existing or new array with specified values.
   *
   * @public
   * @param {(!Array|number)} arr - If number makes new array with arr length.
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  fill.array = function fillArray(arr, val, start, end) {

    arr = _is.num(arr) ? new Array(arr) : arr;

    if (arguments.length < 2) throw _error('No val defined', 'array');

    if ( !_is.arr(arr)      ) throw _error.type('arr',   'array');
    if ( !_is.un.num(start) ) throw _error.type('start', 'array');
    if ( !_is.un.num(end)   ) throw _error.type('end',   'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /**
   * Fills a new string with specified values.
   *
   * @public
   * @param {number} count
   * @param {*} val - All val types are converted to string via `String(val)`.
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !_is.num(count) ) throw _error.type('count', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        obj[key] = val;
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len) {
      obj[ keys[i] ] = val;
    }
    return obj;
  }

  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr.length;
    start = start || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;
    end = end || len;
    end = end > len
      ? len : end < 0
        ? len + end : end;

    if (start >= end) return arr;

    i = start - 1;
    while (++i < end) {
      arr[i] = val;
    }
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

    count = count < 0 ? 0 : count;

    if (!count) return '';

    val = String(val);
    str = '';
    while (count--) {
      str += val;
    }
    return str;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fill');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


////////////////////////////////////////////////////////////////////////////////
// FUSE
////////////////////////////////////////////////////////////////////////////////

var fuse = (function fusePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fuse
  // - fuse.value       (fuse.val)
  // - fuse.value.start (fuse.value.top)
  // - fuse.object      (fuse.obj)
  // - fuse.array       (fuse.arr)
  // - fuse.string      (fuse.str)
  //////////////////////////////////////////////////////////

  /**
   * Merges objects, concatenates arrays, appends properties, and combines
   *   strings.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - All rules occur in order of appearance. For object and
   *   array dest types `null` is skipped. Remaining details per dest type:
   *   - object: If only one val is provided and it is an array it is considered
   *     an array of vals. Object vals are merged with the dest. All other
   *     values are converted to strings and appended as new keys (if the key
   *     exists on the dest the property's value is replaced with undefined).
   *   - array: Array vals are concatenated to the dest. All other values are
   *     pushed to the dest.
   *   - string: If only one val is provided and it is an array it is considered
   *     an array of vals. All non-string vals are converted to strings and
   *     appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  function fuse(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( _is.str(dest) ) {
      vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
      return _is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest');

    dest = _is.args(dest) ? _sliceArr(dest) : dest;

    if ( _is.arr(dest) ) {
      if (arguments.length > 2) {
        vals = _sliceArr(arguments, 1);
        return _fuseArrs(dest, vals);
      }
      return _fuseArr(dest, vals);
    }

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  }

  /**
   * Appends properties and combines strings.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value is replaced with
   *     undefined).
   *   - array: All vals are pushed to the dest.
   *   - string: All vals are converted to strings and appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value = function fuseValue(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( _is.str(dest) ) {
      if (arguments.length < 3) return _fuseStr(dest, vals);
      vals = _sliceArr(arguments, 1);
      return _fuseStrs(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest', 'value');

    dest = _is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return _is.arr(dest) ? _fuseArrVal(dest, vals) : _fuseObjVal(dest, vals);
    }

    vals = _sliceArr(arguments, 1);
    return _is.arr(dest) ? _fuseArrsVal(dest, vals) : _fuseObjsVal(dest, vals);
  };
  // define shorthand
  fuse.val = fuse.value;

  /**
   * Appends properties and combines strings to the start of their destination.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value remains unchanged).
   *   - array: All vals are unshifted to the dest.
   *   - string: All vals are converted to strings and appended to the beginning
   *     of the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value.start = function fuseValueStart(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value.start');

    if ( _is.str(dest) ) {
      if (arguments.length < 3) return _fuseStrTop(dest, vals);
      vals = _sliceArr(arguments, 1);
      return _fuseStrsTop(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest', 'value.start');

    dest = _is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return _is.arr(dest)
        ? _fuseArrValTop(dest, vals)
        : _fuseObjValTop(dest, vals);
    }

    vals = _sliceArr(arguments, 1);
    return _is.arr(dest)
      ? _fuseArrsValTop(dest, vals)
      : _fuseObjsValTop(dest, vals);
  };
  // define shorthand
  fuse.val.start = fuse.value.start;
  fuse.value.top = fuse.value.start;
  fuse.val.top = fuse.value.start;

  /**
   * Appends properties/keys to an object.
   *
   * @public
   * @param {!(Object|function)} dest
   * @param {...*} vals - Any vals that are `null` are skipped. All other vals
   *   that are not objects are converted to a string and appended as new keys
   *   (if the key exists on the dest the key's value is replaced with
   *   undefined). If only one val is provided and it is an array then it is
   *   considered an array of vals. All object vals are merged with the dest
   *   (if the key exists on the dest the key's value is with replaced with the
   *   value from the merged object).
   * @return {!(Object|function)}
   */
  fuse.object = function fuseObject(dest, vals) {

    if ( !_is._obj(dest) ) throw _error.type('dest', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /**
   * Appends values to an array and concatenates arrays.
   *
   * @public
   * @param {!Array} dest
   * @param {...*} vals - Details per val type:
   *   - null:  All null vals are skipped.
   *   - array: All array vals are concatenated to the dest.
   *   - other: All other vals are pushed to the dest array.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, vals) {

    if ( !_is._arr(dest) ) throw _error.type('dest', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');

    dest = _is.args(dest) ? _sliceArr(dest) : dest;

    if (arguments.length > 2) {
      vals = _sliceArr(arguments, 1);
      return _fuseArrs(dest, vals);
    }

    return _fuseArr(dest, vals);
  };
  // define shorthand
  fuse.arr = fuse.array;

  /**
   * Appends strings to a string.
   *
   * @public
   * @param {string} dest
   * @param {...*} vals - All non-string vals are converted to strings.
   * @return {string}
   */
  fuse.string = function fuseString(dest, vals) {

    if ( !_is.str(dest) ) throw _error.type('dest', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    vals = arguments.length > 2 ? _sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
  };
  // define shorthand
  fuse.str = fuse.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObj(dest, val) {
    if ( _is._obj(val) ) return _merge(dest, val);
    if ( !_is.nil(val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObj(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjVal(dest, val) {
    dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsVal(dest, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      val = vals[i];
      dest[val] = undefined;
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjValTop(dest, val) {
    if ( !_own(dest, val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObjValTop(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {
    if ( _is.arr(val) ) return dest.concat(val);
    if ( !_is.nil(val) ) dest.push(val);
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

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseArr(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrVal(dest, val) {
    dest.push(val);
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

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.push( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrValTop(dest, val) {
    dest.unshift(val);
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

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.unshift( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + val;
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

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest += vals[i];
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStrTop(dest, val) {
    return val + dest;
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

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = vals[i] + dest;
    }
    return dest;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('fuse');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FUSE
  return fuse;
})();


////////////////////////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////////////////////////

var get = (function getPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - get
  // - get.keys
  // - get.keys.byKey
  // - get.keys.byValue (get.keys.byVal)
  // - get.indexes      (get.ii)
  // - get.values       (get.vals)
  //////////////////////////////////////////////////////////

  /**
   * Gets keys, indexes, values, or substrings from an object, array, or string.
   *
   * @public
   * @param {!(Object|function|Array|string)} source - If no val param is
   *   defined this method will return the following values (per source type):
   *   - object: array of own keys
   *   - array:  array of indexes
   *   - string: an error (i.e. a val is required for string sources)
   * @param {*=} val - For a `RegExp` val and object/string source this method
   *   will return the following values (per source type):
   *   - object: an array of source values where the key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   - string: an array of substrings that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   Otherwise this method will return the following values (per source type):
   *   - object: an array of source keys where the `value === val`
   *   - array:  an array of source indexes where the `value === val`
   *   - string: an array of starting indexes where `substring === String(val)`
   * @return {!Array}
   */
  function get(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined');
      return _is.regex(val) ? _strVals(source, val) : _strIndexes(source, val);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    return arguments.length < 2
      ? _is._arr(source)
        ? _allIndexes(source)
        : _allKeys(source)
      : _is._arr(source)
        ? _byValIndexes(source, val)
        : _is.regex(val)
          ? _byKeyObjVals(source, val)
          : _byValKeys(source, val);
  }

  /**
   * Gets an array of keys from an object.
   *
   * @public
   * @param {(!Object|function)} source - If no val param is defined this method
   *   will return an array of all an object's own keys.
   * @param {*=} val - This method will return an array of source keys where the
   *   key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *   the val if the val is a `RegExp`. Otherwise this method will return an
   *   array of source keys where the `value === String(val)`.
   * @return {!Array}
   */
  get.keys = function getKeys(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys');

    return arguments.length < 2
      ? _allKeys(source)
      : _is.regex(val)
        ? _byKeyKeys(source, val)
        : _byValKeys(source, val);
  };

  /**
   * Gets an array of keys from an object that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *   a pattern.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} pattern - If pattern is not a `RegExp` or string it is converted
   *   to a string.
   * @return {!Array<string>}
   */
  get.keys.byKey = function getKeysByKey(source, pattern) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys.byKey');
    if (arguments.length < 2) throw _error('No pattern defined', 'keys.byKey');

    return _byKeyKeys(source, pattern);
  };

  /**
   * Gets an array of keys from an object where the `value === val`.
   *
   * @public
   * @param {(!Object|function)} source
   * @param {*} val
   * @return {!Array}
   */
  get.keys.byValue = function getKeysByValue(source, val) {

    if ( !_is._obj(source) ) throw _error.type('source', 'keys.byValue');
    if (arguments.length < 2) throw _error('No val defined', 'keys.byValue');

    return _byValKeys(source, val);
  };
  // define shorthand
  get.keys.byVal = get.keys.byValue;

  /**
   * Gets an array of indexes from an array or string by value/pattern.
   *
   * @public
   * @param {(!Object|string)} source - If no val param is defined this method
   *   will return an array of all an array's indexes or throw an error if the
   *   source is a string.
   * @param {*=} val - This method returns the indexes by one of the following
   *   (per source type):
   *   - array:  Return an array of indexes where the `value === val`.
   *   - string: A non-regex val is converted to a string and then an array of
   *     starting indexes that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val are returned.
   * @return {!Array}
   */
  get.indexes = function getIndexes(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'indexes');
      return _strIndexes(source, val);
    }

    if ( !_is._obj(source)       ) throw _error.type('source',        'indexes');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'indexes');

    return arguments.length < 2
      ? _allIndexes(source)
      : _byValIndexes(source, val);
  };
  // define shorthand
  get.ii = get.indexes;

  /**
   * Gets an array of values/substrings from an object or string.
   *
   * @public
   * @param {(!Object|function|string)} source - If no val param is defined this
   *   method will return an array of all the object's values or an error if the
   *   source is a string.
   * @param {*=} val - If the val is not a `RegExp` or string it is converted to
   *   a string. This method will return the following values (per source type):
   *   - object: an array of source values where the key [matches](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   *   - string: an array of substrings that [match](https://github.com/imaginate/vitals/wiki/vitals.has#haspattern)
   *     the val
   * @return {!Array}
   */
  get.values = function getValues(source, val) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No val defined', 'values');
      return _strVals(source, val);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'values');

    return arguments.length < 2
      ? _allObjVals(source)
      : _byKeyObjVals(source, val);
  };
  // define shorthand
  get.vals = get.values;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET OBJECT DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {!Array<string>}
   */
  function _allKeys(obj) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byKeyKeys(obj, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = _is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) _own(obj, key) && _match(key, pattern) && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} val
   * @return {!Array<string>}
   */
  function _byValKeys(obj, val) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && obj[key] === val && arr.push(key);
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {!Array<*>}
   */
  function _allObjVals(obj) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    arr = [];
    for (key in obj) _own(obj, key) && arr.push( obj[key] );
    return arr;
  }

  /**
   * @private
   * @param {(!Object|function)} obj
   * @param {*} pattern
   * @return {!Array<*>}
   */
  function _byKeyObjVals(obj, pattern) {

    /** @type {!Array<*>} */
    var arr;
    /** @type {string} */
    var key;

    pattern = _is.regex(pattern) ? pattern : String(pattern);
    arr = [];
    for (key in obj) {
      _own(obj, key) && _match(key, pattern) && arr.push( obj[key] );
    }
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET ARRAY DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @return {!Array<number>}
   */
  function _allIndexes(obj) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = new Array(len);
    i = -1;
    while (++i < len) arr[i] = i;
    return arr;
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {*} val
   * @return {!Array<number>}
   */
  function _byValIndexes(obj, val) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = obj.length;
    arr = [];
    i = -1;
    while (++i < len) obj[i] === val && arr.push(i);
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GET STRING DETAILS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _strIndexes(str, pattern) {
    return _match(str, pattern)
      ? _is.regex(pattern)
        ? _byRegexStrKeys(str, pattern)
        : _byStrStrKeys(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _strVals(str, pattern) {
    return _match(str, pattern)
      ? _is.regex(pattern)
        ? _byRegexStrVals(str, pattern)
        : _byStrStrVals(str, pattern)
      : [];
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<number>}
   */
  function _byRegexStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = copy.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push(obj.index);
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<number>}
   */
  function _byStrStrKeys(str, pattern) {

    /** @type {!Array<number>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(i);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {!RegExp} pattern
   * @return {!Array<string>}
   */
  function _byRegexStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {Object} */
    var obj;

    pattern = copy.regex(pattern, true);
    arr = [];
    obj = pattern.exec(str);
    while (obj) {
      arr.push( obj[0] );
      obj = pattern.exec(str);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {*} pattern
   * @return {!Array<string>}
   */
  function _byStrStrVals(str, pattern) {

    /** @type {!Array<string>} */
    var arr;
    /** @type {number} */
    var i;

    pattern = String(pattern);
    arr = [];
    i = str.indexOf(pattern);
    while (i !== -1) {
      arr.push(pattern);
      i = str.indexOf(pattern, ++i);
    }
    return arr;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('get');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR GET
  return get;
})();


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value      (has.val)
  // - has.pattern
  // - has.substring  (has.substr)
  // - has.enumerable (has.enum)
  //
  // * Note that has.enum may fail in older browser
  //   environments.
  //////////////////////////////////////////////////////////

  /**
   * Checks if an object owns a property, if an array has a value, or a string
   *   has a pattern or substring.
   *
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} val - Details (per source type):
   *   - object: The val is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
   *   - array: The array is checked for a matching indexed value via
   *     `val === value`.
   *   - string: If a `RegExp` val is provided the string source is tested for a
   *     matching pattern via [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
   *     Otherwise the val is converted to a string, and the source string is
   *     checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *     or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   *   - null: Regardless of val `false` is returned.
   * @return {boolean}
   */
  function has(source, val) {

    if (arguments.length < 2) throw _error('No val defined');
    
    if ( _is.nil(source) ) return false;

    if ( _is.str(source) ) return _match(source, val);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source) ? _inArr(source, val) : _own(source, val);
  }

  /**
   * Checks if an object owns a property.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} key - Details (per source type):
   *   - object: The key is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
   *   - null: Regardless of key `false` is returned.
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'key');

    return _own(source, key);
  };

  /**
   * Checks if an object or array has a value.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} val - Details (per source type):
   *   - object: The object is checked for a matching val via `val === value`.
   *   - array: The array is checked for a matching indexed value via
   *     `val === value`.
   *   - null: Regardless of val `false` is returned.
   * @return {boolean}
   */
  has.value = function hasValue(source, val) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'value');

    return _is._arr(source) ? _inArr(source, val) : _inObj(source, val);
  };
  // define shorthand
  has.val = has.value;

  /**
   * Checks if a string has a pattern or substring.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - Details (per pattern type):
   *   - regex: The string source is tested for a matching pattern via
   *     [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
   *   - non-regex: The pattern is converted to a string, and the source string
   *     is checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *     or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !_is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _match(source, pattern);
  };

  /**
   * Checks if a string has a substring.
   *
   * @public
   * @param {string} source
   * @param {*} val - The val is converted to a string, and the source string
   *   is checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *   or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, val) {

    if ( !_is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No val defined', 'substring');

    return _inStr(source, val);
  };
  // define shorthand
  has.substr = has.substring;

  /**
   * Checks if an enumerable property exists in an object.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} key - Details (per source type):
   *   - object: The key is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable).
   *   - null: Regardless of key `false` is returned.
   * @return {boolean}
   */
  has.enumerable = function hasEnumerable(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'enumerable');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'enumerable');

    return _ownEnum(source, key);
  };
  // define shorthand
  try {
    has.enum = has.enumerable;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('has');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


////////////////////////////////////////////////////////////////////////////////
// REMAP
////////////////////////////////////////////////////////////////////////////////

var remap = (function remapPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - remap
  // - remap.object (remap.obj)
  // - remap.array  (remap.arr)
  // - remap.string (remap.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for making a new object/array/string by invoking an action over
   *   the values of an existing object/array/string.
   *
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {*} iteratee - Details per source type:
   *   - object: The iteratee must be a function with the optional params -
   *     value, key, source. Note this method lazily clones the source based on
   *     the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   - array: The iteratee must be a function with the optional params -
   *     value, index, source. Note this method lazily slices the source based
   *     on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   - string: The iteratee must be a pattern to search for within the
   *     source. If the pattern is not a string or RegExp it will be converted
   *     to a string.
   * @param {*=} replacement - Only use (and required) with string sources. If
   *   not a string or function the replacement is converted to a string. For
   *   details about using replacement functions see the
   *   [String.prototype.replace function param](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee or
   *   replacement function is bound to its value.
   * @return {!(Object|function|Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No iteratee defined');
      if (arguments.length < 3) throw _error('No replacement defined');
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');
      return _remapStr(source, iteratee, replacement, thisArg);
    }

    thisArg = replacement;

    if ( !_is._obj(source)        ) throw _error.type('source');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    return _is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for making a new object with the same keys and new values by
   *   invoking an action over the values of an existing object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Object} 
   */
  remap.object = function remapObject(source, iteratee, thisArg) {

    if ( !_is._obj(source)        ) throw _error.type('source',   'object');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'object');

    return _remapObj(source, iteratee, thisArg);
  };
  // define shorthand
  remap.obj = remap.object;

  /**
   * A shortcut for making a new array by invoking an action over the values of
   *   an existing array-like object.
   *
   * @public
   * @param {(!Object|function|string)} source - If source is a string it is
   *   converted to an array using one of the following values as the separator
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)=} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Array}
   */
  remap.array = function remapArray(source, iteratee, thisArg) {

    if ( _is.str(source) ) source = _splitKeys(source);

    if ( !_is._obj(source)        ) throw _error.type('source',        'array');
    if ( !_is.num(source.length)  ) throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee',      'array');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',       'array');

    return _remapArr(source, iteratee, thisArg);
  };
  // define shorthand
  remap.arr = remap.array;

  /**
   * A shortcut for [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
   *   that defaults to global replacements instead of only the first.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - If not a RegExp the pattern is converted to a string.
   * @param {*} replacement - If not a string or function the replacement is
   *   converted to a string. For details about using replacement functions see
   *   [String.prototype.replace function param](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).
   * @param {Object=} thisArg - If thisArg is supplied the replacement function
   *   is bound to its value.
   * @return {string}
   */
  remap.string = function remapString(source, pattern, replacement, thisArg) {

    if (arguments.length < 2) throw _error('No pattern defined',     'string');
    if (arguments.length < 3) throw _error('No replacement defined', 'string');
    if ( !_is.str(source)         ) throw _error.type('source',  'string');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg', 'string');

    return _remapStr(source, pattern, replacement, thisArg);
  };
  // define shorthand
  remap.str = remap.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, string=, !(Object|function)=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    source = iteratee.length > 2 ? copy(source) : source;
    iteratee = _is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee();
      }
      break;
      case 1:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key]);
      }
      break;
      case 2:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key);
      }
      break;
      default:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key, source);
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, number=, !Array=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    source = iteratee.length > 2 ? copy.arr(source) : source;
    iteratee = _is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    len = source.length;
    arr = new Array(len);
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) arr[i] = iteratee();              break;
      case 1:  while (++i < len) arr[i] = iteratee(source[i]);     break;
      case 2:  while (++i < len) arr[i] = iteratee(source[i], i);  break;
      default: while (++i < len) arr[i] = iteratee(source[i], i, source);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source) return source;

    if ( !_is.regex(pattern) ) {
      pattern = String(pattern);
      pattern = _escape(pattern);
      pattern = new RegExp(pattern, 'g');
    }

    replacement = _is.func(replacement)
      ? _is.undefined(thisArg)
        ? replacement
        : _bindR(replacement, thisArg)
      : String(replacement);

    return source.replace(pattern, replacement);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindI(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { return func.call(thisArg); };
      case 1:
      return function iteratee(val) { return func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func.call(thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindR(func, thisArg) {
    switch (func.length) {
      case 0: return function replacement() {
        return func.call(thisArg);
      };
      case 1: return function replacement(match) {
        return func.call(thisArg, match);
      };
      case 2: return function replacement(match, p1) {
        return func.call(thisArg, match, p1);
      };
      case 3: return function replacement(match, p1, p2) {
        return func.call(thisArg, match, p1, p2);
      };
      case 4: return function replacement(match, p1, p2, p3) {
        return func.call(thisArg, match, p1, p2, p3);
      };
      case 5: return function replacement(match, p1, p2, p3, p4) {
        return func.call(thisArg, match, p1, p2, p3, p4);
      };
    }
    return function replacement() {
      return func.apply(thisArg, arguments);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('remap');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR REMAP
  return remap;
})();


////////////////////////////////////////////////////////////////////////////////
// ROLL
////////////////////////////////////////////////////////////////////////////////

var roll = (function rollPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - roll
  // - roll.up
  // - roll.down
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for deriving a result by iterating over object maps, arrays, or
   *   cycles.
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, *=, (string|number)=, !(Object|function)=)} iteratee -
   *   It has the optional params - previousValue, currentValue, key/index, and
   *   source. Note this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's fourth param so you can safely assume all references to
   *   the source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined');
      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for deriving a sum by iterating over object maps, arrays, or
   *   cycles.
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.up = function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','up');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'up');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'up');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'up');
      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'up');

    return _is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  };

  /**
   * A shortcut for deriving a difference by iterating over object maps, arrays,
   *   or cycles.
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.down = function rollDown(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','down');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'down');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'down');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'down');
      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'down');

    return _is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL OBJ
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObj(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 3:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObj(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key]);
      }
      break;
      case 3:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result = iteratee(result, obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result += iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjUp(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result += iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjDown(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: 
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) result -= iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL ARR
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArr(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArr(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrUp(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrDown(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL CYCLE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycle(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length > 1) {
      i = 0;
      while(count--) result = iteratee(result, i++);
    }
    else {
      while(count--) result = iteratee(result);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleUp(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result += iteratee(i++);
    }
    else {
      while(count--) result += iteratee();
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleDown(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result -= iteratee(i++);
    }
    else {
      while(count--) result -= iteratee();
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0: return function iteratee() { return func.call(thisArg); };
      case 1: return function iteratee(val) { return func.call(thisArg, val); };
      case 2: return function iteratee(val1, val2) {
        return func.call(thisArg, val1, val2);
      };
      case 3: return function iteratee(val1, val2, val3) {
        return func.call(thisArg, val1, val2, val3);
      };
    }
    return function iteratee(prev, curr, key, obj) {
      return func.call(thisArg, prev, curr, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('roll');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ROLL
  return roll;
})();


////////////////////////////////////////////////////////////////////////////////
// SAME
////////////////////////////////////////////////////////////////////////////////

var same = (function samePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - same
  // - same.loose (same.ish)
  //////////////////////////////////////////////////////////

  /**
   * A functional representation of strict equality.
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function same(val1, val2) {

    if (arguments.length < 2) throw _error('Missing a val');

    return val1 === val2;
  }

  /**
   * A functional representation of loose equality.
   *
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  same.loose = function sameLoose(val1, val2) {

    if (arguments.length < 2) throw _error('Missing a val', 'loose');

    return val1 == val2;
  };
  // define shorthand
  same.ish = same.loose;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('same');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SAME
  return same;
})();


////////////////////////////////////////////////////////////////////////////////
// SLICE
////////////////////////////////////////////////////////////////////////////////

var slice = (function slicePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - slice
  // - slice.array  (slice.arr)
  // - slice.string (slice.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   *   and [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   *
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !_is.un.num(start) ) throw _error.type('start');
    if ( !_is.un.num(end)   ) throw _error.type('end');

    if ( _is.nil(source) ) return null;

    if ( _is.str(source) ) return _sliceStr(source, start, end);

    if ( !_is._obj(source)       ) throw _error.type('source');
    if ( !_is.num(source.length) ) throw _error.type('source.length');

    return _sliceArr(source, start, end);
  }

  /**
   * A shortcut for [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).
   *
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'array');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !_is.un.num(start)      ) throw _error.type('start',         'array');
    if ( !_is.un.num(end)        ) throw _error.type('end',           'array');

    return _sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /**
   * A shortcut for [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   *
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !_is.str(str)      ) throw _error.type('str',   'string');
    if ( !_is.un.num(start) ) throw _error.type('start', 'string');
    if ( !_is.un.num(end)   ) throw _error.type('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('slice');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SLICE
  return slice;
})();


////////////////////////////////////////////////////////////////////////////////
// TO
////////////////////////////////////////////////////////////////////////////////

var to = (function toPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.string    (to.str)
  // - to.number    (to.num)
  // - to.boolean   (to.bool)
  // - to.array     (to.arr)
  // - to.regexp    (to.re|to.regex)
  // - to.upperCase (to.upper)
  // - to.lowerCase (to.lower)
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  var to = {};

  /**
   * Converts a value to a string.
   *
   * @public
   * @param {*} val
   * @param {string=} joiner - Only valid if an array val is used.
   * @return {string}
   */
  to.string = function toString(val, joiner) {

    if (!arguments.length) throw _error('Missing a val', 'string');

    if ( !_is.un.str(joiner) ) throw _error.type('joiner', 'string');

    return _is.arr(val) && _is.str(joiner) ? val.join(joiner) : String(val);
  };
  // define shorthand
  to.str = to.string;

  /**
   * Converts a value to a number.
   *
   * @public
   * @param {*} val
   * @return {number}
   */
  to.number = function toNumber(val) {

    if (!arguments.length) throw _error('Missing a val', 'number');

    return Number(val);
  };
  // define shorthand
  to.num = to.number;

  /**
   * Converts a value to a boolean.
   *
   * @public
   * @param {*} val
   * @return {boolean}
   */
  to.boolean = function toBoolean(val) {

    if (!arguments.length) throw _error('Missing a val', 'boolean');

    return !!val;
  };
  // define shorthand
  to.bool = to.boolean;

  /**
   * Converts a value to an array.
   *
   * @public
   * @param {(string|number)} val - Details per val type:
   *   - string: [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
   *     is called on the string.
   *   - number: A new array of val length is returned.
   * @param {*=} separator - Only used with a string val. If no separator is
   *   defined one of the following values is used (values listed in order of
   *   rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  to.array = function toArray(val, separator) {

    if (!arguments.length) throw _error('Missing a val', 'array');

    if ( _is.num(val) ) return new Array(val);

    if ( !_is.str(val) ) throw _error.type('val', 'array');

    if ( _is.undefined(separator) ) return _splitKeys(val);

    separator = _is.regex(separator) ? separator : String(separator);
    return val.split(separator);
  };
  // define shorthand
  to.arr = to.array;

  /**
   * Converts a string to a regex.
   *
   * @public
   * @param {string} source
   * @param {string=} flags
   * @return {!RegExp}
   */
  to.regexp = function toRegExp(source, flags) {

    if (!arguments.length) throw _error('Missing a source', 'regexp');

    if ( !_is.str(source)   ) throw _error.type('source', 'regexp');
    if ( !_is.un.str(flags) ) throw _error.type('flags',  'regexp');

    return flags ? new RegExp(source, flags) : new RegExp(source);
  };
  // define shorthand
  to.regex = to.regexp;
  to.re = to.regexp;

  /**
   * Converts a string to upper case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  to.upperCase = function toUpperCase(str) {

    if (!arguments.length) throw _error('Missing a str', 'upperCase');
    if ( !_is.str(str) ) throw _error.type('source', 'upperCase');

    return str.toUpperCase();
  };
  // define shorthand
  to.upper = to.upperCase;

  /**
   * Converts a string to lower case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  to.lowerCase = function toLowerCase(str) {

    if (!arguments.length) throw _error('Missing a str', 'lowerCase');
    if ( !_is.str(str) ) throw _error.type('source', 'lowerCase');

    return str.toLowerCase();
  };
  // define shorthand
  to.lower = to.lowerCase;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('to');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR TO
  return to;
})();


////////////////////////////////////////////////////////////////////////////////
// UNTIL
////////////////////////////////////////////////////////////////////////////////

var until = (function untilPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - until
  // - until.object (until.obj)
  // - until.array  (until.arr)
  // - until.cycle  (until.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps, arrays, or cycles until an end
   *   value is returned.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function|Array|number|string)=} source - If the source is
   *   defined the iteration will also stop as follows (per source type):
   *   - object source: Ends after all properties are visited.
   *   - array source:  Ends after all indexes are visited.
   *   - number source: Ends after the count of cycles equals the source.
   *   - string source: Converted to an array source using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {function(*=, (string|number)=, (!Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {boolean} - This method will return true if the iteratee returns
   *   the end value or false if the iteratee does not.
   */
  function until(end, source, iteratee, thisArg) {

    if (arguments.length < 2) throw _error('No end or iteratee defined');

    if (arguments.length === 2) {
      iteratee = source;
      if ( !_is.func(iteratee) ) throw _error.type('iteratee');
      return _untilEnd(end, iteratee);
    }

    if ( arguments.length === 3 && _is.func(source) && _is.nil.obj(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      return _untilEnd(end, iteratee, thisArg);
    }

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    if ( _is.num(source) ) return _untilCycle(end, source, iteratee, thisArg);

    if ( _is.str(source) ) source = _splitKeys(source);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps until an end value is returned or
   *   all properties are visited.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {(!Object|function)} obj
   * @param {function(*=, string=, (!Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the properties are visited this
   *   method will return false.
   */
  until.object = function untilObject(end, obj, iteratee, thisArg) {

    if ( !_is._obj(obj)           ) throw _error.type('obj',      'object');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'object');

    return _untilObj(end, obj, iteratee, thisArg);
  };
  // define shorthand
  until.obj = until.object;

  /**
   * A shortcut for iterating over array-like objects until an end value is
   *   returned or all indexed values are visited.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {(!Object|function|string)} source - If source is a string it is
   *   converted to an array source using one of the following values as the
   *   separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices (see [vitals.copy.array](https://github.com/imaginate/vitals/wiki/vitals.copy#copyarray))
   *   the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the indexed values are visited
   *   this method will return false.
   */
  until.array = function untilArray(end, source, iteratee, thisArg) {

    if ( _is.str(source) ) source = _splitKeys(source);

    if ( !_is._obj(source)        ) throw _error.type('source',        'array');
    if ( !_is.num(source.length)  ) throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee',      'array');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',       'array');

    return _untilArr(end, source, iteratee, thisArg);
  };
  // define shorthand
  until.arr = until.array;

  /**
   * A shortcut for invoking an action until an end value is returned or the
   *   number of cycles is reached.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {number} count - The number of cycles.
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if the number of cycles is reached
   *   this method will return false.
   */
  until.cycle = function untilCycle(end, count, action, thisArg) {

    if ( !_is.num(count)          ) throw _error.type('count',   'cycle');
    if ( !_is.func(action)        ) throw _error.type('action',  'cycle');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg', 'cycle');

    return _untilCycle(end, count, action, thisArg);
  };
  // define shorthand
  until.time = until.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} end
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, action, thisArg) {

    /** @type {number} */
    var i;

    action = _is.undefined(thisArg) ? action : _bind(action, thisArg);
    if (action.length) {
      i = 0;
      while(action(i++) !== end) {}
    }
    else {
      while(action() !== end) {}
    }
    return true;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee() === end) return true;
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key]) === end) return true;
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key) === end) return true;
        }
      }
      break;
      default:
      for (key in obj) {
        if ( _own(obj, key) ) {
          if (iteratee(obj[key], key, obj) === end) return true;
        }
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      while (++i < len) {
        if (iteratee() === end) return true;
      }
      break;
      case 1:
      while (++i < len) {
        if (iteratee(obj[i]) === end) return true;
      }
      break;
      case 2:
      while (++i < len) {
        if (iteratee(obj[i], i) === end) return true;
      }
      break;
      default:
      while (++i < len) {
        if (iteratee(obj[i], i, obj) === end) return true;
      }
    }
    return false;
  }

  /**
   * @private
   * @param {*} end
   * @param {number} count
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, count, action, thisArg) {

    /** @type {number} */
    var i;

    action = _is.undefined(thisArg) ? action : _bind(action, thisArg);
    if (action.length) {
      i = 0;
      while(count--) if (action(i++) === end) return true;
    }
    else {
      while(count--) if (action() === end) return true;
    }
    return false;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { return func.call(thisArg); };
      case 1:
      return function iteratee(val) { return func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func.call(thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('until');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR UNTIL
  return until;
})();



// *****************************************************************************
// SECTION: STRICT METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// AMEND
////////////////////////////////////////////////////////////////////////////////

var amend = (function amendPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - amend
  // - amend.config
  // - amend.property          (amend.prop)
  // - amend.property.config   (amend.prop.config)
  // - amend.properties        (amend.props)
  // - amend.properties.config (amend.props.config)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  function amend(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj');

    if ( _is.str(props) ) props = _splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor');
    if ( !is('str=',  strongType) ) throw _error.type('strongType');
    if ( !is('func=', setter)     ) throw _error.type('setter');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  }

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.config = function amendConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'config');

    if ( _is.str(props) ) props = _splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) throw _error.type('descriptor', 'config');
      props = _setupConfigs(props, descriptor);
    }

    if ( !_hasKeys(obj, props) ) {
      throw _error('A given prop was not defined in the obj', 'config');
    }

    return _amendConfigs(obj, props);
  };

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val - A val is required if a descriptor is not supplied.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   * @param {string=} strongType - If defined the new property is assigned
   *   an accessor descriptor that includes a setter that throws an error if the
   *   new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined the new property is
   *   assigned an accessor descriptor that includes a setter that sets the
   *   property to the value returned by this setter method. The setter method
   *   will receive two params, the new value and the current value. If a
   *   strongType is defined this setter will not get called until the new value
   *   passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.property = function amendProperty(obj, key, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj', 'property');
    if ( !_is.str(key) ) throw _error.type('key', 'property');

    len = arguments.length;

    if (len < 3) throw _error('No val or descriptor defined', 'property');

    if (len > 2 && len < 6) {
      args = _parseProp(len, val, descriptor, strongType, setter);
      val = args[0];
      descriptor = args[1];
      strongType = args[2];
      setter = args[3];
    }

    if ( !is('!obj=', descriptor) ) throw _error.type('descriptor', 'property');
    if ( !is('str=',  strongType) ) throw _error.type('strongType', 'property');
    if ( !is('func=', setter)     ) throw _error.type('setter',     'property');

    if ( strongType && !is(strongType + '=', val) ) {
      throw _error('The val param is not a valid strongType', 'property');
    }
    if ( descriptor && (strongType || setter) && _own(descriptor, 'writable') ){
      throw _error(
        'A data descriptor may not be used with a strongType/setter', 'property'
      );
    }

    return _amendProp(obj, key, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.prop = amend.property;

  /**
   * A shortcut for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
   *   that only updates the descriptor of an existing property.
   *
   * @public
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  amend.property.config = function amendPropertyConfig(obj, key, descriptor) {

    if ( !_is.obj(obj)       ) throw _error.type('obj',       'property.config');
    if ( !_is.str(key)       ) throw _error.type('key',       'property.config');
    if ( !_is.obj(descriptor)) throw _error.type('descriptor','property.config');

    if ( !_own(obj, key) ) {
      throw _error('The key was not defined in the obj', 'property.config');
    }

    return _amendConfig(obj, key, descriptor);
  };
  // define shorthand
  amend.prop.config = amend.property.config;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, *>|Array<string>|string)} props - The details for
   *   the props param are as follows (per props type):
   *   - object: Must be `propName => propVal` or `propName => propDescriptor`.
   *   - array:  An array of key names to define.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {*=} val - Only use (and required) if an array or string of keys is
   *   given for the props param. This param defines the value assigned for all
   *   keys regardless of descriptor type.
   * @param {!Object=} descriptor - [default= { writable: true, enumerable: true, configurable: true }]
   *   The default descriptor values for each prop.
   * @param {string=} strongType - If defined all new properties are assigned
   *   an accessor descriptor (unless assigned a data descriptor in the props
   *   param) that includes a setter (unless assigned a setter in the props
   *   param) that throws an error if the new property value fails a [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
   *   type test. The setter is as follows:
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = newVal;
   *   };
   *   ```
   * @param {function(*, *): *=} setter - If defined all new properties are
   *   assigned an accessor descriptor (unless assigned a data descriptor in the
   *   props param) that includes a setter (unless assigned a setter in the
   *   props param) that sets the property to the value returned by this setter.
   *   Note that this setter function will receive two params, the new value and
   *   the current value. Also note that if the strongType param is defined this
   *   setter will not get called until the new value passes the type test.
   *   ```
   *   prop.set = function set(newVal) {
   *     if ( !vitals.is(strongType, newVal) ) throw new TypeError("...");
   *     value = setter(newVal, value);
   *   };
   *   ```
   * @return {!Object}
   */
  amend.properties = function amendProperties(obj, props, val, descriptor, strongType, setter) {

    /** @type {boolean} */
    var isArr;
    /** @type {!Array} */
    var args;
    /** @type {number} */
    var len;

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties');

    if ( _is.str(props) ) props = _splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties');

    isArr = _is.arr(props);
    len = arguments.length;

    if (isArr && len < 3) throw _error('No val defined', 'properties');

    if (!isArr && len > 2) {
      setter = strongType;
      strongType = descriptor;
      descriptor = val;
      val = undefined;
      ++len; // increase len for a valid _parseProps call
    }

    if (len === 4 || len === 5) {
      args = _parseProps(len, descriptor, strongType, setter);
      descriptor = args[0];
      strongType = args[1];
      setter = args[2];
    }

    if ( !is('!obj=', descriptor)) throw _error.type('descriptor','properties');
    if ( !is('str=',  strongType)) throw _error.type('strongType','properties');
    if ( !is('func=', setter)    ) throw _error.type('setter',    'properties');

    if (strongType) {
      if ( isArr && !is(strongType + '=', val) ) {
        throw _error('The val param is not a valid strongType', 'properties');
      }
      if ( !isArr && !_strongTypeCheckProps(strongType, props) ) {
        throw _error('A props value was not a valid strongType', 'properties');
      }
    }

    return _amendProps(obj, props, val, descriptor, strongType, setter);
  };
  // define shorthand
  amend.props = amend.properties;

  /**
   * A shortcut for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
   *   that only updates the descriptors of existing properties.
   *
   * @public
   * @param {!Object} obj
   * @param {!(Object<string, !Object>|Array<string>|string)} props - Details
   *   for the props param are as follows (per props type):
   *   - object: Must be `propName => propDescriptor` pairs.
   *   - array:  An array of key names to update.
   *   - string: Converted to an array of key names using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {!Object=} descriptor - Only use (and required) if an array or
   *   string of keys is given for the props param.
   * @return {!Object}
   */
  amend.properties.config = function amendPropertiesConfig(obj, props, descriptor) {

    if ( !_is.obj(obj) ) throw _error.type('obj', 'properties.config');

    if ( _is.str(props) ) props = _splitKeys(props);

    if ( !_is.obj(props) ) throw _error.type('props', 'properties.config');

    if ( _is.arr(props) ) {
      if ( !_is.obj(descriptor) ) {
        throw _error.type('descriptor', 'properties.config');
      }
      props = _setupConfigs(props, descriptor);
    }

    if ( !_hasKeys(obj, props) ) {
      throw _error(
        'A given prop was not defined in the obj', 'properties.config'
      );
    }

    return _amendConfigs(obj, props);
  };
  // define shorthand
  amend.props.config = amend.properties.config;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN ARG PARSING
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {number} len
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProp(len, val, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    if ( _is.obj(val) && _isDescriptor(val) ) {
      descriptor = val;
      val = descriptor.value;
    }

    return [ val, descriptor, strongType, setter ];
  }

  /**
   * @private
   * @param {number} len
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Array}
   */
  function _parseProps(len, descriptor, strongType, setter) {

    switch (len) {
      case 4:
      if ( _is.str(descriptor) ) {
        strongType = descriptor;
        descriptor = undefined;
      }
      else if ( _is.func(descriptor) ) {
        setter = descriptor;
        descriptor = undefined;
      }
      break;
      case 5:
      if ( _is.func(strongType) ) {
        setter = strongType;
        strongType = undefined;
        if ( _is.str(descriptor) ) {
          strongType = descriptor;
          descriptor = undefined;
        }
      }
    }

    return [ descriptor, strongType, setter ];
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
      if ( _own(props, key) ) {
        val = props[key];
        if ( _is.obj(val) && _isDescriptor(val) ) {
          if ( _own(val, 'writable') ) continue;
          val = val.value;
        }
        if ( !is(strongType, val) ) return false;
      }
    }
    return true;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProp(obj, key, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);

    descriptor = strongType || setter
      ? _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter)
      : _isAccessor(descriptor)
        ? _cloneObj(descriptor)
        : _setupDescriptorByKey(val, descriptor);

    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @param {*} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _amendProps(obj, props, val, descriptor, strongType, setter) {

    descriptor = descriptor || null;
    descriptor = _getDescriptor(descriptor, !!strongType || !!setter);
    strongType = _getStrongType(strongType);
    props = _is.arr(props)
      ? strongType || setter
        ? _setupPropsByKeyWithSetter(props, val, descriptor, strongType, setter)
        : _setupPropsByKey(props, val, descriptor)
      : strongType || setter
        ? _setupPropsWithSetter(props, descriptor, strongType, setter)
        : _setupProps(props, descriptor);

    return _ObjectDefineProperties(obj, props);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _amendConfig(obj, key, descriptor) {
    return _ObjectDefineProperty(obj, key, descriptor);
  }

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  function _amendConfigs(obj, props) {
    return _ObjectDefineProperties(obj, props);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PROPERTIES SETUP
  //////////////////////////////////////////////////////////

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
      if ( _own(props, key) ) {
        newProps[key] = _setupDescriptor(props[key], descriptor);
      }
    }
    return newProps;
  }

  /**
   * @private
   * @param {!Object} props
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsWithSetter(props, descriptor, strongType, setter) {

    /** @type {!Object} */
    var newProps;
    /** @type {string} */
    var key;

    newProps = {};
    for (key in props) {
      if ( _own(props, key) ) {
        newProps[key] = _setupDescriptorWithSetter(
          props[key], descriptor, strongType, setter
        );
      }
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

    /** @type {function} */
    var setupDesc;
    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    setupDesc = _isAccessor(descriptor)
      ? function setupDesc(val, desc) { return _cloneObj(desc); }
      : _setupDescriptorByKey;
    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = setupDesc(val, descriptor);
    }
    return props;
  }

  /**
   * @private
   * @param {!Array<string>} keys
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function} strongType
   * @param {function} setter
   * @return {!Object}
   */
  function _setupPropsByKeyWithSetter(keys, val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var props;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    props = {};
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = _setupDescriptorByKeyWithSetter(
        val, descriptor, strongType, setter
      );
    }
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
    len = keys.length;
    i = -1;
    while (++i < len) {
      props[ keys[i] ] = desc;
    }
    return props;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - DESCRIPTORS SETUP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {string}
   * @const
   */
  var INVALID_STRONG_TYPE = 'Invalid type for object property value.';

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @return {!Object}
   */
  function _setupDescriptor(val, descriptor) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);
    val = _isDescriptor(val) ? val : { value: val };
    return _merge(prop, val);
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);

    if ( _isDescriptor(val) ) {
      prop = _merge(prop, val);
      if ( _own(prop, 'writable') || _isAccessor(prop) ) return prop;
      val = prop.value;
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

    prop = _cloneObj(descriptor);
    prop.value = val;
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupDescriptorByKeyWithSetter(val, descriptor, strongType, setter) {

    /** @type {!Object} */
    var prop;

    prop = _cloneObj(descriptor);
    prop = _setupGetSet(val, prop, strongType, setter);
    return prop;
  }

  /**
   * @private
   * @param {*} val
   * @param {!Object} descriptor
   * @param {function=} strongType
   * @param {function=} setter
   * @return {!Object}
   */
  function _setupGetSet(val, descriptor, strongType, setter) {

    /** @type {!Error} */
    var error;

    descriptor.get = function() { return val; };
    descriptor.set = strongType && setter
      ? function(newVal) {
          if ( !strongType(newVal) ) {
            error = new TypeError(INVALID_STRONG_TYPE);
            error.__setter = true;
            error.__type = true;
            throw error;
          }
          val = setter(newVal, val);
        }
      : strongType
        ? function(newVal) {
            if ( !strongType(newVal) ) {
              error = new TypeError(INVALID_STRONG_TYPE);
              error.__setter = true;
              error.__type = true;
              throw error;
            }
            val = newVal;
          }
        : function(newVal) { val = setter(newVal, val); };
    return descriptor;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - DESCRIPTORS HELPERS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DATA_DESCRIPTOR = {
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ACCESSOR_DESCRIPTOR = {
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var DESCRIPTOR_PROPS = {
    get: true,
    set: true,
    value: true,
    writable: true,
    enumerable: true,
    configurable: true
  };

  /**
   * @private
   * @param {!Object} obj
   * @return {boolean}
   */
  function _isDescriptor(obj) {

    /** @type {string} */
    var key;

    if ( !_is.obj(obj) ) return false;

    for (key in obj) {
      if ( _own(obj, key) && !_own(DESCRIPTOR_PROPS, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isData(obj) {
    return _own(obj, 'value') || _own(obj, 'writable');
  }

  /**
   * @private
   * @param {Object} obj
   * @return {boolean}
   */
  function _isAccessor(obj) {
    return _own(obj, 'get') || _own(obj, 'set');
  }

  /**
   * @private
   * @param {Object} descriptor
   * @param {boolean=} hasSetter
   * @return {!Object}
   */
  function _getDescriptor(descriptor, hasSetter) {

    /** @type {!Object} */
    var defaultDescriptor;

    if ( hasSetter && _isData(descriptor) ) {
      defaultDescriptor = {};
      if ( _is.bool( descriptor.enumerable ) ) {
        defaultDescriptor.enumerable = descriptor.enumerable;
      }
      if ( _is.bool( descriptor.configurable ) ) {
        defaultDescriptor.configurable = descriptor.configurable;
      }
      descriptor = defaultDescriptor;
    }

    defaultDescriptor = hasSetter || _isAccessor(descriptor)
      ? ACCESSOR_DESCRIPTOR
      : DATA_DESCRIPTOR;
    defaultDescriptor = _cloneObj(defaultDescriptor);

    return _merge(defaultDescriptor, descriptor);
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
      if ( _own(descriptor, key) && key !== 'value' ) {
        accessor[key] = descriptor[key];
      }
    }
    return accessor;
  }

  /**
   * @private
   * @param {string=} strongType
   * @return {(function|undefined)}
   */
  function _getStrongType(strongType) {
    return strongType && function strongTypeCheck(newVal) {
      return is(strongType, newVal);
    };
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.DEFINE_PROPERTIES POLYFILLS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_DEFINE_PROPS = !!Object.defineProperties && (function () {

    /** @type {!Object} */
    var descriptor;
    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    descriptor = {
      enumerable: false,
      value: obj
    };

    try {
      Object.defineProperty(obj, 'prop', descriptor);
      for (key in obj) {
        if (key === 'prop') return false;
      }
    }
    catch (e) {
      return false;
    }

    return obj.prop === obj;
  })();

  /**
   * @private
   * @param {!Object} obj
   * @param {string} key
   * @param {!Object} descriptor
   * @return {!Object}
   */
  var _ObjectDefineProperty = HAS_DEFINE_PROPS
    ? Object.defineProperty
    : function ObjectDefineProperty(obj, key, descriptor) {
      obj[key] = _own(descriptor, 'get') ? descriptor.get() : descriptor.value;
      return obj;
    };

  /**
   * @private
   * @param {!Object} obj
   * @param {!Object} props
   * @return {!Object}
   */
  var _ObjectDefineProperties = HAS_DEFINE_PROPS
    ? Object.defineProperties
    : function ObjectDefineProperties(obj, props) {

      /** @type {!Object} */
      var prop;
      /** @type {string} */
      var key;

      for (key in props) {
        if ( _own(props, key) ) {
          prop = props[key];
          obj[key] = _own(prop, 'get') ? prop.get() : prop.value;
        }
      }
      return obj;
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

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
      if ( _own(obj, key) && !_own(source, key) ) return false;
    }
    return true;
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('amend');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR AMEND
  return amend;
})();


////////////////////////////////////////////////////////////////////////////////
// CREATE
////////////////////////////////////////////////////////////////////////////////

var create = (function createPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - create
  // - create.object (create.obj)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  function create(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) ) throw _error.type('proto');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    }

    return _ObjectCreate(proto);
  }

  /**
   * A shortcut for [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
   *   that includes easier value assignment, strong type assignment, and more
   *   flexible default descriptor options. Note that this method uses
   *   [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend) for
   *   assigning properties to the new object. See [vitals.amend](https://github.com/imaginate/vitals/wiki/vitals.amend)
   *   for documentation about the property params.
   *
   * @public
   * @param {Object} proto
   * @param {!(Object<string, *>|Array<string>|string)} props
   * @param {*=} val
   * @param {!Object=} descriptor
   * @param {string=} strongType
   * @param {function(*, *): *=} setter
   * @return {!Object}
   */
  create.object = function createObject(proto, props, val, descriptor, strongType, setter) {

    /** @type {!Array} */
    var args;

    if ( !_is.nil.obj(proto) ) throw _error.type('proto', 'object');

    if (arguments.length > 1) {
      args = _sliceArr(arguments);
      args[0] = _ObjectCreate(proto);
      return amend.apply(null, args);
    } 

    return _ObjectCreate(proto);
  }
  // define shorthand
  create.obj = create.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.CREATE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} proto
   * @return {!Object}
   */
  var _ObjectCreate = Object.create || function ObjectCreate(proto) {

    /** @type {!Object} */
    var obj;

    _Object.prototype = proto;
    obj = new _Object();
    _Object.prototype = null;
    return obj;
  };

  /**
   * @private
   * @constructor
   */
  function _Object(){}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('create');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR CREATE
  return create;
})();


////////////////////////////////////////////////////////////////////////////////
// FREEZE
////////////////////////////////////////////////////////////////////////////////

var freeze = (function freezePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - freeze
  // - freeze.object (freeze.obj)
  //////////////////////////////////////////////////////////

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  function freeze(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  }

  /**
   * Freezes an object with optional deep freeze.
   *
   * @public
   * @param {(Object|?function)} obj
   * @param {boolean=} deep
   * @return {(Object|?function)}
   */
  freeze.object = function freezeObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'object');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'object');

    return deep ? _deepFreeze(obj) : _ObjectFreeze(obj);
  };
  // define shorthand
  freeze.obj = freeze.object;

  //////////////////////////////////////////////////////////
  // PRIVATE PROPERTIES - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  function _deepFreeze(obj, noFreeze) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) && _is._obj( obj[key] ) ) {
        _deepFreeze( obj[key] );
      }
    }
    return _ObjectFreeze(obj);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - OBJECT.FREEZE POLYFILL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {(!Object|function)} obj
   * @return {(!Object|function)}
   */
  var _ObjectFreeze = (function() {

    if (!Object.freeze) return function freeze(obj) { return obj; };

    try {
      Object.freeze(function(){});
      return Object.freeze;
    }
    catch (e) {
      return function freeze(obj) {
        return _is.func(obj) ? obj : Object.freeze(obj);
      };
    }
  })();

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('freeze');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();


////////////////////////////////////////////////////////////////////////////////
// SEAL
////////////////////////////////////////////////////////////////////////////////

var seal = (function sealPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - seal
  // - seal.object (seal.obj)
  //////////////////////////////////////////////////////////

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj');
    if ( !_is.un.bool(deep) ) throw _error.type('deep');

    return deep ? _deepSeal(obj) : _seal(obj);
  }

  /**
   * Seals an object with optional deep seal.
   *
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  seal.object = function sealObject(obj, deep) {

    if ( _is.nil(obj) ) return null;

    if ( !_is._obj(obj)     ) throw _error.type('obj',  'seal');
    if ( !_is.un.bool(deep) ) throw _error.type('deep', 'seal');

    return deep ? _deepSeal(obj) : _seal(obj);
  };
  // define shorthand
  seal.obj = seal.object;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  var _seal = !Object.seal
    ? function ObjectSeal(obj) { return obj; }
    : Object.seal;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  var _deepSeal = !Object.seal
    ? function _deepSeal(obj) { return obj; }
    : function _deepSeal(obj) {

      /** @type {string} */
      var key;

      for (key in obj) {
        if ( _own(obj, key) && _is._obj(obj[key]) ) _deepSeal(obj[key]);
      }
      return _seal(obj);
    };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('seal');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

  return {
    amend:  amend,
    copy:   copy,
    create: create,
    cut:    cut,
    each:   each,
    fill:   fill,
    freeze: freeze,
    fuse:   fuse,
    get:    get,
    has:    has,
    is:     is,
    remap:  remap,
    roll:   roll,
    same:   same,
    seal:   seal,
    slice:  slice,
    to:     to,
    until:  until
  };
})() // close methods iife (do not add semicolon)
);   // close export iife
