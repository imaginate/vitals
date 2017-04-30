/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkBody
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
var DOCS_OPEN = /\/\*\*\n +\* /;

/**
 * @private
 * @const {!RegExp}
 */
var DOCS_LINE = / *\n +\*(?: {1,3}|\/\n)?/g;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var PUBLIC_DOCS = /\/\*\*[^@]*?@public[\s\S]+?\*\/\n[a-zA-Z .'[\]_]+/g;

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
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {!Array<string>}
 */
var getMatches = require('../../get-matches.js');

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

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getIntro = require('./get-intro.js');

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
var getParams = require('./get-params.js');

/**
 * @private
 * @param {string} content
 * @return {!Object<string, string>}
 */
var getRefs = require('./get-refs.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getReturns = require('./get-returns.js');

/**
 * @private
 * @param {string} content
 * @param {!Object<string, string>} refs
 * @return {string}
 */
var insertRefs = require('./insert-refs.js');

/**
 * @private
 * @param {string} detail
 * @return {string}
 */
function mkDetail(detail) {

  /** @type {string} */
  var method;
  /** @type {string} */
  var result;
  /** @type {!Array<string>} */
  var lines;
  /** @type {string} */
  var val;

  detail = detail.replace(DOCS_OPEN, '');
  lines = detail.split(DOCS_LINE);
  method = getMethod(lines);

  result = TEMPLATE;

  val = getIntro(lines);
  result = insertTag(result, 'intro', val);

  val = getParams(lines);
  result = insertTag(result, 'params', val);

  val = getReturns(lines);
  result = insertTag(result, 'returns', val);

  result = insertTag(result, 'method', method);

  val = getMainMethod(method);
  result = insertTag(result, 'main', val);

  val = getMethodID(method);
  result = insertTag(result, 'id', val);

  return result;
}

/**
 * @private
 * @param {!Array<string>} details
 *   All of the public methods JSDoc.
 * @param {!Object<string, string>} refs
 * @return {string}
 */
function mkDetails(details, refs) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  result = '';

  len = details.length;
  i = -1;
  while ( isLT(++i, len) )
    result += mkDetail(details[i]);

  return insertRefs(result, refs);
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkBody(content, fscontent) {

  /** @type {!Array<string>} */
  var methods;
  /** @type {!Object<string, string>} */
  var refs;
  /** @type {string} */
  var body;

  methods = getMatches(content, PUBLIC_DOCS);

  if ( isLT(methods.length, 1) )
    throw new Error('no public methods found');

  refs = getRefs(content);
  body = mkDetails(methods, refs);

  if (fscontent) {
    methods = getMatches(fscontent, PUBLIC_DOCS);
    refs = getRefs(fscontent);
    body += mkDetails(methods, refs);
  }

  return body;
};
