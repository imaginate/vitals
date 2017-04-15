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

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} filepath
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFileContent = require('../../get-file-content.js');

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {!Array<string>}
 */
var getMatches = require('../../get-matches.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('../../resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// MACROS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var TMPL_PATH = resolvePath(__dirname, '../templates/body.md');

/**
 * @private
 * @const {string}
 */
var TEMPLATE = getFileContent(TMPL_PATH);

////////////////////////////////////////////////////////////////////////////////
// GET METHODS
////////////////////////////////////////////////////////////////////////////////

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
var getTests = require('./get-tests.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getIntro = require('./get-intro.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getParams = require('./get-params.js');

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
var getReturns = require('./get-returns.js');

////////////////////////////////////////////////////////////////////////////////
// MAKE METHODS
////////////////////////////////////////////////////////////////////////////////

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
  var part;

  detail = detail.replace(DOCS_OPEN, '');
  lines = detail.split(DOCS_LINE);

  result = TEMPLATE;

  method = getMethod(lines);
  result = result.replace('{{ method }}', method);

  part = getTests(method);
  result = result.replace('{{ tests }}', part);

  part = getIntro(lines);
  result = result.replace('{{ intro }}', part);

  part = getParams(lines);
  result = result.replace('{{ params }}', part);

  part = getReturns(lines);
  result = result.replace('{{ returns }}', part);

  return result;
}

/**
 * @private
 * @param {!Array<string>} details - All of the public methods JSDoc.
 * @return {string}
 */
function mkDetails(details) {

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
  return result;
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
  /** @type {string} */
  var body;

  methods = getMatches(content, PUBLIC_DOCS);

  if ( isLT(methods.length, 1) )
    throw new Error('no public methods found');

  body = mkDetails(methods);

  if (fscontent) {
    methods = getMatches(fscontent, PUBLIC_DOCS);
    body += mkDetails(methods);
  }

  return body;
};
