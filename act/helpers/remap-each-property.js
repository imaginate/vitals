/**
 * ---------------------------------------------------------------------------
 * REMAP-EACH-PROPERTY HELPER
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

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func remapEachHashMap
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {!function(*, string): *} func
 * @return {!Object}
 */
function remapEachHashMap(src, func) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var result;
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

  /// #{{{ @step make-new-object

  result = {};
  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      result[key] = func(src[key], key);
    }
  }

  /// #}}} @step make-new-object

  /// #{{{ @step return-new-object

  return result;

  /// #}}} @step return-new-object
}
/// #}}} @func remapEachHashMap

/// #{{{ @func remapEachHashMapSrc
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {!function(*, string): *} func
 * @return {(!Object|!Function)}
 */
function remapEachHashMapSrc(src, func) {

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

  /// #{{{ @step remap-source

  for (key in src) {
    if ( hasOwnProperty(src, key) ) {
      src[key] = func(src[key], key);
    }
  }

  /// #}}} @step remap-source

  /// #{{{ @step return-source

  return src;

  /// #}}} @step return-source
}
/// #}}} @func remapEachHashMapSrc

/// #{{{ @func remapEachList
/**
 * @private
 * @param {(!Array|!Arguments)} src
 * @param {!function(*, number): *} func
 * @return {!Array}
 */
function remapEachList(src, func) {

  /// #{{{ @step declare-variables

  /** @type {!Array} */
  var result;
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

  /// #{{{ @step make-new-array

  result = [];
  len = src.length;
  i = -1;
  while (++i < len) {
    result.push(
      func(src[i], i)
    );
  }

  /// #}}} @step make-new-array

  /// #{{{ @step return-new-array

  return result;

  /// #}}} @step return-new-array
}
/// #}}} @func remapEachList

/// #{{{ @func remapEachListSrc
/**
 * @private
 * @param {(!Array|!Arguments)} src
 * @param {!function(*, number): *} func
 * @return {(!Array|!Arguments)}
 */
function remapEachListSrc(src, func) {

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

  /// #{{{ @step remap-source

  len = src.length;
  i = -1;
  while (++i < len) {
    src[i] = func(src[i], i);
  }

  /// #}}} @step remap-source

  /// #{{{ @step return-source

  return src;

  /// #}}} @step return-source
}
/// #}}} @func remapEachListSrc

/// #{{{ @func remapEachProperty
/**
 * @public
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @param {boolean=} changeSrc = `false`
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
function remapEachProperty(src, func, changeSrc) {

  /// #{{{ @step declare-variables

  /** @type {(!Array|!Arguments|!Object|!Function)} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'func');
    case 2:
      changeSrc = false;
      break;
    default:
      if ( isUndefined(changeSrc) ) {
        changeSrc = false;
      }
      else if ( !isBoolean(changeSrc) ) {
        throw setTypeError(new TypeError, 'changeSrc', 'boolean=');
      }
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

  /// #{{{ @step make-result

  result = isArray(src) || isArguments(src)
    ? changeSrc
      ? remapEachListSrc(src, func)
      : remapEachList(src, func)
    : changeSrc
      ? remapEachHashMapSrc(src, func)
      : remapEachHashMap(src, func);

  /// #}}} @step make-result

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func remapEachProperty

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = remapEachProperty;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
