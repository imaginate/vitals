/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: sliceStr
 * -----------------------------------------------------------------------------
 * @version 4.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = sliceStr;


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: sliceStr
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} str
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= str.length]
 * @return {string}
 */
function sliceStr(str, start, end) {

  /** @type {number} */
  var len;

  len = str.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = end === undefined || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  return start >= end ? '' : str.substring(start, end);
}
