/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDepth
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
 * @const {number}
 */
var INDENT_COUNT = require('./mk-indent.js').COUNT;

/**
 * @private
 * @const {!RegExp}
 */
var INDENT_PATT = /^ +/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../../get-match.js');

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

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} line
 * @param {boolean=} exact
 * @return {number}
 */
module.exports = function getDepth(line, exact) {

  /** @type {number} */
  var count;

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');

  if ( !line || !INDENT_PATT.test(line) )
    return 0;

  count = getMatch(line, INDENT_PATT).length;

  if ( !!exact && !!(count % INDENT_COUNT) )
    throw new Error('invalid indent count for `line`');

  if ( isLT(count, INDENT_COUNT) )
    return 0;

  count -= count % INDENT_COUNT;
  return count / INDENT_COUNT;
};
