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

/** @type {!Object} */
var cp = require('child_process');


////////////////////////////////////////////////////////////////////////////////
// DEFINE EXEC
////////////////////////////////////////////////////////////////////////////////

/**
 * @global
 * @param {string} command
 * @param {Object=} options
 * @param {string=} options.cwd
 * @param {(string|!Buffer)=} options.input
 * @param {!Array=} options.stdio
 * @param {!Object=} options.env
 * @param {string=} options.shell
 * @param {number=} options.uid
 * @param {number=} options.gid
 * @param {number=} options.timeout
 * @param {string=} options.killSignal
 * @param {number=} options.maxBuffer
 * @param {string=} options.encoding
 * @return {(string|!Buffer)}
 */
function exec(command, options) {

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

  try {
    return cp.execSync(command, options);
  }
  catch (err) {
    log.error(
      'Failed `helpers.exec` Call',
      'error occurred within `child_process.execSync`',
      err.stack
    );
  }
}


////////////////////////////////////////////////////////////////////////////////
// EXPORT EXEC
////////////////////////////////////////////////////////////////////////////////

module.exports = exec;
