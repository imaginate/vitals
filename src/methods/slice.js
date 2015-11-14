/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - SLICE
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.slice]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/slice.js}
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

var newErrorAid = require('../_helpers/errorAid.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// SLICE
////////////////////////////////////////////////////////////////////////////////

var slice = (function slicePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - slice
  // - slice.array  (slice.arr)
  // - slice.string (slice.str)
  //////////////////////////////////////////////////////////

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

    if ( !is('num=', start) ) throw _error.type('start');
    if ( !is('num=', end)   ) throw _error.type('end');

    if ( is.null(source) ) return null;

    if ( is.str(source) ) return _sliceStr(source, start, end);

    if ( !is._obj(source)       ) throw _error.type('source');
    if ( !is.num(source.length) ) throw _error.type('source.length');

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

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is('num=', start)     ) throw _error.type('start',         'array');
    if ( !is('num=', end)       ) throw _error.type('end',           'array');

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

    if ( !is.str(str)       ) throw _error.type('str',   'string');
    if ( !is('num=', start) ) throw _error.type('start', 'string');
    if ( !is('num=', end)   ) throw _error.type('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

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
    start = start ? _parseStart(len, start) : 0;
    end = end ? _parseEnd(len, end) : len;

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
    start = start ? _parseStart(len, start) : 0;
    end = end ? _parseEnd(len, end) : len;
    return start >= end ? '' : str.substring(start, end);
  }

  /**
   * @private
   * @param {number} len
   * @param {number} start
   * @return {number}
   */
  function _parseStart(len, start) {
    start = start < 0 ? len + start : start;
    return start < 0 ? 0 : start;
  }

  /**
   * @private
   * @param {number} len
   * @param {number} end
   * @return {number}
   */
  function _parseEnd(len, end) {
    return end > len
      ? len : end < 0
        ? len + end : end;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('slice');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR SLICE
  return slice;
})();


module.exports = slice;
