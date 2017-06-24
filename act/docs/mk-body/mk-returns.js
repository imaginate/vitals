/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkReturns
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
 * @const {string}
 */
var TEMPLATE = require('../get-template.js')('body/returns');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
var insertTag = require('../insert-tag.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

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
 * @return {string}
 */
var getReturnType = require('./get-return-type.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @param {?Object=} opts
 * @param {number=} opts.depth = `0`
 * @param {boolean=} opts.html = `false`
 * @return {string}
 */
var parseDescription = require('./parse-description.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;
  /** @type {number} */
  var len;

  len = lines.length;
  start = 0;
  while ( isLT(start, len) && !isReturn(lines[start]) )
    ++start;

  return sliceArray(lines, start, -1);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function mkReturns(lines) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var value;

  lines = pruneLines(lines);

  result = TEMPLATE;

  value = getReturnType(lines);
  result = insertTag(result, 'type', value);

  lines = sliceArray(lines, 1);
  value = parseDescription(lines, { html: true });
  result = insertTag(result, 'description', value);

  return result;
};
