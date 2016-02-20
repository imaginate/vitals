/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMatches
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/**
 * @param {string} str
 * @param {!RegExp} pattern
 * @return {string}
 */
module.exports = function getMatches(str, pattern) {

  /** @type {!Array} */
  var arr;
  /** @type {Object} */
  var obj;

  if (!pattern.global) pattern = new RegExp(pattern.source, 'g');
  if (pattern.lastIndex !== 0) pattern.lastIndex = 0;

  arr = [];
  obj = pattern.exec(str);
  while (obj) {
    arr.push(obj.index);
    obj = pattern.exec(str);
  }
  return arr;
};
