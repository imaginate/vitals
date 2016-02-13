/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkBody
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var get    = vitals.get;
var remap  = vitals.remap;
var roll   = vitals.roll;

var GET = /\/\*\*[^@]*?@public[\s\S]+?\*\/\n[a-zA-Z .]+/g;
var TRIM = /\/\*\*\n +\* /;
var SPLIT = / *\n +\*(?: +|\/\n)?/g;

var TEMPLATE = get.file('act-tasks/docs/body.md');

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
    body = mkDetails(methods);
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

  return roll.up('', details, function(detail) {

    detail  = cut(detail, TRIM);
    lines   = detail.split(SPLIT);
    method  = getMethod(lines);
    tests   = getTests(method);
    intro   = getIntro(lines);
    params  = getParams(lines);
    returns = getReturns(lines);

    detail = TEMPLATE;
    detail = remap(detail, '{{ method }}',  method);
    detail = remap(detail, '{{ tests }}',   tests);
    detail = remap(detail, '{{ intro }}',   intro);
    detail = remap(detail, '{{ params }}',  params);
    detail = remap(detail, '{{ returns }}', returns);

    return detail;
  });
}
