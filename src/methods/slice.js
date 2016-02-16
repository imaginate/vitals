/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - SLICE
 * -----------------------------------------------------------------------------
 * @section base
 * @version 3.0.0
 * @see [vitals.slice]{@link https://github.com/imaginate/vitals/wiki/vitals.slice}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var newErrorAid = require('./helpers/error-aid.js');
var _sliceArr = require('./helpers/slice-arr.js');
var _sliceStr = require('./helpers/slice-str.js');
var _is = require('./helpers/is.js');


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
   * A shortcut for [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   *   and [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   *
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !_is.un.num(start) ) throw _error.type('start');
    if ( !_is.un.num(end)   ) throw _error.type('end');

    if ( _is.nil(source) ) return null;

    if ( _is.str(source) ) return _sliceStr(source, start, end);

    if ( !_is._obj(source)       ) throw _error.type('source');
    if ( !_is.num(source.length) ) throw _error.type('source.length');

    return _sliceArr(source, start, end);
  }

  /**
   * A shortcut for [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).
   *
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !_is._obj(source)       ) throw _error.type('source',        'array');
    if ( !_is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !_is.un.num(start)      ) throw _error.type('start',         'array');
    if ( !_is.un.num(end)        ) throw _error.type('end',           'array');

    return _sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /**
   * A shortcut for [String.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   *
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !_is.str(str)      ) throw _error.type('str',   'string');
    if ( !_is.un.num(start) ) throw _error.type('start', 'string');
    if ( !_is.un.num(end)   ) throw _error.type('end',   'string');

    return _sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

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
