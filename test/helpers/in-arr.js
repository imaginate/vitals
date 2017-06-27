/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: inArr
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = inArr;

/**
 * @param {!Array} source
 * @param {*} val
 * @return {boolean}
 */
function inArr(source, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = source.length;
  i = -1;
  while (++i < len) {
    if (source[i] === val) return true;
  }
  return false;
}
