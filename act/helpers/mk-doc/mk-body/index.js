/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkBody
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var get = require('../../get-matches');
var getFile = require('../../get-file');

var GET = /\/\*\*[^@]*?@public[\s\S]+?\*\/\n[a-zA-Z .'[\]_]+/g;
var TRIM = /\/\*\*\n +\* /;
var SPLIT = / *\n +\*(?: {1,3}|\/\n)?/g;

var TEMPLATE = getFile('act-tasks/helpers/mk-doc/templates/body.md');

var getMethod  = require('./get-method');
var getTests   = require('./get-tests');
var getIntro   = require('./get-intro');
var getParams  = require('./get-params');
var getReturns = require('./get-returns');

/**
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkBody(content, fscontent) {

  /** @type {!Array<string>} */
  var methods;
  /** @type {string} */
  var body;

  methods = get(content, GET);

  if (!methods.length) throw new Error('no public methods found');

  body = mkDetails(methods);

  if (fscontent) {
    methods = get(fscontent, GET);
    body = body + mkDetails(methods);
  }

  return body;
};

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
  while (++i < len) result += mkDetail(details[i]);
  return result;
}

/**
 * @private
 * @param {string} detail
 * @return {string}
 */
function mkDetail(detail) {

  /** @type {string} */
  var returns;
  /** @type {string} */
  var method;
  /** @type {string} */
  var params;
  /** @type {string} */
  var tests;
  /** @type {string} */
  var intro;
  /** @type {!Array<string>} */
  var lines;

  detail  = detail.replace(TRIM, '');
  lines   = detail.split(SPLIT);
  method  = getMethod(lines);
  tests   = getTests(method);
  intro   = getIntro(lines);
  params  = getParams(lines);
  returns = getReturns(lines);

  detail = TEMPLATE;
  detail = detail.replace('{{ method }}',  method);
  detail = detail.replace('{{ tests }}',   tests);
  detail = detail.replace('{{ intro }}',   intro);
  detail = detail.replace('{{ params }}',  params);
  detail = detail.replace('{{ returns }}', returns);

  return detail;
}
