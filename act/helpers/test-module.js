/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: initTestModule
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStrings = IS.strings;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

/**
 * @private
 * @param {(!Object|function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
var sliceArray = require('./slice-array.js');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var REPO_DIR = require('./get-repo-root.js')();

/**
 * @private
 * @const {string}
 */
var TEST_SETUP_DIR = resolvePath(REPO_DIR, './test/setup');

/**
 * @private
 * @const {string}
 */
var TEST_SETUP = resolvePath(TEST_SETUP_DIR, './index.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @constructor
 * @return {!Mocha}
 */
var Mocha = require('mocha');

/**
 * @private
 * @param {string} reporter
 * @param {string} slow
 * @param {string} setup
 * @param {!Array<string>} files
 */
function initTestModule(reporter, slow, setup, files) {

  /** @type {!Mocha} */
  var mocha;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isString(reporter) )
    throw new TypeError('invalid `reporter` type (must be a string)');
  if ( !isString(slow) )
    throw new TypeError('invalid `slow` type (must be a string)');
  if ( !isString(setup) )
    throw new TypeError('invalid `setup` type (must be a string)');
  if ( !isStrings(files) )
    throw new TypeError('invalid `files` type (must be an array of strings)');

  require(TEST_SETUP);

  mocha = new Mocha();
  mocha.slow(slow);
  mocha.reporter(reporter);
  mocha.ui('vitals');

  setup = resolvePath(TEST_SETUP_DIR, setup);
  require(setup);

  len = files.length;
  i = -1;
  while ( isLT(++i, len) )
    mocha.addFile(files[i]);

  mocha.run();
}

////////////////////////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Array}
 */
var args = sliceArray(process.argv, 2);

initTestModule(args[0], args[1], args[2], sliceArray(args, 3));
