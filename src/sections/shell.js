/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 3.0.0
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

var cp = require('child_process');


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
// PRIVATE HELPER - IS-EOL
////////////////////////////////////////////////////////////////////////////////

var _isEol = (function _isEolPrivateScope() {

  /**
   * @param {string} val
   * @return {boolean}
   */
  function _isEol(val) {
    return EOL.test(val);
  }

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EOL = /^(?:cr|lf|crlf)$/i;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR IS-EOL
  return _isEol;
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
// PRIVATE HELPER - NORMALIZE
////////////////////////////////////////////////////////////////////////////////

var _normalize = (function _normalizePrivateScope() {

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function _normalize(str, eol) {
    return str.replace(EOL.find[eol], EOL.replace[eol]);
  }

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var EOL = {
    'replace': {
      'CRLF': '\r\n',
      'CR':   '\r',
      'LF':   '\n'
    },
    'find': {
      'CRLF': /\r?\n|\r\n?/g,
      'CR':   /\r?\n/g,
      'LF':   /\r\n?/g
    }
  };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR NORMALIZE
  return _normalize;
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


// *****************************************************************************
// SECTION: SHELL METHODS
// *****************************************************************************


////////////////////////////////////////////////////////////////////////////////
// RUN
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
      if ( opts.eol && !_isEol(opts.eol)  ) throw _error.range('opts.eol', '"LF", "CR", "CRLF"');
    }

    cmd = cmd.split(' ');
    opts = _prepOptions(opts);
    result = cp.spawnSync(cmd[0], _sliceArr(cmd, 1), opts);

    if (result.error) throw _error('"' + result.error.toString() + '"');
    if (opts.catchExit !== false && result.status) {
      throw _error('Failed exit code: ' + _getExitCode(result.status) + ' - ');
    }

    if (opts.buffer) {
      return _is.str(result.stdout) && opts.eol
        ? _normalize(result.stdout, opts.eol)
        : result.stdout;
    }

    result.stdout = result.stdout.toString();
    return opts.eol ? _normalize(result.stdout, opts.eol) : result.stdout;
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
  var _error = newErrorAid('run');

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
