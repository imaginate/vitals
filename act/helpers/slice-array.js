/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: sliceArray
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArrayLike = IS.arrayLike;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNumber = IS.number;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

/**
 * @private
 * @param {number} val
 * @return {boolean}
 */
var isWholeNumber = IS.wholeNumber;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGE = IS.greaterOrEqual;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @public
 * @param {(!Object|function)} source
 * @param {number=} start - [default= 0]
 * @param {number=} end - [default= source.length]
 * @return {!Array}
 */
module.exports = function sliceArray(source, start, end) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  if ( !isArrayLike(source) )
    throw new TypeError('invalid `source` type (must be an array like object)');
  if ( !isUndefined(start) ) {
    if ( !isNumber(start) )
      throw new TypeError('invalid `start` type (must be a number or undefined)');
    if ( !isWholeNumber(start) )
      throw new RangeError('invalid `start` number (must be a whole number)');
  }
  if ( !isUndefined(end) ) {
    if ( !isNumber(end) )
      throw new TypeError('invalid `end` type (must be a number or undefined)');
    if ( !isWholeNumber(end) )
      throw new RangeError('invalid `end` number (must be a whole number)');
  }

  len = source.length;

  if ( isUndefined(start) )
    start = 0;
  else if ( isLT(start, 0) ) {
    start = len + start;
    if ( isLT(start, 0) )
      start = 0;
  }

  if ( isUndefined(end) || isGT(end, len) )
    end = len;
  else if ( isLT(end, 0) )
    end = len + end;

  if ( isGE(start, end) )
    return [];

  arr = new Array(end - start);
  ii = start;
  i = 0;
  while ( isLT(ii, end) ) {
    arr[i] = source[ii];
    ++ii;
    ++i;
  }
  return arr;
};
