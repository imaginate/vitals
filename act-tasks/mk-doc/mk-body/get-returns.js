/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getReturns
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
var fuse   = vitals.fuse;
var has    = vitals.has;
var remap  = vitals.remap;
var slice  = vitals.slice;
var until  = vitals.until;

var TYPE  = /^@returns? \{([^}]+)\}.*$/;

var getDescription = require('./get-description');

/**
 * @param {!Array<string>} lines
 * @return {string}
 */
module.exports = function getReturns(lines) {

  /** @type {string} */
  var type;
  /** @type {string} */
  var desc;

  lines = pruneLines(lines);
  type  = remap(lines[0], TYPE, '$1');
  desc  = getDescription(lines, 0);
  desc  = desc && fuse('\n', desc, '\n');
  return fuse('<i>', type, '</i>\n', desc);
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;

  until(false, lines, function(line, i) {
    if ( has(line, /^@return/) ) start = i;
    return start === undefined;
  });
  return slice(lines, start, -1);
}
