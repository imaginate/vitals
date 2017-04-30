/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getReturnType
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
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var RETURN = /^@returns?/;

/**
 * @private
 * @const {!RegExp}
 */
var TYPE = /[^{}]+(?=\})/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {*} line
 * @return {boolean}
 */
function isReturn(line) {
  return isString(line) && RETURN.test(line);
}

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var trimReturnTag = require('./trim-return-tag.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getReturnType(lines) {

  /** @type {string} */
  var line;

  if ( !isGT(lines.length, 0) )
    return 'undefined';

  line = lines[0];

  if ( !isReturn(line) )
    return 'undefined';

  line = trimReturnTag(line);
  return getMatch(line, TYPE) || 'undefined';
};
