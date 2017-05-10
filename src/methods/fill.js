/**
 * ---------------------------------------------------------------------------
 * VITALS FILL
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.fill](https://github.com/imaginate/vitals/wiki/vitals.fill)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS FILL
//////////////////////////////////////////////////////////////////////////////

var fill = (function fillPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fill
  // - fill.object (fill.obj)
  // - fill.array  (fill.arr)
  // - fill.string (fill.str)
  //////////////////////////////////////////////////////////

  /* {{{2
   * @ref []:()
   */

  /// {{{2
  /// @method fill
  /**
   * Fills an `array`, `object`, or `string` with specified values.
   *
   * @public
   * @param {(?Array|?Object|function|number)} source
   *   If the #source is a `number`, @fill returns a new `string` filled with
   *   the `string` conversion of #val the #source `number` of times.
   * @param {(!Array|string)=} keys
   *   Only use with an `object` or `function` #source. If defined, #keys is
   *   considered an `array` of keys that will limit the fill action. If a
   *   `string` is defined for #keys, it is converted to an `array` using one
   *   of the values in the following list for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `array`, `object`, or `string` with.
   * @param {number=} start = `0`
   *   Only use with an `array` #source. It will limit the #source indexes
   *   filled with the #val.
   * @param {number=} end = `source.length`
   *   Only use with an `array` #source. It will limit the #source indexes
   *   filled with the #val.
   * @return {(?Array|?Object|function|string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2)
      throw _error('No val defined');

    if ( _is.nil(source) )
      return null;

    if ( _is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !_is._obj(source) )
      throw _error.type('source');

    if ( _is.arr(source) ) {
      end = start;
      start = val;
      val = keys;

      if ( !_is.un.num(start) )
        throw _error.type('start');
      if ( !_is.un.num(end) )
        throw _error.type('end');

      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      if ( _is.str(keys) )
        keys = splitKeys(keys);

      if ( !_is.arr(keys) )
        throw _error.type('keys');

      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  }

  /// {{{2
  /// @method fill.object
  /// @alias fill.obj
  /**
   * Fills an existing `object` or `function` with specified keys and values.
   *
   * @public
   * @param {(!Object|function)} obj
   * @param {(!Array|string)=} keys
   *   If defined, #keys is considered an `array` of keys that will limit the
   *   fill action. If a `string` is defined for #keys, it is converted to an
   *   `array` using one of the values in the following list for the separator
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `object` or `function` with.
   * @return {(!Object|function)}
   */
  fill.object = function fillObject(obj, keys, val) {

    if ( !_is._obj(obj) )
      throw _error.type('obj', 'object');
    if (arguments.length < 2)
      throw _error('No val defined', 'object');

    if (arguments.length > 2) {
      if ( _is.str(keys) )
        keys = splitKeys(keys);

      if ( !_is.arr(keys) )
        throw _error.type('keys', 'object');

      return _fillKeys(obj, keys, val);
    }

    val = keys;
    return _fillObj(obj, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /**
   * Fills an existing or new array with specified values.
   *
   * @public
   * @param {(!Array|number)} arr - If number makes new array with arr length.
   * @param {*} val
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= arr.length]
   * @return {!Array}
   */
  fill.array = function fillArray(arr, val, start, end) {

    arr = _is.num(arr) ? new Array(arr) : arr;

    if (arguments.length < 2) throw _error('No val defined', 'array');

    if ( !_is.arr(arr)      ) throw _error.type('arr',   'array');
    if ( !_is.un.num(start) ) throw _error.type('start', 'array');
    if ( !_is.un.num(end)   ) throw _error.type('end',   'array');

    return _fillArr(arr, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /**
   * Fills a new string with specified values.
   *
   * @public
   * @param {number} count
   * @param {*} val - All val types are converted to string via `String(val)`.
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !_is.num(count) ) throw _error.type('count', 'string');
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
      if ( own(obj, key) ) {
        obj[key] = val;
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

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
  var _error = newErrorMaker('fill');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();


module.exports = fill;
