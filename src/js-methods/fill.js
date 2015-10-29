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

var is = require('node-are').is;
var are = require('node-are').are;
var has = require('./has.js');


////////////////////////////////////////////////////////////////////////////////
// FILL
////////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

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
  function fill(source, val, start, end) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.null(source) ) return null;

    if ( is._obj(source) ) {

      if ( is.arr(source) ) {
        if ( !are('num=', start, end) ) throw _typeError('start/end');
        return _fillArr(source, val, start, end);
      }

      if (arguments > 2) {
        if ( !is.str(val) ) throw _typeError('keys');
        return _fillKeys(source, val, start);
      }

      return _fillObj(source, val);
    }
    
    if ( !is.num(source) ) throw _typeError('source');

    return _fillStr(source, val);
  }

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

    if ( !is.arr(arr) ) throw _typeError('arr', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');
    if ( !are('num=', start, end) ) throw _typeError('start/end', 'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

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

    if ( !is._obj(obj) ) throw _typeError('obj', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      if ( !is.str(keys) ) throw _typeError('keys', 'object');
      return _fillKeys(obj, keys, val);
    }

    return _fillObj(obj, keys);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills a new string with specified values.
   * @public
   * @param {number} count
   * @param {*} val - Value converted to string via String(val).
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !is.num(count) ) throw _typeError('count', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

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
    end = end || len;
    end = end > len ? len : end < 0 ? 0 - end : end;

    i = start - 1;
    while (++i < end) {
      arr[i] = val;
    }
    return arr;
  }

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
      if ( has(obj, key) ) {
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
    var i;

    keys = _split(keys);
    i = keys.length;
    while (i--) {
      obj[ keys[i] ] = val;
    }
    return obj;
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
    /** @type {number} */
    var i;

    count = count < 0 ? 0 : count;
    val = String(val);
    str = '';
    while (count--) {
      str += val;
    }
    return str;
  }

  /**
   * @private
   * @param {string} keys
   * @return {!Array<string>}
   */
  function _split(keys) {
    return keys.split(
      has(keys, ', ')
        ? ', ' : has(keys, ',')
          ? ',' : has(keys, '|')
            ? '|' : ' '
    );
  }

  /**
   * @private
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  function _typeError(param, method) {
    param += ' param';
    method = method || '';
    method = 'vitals.fill' + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  }

  /**
   * @private
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  function _error(msg, method) {
    method = method || '';
    method = 'vitals.fill' + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  }

  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


module.exports = fill;
