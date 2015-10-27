/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - FILL
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.fill]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/fill.js}
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

module.exports = fill;

var is = require('node-are').is;
var are = require('node-are').are;


/**
 * Fills an array or string with specified values.
 * @public
 * @param {(Array|number|string)} source - If number or array calls fill.array.
 *   If string calls fill.string.
 * @param {*} val
 * @param {number=} count - Must be supplied if source is a string. Do not use
 *   this param otherwise.
 * @param {number=} start - [default= 0] Only for fill.array.
 * @param {number=} end - [default= arr.length] Only for fill.array.
 * @return {?(Array|string)}
 */
function fill(source, val, count, start, end) {

  if ( is.null(source) ) {
    return null;
  }

  if ( is('arr|num', source) ) {
    return fill.arr(source, val, count, start);
  }
  
  if ( is.str(source) ) {
    return fill.str(count, val);
  }

  throw new TypeError('Invalid source param in vitals.fill call.');
}

/**
 * Fills an existing or new array with specified values.
 * @public
 * @param {(Array|number)} arr
 * @param {*} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= arr.length]
 * @return {Array}
 */
fill.array = function fillArray(arr, val, start, end) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  arr = is.num(arr) ? new Array(arr) : arr;

  if ( is.null(arr) ) {
    return null;
  }

  if ( !is.arr(arr) ) {
    throw new TypeError('Invalid arr param in vitals.fill.array call.');
  }

  if ( !are('num=', start, end) ) {
    throw new TypeError('Invalid start/end param in vitals.fill.array call.');
  }

  len = arr.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ? len : end < 0 ? len + end : end;

  i = start - 1;
  while (++i < end) {
    arr[i] = val;
  }
  return arr;
};
fill.arr = fill.array;

/**
 * Fills a string with specified values.
 * @public
 * @param {number} count
 * @param {*} val
 * @return {string}
 */
fill.string = function fillString(count, val) {

  /** @type {string} */
  var str;
  /** @type {number} */
  var i;

  if ( !is.num(count) ) {
    throw new TypeError('Invalid count param in vitals.fill.string call.');
  }

  count = count < 0 ? 0 : count;
  val = String(val);
  str = '';
  while (count--) {
    str += val;
  }
  return str;
};
fill.str = fill.string;
