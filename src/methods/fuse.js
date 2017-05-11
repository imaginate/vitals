/**
 * ---------------------------------------------------------------------------
 * VITALS FUSE
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.fuse](https://github.com/imaginate/vitals/wiki/vitals.fuse)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var sliceArr = require('./helpers/slice-arr.js');
var merge = require('./helpers/merge.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS FUSE
//////////////////////////////////////////////////////////////////////////////

var fuse = (function fusePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - fuse
  // - fuse.value       (fuse.val)
  // - fuse.value.start (fuse.value.top)
  // - fuse.object      (fuse.obj)
  // - fuse.array       (fuse.arr)
  // - fuse.string      (fuse.str)
  //////////////////////////////////////////////////////////

  /* {{{2 Fuse References
   * @ref [push]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
   * @ref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [concat]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
   * @ref [unshift]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
   */

  /// {{{2
  /// @method fuse
  /**
   * Merges objects, [concatenates][concat] arrays, appends properties to
   * objects and arrays, and combines strings.
   *
   * @public
   * @param {(!Object|function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   All rules for #dest are shown in order of priority. The details are as
   *   follows (per #dest type):
   *   - *`!Object|function`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each `null` #val is skipped. Each `object` or `function` #val
   *     is merged with the #dest. All other values are converted to a
   *     `string` and appended as a new property key (if the key exists in the
   *     #dest, the property's value is reset to `undefined`).
   *   - *`!Array`*!$
   *     Each `null` #val is skipped. Each `array` #val is [concatenated][concat]
   *     to the #dest. All other values are [pushed][push] to the #dest.
   *   - *`string`*!$
   *     If only one `array` #val is provided, it is considered an `array` of
   *     values. Each #val is converted to a `string` and appended to the
   *     #dest.
   * @return {(!Object|function|!Array|string)}
   */
  function fuse(dest, val) {

    if (arguments.length < 2)
      throw _error('No val defined');

    if ( _is.str(dest) ) {
      if (arguments.length > 2)
        val = sliceArr(arguments, 1);
      return _is.arr(val)
        ? _fuseStrs(dest, val)
        : _fuseStr(dest, val);
    }

    if ( !_is._obj(dest) )
      throw _error.type('dest');

    if ( _is.args(dest) )
      dest = sliceArr(dest);

    if ( _is.arr(dest) ) {
      if (arguments.length > 2) {
        val = sliceArr(arguments, 1);
        return _fuseArrs(dest, val);
      }
      return _fuseArr(dest, val);
    }

    if (arguments.length > 2)
      val = sliceArr(arguments, 1);
    return _is.arr(val)
      ? _fuseObjs(dest, val)
      : _fuseObj(dest, val);
  }

  /// {{{2
  /// @method fuse.value
  /// @alias fuse.val
  /**
   * Appends properties to an `object`, `function`, or `array` or strings to
   * a `string`.
   *
   * @public
   * @param {(!Object|function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
   *   - *`!Array`*!$
   *     Each #val is [pushed][push] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the #dest.
   * @return {(!Object|function|!Array|string)}
   */
  fuse.value = function fuseValue(dest, val) {

    if (arguments.length < 2)
      throw _error('No val defined', 'value');

    if ( _is.str(dest) ) {
      if (arguments.length < 3)
        return _fuseStr(dest, val);
      val = sliceArr(arguments, 1);
      return _fuseStrs(dest, val);
    }

    if ( !_is._obj(dest) )
      throw _error.type('dest', 'value');

    if ( _is.args(dest) )
      dest = sliceArr(dest);

    if (arguments.length < 3)
      return _is.arr(dest)
        ? _fuseArrVal(dest, val)
        : _fuseObjVal(dest, val);

    val = sliceArr(arguments, 1);
    return _is.arr(dest)
      ? _fuseArrsVal(dest, val)
      : _fuseObjsVal(dest, val);
  };
  // define shorthand
  fuse.val = fuse.value;

  /// {{{2
  /// @method fuse.value.start
  /// @alias fuse.value.top
  /// @alias fuse.val.start
  /// @alias fuse.val.top
  /**
   * Appends to the #dest beginning properties for an `object`, `function`, or
   * `array` or strings for a `string`.
   *
   * @public
   * @param {(!Object|function|!Array|!Arguments|string)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows (per #dest type):
   *   - *`!Object|function`*!$
   *     Each #val is converted to a `string` and appended as a new property
   *     key to the #dest (if the key exists in the #dest, the property's
   *     value remains unchanged).
   *   - *`!Array`*!$
   *     Each #val is [unshifted][unshift] to the #dest.
   *   - *`string`*!$
   *     Each #val is converted to a `string` and appended to the beginning of
   *     the #dest.
   * @return {(!Object|function|!Array|string)}
   */
  fuse.value.start = function fuseValueStart(dest, val) {

    if (arguments.length < 2)
      throw _error('No val defined', 'value.start');

    if ( _is.str(dest) ) {
      if (arguments.length < 3)
        return _fuseStrTop(dest, val);
      val = sliceArr(arguments, 1);
      return _fuseStrsTop(dest, val);
    }

    if ( !_is._obj(dest) )
      throw _error.type('dest', 'value.start');

    if ( _is.args(dest) )
      dest = sliceArr(dest);

    if (arguments.length < 3)
      return _is.arr(dest)
        ? _fuseArrValTop(dest, val)
        : _fuseObjValTop(dest, val);

    val = sliceArr(arguments, 1);
    return _is.arr(dest)
      ? _fuseArrsValTop(dest, val)
      : _fuseObjsValTop(dest, val);
  };
  // define shorthand
  fuse.value.top = fuse.value.start;
  fuse.val.start = fuse.value.start;
  fuse.val.top = fuse.value.start;

  /// {{{2
  /// @method fuse.object
  /// @alias fuse.obj
  /**
   * Appends and merges properties to an `object` or `function`.
   *
   * @public
   * @param {(!Object|function)} dest
   * @param {...*} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. The remaining details are as follows in order of priority (per
   *   #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Object|function`*!$
   *     The #val is merged with the #dest. If a key exists in the #val and
   *     #dest the #dest property's value is with replaced with the #val
   *     property's value.
   *   - *`*`*!$
   *     The #val is converted to a `string` and appended to the #dest as a
   *     new property key (if the key exists in the #dest, the property's
   *     value is reset to `undefined`).
   * @return {(!Object|function)}
   */
  fuse.object = function fuseObject(dest, val) {

    if ( !_is._obj(dest) )
      throw _error.type('dest', 'object');
    if (arguments.length < 2)
      throw _error('No val defined', 'object');

    if (arguments.length > 2)
      val = sliceArr(arguments, 1);
    return _is.arr(val)
      ? _fuseObjs(dest, val)
      : _fuseObj(dest, val);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /// {{{2
  /// @method fuse.array
  /// @alias fuse.arr
  /**
   * [Pushes][push] values and [concatenates][concat] arrays to an `array`.
   *
   * @public
   * @param {(!Array|!Arguments)} dest
   *   If #dest is an instance of `arguments`, it is [sliced][slice] into an
   *   `array` before any values are appended.
   * @param {...*} val
   *   The details are as follows in order of priority (per #val type):
   *   - *`null`*!$
   *     The #val is skipped.
   *   - *`!Array`*!$
   *     The #val is [concatenated][concat] to the #dest.
   *   - *`*`*!$
   *     The #val is [pushed][push] to the #dest.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, val) {

    if ( !_is._arr(dest) )
      throw _error.type('dest', 'array');
    if (arguments.length < 2)
      throw _error('No val defined', 'array');

    if ( _is.args(dest) )
      dest = sliceArr(dest);

    if (arguments.length > 2) {
      val = sliceArr(arguments, 1);
      return _fuseArrs(dest, val);
    }

    return _fuseArr(dest, val);
  };
  // define shorthand
  fuse.arr = fuse.array;

  /**
   * Appends strings to a string.
   *
   * @public
   * @param {string} dest
   * @param {...*} vals - All non-string vals are converted to strings.
   * @return {string}
   */
  fuse.string = function fuseString(dest, vals) {

    if ( !_is.str(dest) ) throw _error.type('dest', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
  };
  // define shorthand
  fuse.str = fuse.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObj(dest, val) {
    if ( _is._obj(val) ) return merge(dest, val);
    if ( !_is.nil(val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObj(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjVal(dest, val) {
    dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsVal(dest, vals) {

    /** @type {*} */
    var val;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      val = vals[i];
      dest[val] = undefined;
    }
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObjValTop(dest, val) {
    if ( !own(dest, val) ) dest[val] = undefined;
    return dest;
  }

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {!Array<*>} vals
   * @return {!(Object|function)}
   */
  function _fuseObjsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseObjValTop(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {
    if ( _is.arr(val) ) return dest.concat(val);
    if ( !_is.nil(val) ) dest.push(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = _fuseArr(dest, vals[i]);
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrVal(dest, val) {
    dest.push(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsVal(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.push( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArrValTop(dest, val) {
    dest.unshift(val);
    return dest;
  }

  /**
   * @private
   * @param {!Array} dest
   * @param {!Array<*>} vals
   * @return {!Array}
   */
  function _fuseArrsValTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest.unshift( vals[i] );
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStr(dest, val) {
    return dest + val;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrs(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest += vals[i];
    }
    return dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {*} val
   * @return {string}
   */
  function _fuseStrTop(dest, val) {
    return val + dest;
  }

  /**
   * @private
   * @param {string} dest
   * @param {!Array<*>} vals
   * @return {string}
   */
  function _fuseStrsTop(dest, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = vals.length;
    i = -1;
    while (++i < len) {
      dest = vals[i] + dest;
    }
    return dest;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('fuse');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR FUSE
  return fuse;
})();


module.exports = fuse;
