/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkDetail
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
var LINE = / *\n +\*(?: {1,3}|\/\n)?/g;

/**
 * @private
 * @const {string}
 */
var TEMPLATE = require('../get-template.js')('body');

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
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} docs
 * @return {string}
 */
var trimCommentOpen = require('./trim-comment-open.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {string}
 */
var getMainMethod = require('./get-main-method.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getMethod = require('./get-method.js');

/**
 * @private
 * @param {string} method
 * @return {string}
 */
var getMethodID = require('../get-method-id.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var mkIntro = require('./mk-intro.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var mkParams = require('./mk-params.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var mkReturns = require('./mk-returns.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} docs
 *   The JSDoc details for one public method.
 * @return {string}
 */
module.exports = function mkDetail(docs) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var val;

  if ( !isString(docs) )
    throw new TypeError('invalid `docs` type (must be a string)');
  if ( !docs )
    throw new Error('invalid empty `docs` string');

  docs = trimCommentOpen(docs);
  lines = docs.split(LINE);
  method = getMethod(lines);

  result = TEMPLATE;

  val = mkIntro(lines);
  result = insertTag(result, 'intro', val);

  val = mkParams(lines);
  result = insertTag(result, 'params', val);

  val = mkReturns(lines);
  result = insertTag(result, 'returns', val);

  result = insertTag(result, 'method', method);

  val = getMainMethod(method);
  result = insertTag(result, 'main', val);

  val = getMethodID(method);
  result = insertTag(result, 'id', val);

  return result;
};
