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


////////////////////////////////////////////////////////////////////////////////
// SLICE
////////////////////////////////////////////////////////////////////////////////

var slice = (function slicePrivateScope() {

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end) and
   *   String.prototype.slice(start, end).
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !is('num=', start) ) throw _typeError('start');
    if ( !is('num=', end)   ) throw _typeError('end');

    if ( is.null(source) ) return null;

    if ( is.str(source) ) return _sliceStr(source, start, end);

    if ( !is._obj(source)       ) throw _typeError('source');
    if ( !is.num(source.length) ) throw _typeError('source.length');

    return _sliceArr(source, start, end);
  }

  /**
   * A shortcut for Array.prototype.slice.call(obj, start, end).
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !is._obj(source)       ) throw _typeError('source',        'array');
    if ( !is.num(source.length) ) throw _typeError('source.length', 'array');
    if ( !is('num=', start)     ) throw _typeError('start',         'array');
    if ( !is('num=', end)       ) throw _typeError('end',           'array');

    return _sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /**
   * A shortcut for String.prototype.slice(start, end).
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !is.str(str)       ) throw _typeError('str',   'string');
    if ( !is('num=', start) ) throw _typeError('start', 'string');
    if ( !is('num=', end)   ) throw _typeError('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  /**
   * @private
   * @param {!(Object|Array|function)} source
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
    start = start || 0;
    start = start < 0 ? len + start : start;
    end = end || len;
    end = end > len ? len : end < 0 ? len + end : end;

    if (start >= end) return [];

    arr = new Array(end - start);
    ii = start - 1;
    i = 0;
    while (++ii < end) {
      arr[i++] = source[ii];
    }
    return arr;
  }

  /**
   * @private
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {!Array}
   */
  function _sliceStr(str, start, end) {

    /** @type {number} */
    var len;

    len = str.length;
    start = start || 0;
    start = start < 0 ? len + start : start;
    end = end || len;
    end = end > len ? len : end < 0 ? len + end : end;

    return start >= end ? '' : str.substring(start, end);
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
    method = 'vitals.slice' + ( method && '.' ) + method;
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
    method = 'vitals.slice' + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  }

  // END OF PRIVATE SCOPE FOR SLICE
  return slice;
})();


module.exports = slice;
