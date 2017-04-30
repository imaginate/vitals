/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getParams
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
var DFLT = /^=[ \t]*`([^`]+)`.*$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var PARAM = /^[a-zA-Z_.$]+/;

/**
 * @private
 * @const {!RegExp}
 */
var PARAM_TAG = /^@param/;

/**
 * @private
 * @const {!RegExp}
 */
var PROP = /^@param[ \t]+\{[^}]+\}[ \t]+[a-zA-Z_$]+\./;

/**
 * @private
 * @const {!RegExp}
 */
var RETURN_TAG = /^@return/;

/**
 * @private
 * @const {string}
 */
var TEMPLATE = require('../get-template.js')('body/param');

/**
 * @private
 * @const {!RegExp}
 */
var TYPE = /[^{}]+(?=\})/;

/**
 * @private
 * @const {!RegExp}
 */
var TYPE_TRIM = /^[^}]+\}[ \t]+/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

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
var isNumber = IS.number;

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

/**
 * @private
 * @param {string} src
 * @return {string}
 */
var trimSpace = require('./trim-space.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} lines
 * @param {?Object=} opts
 * @param {number=} opts.depth = `0`
 * @param {boolean=} opts.html = `false`
 * @return {string}
 */
var getDescription = require('./get-description.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
function parseParam(lines) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var value;
  /** @type {string} */
  var line;

  if ( !isGT(lines.length, 0) )
    return '';

  result = TEMPLATE;

  value = isNumber(lines.id) && isGT(lines.id, 0)
    ? lines.id.toString()
    : '';
  result = insertTag(result, 'index', value);

  line = lines[0].replace(PARAM_TAG, '');
  line = trimSpace(line);
  value = getMatch(line, TYPE);
  result = insertTag(result, 'type', value);

  line = line.replace(TYPE_TRIM, '');
  value = getMatch(line, PARAM);
  result = insertTag(result, 'param', value);

  value = value.replace(/\./g, '-');
  result = insertTag(result, 'param-id', value);

  line = line.replace(PARAM, '');
  line = trimSpace(line);
  value = DFLT.test(line)
    ? line.replace(DFLT, '$1')
    : '';
  result = insertTag(result, 'dflt', value);

  lines = sliceArray(lines, 1);
  value = getDescription(lines, { html: true });
  result = insertTag(result, 'desc', value);

  return result;
}

/**
 * @private
 * @param {!Array<!Array<string>>} params
 * @return {string}
 */
function parseParams(params) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  result = '';

  len = params.length;
  i = -1;
  while ( isLT(++i, len) )
    result += parseParam(params[i]);

  return result;
}

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
    if ( PARAM_TAG.test(lines[i]) ) {
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
  while ( isLT(end, len) && !RETURN_TAG.test(lines[end]) ) {
    if ( isUndefined(start) && PARAM_TAG.test(lines[end]) )
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
module.exports = function getParams(lines) {

  /** @type {!Array<!Array<string>>} */
  var params;

  lines = pruneLines(lines);
  params = prepParams(lines);
  return parseParams(params);
};
