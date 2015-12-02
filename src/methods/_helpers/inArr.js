/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - VALUE IN ARRAY
 * -----------------------------------------------------------------------------
 * @version 2.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = _inArr;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - IN-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!Object} source
 * @param {*} val
 * @return {boolean}
 */
function _inArr(source, val) {

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
