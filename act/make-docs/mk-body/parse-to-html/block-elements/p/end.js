/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getEndIndex
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
var IS = require('../../../../../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid dirnames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute dirpaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   A pattern for matching valid dirnames.
 * @param {?RegExp=} opts.invalid = `/^\.git|\.bak|node_modules|vendor|tmp|logs?$/`
 *   A pattern for matching invalid dirnames.
 * @return {!Array<string>}
 */
var getDirpaths = require('../../../../../get-dirpaths.js');

/**
 * @private
 * @param {string} line
 * @param {number} depth
 * @return {boolean}
 */
var isEmpty = require('../../is-empty.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('../../../../../resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// BUILDER
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @return {!Array<function(string): boolean>}
 */
function mkElemTests(dirpath) {

  /** @type {!Array<function(string): boolean>} */
  var tests;
  /** @type {!Array<string>} */
  var paths;
  /** @type {function(string): boolean} */
  var test;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  tests = [];
  paths = getDirpaths(dirpath, {
    deep:    false,
    full:    true,
    valid:   /^[a-z]+$/,
    invalid: /^p|tmp|logs?$/
  });
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    path = resolvePath(paths[i], './test.js');
    test = require(path);
    tests.push(test);
  }
  return tests;
}

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var BLOCK_ELEM_DIR = resolvePath(__dirname, '..');

/**
 * @private
 * @const {!Array<function(string): boolean>}
 */
var ELEM_TESTS = mkElemTests(BLOCK_ELEM_DIR);

/**
 * @private
 * @const {number}
 */
var ELEM_TESTS_LEN = ELEM_TESTS.length;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function matchElement(line) {

  /** @type {number} */
  var i;

  i = -1;
  while ( isLT(++i, ELEM_TESTS_LEN) ) {
    if ( ELEM_TESTS[i](line) )
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {number}
 */
module.exports = function getEndIndex(lines, depth) {

  /** @type {string} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = lines.length;
  i = 0;
  while ( isLT(++i, len) ) {
    line = lines[i];
    if ( isEmpty(line, depth) || matchElement(line) )
      break;
  }
  return i;
};
