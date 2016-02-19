/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getIntro
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

var vitals = require('node-vitals')('base');
var has    = vitals.has;
var slice  = vitals.slice;
var until  = vitals.until;

var PUBLIC = /^@public/;

var getDescription = require('./get-description');

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getIntro(lines) {
  lines = pruneLines(lines);
  return getDescription(lines, 0);
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var end;

  until(false, lines, function(line, i) {
    if ( has(line, PUBLIC) ) end = i;
    return end === undefined;
  });
  return slice(lines, 0, end);
}
