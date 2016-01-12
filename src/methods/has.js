/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - HAS
 * -----------------------------------------------------------------------------
 * @version 2.3.0
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/methods/has.js}
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

var newErrorAid = require('./_helpers/errorAid.js');
var _ownEnum = require('./_helpers/ownEnum.js');
var _inObj = require('./_helpers/inObj.js');
var _inArr = require('./_helpers/inArr.js');
var _inStr = require('./_helpers/inStr.js');
var _match = require('./_helpers/match.js');
var _own = require('./_helpers/own.js');
var is = require('node-are').is;


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

var has = (function hasPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - has
  // - has.key
  // - has.value      (has.val)
  // - has.pattern
  // - has.substring  (has.substr)
  // - has.enumerable (has.enum)
  //
  // * Note that has.enum may fail in older browser
  //   environments.
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

    if ( is.str(source) ) return _match(source, key);

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source) ? _inArr(source, key) : _own(source, key);
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

    return _own(source, key);
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

    return is._arr(source) ? _inArr(source, val) : _inObj(source, val);
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

    return _match(source, pattern);
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

    return _inStr(source, str);
  };
  // define shorthand
  has.substr = has.substring;

  /**
   * A shortcut for Object.prototype.propertyIsEnumerable that accepts null.
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.enumerable = function hasEnumerable(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'enumerable');

    if ( is.null(source) ) return false;

    if ( !is._obj(source) ) throw _error.type('source', 'enumerable');

    return _ownEnum(source, key);
  };
  // define shorthand
  try {
    has.enum = has.enumerable;
  }
  catch (e) {}

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('has');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


module.exports = has;
