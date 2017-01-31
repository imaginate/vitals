/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.1.3
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var cp = require('child_process');


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: _is
////////////////////////////////////////////////////////////////////////////////

var _is = (function _isPrivateScope() {

  /** @type {!Object} */
  var is = {};

  //////////////////////////////////////////////////////////
  // PRIMITIVES
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil = function isNull(val) {
    return val === null;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.undefined = function isUndefined(val) {
    return val === undefined;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.bool = function isBoolean(val) {
    return typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.str = function isString(val) {
    return typeof val === 'string';
  };

  /**
   * Empty strings return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._str = function isNonEmptyString(val) {
    return !!val && typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.num = function isNumber(val) {
    return typeof val === 'number' && val === val;
  };

  /**
   * Zeros return false in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._num = function isNonZeroNumber(val) {
    return !!val && typeof val === 'number' && val === val;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nan = function isNan(val) {
    return val !== val;
  };

  //////////////////////////////////////////////////////////
  // JS OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.obj = function isObject(val) {
    return !!val && typeof val === 'object';
  };

  /**
   * Functions return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._obj = function isObjectOrFunction(val) {
    val = !!val && typeof val;
    return val && (val === 'object' || val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.func = function isFunction(val) {
    return !!val && typeof val === 'function';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.arr = function isArray(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Array]';
  };

  /**
   * Arguments return true in this method.
   * @param {*} val
   * @return {boolean}
   */
  is._arr = function isArrayOrArguments(val) {
      if ( !is.obj(val) ) return false;
      val = toStr.call(val);
      return val === '[object Array]' || val === '[object Arguments]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.regex = function isRegExp(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.date = function isDate(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Date]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.err = function isError(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Error]';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.args = function isArguments(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object Arguments]';
  };

  //////////////////////////////////////////////////////////
  // DOM OBJECTS
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.doc = function isDOMDocument(val) {
    return !!val && typeof val === 'object' && val.nodeType === 9;
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.elem = function isDOMElement(val) {
    return !!val && typeof val === 'object' && val.nodeType === 1;
  };

  //////////////////////////////////////////////////////////
  // MISCELLANEOUS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * Checks if a value is considered empty.
   * @param {...*} val
   * @return {boolean} Returns `false` if value is one of the following:
   *   ` 0, "", {}, [], null, undefined, false, NaN, function(){} `
   *   Note that for functions this method checks whether it has any defined
   *   params: ` function empty(){}; function notEmpty(param){}; `
   */
  is.empty = function isEmpty(val) {

    /** @type {string} */
    var key;

    // handle empty primitives - 0, "", null, undefined, false, NaN
    if (!val) return true;

    // handle functions
    if (typeof val === 'function') return !val.length;

    // handle non-empty primitives
    if (typeof val !== 'object') return false;

    // handle arrays
    if (toStr.call(val) === '[object Array]') return !val.length;

    // handle all other objects
    for (key in val) {
      if ( hasOwn.call(val, key) ) return false;
    }
    return true;
  };

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  is.eol = function isEol(val) {
    return EOL.test(val);
  };

  //////////////////////////////////////////////////////////
  // OBJECT STATES
  //////////////////////////////////////////////////////////

  /**
   * `Object.isFrozen` or a proper polyfill.
   * @param {(!Object|function)} obj
   * @return {boolean}
   */
  is.frozen = (function() {

    if (!Object.isFrozen) return function isFrozen(obj) { return false; };

    try {
      Object.isFrozen( function(){} );
      return Object.isFrozen;
    }
    catch (err) {
      return function isFrozen(obj) {
        return typeof obj === 'object' && Object.isFrozen(obj);
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
  is.whole = function isWholeNumber(val) {
    return !(val % 1);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.odd = function isOddNumber(val) {
    return !!(val % 2);
  };

  /**
   * @param {number} val
   * @return {boolean}
   */
  is.even = function isEvenNumber(val) {
    return !(val % 2);
  };

  //////////////////////////////////////////////////////////
  // OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.bool = function isUndefinedOrBoolean(val) {
    return val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.str = function isUndefinedOrString(val) {
    return val === undefined || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.num = function isUndefinedOrNumber(val) {
    return val === undefined || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.obj = function isUndefinedOrObject(val) {
    return val === undefined || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.func = function isUndefinedOrFunction(val) {
    return val === undefined || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.arr = function isUndefinedOrArray(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.un.regex = function isUndefinedOrRegExp(val) {
    return val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL
  //////////////////////////////////////////////////////////

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.bool = function isNullOrBoolean(val) {
    return val === null || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.str = function isNullOrString(val) {
    return val === null || typeof val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.num = function isNullOrNumber(val) {
    return val === null || (typeof val === 'number' && val === val);
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.obj = function isNullOrObject(val) {
    return val === null || (!!val && typeof val === 'object');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.func = function isNullOrFunction(val) {
    return val === null || (!!val && typeof val === 'function');
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.arr = function isNullOrArray(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.regex = function isNullOrRegExp(val) {
    return val === null || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  //////////////////////////////////////////////////////////
  // OR NULL OR UNDEFINED
  //////////////////////////////////////////////////////////

  /** @type {!Object} */
  is.nil.un = {};

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.bool = function isNullOrUndefinedOrBoolean(val) {
    return val === null || val === undefined || typeof val === 'boolean';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.str = function isNullOrUndefinedOrString(val) {
    return val === null || val === undefined || typeof  val === 'string';
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.num = function isNullOrUndefinedOrNumber(val) {
    return val === null || val === undefined || (
      typeof val === 'number' && val === val
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.obj = function isNullOrUndefinedOrObject(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.func = function isNullOrUndefinedOrFunction(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'undefined'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.arr = function isNullOrUndefinedOrArray(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object Array]'
    );
  };

  /**
   * @param {*} val
   * @return {boolean}
   */
  is.nil.un.regex = function isNullOrUndefinedOrRegExp(val) {
    return val === null || val === undefined || (
      !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]'
    );
  };

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: _is
  return is;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: newErrorMaker
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} main - A vitals method.
 * @return {function}
 */
function newErrorMaker(main) {

  main = 'vitals.' + main;

  /**
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var maker = function error(msg, method) {

    /** @type {!Error} */
    var err;

    method = method ? main : main + '.' + method;
    err = new Error(msg + ' for ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  maker.type = function typeError(param, method) {

    /** @type {!TypeError} */
    var err;

    param += ' param';
    method = method ? main : main + '.' + method;
    err = new TypeError('Invalid ' + param + ' in ' + method + ' call.');
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  maker.range = function rangeError(param, valid, method) {

    /** @type {!RangeError} */
    var err;
    /** @type {string} */
    var msg;

    param += ' param';
    method = method ? main : main + '.' + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    err = new RangeError(msg);
    err.__vitals = true;
    err.vitals = true;
    return err;
  };

  return maker;
}

////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: normalize
////////////////////////////////////////////////////////////////////////////////

var normalize = (function normalizePrivateScope() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var OPTS = {
    'CRLF': { 'pattern': /\r?\n|\r\n?/g, 'value': '\r\n' },
    'CR':   { 'pattern': /\r?\n/g,       'value': '\r'   },
    'LF':   { 'pattern': /\r\n?/g,       'value': '\n'   }
  };

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function normalize(str, eol) {
    eol = OPTS[eol];
    return str.replace(eol.pattern, eol.value);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: normalize
  return normalize;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: own
////////////////////////////////////////////////////////////////////////////////

var own = (function ownPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * @param {(Object|?function)} source
   * @param {*} key
   * @return {boolean}
   */
  function own(source, key) {
    return !!source && hasOwn.call(source, key);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: own
  return own;
})();


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: sliceArr
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {(!Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function sliceArr(source, start, end) {

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
  end = end === undefined || end > len
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


// *****************************************************************************
// SECTION: SHELL METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: run
////////////////////////////////////////////////////////////////////////////////

var run = (function runPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - run
  //////////////////////////////////////////////////////////

  /**
   * @typedef {!{
   *   pid:    number,
   *   output: !Array,
   *   stdout: BuffStr,
   *   stderr: BuffStr,
   *   status: number,
   *   signal: string,
   *   error:  ?Error
   * }} SpawnResult
   */

  /**
   * A shortcut for [child_process.spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options)
   *   that returns the stdout. Note that **vitals.run is considered unstable**
   *   as it does not yet have a test suite. It is also scheduled for a future
   *   rebuild. Use with caution and if possible help out by [contributing](https://github.com/imaginate/vitals/blob/master/CONTRIBUTING.md)
   *   some unit tests.
   *
   * @public
   * @param {string} cmd
   * @param {Object=} opts
   * @param {?string=} opts.eol - [default= "LF"] The end of line character to
   *   use when normalizing the result. If opts.eol is `null` or opts.buffer
   *   is `true` and opts.eol is `undefined` no normalization is completed.
   *   Optional values:
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @param {boolean=} opts.buffer - [default= false] If `true` and stdout is a
   *   buffer the buffer is returned. Otherwise a string of stdout is returned.
   * @param {boolean=} opts.catchExit - [default= true] If process is exited
   *   with an error code an error is logged.
   * @param {string=} opts.encoding - [default= "utf8"] If opts.buffer is
   *   `true` and opts.encoding is `undefined` no encoding is set.
   * @param {string=} opts.cwd
   * @param {(!Buffer|string)=} opts.input
   * @param {!Object=} opts.env
   * @param {number=} opts.uid
   * @param {number=} opts.gid
   * @param {number=} opts.timeout
   * @param {string=} opts.killSignal
   * @param {number=} opts.maxBuffer
   * @return {(!Buffer|string)}
   */
  function run(cmd, opts) {

    /** @type {SpawnResult} */
    var result;

    if ( !_is.str(cmd)         ) throw _error.type('cmd');
    if ( !_is.nil.un.obj(opts) ) throw _error.type('opts');

    if (opts) {
      if ( !_is.un.bool(opts.buffer)      ) throw _error.type('opts.buffer');
      if ( !_is.un.bool(opts.catchExit)   ) throw _error.type('opts.catchExit');
      if ( !_is.nil.un.str(opts.encoding) ) throw _error.type('opts.encoding');
      if ( !_is.nil.un.str(opts.eol)      ) throw _error.type('opts.eol');
      if ( opts.eol && !_is.eol(opts.eol) ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"');
    }

    cmd = cmd.split(' ');
    opts = _prepOptions(opts);
    result = cp.spawnSync(cmd[0], sliceArr(cmd, 1), opts);

    if (result.error) throw _error('"' + result.error.toString() + '"');
    if (opts.catchExit !== false && result.status) {
      throw _error('Failed exit code: ' + _getExitCode(result.status) + ' - ');
    }

    if (opts.buffer) {
      return _is.str(result.stdout) && opts.eol
        ? normalize(result.stdout, opts.eol)
        : result.stdout;
    }

    result.stdout = result.stdout.toString();
    return opts.eol ? normalize(result.stdout, opts.eol) : result.stdout;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - PREP
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {Object} options
   * @return {!Object}
   */
  function _prepOptions(options) {
    options = options || {};
    if (options.buffer) options.eol = options.eol || null;
    else options.encoding = options.encoding || 'utf8';
    options.eol = _is.undefined(options.eol) ? 'LF' : options.eol;
    options.eol = options.eol && options.eol.toUpperCase();
    return options;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - EXIT CODES
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!Array}
   * @const
   */
  var EXIT_CODES = [
    'Uncaught Fatal Exception',
    '(unused exit code)',
    'Internal JavaScript Parse Error',
    'Internal JavaScript Evaluation Error',
    'Fatal Error',
    'Non-function Internal Exception Handler',
    'Internal Exception Handler Run-Time Failure',
    'Uncaught Exception',
    'Invalid Argument',
    'Internal JavaScript Run-Time Failure',
    '(unused exit code)',
    'Invalid Debug Argument'
  ];

  /**
   * @private
   * @param {number} code
   * @return {string}
   */
  function _getExitCode(code) {
    if (code >= 128) return code + ' - UNIX Signal Exit';
    return code + ' - ' + EXIT_CODES[--code];
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('run');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR RUN
  return run;
})();



// *****************************************************************************
// SECTION: END
// *****************************************************************************

module.exports = {
  run: run
};
