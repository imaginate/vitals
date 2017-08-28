/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseBlockElements
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// TYPEDEFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {{
 *   end:   function(!Array<string>, number): number,
 *   id:    string,
 *   parse: function(!Array<string>, number): string,
 *   test:  function(string): boolean
 * }} BlockElement
 */

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, !BlockElement>}
 */
var BLOCK_ELEMS = require('./block-elements/index.js');

/**
 * @private
 * @const {!BlockElement}
 */
var DEFAULT_ELEM = BLOCK_ELEMS.p;

/**
 * @private
 * @const {!Array<!BlockElement>}
 */
var ELEM_LIST = [
  BLOCK_ELEMS.h,
  BLOCK_ELEMS.ul,
  BLOCK_ELEMS.ol,
  BLOCK_ELEMS.hr,
  BLOCK_ELEMS.pre,
  BLOCK_ELEMS.quote
];

/**
 * @private
 * @const {number}
 */
var ELEM_LIST_LEN = ELEM_LIST.length;

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
 * @param {number} depth
 * @return {boolean}
 */
var isEmpty = require('./is-empty.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {string} line
 * @param {number=} depth = `0`
 * @return {boolean}
 */
var isIndented = require('./is-indented.js');

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

/**
 * @private
 * @param {(!Object|function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
var sliceArray = require('../../../slice-array.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {!BlockElement}
 */
function matchElement(line) {

  /** @type {!BlockElement} */
  var elem;
  /** @type {number} */
  var i;

  i = -1;
  while ( isLT(++i, ELEM_LIST_LEN) ) {
    elem = ELEM_LIST[i];
    if ( elem.test(line) )
      return elem;
  }
  return DEFAULT_ELEM;
}

/**
 * @private
 * @param {!Array<string>} _lines
 * @param {number} _depth
 * @return {string}
 */
function parseBlocks(_lines, _depth) {

  /**
   * @private
   * @const {number}
   */
  var DEPTH = _depth;

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
  function parseBlock(lines) {

    /** @type {?BlockElement} */
    var elem;
    /** @type {number} */
    var end;

    lines = trimEmpty(lines, DEPTH);

    if ( !isGT(lines.length, 0) )
      return [];

    if ( isIndented(lines[0], DEPTH) )
      throw new Error('invalid `line` indention for `' + lines[0] + '`');

    elem = matchElement(lines[0]);
    end = elem.end(lines, DEPTH);
    lines = sliceArray(lines, 0, end);
    $result += elem.parse(lines, DEPTH);
    return sliceArray($lines, end);
  }

  while ( isGT($lines.length, 0) )
    $lines = parseBlock($lines);
  return $result;
}

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {!Array<string>}
 */
function trimEmpty(lines, depth) {
  while ( isGT(lines.length, 0) && isEmpty(lines[0], depth) )
    lines.shift();
  return lines;
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number=} depth = `0`
 * @return {string}
 */
module.exports = function parseBlockElements(lines, depth) {

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

  return isGT(lines.length, 0)
    ? parseBlocks(lines, depth)
    : '';
};
