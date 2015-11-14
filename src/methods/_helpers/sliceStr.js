/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - SLICE STRING
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/js-methods}
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

module.exports = _sliceStr;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-STR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= str.length]
 * @return {string}
 */
function _sliceStr(str, start, end) {

  /** @type {number} */
  var len;

  len = str.length;
  start = start
    ? start < 0
      ? len + start : start
    : 0;
  start = start < 0 ? 0 : start;
  end = end
    ? end > len
      ? len : end < 0
        ? len + end : end
    : 0;

  return start >= end ? '' : str.substring(start, end);
}
