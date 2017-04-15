/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: initTestModule
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var SETUP = '../../test/setup';

var Mocha = require('mocha');

var args = process.argv.slice(2);

initTestModule(args[0], args[1], args[2], args.slice(3));

/**
 * @private
 * @param {string} report
 * @param {string} slow
 * @param {string} setup
 * @param {!Array<string>} files
 */
function initTestModule(report, slow, setup, files) {

  /** @type {!Mocha} */
  var mocha;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  require(SETUP);

  mocha = new Mocha();
  mocha.slow(slow);
  mocha.reporter(report);
  mocha.ui('vitals');

  require(SETUP + '/' + setup);

  len = files.length;
  i = -1;
  while (++i < len) mocha.addFile(files[i]);

  mocha.run();
}
