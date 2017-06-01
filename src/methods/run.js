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

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @helper $normalize ../helpers/normalize.js
/// #}}} @on SOLO

/// #{{{ @super run
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var run = (function runPrivateScope() {

  /// #{{{ @docrefs run
  /// @docref [spawn]:(https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options)
  /// #}}} @docrefs run

  /// #{{{ @submethod main
  /// @section shell
  /// @method vitals.run
  /**
   * @description
   *   A shortcut for [child_process.spawnSync][spawn] that returns the
   *   contents of `stdout`. Note that @run is **considered unstable** as it
   *   does not yet have a test suite. It is also scheduled for a future
   *   rebuild and may be dropped in a future release. Use with caution and if
   *   possible help out by @contributing some unit tests or sharing your
   *   opinion in an @issue.
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

    /** @type {!Object<string, *>} */
    var result;
    /** @type {!Array<string>} */
    var args;
    /** @type {string} */
    var bin;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #cmd defined');

      case 1:
        /** @dict */
        opts = $cloneObj(_DFLT_OPTS);
        break;

      default:
        if ( $is.void(opts) || $is.nil(opts) ) {
          /** @dict */
          opts = $cloneObj(_DFLT_OPTS);
          break;
        }

        if ( !$is.obj(opts) )
          throw _mkTypeErr(new TYPE_ERR, 'opts', opts, '?Object=');

        /** @dict */
        opts = $cloneObj(opts);

        if ( !$own(opts, 'catchExit') || $is.void(opts['catchExit']) )
          opts['catchExit'] = YES;
        else if ( !$is.bool(opts['catchExit']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.catchExit', opts['catchExit'],
            'boolean=');

        if ( !$own(opts, 'buffer') || $is.void(opts['buffer']) )
          opts['buffer'] = NO;
        else if ( !$is.bool(opts['buffer']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.buffer', opts['buffer'],
            'boolean=');

        if ( !$own(opts, 'encoding') || $is.void(opts['encoding']) )
          opts['encoding'] = opts['buffer']
            ? VOID
            : 'utf8';
        else if ( !$is.str(opts['encoding']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.encoding', opts['encoding'],
            'string=');
        else if ( !opts['encoding'] )
          throw _mkErr(new ERR, 'invalid empty #opts.encoding `string`');

        if ( !$own(opts, 'eol') || $is.void(opts['eol']) )
          opts['eol'] = opts['buffer']
            ? NIL
            : 'LF';
        else if ( $is.str(opts['eol']) ) {
          if ( !$is.eol(opts['eol']) )
            throw _mkRangeErr(new RANGE_ERR, 'opts.eol',[ 'LF','CR','CRLF' ]);

          opts['eol'] = opts['eol']['toUpperCase']();
        }
        else if ( !$is.nil(opts['eol']) )
          throw _mkTypeErr(new TYPE_ERR, 'opts.eol', opts['eol'], '?string=');
        break;
    }

    if ( $is.str(cmd) ) {
      cmd = _trimSpace(cmd);
      cmd = cmd['split'](_ANY_SPACE);
    }
    else if ( $is._arr(cmd) )
      cmd = $sliceArr(cmd);
    else
      throw _mkTypeErr(new TYPE_ERR, 'cmd', cmd, '!Array|!Arguments|string');

    if (cmd['length'] < 1)
      throw _mkErr(new ERR, 'invalid empty #cmd defined');

    bin = cmd[0];
    args = $sliceArr(cmd, 1);

    if (!bin)
      throw _mkErr(new ERR, 'invalid empty #cmd defined');

    /** @dict */
    result = _spawn(bin, args, opts);

    if (result['error'])
      throw _mkErr(new ERR, '"' + result['error']['toString']() + '"');
    if (opts['catchExit'] && result['status'])
      throw _mkErr(new ERR, 'Failed exit code: ' +
        _getExitCode(result['status']) + ' - ');

    return _cleanStdout(result['stdout'], opts['eol'], opts['buffer']);
  }
  /// #}}} @submethod main

  /// #{{{ @group Run-Helpers

  /// #{{{ @const _DFLT_OPTS
  /**
   * @private
   * @const {!Object<string, *>}
   * @dict
   */
  var _DFLT_OPTS = {
    'eol': 'LF',
    'buffer': NO,
    'catchExit': YES,
    'encoding': 'utf8'
  };
  /// #}}} @const _DFLT_OPTS

  /// #{{{ @func _cleanStdout
  /**
   * @private
   * @param {(string|!Buffer)} stdout
   * @param {?string} eol
   * @param {boolean} preferBuffer
   * @return {(string|!Buffer)}
   */
  function _cleanStdout(stdout, eol, preferBuffer) {

    if ( !$is.str(stdout) ) {

      if (preferBuffer)
        return stdout;

      stdout = stdout['toString']();
    }

    return $is.str(eol)
      ? $normalize(stdout, eol)
      : stdout;
  }
  /// #}}} @func _cleanStdout

  /// #{{{ @group Spawn

  /// #{{{ @typedef SpawnSync-Return
  /*
   * @description
   *   The `object` returned by [child_process.spawnSync][spawn].
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
  /// #}}} @typedef SpawnSync-Return

  /// #{{{ @func _spawn
  /**
   * @private
   * @param {string} cmd
   * @param {!Array<string>} args
   * @param {!Object<string, *>} opts
   * @return {!Object<string, *>}
   */
  var _spawn = CP['spawnSync'];
  /// #}}} @func _spawn

  /// #}}} @group Spawn

  /// #{{{ @group Exit-Codes

  /// #{{{ @const _EXIT_CODES
  /**
   * @private
   * @const {!Array<string>}
   */
  var _EXIT_CODES = [
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
  /// #}}} @const _EXIT_CODES

  /// #{{{ @func _getExitCode
  /**
   * @private
   * @param {number} code
   * @return {string}
   */
  function _getExitCode(code) {
    return code >= 128
      ? code + ' - UNIX Signal Exit'
      : code + ' - ' + _EXIT_CODES[--code];
  }
  /// #}}} @func _getExitCode

  /// #}}} @group Exit-Codes

  /// #{{{ @group Space-Helpers

  /// #{{{ @const _ANY_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var _ANY_SPACE = /[ \t]+/;
  /// #}}} @const _ANY_SPACE

  /// #{{{ @const _END_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_SPACE = /[ \t]+$/;
  /// #}}} @const _END_SPACE

  /// #{{{ @const _START_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var _START_SPACE = /^[ \t]+/;
  /// #}}} @const _START_SPACE

  /// #{{{ @func _trimSpace
  /**
   * @private
   * @param {string} src
   * @return {string}
   */
  function _trimSpace(src) {
    src = src['replace'](_START_SPACE, '');
    return src['replace'](_END_SPACE, '');
  }
  /// #}}} @func _trimSpace

  /// #}}} @group Space-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('run');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Run-Helpers

  return run;
})();
/// #{{{ @off SOLO
vitals['run'] = run;
/// #}}} @off SOLO
/// #}}} @super run

/// #{{{ @on SOLO
var vitals = run;
vitals['run'] = run;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
