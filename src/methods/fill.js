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

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $splitKeys = require('./helpers/split-keys.js');
var $isNone = require('./helpers/is-none.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

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

  /* {{{2 Fill References
   * @ref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
   * @ref [str-func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   * @ref [str-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
   */

  /// {{{2
  /// @method fill
  /**
   * Fills an `array`, `object`, or `string` with specified values.
   *
   * @public
   * @param {(?Array|?Object|?Function|?number)} source
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
   *   Only use with an `array` #source. It begins the range of indexes in the
   *   #source that are filled with the #val. If negative, the #start value is
   *   added to the #source [length][arr-length]. The #start index `number` is
   *   included in the range of filled properties if it exists.
   * @param {number=} end = `source.length`
   *   Only use with an `array` #source. It ends the range of indexes in the
   *   #source that are filled with the #val. If negative, the #end value is
   *   added to the #source [length][arr-length]. The #end index `number` is
   *   **not** included in the range of filled properties if it exists.
   * @return {(?Array|?Object|?Function|?string)}
   */
  function fill(source, keys, val, start, end) {

    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined');

    if ( $is.nil(source) )
      return null;

    if ( $is.num(source) ) {
      val = keys;
      return _fillStr(source, val);
    }

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '?Array|?Object|?Function|?number');

    if ( $is.arr(source) ) {
      end = start;
      start = val;
      val = keys;

      if ( !$isNone.num(start) )
        throw $typeErr(new TypeError, 'start', start, 'number=');
      if ( !$isNone.num(end) )
        throw $typeErr(new TypeError, 'end', end, 'number=');

      return _fillArr(source, val, start, end);
    }

    if (arguments.length > 2) {
      if ( $is.str(keys) )
        keys = $splitKeys(keys);

      if ( !$is.arr(keys) )
        throw $typeErr(new TypeError, 'keys', keys, '(!Array|string)=');

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
   * @param {(!Object|!Function)} source
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
   * @return {(!Object|!Function)}
   */
  fill.object = function fillObject(source, keys, val) {

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
        'object');
    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined', 'object');

    if (arguments.length > 2) {
      if ( $is.str(keys) )
        keys = $splitKeys(keys);

      if ( !$is.arr(keys) )
        throw $typeErr(new TypeError, 'keys', keys, '(!Array|string)=',
          'object');

      return _fillKeys(source, keys, val);
    }

    val = keys;
    return _fillObj(source, val);
  };
  // define shorthand
  fill.obj = fill.object;

  /// {{{2
  /// @method fill.array
  /// @alias fill.arr
  /**
   * Fills an existing or new `array` with specified values.
   *
   * @public
   * @param {(!Array|number)} source
   *   If #source is a `number`, it makes a new `array` for #source using the
   *   #source `number` for the [array's length][arr-length].
   * @param {*} val
   *   The value to fill the #source `array` with.
   * @param {number=} start = `0`
   *   Begins the range of indexes in the #source that are filled with the
   *   #val. If negative, the #start value is added to the #source
   *   [length][arr-length]. The #start index `number` is included in the
   *   range of filled properties if it exists.
   * @param {number=} end = `arr.length`
   *   Ends the range of indexes in the #source that are filled with the #val.
   *   If negative, the #end value is added to the #source
   *   [length][arr-length]. The #end index `number` is **not** included in
   *   the range of filled properties if it exists.
   * @return {!Array}
   */
  fill.array = function fillArray(source, val, start, end) {

    if ( $is.num(source) )
      source = new Array(source);

    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined', 'array');
    if ( !$is.arr(source) )
      throw $typeErr(new TypeError, 'source', source, '!Array|number',
        'array');
    if ( !$isNone.num(start) )
      throw $typeErr(new TypeError, 'start', start, 'number=', 'array');
    if ( !$isNone.num(end) )
      throw $typeErr(new TypeError, 'end', end, 'number=', 'array');

    return _fillArr(source, val, start, end);
  };
  // define shorthand
  fill.arr = fill.array;

  /// {{{2
  /// @method fill.string
  /// @alias fill.str
  /**
   * Fills a new `string` with specified values.
   *
   * @public
   * @param {number} count
   *   The [length][str-length] of the new `string`.
   * @param {*} val
   *   The value to fill the new `string` with. Any #val that is not a
   *   `string` is converted to a `string` with [String()][str-func].
   * @return {string}
   */
  fill.string = function fillString(count, val) {

    if ( !$is.num(count) )
      throw $typeErr(new TypeError, 'count', count, 'number', 'string');
    if (arguments.length < 2)
      throw $err(new Error, 'no #val defined', 'string');

    return _fillStr(count, val);
  };
  // define shorthand
  fill.str = fill.string;

  ///////////////////////////////////////////////////// {{{2
  // FILL HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _fillObj
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) )
        obj[key] = val;
    }
    return obj;
  }

  /// {{{3
  /// @func _fillKeys
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys.length;
    i = -1;
    while (++i < len)
      obj[ keys[i] ] = val;
    return obj;
  }

  /// {{{3
  /// @func _fillArr
  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start = `0`
   * @param {number=} end = `arr.length`
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr.length;

    if ( $is.none(start) )
      start = 0;
    if ( $is.none(end) )
      end = len;

    if (start < 0)
      start += len;
    if (start < 0)
      start = 0;

    if (end > len)
      end = len;
    else if (end < 0)
      end += len;

    if (start >= end)
      return arr;

    i = start - 1;
    while (++i < end)
      arr[i] = val;
    return arr;
  }

  /// {{{3
  /// @func _fillStr
  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    if (count < 1)
      return '';

    val = String(val);
    str = '';
    while (count--)
      str += val;
    return str;
  }

  ///////////////////////////////////////////////////// {{{2
  // FILL HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = $newErrorMaker('fill');

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = $err.type;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = $err.range;

  /// }}}2
  // END OF PRIVATE SCOPE FOR FILL
  return fill;
})();
/// }}}1

module.exports = fill;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
