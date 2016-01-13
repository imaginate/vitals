/**
 * -----------------------------------------------------------------------------
 * VITALS - SHELL METHOD - RUN
 * -----------------------------------------------------------------------------
 * @version 2.3.3
 * @see [vitals.run]{@link https://github.com/imaginate/vitals/blob/master/src/methods/run.js}
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

var newErrorAid = require('./_helpers/errorAid.js');
var _normalize = require('./_helpers/normalize.js');
var _sliceArr = require('./_helpers/sliceArr.js');
var _isEol = require('./_helpers/isEol.js');
var is = require('node-are').is;
var cp = require('child_process');


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


module.exports = run;
