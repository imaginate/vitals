/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY - THE MAIN METHODS
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
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


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * Fills an existing or new array with specified values.
 * @param {(Array|number)} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {Array}
 */
global.fill = function fill(arr, val, start, end) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  arr = is.num(arr) ? new Array(arr) : arr;

  if ( !is.arr(arr) ) {
    return null;
  }

  len = arr.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ?
    len : end < 0 ?
      len + end : end;

  i = start - 1;
  while (++i < end) {
    arr[i] = val;
  }
  return arr;
};
