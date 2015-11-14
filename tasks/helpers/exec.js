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
 * @param {string} command
 * @param {Object=} options
 * @param {string=} options.result - [default= "string"] Note that if stdout is
 *   already a string and options.result is "buffer", a string will be returned.
 *   valid strings: "buffer", "buff", "buf", "string", "str"
 * @param {boolean=} options.catchExit - [default= true] If process is exited
 *   with an error code an error is logged.
 * @param {string=} options.cwd
 * @param {BuffStr=} options.input
 * @param {!Object=} options.env
 * @param {number=} options.uid
 * @param {number=} options.gid
 * @param {number=} options.timeout
 * @param {string=} options.killSignal
 * @param {number=} options.maxBuffer
 * @param {string=} options.encoding
 * @return {BuffStr}
 */
module.exports = function exec(command, options) {

  /** @type {SpawnResult} */
  var result;
  /** @type {!Array} */
  var args;

  if ( !is.str(command) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `command` param',
    { argMap: true, command: command }
  );

  if ( !is('obj=', options) ) log.error(
    'Invalid `helpers.exec` Call',
    'invalid type for `options` param',
    { argMap: true, command: command, options: options }
  );

  options = options || {};
  if ( !is.str(options.result)     ) options.result = 'string';
  if ( !is.bool(options.catchExit) ) options.catchExit = true;

  args = command.split(' ');
  command = args.shift();
  result = cp.spawnSync(command, args, options);

  if (result.error) log.error('Failed `helpers.exec` Call', result.error, {
    syscall: result.error.syscall,
    errno:   result.error.errno,
    code:    result.error.code
  });

  if (options.catchExit && result.status) log.error(
    'Failed `helpers.exec` Call',
    'an error code was used to exit the command\'s process',
    { exitCode: getExitCode(result.status) }
  );

  return has(options.result, /^buff?(?:er)?$/i)
    ? result.stdout
    : result.stdout.toString();
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

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
