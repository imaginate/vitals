/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkMethodRows
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
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

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
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var mkMethodRow = require('./mk-method-row.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string} section
 * @return {string}
 */
module.exports = function mkMethodRows(content, section) {

  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var rows;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !content )
    throw new Error('invalid empty `content` string');
  if ( !isString(section) )
    throw new TypeError('invalid `section` type (must be a string)');
  if ( !section )
    throw new Error('invalid empty `section` string');

  rows = '';

  lines = content.split('\n');
  len = lines.length;
  i = -1;
  while ( isLT(++i, len) )
    rows += mkMethodRow(lines[i]);

  rows = insertTag(rows, 'section', section);

  return rows;
};
