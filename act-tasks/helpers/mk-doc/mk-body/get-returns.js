/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getReturns
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

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
  type  = lines.length ? lines[0].replace(TYPE, '$1') : 'undefined';
  desc  = getDescription(lines, 0);
  desc  = desc && '\n' + desc + '\n';
  return '<i>' + type + '</i>\n' + desc;
};

/**
 * @private
 * @param {!Array<string>} lines
 * @return {!Array<string>}
 */
function pruneLines(lines) {

  /** @type {number} */
  var start;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = lines.length;
  i = -1;
  while (++i < len && start === undefined) {
    if ( /^@return/.test(lines[i]) ) start = i;
  }
  return start === undefined ? [] : lines.slice(start, -1);
}
