/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - FUSE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.fuse]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/fuse.js}
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
var has = require('./has.js');
var slice = require('./slice.js');


////////////////////////////////////////////////////////////////////////////////
// FUSE
////////////////////////////////////////////////////////////////////////////////

var fuse = (function fusePrivateScope() {

  /**
   * Appends properties/keys to an object, array values to an array, or strings
   *   to a string.
   * @public
   * @param {!(Object|function|Array|string)} dest
   * @param {...*} vals - For object/array dest null vals do not throw
   *   exceptions, but are simply skipped. For string dest all non-string vals
   *   are converted to strings. For object dest all number and string vals are
   *   appended as new keys (if key exists on the dest the key's value is
   *   replaced with undefined). For array dest all non-array vals are appended
   *   to the end of the dest array. For object/string dest if only one val is
   *   provided and it is an array then it is considered an array of vals.
   * @return {!(Object|function|Array|string)}
   */
  function fuse(dest, vals) {

    if (arguments.length < 2) throw _error('No val defined');

    if ( is.str(dest) ) {
      if (arguments.length === 2) {
        return is.arr(vals) ? _fuseStrs(dest, vals) : _fuseStr(dest, vals);
      }
      vals = slice(arguments, 1);
      return _fuseStrs(dest, vals);
    }

    if ( !is._obj(dest) ) throw _typeError('dest');

    dest = is.args(dest) ? slice(dest) : dest;

    if (arguments.length === 2) {
      if ( is.arr(dest) ) return _fuseArr(dest, vals);
      return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
    }

    vals = slice(arguments, 1);
    return is.arr(dest) ? _fuseArrs(dest, vals) : _fuseObjs(dest, vals);
  }

  /**
   * Appends properties/keys to an object.
   * @public
   * @param {!(Object|function)} dest
   * @param {...*} vals - Any vals that are null do not throw exceptions, but
   *   are simply skipped. All number and string vals are appended as new keys
   *   (if key exists on the dest the key's value is replaced with undefined).
   *   If only one val is provided and it is an array then it is considered an
   *   array of vals. For object vals every key => value is appended to the dest
   *   (if the key exists on the dest the key's value is with replaced with the
   *   value from the vals object).
   * @return {!(Object|function)}
   */
  fuse.object = function fuseObject(dest, vals) {

    if ( !is._obj(dest) ) throw _typeError('dest', 'object');
    if (arguments.length < 2) throw _error('No val defined', 'object');

    if (arguments.length === 2) {
      return is.arr(vals) ? _fuseObjs(dest, vals) : _fuseObj(dest, vals);
    }

    vals = slice(arguments, 1);
    return _fuseObjs(dest, vals);
  };
  // define shorthand
  fuse.obj = fuse.object;

  /**
   * Appends array values to an array or zips multiple arrays into one.
   * @public
   * @param {!Array} dest
   * @param {...*} vals - Any vals that are null do not throw exceptions, but
   *   are simply skipped. All other non-array vals are pushed to the end of the
   *   dest array.
   * @return {!Array}
   */
  fuse.array = function fuseArray(dest, vals) {

    if ( !is._arr(dest) ) throw _typeError('dest', 'array');
    if (arguments.length < 2) throw _error('No val defined', 'array');

    dest = is.args(dest) ? slice(dest) : dest;

    if (arguments.length === 2) _fuseArr(dest, vals);

    vals = slice(arguments, 1);
    return _fuseArrs(dest, vals);
  };
  // define shorthand
  fuse.arr = fuse.array;

  /**
   * Appends strings to a string.
   * @public
   * @param {string} dest
   * @param {...*} vals - All non-string vals are converted to strings.
   * @return {string}
   */
  fuse.string = function fuseString(dest, vals) {

    if ( !is.str(dest) ) throw _typeError('dest', 'string');
    if (arguments.length < 2) throw _error('No val defined', 'string');

    if (arguments.length === 2) return _fuseStr(dest, vals);

    vals = slice(arguments, 1);
    return _fuseStrs(dest, vals);
  };
  // define shorthand
  fuse.str = fuse.string;

  /**
   * @private
   * @param {!(Object|function)} dest
   * @param {*} val
   * @return {!(Object|function)}
   */
  function _fuseObj(dest, val) {

    if ( is('str|num', val) ) {
      dest[val] = undefined;
      return dest;
    }

    if ( !is._obj(val) ) return dest;

    return _merge(dest, val);
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
   * @param {!Array} dest
   * @param {*} val
   * @return {!Array}
   */
  function _fuseArr(dest, val) {

    if ( is.null(val) ) return dest;

    if ( is.arr(val) ) return dest.concat(val);

    dest.push(val);
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
   * @param {!(Object|function)} dest
   * @param {!(Object|function)} obj
   * @return {!(Object|function)}
   */
  function _merge(dest, obj) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( _has(obj, key) ) {
        dest[key] = obj[key];
      }
    }
    return dest;
  }

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _has = has.key;

  /**
   * @private
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  function _typeError(param, method) {
    param += ' param';
    method = method || '';
    method = 'vitals.fuse' + ( method && '.' ) + method;
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
    method = 'vitals.fuse' + ( method && '.' ) + method;
    return new Error(msg + ' for ' + method + ' call.');
  }

  // END OF PRIVATE SCOPE FOR FUSE
  return fuse;
})();


module.exports = fuse;
