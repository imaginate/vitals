/**
 * ---------------------------------------------------------------------------
 * VITALS.RUN
 * ---------------------------------------------------------------------------
 * @section shell
 * @version 4.1.3
 * @see [vitals.run](https://github.com/imaginate/vitals/wiki/vitals.run)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $normalize = require('./helpers/normalize.js');
var $sliceArr = require('./helpers/slice-arr.js');
var $spawn = require('child_process')['spawnSync'];
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.RUN
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var run = (function runPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - run
  //////////////////////////////////////////////////////////

  /* {{{2 Run References
   * @ref [spawn]:(https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options)
   */

  /// {{{2
  /// @method run
  /**
   * A shortcut for [child_process.spawnSync][spawn] that returns the
   * contents of `stdout`. Note that @run is **considered unstable** as it
   * does not yet have a test suite. It is also scheduled for a future rebuild
   * and may be dropped in a future release. Use with caution and if possible
   * help out by @contributing some unit tests or sharing your opinion in an
   * @issue.
   *
   * @public
   * @param {(!Array|!Arguments|string)} cmd
   *   If the #cmd is a `string`, it is converted into an `array` using the
   *   pattern, `/[ \t]+/`, as the separator.
   * @param {?Object=} opts
   * @param {?string=} opts.eol = `"LF"`
   *   The end of line character to use when normalizing the result. If
   *   #opts.eol is `null` or if #opts.buffer is `true` and #opts.eol is
   *   `undefined`, no normalization is completed. Following are the `string`
   *   options available for #opts.eol (note that the options are **not**
   *   case-sensitive):
   *   - `"LF"`
   *   - `"CR"`
   *   - `"CRLF"`
   * @param {boolean=} opts.buffer = `false`
   *   If #opts.buffer is `true` and the `stdout` result returned from
   *   [child_process.spawnSync][spawn] is a `Buffer`, the `stdout` `Buffer`
   *   is returned. Otherwise, the `stdout` result is converted into a
   *   `string` before it is returned.
   * @param {boolean=} opts.catchExit = `true`
   *   If the process is exited with an error code, an error is logged.
   * @param {string=} opts.encoding = `"utf8"`
   *   If #opts.buffer is `true` and #opts.encoding is `undefined`, no
   *   encoding is given to [child_process.spawnSync][spawn].
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

    /// {{{3 child_process.spawnSync Return Value
    /*
     * The `object` returned by [cp.spawnSync][spawn].
     *
     * @typedef {{
     *   pid:    number,
     *   output: !Array,
     *   stdout: (!Buffer|string),
     *   stderr: (!Buffer|string),
     *   status: number,
     *   signal: string,
     *   error:  ?Error
     * }} SpawnSyncResult
     */
    /// }}}3

    /** @type {!Object<string, *>} */
    var result;
    /** @type {(!Buffer|string)} */
    var stdout;
    /** @type {!Array<string>} */
    var args;
    /** @type {string} */
    var bin;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #cmd defined');

      case 1:
        /** @dict */
        opts = copy['object'](OPTS, true);
        break;

      default:
        if ( $is.none(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = copy['object'](OPTS, true);
          break;
        }

        if ( !$is.obj(opts) )
          throw $typeErr(new TypeError, 'opts', opts, '?Object=');

        /** @dict */
        opts = copy['object'](opts);

        if ( !$own(opts, 'catchExit') || $is.none(opts['catchExit']) )
          opts['catchExit'] = true;
        else if ( !$is.bool(opts['catchExit']) )
          throw $typeErr(new TypeError, 'opts.catchExit', opts['catchExit'],
            'boolean=');

        if ( !$own(opts, 'buffer') || $is.none(opts['buffer']) )
          opts['buffer'] = false;
        else if ( !$is.bool(opts['buffer']) )
          throw $typeErr(new TypeError, 'opts.buffer', opts['buffer'],
            'boolean=');

        if ( !$own(opts, 'encoding') || $is.none(opts['encoding']) )
          opts['encoding'] = opts['buffer']
            ? NONE
            : 'utf8';
        else if ( !$is.str(opts['encoding']) )
          throw $typeErr(new TypeError, 'opts.encoding', opts['encoding'],
            'string=');
        else if ( !opts['encoding'] )
          throw $err(new Error, 'invalid empty #opts.encoding `string`');

        if ( !$own(opts, 'eol') || $is.none(opts['eol']) )
          opts['eol'] = opts['buffer']
            ? null
            : 'LF';
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw $rangeErr(new RangeError, 'opts.eol', [ 'LF','CR','CRLF' ]);

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw $typeErr(new TypeError, 'opts.eol', opts['eol'], '?string=');
        break;
    }

    if ( $is.str(cmd) ) {
      cmd = cmd['replace'](START_SPACE, '');
      cmd = cmd['replace'](END_SPACE, '');
      cmd = cmd['split'](ANY_SPACE);
    }
    else if ( $is._arr(cmd) )
      cmd = $sliceArr(cmd);
    else
      throw $typeErr(new TypeError, 'cmd', cmd, '(!Array|!Arguments|string)');

    if (cmd['length'] < 1)
      throw $err(new Error, 'invalid empty #cmd defined');

    bin = cmd[0];
    args = $sliceArr(cmd, 1);

    /** @dict */
    result = $spawn(bin, args, opts);

    if (result['error'])
      throw $err(new Error, '"' + result['error']['toString']() + '"');
    if (opts['catchExit'] && result['status'])
      throw $err(new Error, 'Failed exit code: ' +
        _getExitCode(result['status']) + ' - ');

    stdout = result['stdout'];

    if ( !$is.str(stdout) ) {

      if (opts['buffer'])
        return stdout;

      stdout = stdout['toString']();
    }

    if ( $is.str(opts['eol']) )
      stdout = $normalize(stdout, opts['eol']);

    return stdout;
  }

  ///////////////////////////////////////////////////// {{{2
  // RUN HELPERS - EXIT CODES
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const EXIT_CODES
  /**
   * @private
   * @const {!Array<string>}
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

  /// {{{3
  /// @func _getExitCode
  /**
   * @private
   * @param {number} code
   * @return {string}
   */
  function _getExitCode(code) {
    return code >= 128
      ? code + ' - UNIX Signal Exit'
      : code + ' - ' + EXIT_CODES[--code];
  }

  ///////////////////////////////////////////////////// {{{2
  // RUN HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @const ANY_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var ANY_SPACE = /[ \t]+/;

  /// {{{3
  /// @const START_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var START_SPACE = /^[ \t]+/;

  /// {{{3
  /// @const END_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var END_SPACE = /[ \t]+$/;

  /// {{{3
  /// @const OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var OPTS = {
    'eol': 'LF',
    'buffer': false,
    'catchExit': true,
    'encoding': 'utf8'
  };

  ///////////////////////////////////////////////////// {{{2
  // RUN HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('run');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
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
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.RUN
  return run;
})();
/// }}}1

module.exports = run;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
