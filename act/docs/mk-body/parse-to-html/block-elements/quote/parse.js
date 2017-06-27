/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseElement
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
 * @const {!RegExp}
 */
var EMPTY = /^ *>+$/;

/**
 * @private
 * @const {!RegExp}
 */
var VALID = /^ *>+ /;

/**
 * @private
 * @const {!RegExp}
 */
var OPEN = /^( *)>+/;

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
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {string} line
 * @return {boolean}
 */
function isValidQuote(line) {
  return VALID.test(line) || EMPTY.test(line);
}

/**
 * @private
 * @param {(!Object|function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
var sliceArray = require('../../../../../slice-array.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
var parseBlock = require('../../parse-block.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
module.exports = function parseElement(lines, depth) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var line;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  lines = sliceArray(lines);
  len = lines.length;
  i = -1;
  while ( isLT(++i, len) ) {
    line = lines[i];

    if ( !isValidQuote(line) )
      throw new Error('invalid `blockquote` at `' + line + '` (missing leading space)');

    lines[i] = line.replace(OPEN, '$1 ');
  }

  result = '<blockquote>';
  result += parseBlock(lines, ++depth);
  result += '</blockquote>';

  return result;
};
