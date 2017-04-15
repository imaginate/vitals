/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkIndent
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * The number of spaces per indent.
 *
 * @private
 * @const {number}
 */
var INDENT_COUNT = 4;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

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
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} count
 * @return {string}
 */
function mkIndentMacro(count) {

  /** @type {string} */
  var indent;

  if ( !isNumber(count) )
    throw new TypeError('invalid `INDENT_COUNT` type (must be a number)');
  if ( !isWholeNumber(count) )
    throw new RangeError('invalid `INDENT_COUNT` value (must be a whole number)');
  if ( !isGT(count, 0) )
    throw new RangeError('invalid `INDENT_COUNT` value (must be greater than zero)');

  indent = ' ';
  while (--count)
    indent += ' ';
  return indent;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var INDENT_STRING = mkIndentMacro(INDENT_COUNT);

/**
 * @public
 * @param {number} depth
 * @return {string}
 */
module.exports = function mkIndent(depth) {

  /** @type {string} */
  var indent;

  if ( !isNumber(depth) )
    throw new TypeError('invalid `depth` type (must be a number)');
  if ( !isWholeNumber(depth) )
    throw new RangeError('invalid `depth` number (must be a whole number)');

  if ( isLT(depth, 1) )
    return '';

  indent = INDENT_STRING;
  while (--depth)
    indent += INDENT_STRING;
  return indent;
};
