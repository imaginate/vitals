/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - SLICE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.slice]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/slice.js}
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

var is = require('node-are').is;
var are = require('node-are').are;
var has = require('./has.js');


/**
 * A shortcut for Array.prototype.slice.call(obj, start, end) and
 *   String.prototype.slice(start, end).
 * @public
 * @param {?(Object|Array|function|string)} val
 * @param {number=} start [default= 0]
 * @param {number=} end [default= val.length]
 * @return {?(Array|string)}
 */
function slice(val, start, end) {
  return is.str(val) ? slice.str(val, start, end) : slice.arr(val, start, end);
}

/**
 * A shortcut for Array.prototype.slice.call(obj, start, end).
 * @public
 * @param {?(Object|Array|function)} obj
 * @param {number=} start [default= 0]
 * @param {number=} end [default= obj.length]
 * @return {Array}
 */
slice.array = function sliceArray(obj, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( is.null(obj) ) {
    return null;
  }

  if ( !is._obj(obj) || !has(obj, 'length') ) {
    throw new TypeError('Invalid obj param in vitals.slice.array call.');
  }

  if ( !are('num=', start, end) ) {
    throw new TypeError('Invalid start/end param in vitals.slice.array call.');
  }

  len = obj.length;
  start = start || 0;
  start = start < 0 ? len + start : start;
  end = end || len;
  end = end > len ? len : end < 0 ? len + end : end;

  arr = start < end ? new Array(end - start) : [];
  ii = start - 1;
  i = 0;
  while (++ii < end) {
    arr[i++] = obj[ii];
  }
  return arr;
};
slice.arr = slice.array;

/**
 * A shortcut for String.prototype.slice(start, end).
 * @public
 * @param {string} str
 * @param {number=} start [default= 0]
 * @param {number=} end [default= str.length]
 * @return {string}
 */
slice.string = function sliceString(str, start, end) {

  if ( !is.str(str) ) {
    throw new TypeError('Invalid str param in vitals.slice.string call.');
  }

  if ( !are('num=', start, end) ) {
    throw new TypeError('Invalid start/end param in vitals.slice.string call.');
  }

  return str.slice(start, end);
};
slice.str = slice.string;


module.exports = slice;
