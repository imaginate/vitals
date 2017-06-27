/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseToHtml
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
var IS = require('../../../is.js');

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
var isNumber = IS.number;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStrings = IS.strings;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number=} depth = `0`
 * @return {string}
 */
var parseBlockElements = require('./parse-block.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number=} depth = `0`
 * @return {string}
 */
module.exports = function parseToHtml(lines, depth) {

  if ( isUndefined(depth) )
    depth = 0;

  if ( !isStrings(lines) )
    throw new TypeError('invalid `lines` type (must be an array of strings)');
  if ( !isNumber(depth) )
    throw new TypeError('invalid `depth` type (must be a number)');
  if ( !isWholeNumber(depth) )
    throw new RangeError('invalid `depth` number (must be a whole number)');
  if ( isLT(depth, 0) )
    throw new RangeError('invalid `depth` number (must be zero or greater)');

  return parseBlockElements(lines, depth);
};
