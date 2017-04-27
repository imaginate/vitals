/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getIntro
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
var PUBLIC_TAG = /^@public/;

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
 * @param {(!Object|function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
var sliceArray = require('../../slice-array.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {!Array<string>}
 */
var getDescription = require('./get-description.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var end;
  /** @type {number} */
  var len;

  len = lines.length;
  end = 0;
  while ( isLT(end, len) && !PUBLIC_TAG.test(lines[end]) )
    ++end;
  return sliceArray(lines, 0, end);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getIntro(lines) {
  lines = pruneLines(lines);
  return getDescription(lines, { html: true });
};
