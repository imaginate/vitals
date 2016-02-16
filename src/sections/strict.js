/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - STRICT METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0-beta.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


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
   * A shortcut for type checking values.
   *
   * @public
   * @param {string} types - The valid data types. See [type docs](https://github.com/imaginate/vitals/wiki/method-is-types)
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
   * Empty strings return false in this method.
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
   * Zeros return false in this method.
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
   * Functions return true in this method.
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
   * Arguments return true in this method.
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
   * Checks if a value is considered empty.
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
   * @public
   * @param {...number} val - Each value must be a whole number.
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
   * @public
   * @param {...number} val - Each value must be a whole number.
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
   *     `", "` &nbsp; `","` &nbsp; `"|"` &nbsp; `" "`
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
   *     `", "` &nbsp; `","` &nbsp; `"|"` &nbsp; `" "`
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
   *     `", "` &nbsp; `","` &nbsp; `"|"` &nbsp; `" "`
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
   *     `", "` &nbsp; `","` &nbsp; `"|"` &nbsp; `" "`
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

module.exports = {
  amend:  amend,
  create: create,
  freeze: freeze,
  seal:   seal
};
