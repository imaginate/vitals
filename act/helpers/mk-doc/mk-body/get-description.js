/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDescription
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
var NON_DESC = /^(?:@param \{[^}]+\} [a-zA-Z.]+ *-? *(?:\[default= [^\]]+\])?|@returns? \{[^}]+\} *-? *)/;

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
var isObject = IS.object;

/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;

/**
 * @private
 * @param {(!Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
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
 * @return {string}
 */
var parseToHtml = require('./parse-to-html/index.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
var parseToMdown = require('./parse-to-mdown.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {?Object=} opts
 * @param {number=} opts.depth
 * @param {boolean=} opts.html
 * @return {string}
 */
module.exports = function getDescription(lines, opts) {

  /** @type {number} */
  var depth;

  if ( isLT(lines.length, 1) )
    return '';

  if ( !isObject(opts) )
    opts = {};

  depth = isNumber(opts.depth) && isWholeNumber(opts.depth)
    ? opts.depth
    : 0;

  lines = sliceArray(lines);
  if ( !!lines[0] )
    lines[0] = lines[0].replace(NON_DESC, '');
  if ( !lines[0] )
    lines.shift();

  return !!opts.html
    ? parseToHtml(lines, depth)
    : parseToMdown(lines, depth);
};
