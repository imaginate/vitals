/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: isIndented
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
 * @param {string} line
 * @param {boolean=} exact
 * @return {number}
 */
var getDepth = require('./get-depth.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

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
var isString = IS.string;

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
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} line
 * @param {number=} depth = `0`
 * @return {boolean}
 */
module.exports = function isIndented(line, depth) {

  /** @type {number} */
  var level;

  if ( isUndefined(depth) )
    depth = 0;

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');
  if ( !isNumber(depth) )
    throw new TypeError('invalid `depth` type (must be a number)');
  if ( !isWholeNumber(depth) )
    throw new RangeError('invalid `depth` number (must be a whole number)');
  if ( isLT(depth, 0) )
    throw new RangeError('invalid `depth` number (must be zero or greater)');

  level = getDepth(line);
  return isGT(level, depth);
};
