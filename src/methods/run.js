/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: run
 * -----------------------------------------------------------------------------
 * @section shell
 * @version 4.1.3
 * @see [vitals.run](https://github.com/imaginate/vitals/wiki/vitals.run)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var normalize = require('./helpers/normalize.js');
var sliceArr = require('./helpers/slice-arr.js');
var _is = require('./helpers/is.js');
var cp = require('child_process');


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


module.exports = run;
