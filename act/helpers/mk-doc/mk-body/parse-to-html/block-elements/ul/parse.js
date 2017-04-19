/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseElement
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
var OPEN = /^( *)-/;

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
 * @param {string} line
 * @param {number=} depth = `0`
 * @return {boolean}
 */
var isIndented = require('../../is-indented.js');

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

/**
 * @private
 * @param {!Array<string>} _lines
 * @param {number} _depth
 * @return {string}
 */
function parseItems(_lines, _depth) {

  /**
   * @private
   * @const {number}
   */
  var DEPTH = _depth;

  /**
   * @private
   * @const {number}
   */
  var $depth = _depth + 1;

  /**
   * @private
   * @type {!Array<string>}
   */
  var $lines = sliceArray(_lines);

  /**
   * @private
   * @type {string}
   */
  var $result = '';

  /**
   * @private
   * @param {!Array<string>} lines
   * @return {!Array<string>}
   */
  function parseItem(lines) {

    /** @type {string} */
    var line;
    /** @type {number} */
    var len;
    /** @type {number} */
    var end;

    lines[0] = lines[0].replace(OPEN, '$1 ');

    len = lines.length;
    end = 1;
    while ( isLT(end, len) && isIndented(lines[end], DEPTH) )
      ++end;

    lines = sliceArray(lines, 0, end);

    $result += '<li>';
    $result += parseBlock(lines, $depth);
    $result += '</li>';

    return sliceArray($lines, end);
  }

  while ( isGT($lines.length, 0) )
    $lines = parseItem($lines);
  return $result;
}

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

  result = '<ul>';
  result += parseItems(lines, depth);
  result += '</ul>';

  return result;
};
