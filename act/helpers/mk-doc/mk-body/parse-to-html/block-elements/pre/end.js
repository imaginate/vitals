/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getEndIndex
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
 * @const {!RegExp}
 */
var CODE = /^ *```/;

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
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../../../../get-match.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {!RegExp}
 */
function mkPattern(line) {

  /** @type {string} */
  var source;

  source = getMatch(line, CODE);
  return new RegExp('^' + source);
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

  /** @type {!RegExp} */
  var pattern;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  pattern = mkPattern(lines[0]);
  len = lines.length;
  i = 0;
  while ( isLT(++i, len) ) {
    if ( pattern.test(lines[i]) )
      break;
  }
  return i;
};
