/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - HAS
 * -----------------------------------------------------------------------------
 * @section base
 * @version 3.0.0-beta
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
   * A shortcut for [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   *   (that accepts `null`), [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes),
   *   [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test),
   *   and [Array.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
   *
   * @public
   * @param {?(Object|function|string|Array)} source
   * @param {*} key - Details (per source type):
   *   - string: For a RegExp key the source is tested for the RegExp pattern.
   *     Otherwise the source is searched for a substring of the
   *     string-converted key.
   *   - array/arguments: The key is searched for in the source's indexed values.
   * @return {boolean}
   */
  function has(source, key) {

    if (arguments.length < 2) throw _error('No key defined');
    
    if ( _is.nil(source) ) return false;

    if ( _is.str(source) ) return _match(source, key);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source) ? _inArr(source, key) : _own(source, key);
  }

  /**
   * A shortcut for [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   *   that accepts `null`.
   *
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  has.key = function hasKey(source, key) {

    if (arguments.length < 2) throw _error('No key defined', 'key');

    if ( _is.nil(source) ) return false;

    if ( !_is._obj(source) ) throw _error.type('source', 'key');

    return _own(source, key);
  };

  /**
   * A shortcut that checks for a value in an object.
   *
   * @public
   * @param {?(Object|function)} source
   * @param {*} val
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
   * A shortcut for [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *   and [RegExp.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
   *
   * @public
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  has.pattern = function hasPattern(source, pattern) {

    if ( !_is.str(source) ) throw _error.type('source', 'pattern');
    if (arguments.length < 2) throw _error('No pattern defined', 'pattern');

    return _match(source, pattern);
  };

  /**
   * A shortcut for [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes).
   *
   * @public
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  has.substring = function hasSubstring(source, str) {

    if ( !_is.str(source) ) throw _error.type('source', 'substring');
    if (arguments.length < 2) throw _error('No str defined', 'substring');

    return _inStr(source, str);
  };
  // define shorthand
  has.substr = has.substring;

  /**
   * A shortcut for [Object.prototype.propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
   *   that accepts `null`.
   *
   * @public
   * @param {?(Object|function)} source
   * @param {*} key
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
