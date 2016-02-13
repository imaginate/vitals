/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethod
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

var cut = require('node-vitals')('cut');

var TRIM = /\bfunction\b| +/g;

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getMethod(lines) {

  /** @type {string} */
  var method;
  /** @type {number} */
  var last;

  last = lines.length - 1;
  method = lines[last];
  method = cut(method, TRIM);
  return method;
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {string}
 */
function getIntro(lines) {

  /** @type {number} */
  var end;

  until(false, lines, function(line, i) {
    if ( has(line, /^@public/) ) end = i;
    return end === undefined;
  });
  lines = slice(lines, 0, end);
  return roll.up('', lines, function(line, i) {
    return i && line ? fuse(' ', line) : line;
  });
}
