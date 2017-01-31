/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getIntro
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

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
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = lines.length;
  i = -1;
  while (++i < len && end === undefined) {
    if ( PUBLIC.test(lines[i]) ) end = i;
  }
  return lines.slice(0, end);
}
