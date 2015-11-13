/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - HAS
 * -----------------------------------------------------------------------------
 * @version 2.0.0
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
var _own = require('./_own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value     (has.val)
  // - has.pattern
  // - has.substring (has.substr)
  //////////////////////////////////////////////////////////

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

    if ( is.str(source) ) return _hasPattern(source, key);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source) ? _hasVal(source, key) : _hasKey(source, key);
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
  };

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

    return _hasVal(source, val);
  };
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

    return _hasPattern(source, pattern);
  };

  /**
   * A shortcut for String.prototype.includes.
   * @public
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, str) {

    if ( !is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No str defined', 'substring');

    return _hasSubstr(source, str);
  };
  // define shorthand
  has.substr = has.substring;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

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
    return is._arr(source) ? _valInArr(source, val) : _valInObj(source, val);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function _hasPattern(source, pattern) {
    return is.regex(pattern)
      ? pattern.test(source)
      : _hasSubstr(source, pattern);
  }

  /**
   * @private
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function _hasSubstr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return _strInStr(source, str);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - VAL IN TESTS
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {*} val
   * @return {boolean}
   */
  function _valInObj(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _own(source, key) && source[key] === val ) return true;
    }
    return false;
  }

  /**
   * @private
   * @param {!Object} source
   * @param {*} val
   * @return {boolean}
   */
  function _valInArr(source, val) {

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
   * @param {*} str
   * @return {boolean}
   */
  var _strInStr = !!String.prototype.includes
    ? function _strInStr(source, str) { return source.includes(str); }
    : function _strInStr(source, str) { return source.indexOf(str) !== -1; };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = makeErrorAid('has');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


module.exports = has;
