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
var OPEN = /^( *)[0-9]+\)/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var POINT = /[0-9]+/;

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
 * @param {string} line
 * @return {number}
 */
function getPoint(line) {

  /** @type {string} */
  var point;

  point = getMatch(line, POINT);
  return Number(point);
}

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
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isNE = IS.notEqualTo;

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
   * @type {number}
   */
  var $point = 0;

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

    /** @type {number} */
    var point;
    /** @type {string} */
    var line;
    /** @type {number} */
    var len;
    /** @type {number} */
    var end;

    point = getPoint(lines[0]);

    if ( isNE(point, ++$point) )
      throw new Error('invalid `bullet point` at `' + lines[0] + '` (must be sequential starting with 1)');

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

  result = '<ol>';
  result += parseItems(lines, depth);
  result += '</ol>';

  return result;
};
