/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkParam
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
 * @const {string}
 */
var TEMPLATE = require('../get-template.js')('body/param');

/**
 * @private
 * @const {!RegExp}
 */
var TYPE = /[^{}]+(?=\})/;

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
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;

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
 * @param {string} line
 * @return {string}
 */
var trimParam = require('./trim-param.js');

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var trimParamTag = require('./trim-param-tag.js');

/**
 * @private
 * @param {string} src
 * @return {string}
 */
var trimSpace = require('./trim-space.js');

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var trimType = require('./trim-type.js');

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
var parseDescription = require('./parse-description.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function mkParam(lines) {

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

  line = trimSpace(lines[0]);

  line = trimParamTag(line);
  value = getMatch(line, TYPE);
  result = insertTag(result, 'type', value);

  line = trimType(line);
  value = getMatch(line, PARAM);
  result = insertTag(result, 'param', value);

  value = value.replace(/\./g, '-');
  result = insertTag(result, 'param-id', value);

  line = trimParam(line);
  value = DFLT.test(line)
    ? line.replace(DFLT, '$1')
    : '';
  result = insertTag(result, 'dflt', value);

  lines = sliceArray(lines, 1);
  value = parseDescription(lines, { html: true });
  result = insertTag(result, 'desc', value);

  return result;
};
