/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: newBrowserTest
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newCmdMethod = require('./new-test-cmd-method');
var runTestCmd = require('./run-test-cmd');

/**
 * @param {string} section
 * @param {?function} callback
 * @return {function}
 */
module.exports = function newBrowserTest(section, callback) {

  /** @type {string} */
  var setup;
  /** @type {string} */
  var file;
  /** @type {string} */
  var grep;

  if (section === 'all') {
    file = 'vitals.js';
    grep = null;
  }
  else {
    file = 'vitals-' + section + '.js';
    grep = 'section:' + section;
  }

  file = 'browser/' + file;
  setup = 'browser/' + section + '.js';
  callback = newMinBrowserTest(file, setup, grep, callback);
  return function browserTest() {
    runTestCmd({
      'reporter': 'dot',
      'grep':     grep,
      'setup':    setup,
      'start':    newCmdMethod(true,  file),
      'close':    newCmdMethod(false, file, callback)
    });
  };
};

/**
 * @private
 * @param {string} file
 * @param {string} setup
 * @param {?string} grep
 * @param {?function} callback
 * @return {function}
 */
function newMinBrowserTest(file, setup, grep, callback) {
  setup = mkMinFile(setup);
  file = mkMinFile(file);
  return function minBrowserTest() {
    return runTestCmd({
      'reporter': 'dot',
      'grep':     grep,
      'setup':    setup,
      'start':    newCmdMethod(true,  file),
      'close':    newCmdMethod(false, file, callback)
    });
  };
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function mkMinFile(filepath) {
  return filepath.replace(/js$/, 'min.js');
}
