/**
 * ---------------------------------------------------------------------------
 * TEST-EACH-PROPERTY HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = require('./is.js');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = require('./set-error.js');
/// #}}} @func setError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setTypeError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} param
 * @param {string} types
 * @return {!TypeError}
 */
var setTypeError = setError.type;
/// #}}} @func setTypeError

/// #}}} @group ERROR

/// #{{{ @group HAS

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = require('./has-own-property.js');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isArguments
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArguments = IS.args;
/// #}}} @func isArguments

/// #{{{ @func isArray
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArray = IS.array;
/// #}}} @func isArray

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isHashMap
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isHashMap = IS.hashMap;
/// #}}} @func isHashMap

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func testEachHashMap
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {!function(*, string): *} func
 * @return {boolean}
 */
function testEachHashMap(src, func) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'func');
  }

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Object|!Function)');
  }
  if ( !isFunction(func) ) {
    throw setTypeError(new TypeError, 'func', '!function(*, string): *');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step test-each-property

  for (key in src) {
    if ( hasOwnProperty(src, key) && !func(src[key], key) ) {
      return false;
    }
  }

  /// #}}} @step test-each-property

  /// #{{{ @step return-pass

  return true;

  /// #}}} @step return-pass
}
/// #}}} @func testEachHashMap

/// #{{{ @func testEachList
/**
 * @private
 * @param {(!Array|!Arguments)} src
 * @param {!function(*, number): *} func
 * @return {boolean}
 */
function testEachList(src, func) {

  /// #{{{ @step declare-variables

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'func');
  }

  if ( !isArray(src) && !isArguments(src) ) {
    throw setTypeError(new TypeError, 'src', '(!Array|!Arguments)');
  }
  if ( !isFunction(func) ) {
    throw setTypeError(new TypeError, 'func', '!function(*, number): *');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step test-each-property

  len = src.length;
  i = -1;
  while (++i < len) {
    if ( !func(src[i], i) ) {
      return false;
    }
  }

  /// #}}} @step test-each-property

  /// #{{{ @step return-pass

  return true;

  /// #}}} @step return-pass
}
/// #}}} @func testEachList

/// #{{{ @func testEachProperty
/**
 * @public
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @return {boolean}
 */
function testEachProperty(src, func) {

  /// #{{{ @step declare-variables

  /** @type {boolean} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'func');
  }

  if ( !isHashMap(src) ) {
    throw setTypeError(new TypeError, 'src',
      '(!Array|!Arguments|!Object|!Function)');
  }
  if ( !isFunction(func) ) {
    throw setTypeError(new TypeError, 'func',
      '!function(*, number|string): *');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step test-each-property

  result = isArray(src) || isArguments(src)
    ? testEachList(src, func)
    : testEachHashMap(src, func);

  /// #}}} @step test-each-property

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func testEachProperty

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = testEachProperty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
