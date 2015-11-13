/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - FILL
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.fill]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/fill.js}
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

var makeErrorAid = require('./_error.js');
var _splitKeys = require('./_splitKeys.js');
var _own = require('./_own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// FILL
////////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fill
  // - fill.object (fill.obj)
  // - fill.array  (fill.arr)
  // - fill.string (fill.str)
  //////////////////////////////////////////////////////////

  /**
   * Fills an array, object, or string with specified values.
   * @public
   * @param {?(Array|Object|function|number)} source - If source is a number
   *   returns a new string filled with the value x times.
   * @param {string=} keys - Only use with an object/function source. If
   *   provided it is converted to an array of keys to limit the object fill to.
   *   The chars in the following list can be used as the separator for keys in
   *   the string (chars listed in order of rank):  ", "  ","  "|"  " "
   * @param {*} val - The value to fill the array, object, or string with.
   * @param {number=} start - [default= 0] Only for fill.array.
   * @param {number=} end - [default= arr.length] Only for fill.array.
   * @return {?(Array|Object|function|string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.null(source) ) return null;

    if ( is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    if ( is.arr(source) ) {
      end = start;
      start = val;
      val = keys;
      if ( !is('num=', start) ) throw _error.type('start');
      if ( !is('num=', end)   ) throw _error.type('end');
      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      if ( !is.str(keys) ) throw _error.type('keys');
      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  }

  /**
   * Fills an existing object/function with specified keys and values.
   * @public
   * @param {!(Object|function)} obj
   * @param {string=} keys - If provided it is converted to an array of keys to
   *   limit the object fill to. The chars in the following list can be used as
   *   the separator for keys in the string (chars listed in order of rank):
   *   ", "  ","  "|"  " "
   * @param {*} val
   * @return {!(Object|function)}
   */
  fill.object = function fillObject(obj, keys, val) {

    if ( !is._obj(obj) ) throw _error.type('obj', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      if ( !is.str(keys) ) throw _error.type('keys', 'object');
      return _fillKeys(obj, keys, val);
    }

    val = keys;
    return _fillObj(obj, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills an existing or new array with specified values.
   * @public
   * @param {!(Array|number)} arr - If number makes new array with arr length.
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  fill.array = function fillArray(arr, val, start, end) {

    arr = is.num(arr) ? new Array(arr) : arr;

    if (arguments.length < 2) throw _error('No val defined', 'array');

    if ( !is.arr(arr)       ) throw _error.type('arr',   'array');
    if ( !is('num=', start) ) throw _error.type('start', 'array');
    if ( !is('num=', end)   ) throw _error.type('end',   'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /**
   * Fills a new string with specified values.
   * @public
   * @param {number} count
   * @param {*} val - Value converted to string via String(val).
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !is.num(count) ) throw _error.type('count', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _own(obj, key) ) {
        obj[key] = val;
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {string} keys
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    keys = _splitKeys(keys);
    len = keys.length;
    i = -1;
    while (++i < len) {
      obj[ keys[i] ] = val;
    }
    return obj;
  }

  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr.length;
    start = start || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;
    end = end || len;
    end = end > len
      ? len : end < 0
        ? len + end : end;

    if (start >= end) return arr;

    i = start - 1;
    while (++i < end) {
      arr[i] = val;
    }
    return arr;
  }

  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    count = count < 0 ? 0 : count;

    if (!count) return '';

    val = String(val);
    str = '';
    while (count--) {
      str += val;
    }
    return str;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('fill');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


module.exports = fill;
