/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkParams
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

/**
 * @private
 * @const {!RegExp}
 */
var PARAM = /^@param/;

/**
 * @private
 * @const {!RegExp}
 */
var PROP = /^@param[ \t]+\{[^}]+\}[ \t]+[a-zA-Z_$]+\./;

/**
 * @private
 * @const {!RegExp}
 */
var RETURN = /^@return/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

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
var isUndefined = IS.undefined;

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
var mkParam = require('./mk-param.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<!Array<string>>}
 */
function prepParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;
  /** @type {!Array<string>} */
  var param;
  /** @type {number} */
  var start;
  /** @type {number} */
  var len;
  /** @type {number} */
  var id;
  /** @type {number} */
  var i;

  if ( !isGT(lines.length, 0) )
    return [];

  params = [];
  start = 0;
  id = 0;

  len = lines.length;
  i = 0;
  while ( isLT(++i, len) ) {
    if ( PARAM.test(lines[i]) ) {
      param = sliceArray(lines, start, i);
      if ( !PROP.test(param[0]) )
        param.id = ++id;
      params.push(param);
      start = i;
    }
  }

  param = sliceArray(lines, start);
  if ( !PROP.test(param[0]) )
    param.id = ++id;
  params.push(param);

  return params;
}

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;
  /** @type {number} */
  var end;
  /** @type {number} */
  var len;

  len = lines.length - 1;
  end = 0;
  while ( isLT(end, len) && !RETURN.test(lines[end]) ) {
    if ( isUndefined(start) && PARAM.test(lines[end]) )
      start = end;
    ++end;
  }

  return isUndefined(start)
    ? []
    : sliceArray(lines, start, end);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function mkParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;
  /** @type {string} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  lines = pruneLines(lines);
  params = prepParams(lines);

  result = '';

  len = params.length;
  i = -1;
  while ( isLT(++i, len) )
    result += mkParam(params[i]);

  return result;
};
