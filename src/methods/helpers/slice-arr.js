/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - SLICE ARRAY-LIKE OBJECT
 * -----------------------------------------------------------------------------
 * @version 3.0.0-beta.1
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var _is = require('./is.js');

module.exports = _sliceArr;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - SLICE-ARR
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {!(Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
function _sliceArr(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source.length;
  start = start
    ? start < 0
      ? len + start
      : start
    : 0;
  start = start < 0 ? 0 : start;
  end = _is.undefined(end) || end > len
    ? len
    : end < 0
      ? len + end
      : end;

  if (start >= end) return [];

  arr = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = source[ii];
  }
  return arr;
}
