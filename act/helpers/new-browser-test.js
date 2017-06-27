/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newBrowserTest
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} path
 * @return {string}
 */
function mkMinifiedPath(path) {
  path = trimFileExtJS(path);
  return path + '.min.js';
}

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimFileExtJS = require('./trim-file-ext.js').construct('.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} file
 * @param {string} setup
 * @param {string} section
 * @param {?function} callback
 * @return {function}
 */
function newMinBrowserTest(file, setup, section, callback) {
  setup = mkMinifiedPath(setup);
  file = mkMinifiedPath(file);
  return function minBrowserTest() {
    return runTestCmd({
      'reporter': 'dotty',
      'section': section,
      'setup': setup,
      'start': newTestCmdMethod(true, file),
      'close': newTestCmdMethod(false, file, callback)
    });
  };
}

/**
 * @private
 * @param {boolean} start
 *   If `true`, it is a start method. If `false`, it is a close method.
 * @param {string=} name
 *   The name to log.
 * @param {?function=} callback
 * @return {!TestCmdMethod}
 */
var newTestCmdMethod = require('./new-test-cmd-method.js');

/**
 * @private
 * @param {(?Object|TestCmd)} opts
 * @param {?TestCmdMethod=} opts.start = `null`
 * @param {?TestCmdMethod=} opts.close = `null`
 * @param {string=} opts.reporter = `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {string=} opts.setup = `"methods"`
 * @param {string=} opts.method = `""`
 *   Test only a specific method.
 * @param {string=} opts.section = `""`
 *   Test only a specific section.
 * @param {string=} opts.submethod = `""`
 *   Test only a specific submethod.
 */
var runTestCmd = require('./run-test-cmd.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} section
 * @param {?function} callback
 * @return {function}
 */
module.exports = function newBrowserTest(section, callback) {

  /** @type {string} */
  var setup;
  /** @type {string} */
  var file;

  file = (section === 'all')
    ? 'vitals.js'
    : 'vitals-' + section + '.js';
  file = 'browser/' + file;
  setup = 'browser/' + section + '.js';
  section = (section === 'all')
    ? '!fs|shell'
    : section;
  callback = newMinBrowserTest(file, setup, section, callback);
  return function browserTest() {
    runTestCmd({
      'reporter': 'dotty',
      'section': section,
      'setup': setup,
      'start': newTestCmdMethod(true, file),
      'close': newTestCmdMethod(false, file, callback)
    });
  };
};
