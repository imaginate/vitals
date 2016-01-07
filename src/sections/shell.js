/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - ALL METHODS
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.2.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('node-are').is;
var cp = require('child_process');


// *****************************************************************************
// PRIVATE HELPERS
// *****************************************************************************


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
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  errorAid.type = function typeError(param, method) {
    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  };

  /**
   * @param {string} param
   * @param {string=} valid
   * @param {string=} method
   * @return {!RangeError} 
   */
  errorAid.range = function rangeError(param, valid, method) {

    /** @type {string} */
    var msg;

    param += ' param';
    method = method || '';
    method = vitalsMethod + ( method && '.' ) + method;
    msg = 'The '+ param +' was out-of-range for a '+ method +' call.';
    msg += valid ? ' The valid options are: ' + valid : '';
    return new RangeError(msg);
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
  end = is.undefined(end) || end > len
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
   * A shortcut for child_process.spawnSync that returns the stdout.
   * @public
   * @param {string} cmd
   * @param {Object=} options
   * @param {?string=} options.eol - [default= "LF"] The end of line character to
   *   use when normalizing the result. If options.eol is null or options.buffer
   *   is true and options.eol is undefined no normalization is completed.
   *   Optional values: "LF", "CR", "CRLF"
   * @param {boolean=} options.buffer - [default= false] If true and stdout is a
   *   buffer the buffer is returned. Otherwise a string of stdout is returned.
   * @param {boolean=} options.catchExit - [default= true] If process is exited
   *   with an error code an error is logged.
   * @param {string=} options.encoding - [default= "utf8"] If options.buffer is
   *   true and options.encoding is undefined no encoding is set.
   * @param {string=} options.cwd
   * @param {(string|!Buffer)=} options.input
   * @param {!Object=} options.env
   * @param {number=} options.uid
   * @param {number=} options.gid
   * @param {number=} options.timeout
   * @param {string=} options.killSignal
   * @param {number=} options.maxBuffer
   * @return {(string|!Buffer)}
   */
  function run(cmd, options) {

    /** @type {SpawnResult} */
    var result;

    if ( !is.str(cmd)         ) throw _error.type('cmd');
    if ( !is('obj=', options) ) throw _error.type('options');

    if (options) {
      if ( !is('bool=', options.buffer) ) {
        throw _error.type('options.buffer');
      }
      if ( !is('bool=', options.catchExit) ) {
        throw _error.type('options.catchExit');
      }
      if ( !is('?str=', options.encoding) ) {
        throw _error.type('options.encoding');
      }
      if ( !is('?str=', options.eol) ) {
        throw _error.type('options.eol');
      }
      if ( options.eol && !_isEol(options.eol) ) {
        throw _error.range('options.eol', '"LF", "CR", "CRLF"');
      }
    }

    cmd = cmd.split(' ');
    options = _prepOptions(options);
    result = cp.spawnSync(cmd[0], _sliceArr(cmd, 1), options);

    if (result.error) throw _error('"' + result.error.toString() + '"');
    if (options.catchExit !== false && result.status) {
      throw _error('Failed exit code: ' + _getExitCode(result.status) + ' - ');
    }

    if (options.buffer) {
      return is.str(result.stdout) && options.eol
        ? _normalize(result.stdout, options.eol)
        : result.stdout;
    }

    result.stdout = result.stdout.toString();
    return options.eol ? _normalize(result.stdout, options.eol) : result.stdout;
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
    options.eol = is.undefined(options.eol) ? 'LF' : options.eol;
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
