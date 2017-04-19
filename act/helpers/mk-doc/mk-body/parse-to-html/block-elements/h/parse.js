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
var CLOSE = /#+$/;

/**
 * @private
 * @const {!RegExp}
 */
var OPEN = /^#+/;

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
 * @return {string}
 */
var trimSpace = require('../../trim-space.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @return {string}
 */
var parseInline = require('../../parse-inline.js');

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
  var source;
  /** @type {number} */
  var size;

  source = trimSpace(lines[0]);
  size = getMatch(source, OPEN).length;
  source = source.replace(OPEN, '');
  source = source.replace(CLOSE, '');
  result = '<h' + size + '>';
  result += parseInline(source);
  result += '</h' + size + '>';
  return result;
};
