/**
 * -----------------------------------------------------------------------------
 * SHELL HELPER - EXEC
 * -----------------------------------------------------------------------------
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

// append global helpers if they do not exist
if (!global.__basics) require('./basics');

/** @type {!Object} */
var cp = require('child_process');


////////////////////////////////////////////////////////////////////////////////
// DEFINE EXEC
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {(!Buffer|string)} BuffStr
 */

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
 * @global
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
 * @param {BuffStr=} options.input
 * @param {!Object=} options.env
 * @param {number=} options.uid
 * @param {number=} options.gid
 * @param {number=} options.timeout
 * @param {string=} options.killSignal
 * @param {number=} options.maxBuffer
 * @return {BuffStr}
 */
module.exports = function exec(cmd, options) {

  /** @type {(SpawnResult|BuffStr)} */
  var result;
  /** @type {!Array} */
  var args;
  /** @type {?string} */
  var eol;

  if ( !is.str(cmd) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `cmd` param',
    { argMap: true, command: cmd }
  );

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options` param',
    { argMap: true, command: cmd, options: options }
  );

  options = options || {};

  if ( !is('bool=', options.buffer) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options.buffer` param',
    { argMap: true, command: cmd, options: options }
  );

  if ( !is('bool=', options.catchExit) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options.catchExit` param',
    { argMap: true, command: cmd, options: options }
  );

  if ( !is('str=', options.encoding) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options.encoding` param',
    { argMap: true, command: cmd, options: options }
  );

  if ( !is('?str=', options.eol) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options.eol` param',
    { argMap: true, command: cmd, options: options }
  );

  if (options.buffer) {
    options.eol = options.eol || null;
  }
  else {
    options.encoding = options.encoding || 'utf8';
  }

  eol = is.str(options.eol)
    ? options.eol.toUpperCase()
    : is.null(options.eol)
      ? null
      : 'LF';

  if ( eol && !has(EOL.chars, eol) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid `options.eol` param (valid: null, "LF", "CR", "CRLF")',
    { argMap: true, command: cmd, options: options }
  );

  args = cmd.split(' ');
  cmd  = args.shift();

  if ( has(cp, 'spawnSync') ) {
    result = cp.spawnSync(cmd, args, options);
  }
  else {
    result = require('shelljs').exec(cmd, { silent: true });
    result.stdout = result.output;
    result.status = result.code;
  }

  if (result.error) log.error('Failed `helpers.exec` Call', result.error, {
    syscall: result.error.syscall,
    errno:   result.error.errno,
    code:    result.error.code
  });

  if (options.catchExit !== false && result.status) log.error(
    'Failed `helpers.exec` Call',
    'an error code was used to exit the command\'s process',
    { exitCode: getExitCode(result.status) }
  );

  result = result.stdout;

  if ( is.buffer(result) ) {
    if (options.buffer) return result;
    result = result.toString();
  }

  return eol ? normalizeEOL(result, eol) : result;
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Object}
 * @const
 */
var EOL = {
  chars: {
    'CRLF': '\r\n',
    'CR':   '\r',
    'LF':   '\n'
  },
  find: {
    'CRLF': /\r?\n|\r\n?/g,
    'CR':   /\r?\n/g,
    'LF':   /\r\n?/g
  }
};

/**
 * @private
 * @param {string} str
 * @param {string=} eol
 * @return {string}
 */
function normalizeEOL(str, eol) {
  eol = eol || 'LF';
  return str.replace(EOL.find[eol], EOL.chars[eol]);
}

/**
 * @private
 * @type {!Array}
 * @const
 */
var EXIT_CODES = freeze([
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
]);

/**
 * @private
 * @param {number} code
 * @return {string}
 */
function getExitCode(code) {
  if (code >= 128) return code + ': UNIX Signal Exit';
  return code + ': ' + EXIT_CODES[--code];
}
