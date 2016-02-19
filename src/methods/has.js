/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - HAS
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.0.0
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/wiki/vitals.has}
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
var _ownEnum = require('./helpers/own-enum.js');
var _inObj = require('./helpers/in-obj.js');
var _inArr = require('./helpers/in-arr.js');
var _inStr = require('./helpers/in-str.js');
var _match = require('./helpers/match.js');
var _own = require('./helpers/own.js');
var _is = require('./helpers/is.js');


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
   * Checks if an object owns a property, if an array has a value, or a string
   *   has a pattern or substring.
   *
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} val - Details (per source type):
   *   - object: The val is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
   *   - array: The array is checked for a matching indexed value via
   *     `val === value`.
   *   - string: If a `RegExp` val is provided the string source is tested for a
   *     matching pattern via [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
   *     Otherwise the val is converted to a string, and the source string is
   *     checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *     or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   *   - null: Regardless of val `false` is returned.
   * @return {boolean}
   */
  function has(source, val) {

    if (arguments.length < 2) throw _error('No val defined');
    
    if ( _is.nil(source) ) return false;

    if ( _is.str(source) ) return _match(source, val);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source) ? _inArr(source, val) : _own(source, val);
  }

  /**
   * Checks if an object owns a property.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} key - Details (per source type):
   *   - object: The key is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
   *   - null: Regardless of key `false` is returned.
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'key');

    return _own(source, key);
  };

  /**
   * Checks if an object or array has a value.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} val - Details (per source type):
   *   - object: The object is checked for a matching val via `val === value`.
   *   - array: The array is checked for a matching indexed value via
   *     `val === value`.
   *   - null: Regardless of val `false` is returned.
   * @return {boolean}
   */
  has.value = function hasValue(source, val) {

    if (arguments.length < 2) throw _error('No val defined', 'value');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'value');

    return _is._arr(source) ? _inArr(source, val) : _inObj(source, val);
  };
  // define shorthand
  has.val = has.value;

  /**
   * Checks if a string has a pattern or substring.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - Details (per pattern type):
   *   - regex: The string source is tested for a matching pattern via
   *     [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
   *   - non-regex: The pattern is converted to a string, and the source string
   *     is checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *     or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !_is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _match(source, pattern);
  };

  /**
   * Checks if a string has a substring.
   *
   * @public
   * @param {string} source
   * @param {*} val - The val is converted to a string, and the source string
   *   is checked for a matching substring via [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *   or [String.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, val) {

    if ( !_is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No val defined', 'substring');

    return _inStr(source, val);
  };
  // define shorthand
  has.substr = has.substring;

  /**
   * Checks if an enumerable property exists in an object.
   *
   * @public
   * @param {(Object|?function)} source
   * @param {*} key - Details (per source type):
   *   - object: The key is converted to a string, and the object is checked for
   *     a matching key via [Object.prototype.propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable).
   *   - null: Regardless of key `false` is returned.
   * @return {boolean}
   */
  has.enumerable = function hasEnumerable(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'enumerable');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'enumerable');

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
