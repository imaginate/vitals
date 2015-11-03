/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - HAS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/has.js}
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
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  /**
   * A shortcut for Object.prototype.hasOwnProperty (that accepts null),
   *   String.prototype.includes, RegExp.prototype.test, and
   *   Array.prototype.includes.
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} key - If source is a string the following two statements apply:
   *   For a RegExp key the source is tested for the RegExp pattern. Otherwise
   *   the source is searched for a substring of the string-converted key.
   *   If source is an array or arguments object the key is searched for in the
   *   object's indexed values.
   * @return {boolean}
   */
  function has(source, key) {

    if (arguments.length < 2) throw _error('No key defined');
    
    if ( is.null(source) ) return false;

    if ( is.str(source) ) {
      if ( is.regex(key) ) return _hasPattern(source, key);
      key = String(key);
      if (!source) return !key;
      if (!key) return true;
      return _hasStr(source, key);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source) ? _hasValArr(source, key) : _hasKey(source, key);
  }

  /**
   * A shortcut for Object.prototype.hasOwnProperty that accepts null.
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'key');

    return _hasKey(source, key);
  }

  /**
   * A shortcut that checks for a value in an object.
   * @public
   * @param {?(Object|function)} source
   * @param {*} val
   * @return {boolean}
   */
  has.value = function hasValue(source, val) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'value');

    return is._arr(source) ? _hasValArr(source, val) : _hasVal(source, val);
  }
  // define shorthand
  has.val = has.value;

  /**
   * A shortcut for String.prototype.includes and RegExp.prototype.test.
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    if ( is.regex(pattern) ) return _hasPattern(source, pattern);

    pattern = String(pattern);
    if (!source) return !pattern;
    if (!pattern) return true;
    return _hasStr(source, pattern);
  }
  // define shorthand
  has.string = has.pattern;
  has.str = has.pattern;

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _hasKey(source, key) {
    return _hasOwnProperty.call(source, key);
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {boolean}
   */
  function _hasVal(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _hasKey(source, key) && source[key] === val ) {
        return true;
      }
    }
    return false;
  }

  /**
   * @private
   * @param {!Object} source
   * @param {*} val
   * @return {boolean}
   */
  function _hasValArr(source, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = source.length;
    i = -1;
    while (++i < len) {
      if (source[i] === val) return true;
    }
    return false;
  }

  /**
   * @private
   * @param {string} source
   * @param {!RegExp} pattern
   * @return {boolean}
   */
  function _hasPattern(source, pattern) {
    return pattern.test(source);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  var _hasStr = !!String.prototype.includes
    ? function _hasStr(source, str) { return source.includes(str); }
    : function _hasStr(source, str) { return source.indexOf(str) !== -1; };

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('has');

  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


module.exports = has;
