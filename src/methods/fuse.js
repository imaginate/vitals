/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: fuse
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/wiki/vitals.fuse}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var sliceArr = require('./helpers/slice-arr.js');
var merge = require('./helpers/merge.js');
var own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: fuse
////////////////////////////////////////////////////////////////////////////////

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

  /**
   * Merges objects, concatenates arrays, appends properties, and combines
   *   strings.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - All rules occur in order of appearance. For object and
   *   array dest types `null` is skipped. Remaining details per dest type:
   *   - object: If only one val is provided and it is an array it is considered
   *     an array of vals. Object vals are merged with the dest. All other
   *     values are converted to strings and appended as new keys (if the key
   *     exists on the dest the property's value is replaced with undefined).
   *   - array: Array vals are concatenated to the dest. All other values are
   *     pushed to the dest.
   *   - string: If only one val is provided and it is an array it is considered
   *     an array of vals. All non-string vals are converted to strings and
   *     appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  function fuse(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( _is.str(dest) ) {
      vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
      return _is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest');

    dest = _is.args(dest) ? sliceArr(dest) : dest;

    if ( _is.arr(dest) ) {
      if (arguments.length > 2) {
        vals = sliceArr(arguments, 1);
        return _fuseArrs(dest, vals);
      }
      return _fuseArr(dest, vals);
    }

    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  }

  /**
   * Appends properties and combines strings.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value is replaced with
   *     undefined).
   *   - array: All vals are pushed to the dest.
   *   - string: All vals are converted to strings and appended to the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value = function fuseValue(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( _is.str(dest) ) {
      if (arguments.length < 3) return _fuseStr(dest, vals);
      vals = sliceArr(arguments, 1);
      return _fuseStrs(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest', 'value');

    dest = _is.args(dest) ? sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return _is.arr(dest) ? _fuseArrVal(dest, vals) : _fuseObjVal(dest, vals);
    }

    vals = sliceArr(arguments, 1);
    return _is.arr(dest) ? _fuseArrsVal(dest, vals) : _fuseObjsVal(dest, vals);
  };
  // define shorthand
  fuse.val = fuse.value;

  /**
   * Appends properties and combines strings to the start of their destination.
   *
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - Details per dest type:
   *   - object: All vals are converted to strings and appended as new keys (if
   *     the key exists on the dest the property's value remains unchanged).
   *   - array: All vals are unshifted to the dest.
   *   - string: All vals are converted to strings and appended to the beginning
   *     of the dest.
   * @return {!(Object|function|Array|string)}
   */
  fuse.value.start = function fuseValueStart(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined', 'value.start');

    if ( _is.str(dest) ) {
      if (arguments.length < 3) return _fuseStrTop(dest, vals);
      vals = sliceArr(arguments, 1);
      return _fuseStrsTop(dest, vals);
    }

    if ( !_is._obj(dest) ) throw _error.type('dest', 'value.start');

    dest = _is.args(dest) ? sliceArr(dest) : dest;

    if (arguments.length < 3) {
      return _is.arr(dest)
        ? _fuseArrValTop(dest, vals)
        : _fuseObjValTop(dest, vals);
    }

    vals = sliceArr(arguments, 1);
    return _is.arr(dest)
      ? _fuseArrsValTop(dest, vals)
      : _fuseObjsValTop(dest, vals);
  };
  // define shorthand
  fuse.val.start = fuse.value.start;
  fuse.value.top = fuse.value.start;
  fuse.val.top = fuse.value.start;

  /**
   * Appends properties/keys to an object.
   *
   * @public
   * @param {!(Object|function)} dest
   * @param {...*} vals - Any vals that are `null` are skipped. All other vals
   *   that are not objects are converted to a string and appended as new keys
   *   (if the key exists on the dest the key's value is replaced with
   *   undefined). If only one val is provided and it is an array then it is
   *   considered an array of vals. All object vals are merged with the dest
   *   (if the key exists on the dest the key's value is with replaced with the
   *   value from the merged object).
   * @return {!(Object|function)}
   */
  fuse.object = function fuseObject(dest, vals) {

    if ( !_is._obj(dest) ) throw _error.type('dest', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    vals = arguments.length > 2 ? sliceArr(arguments, 1) : vals;
    return _is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /**
   * Appends values to an array and concatenates arrays.
   *
   * @public
   * @param {!Array} dest
   * @param {...*} vals - Details per val type:
   *   - null:  All null vals are skipped.
   *   - array: All array vals are concatenated to the dest.
   *   - other: All other vals are pushed to the dest array.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, vals) {

    if ( !_is._arr(dest) ) throw _error.type('dest', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');

    dest = _is.args(dest) ? sliceArr(dest) : dest;

    if (arguments.length > 2) {
      vals = sliceArr(arguments, 1);
      return _fuseArrs(dest, vals);
    }

    return _fuseArr(dest, vals);
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
