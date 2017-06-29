/**
 * ---------------------------------------------------------------------------
 * IS-CACHE-LOADED HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadTaskHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadTaskHelper = require('./load-task-helper.js');
/// #}}} @func loadTaskHelper

/// #}}} @group LOADERS

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var IS = loadTaskHelper('is');
/// #}}} @const IS

/// #}}} @group CONSTANTS

/// #{{{ @group HELPERS
//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group ARRAY

/// #{{{ @func sliceArray
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
var sliceArray = loadTaskHelper('slice-array');
/// #}}} @func sliceArray

/// #}}} @group ARRAY

/// #{{{ @group ERROR

/// #{{{ @func setError
/**
 * @private
 * @param {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)} err
 * @param {string} msg
 * @return {(!Error|!RangeError|!ReferenceError|!SyntaxError|!TypeError)}
 */
var setError = loadTaskHelper('set-error');
/// #}}} @func setError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

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
var hasOwnProperty = loadTaskHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;
/// #}}} @func isString

/// #{{{ @func isStringList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isStringList = IS.stringList;
/// #}}} @func isStringList

/// #{{{ @func isTrue
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isTrue(val) {
  return val === true;
}
/// #}}} @func isTrue

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group MAKE

/// #{{{ @func makeLoadedTest
/**
 * @private
 * @param {?Array<string>} ignoreKeys
 * @param {(string|undefined)=} ignoreKey
 * @return {!function(string, *): boolean}
 */
function makeLoadedTest(ignoreKeys, ignoreKey) {

  if ( isNull(ignoreKeys) )
    return isString(ignoreKey)
      ? function isLoaded(key, value) {
          return isTrue(value) || key === ignoreKey;
        }
      : function isLoaded(key, value) {
          return isTrue(value);
        };

  /**
   * @private
   * @const {number}
   */
  var LEN = ignoreKeys.length;

  return function isLoaded(key, value) {

    /** @type {number} */
    var i;

    if ( isTrue(value) )
      return true;

    i = 0;
    while (i < LEN) {
      if (ignoreKeys[i++] === val) {
        return true;
      }
    }
    return false;
  };
}
/// #}}} @func makeLoadedTest

/// #}}} @group MAKE

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isCacheLoaded
/**
 * @public
 * @param {string} cacheKey
 * @param {(...string)=} ignoreKey
 *   If `global[cacheKey].__LOADED` is an `object` (i.e. not a `boolean`), the
 *   #ignoreKey parameter allows you to set key names within the `"__LOADED"`
 *   `object` that are not required to be `true` for this `function` to return
 *   `true`.
 * @return {boolean}
 */
function isCacheLoaded(cacheKey, ignoreKey) {

  /** @type {!function(string, *): boolean} */
  var isLoaded;
  /** @type {?Array<string>} */
  var ignore;
  /** @type {(boolean|!Object<string, boolean>)} */
  var loaded;
  /** @type {!Object<string, (?Object|?Function)>} */
  var cache;
  /** @type {string} */
  var key;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'cacheKey');

    case 1:
      break;

    case 2:
      if ( isUndefined(ignoreKey) || isString(ignoreKey) )
        isLoaded = makeLoadedTest(null, ignoreKey);
      else
        throw setTypeError(new TypeError, 'ignoreKey', '(...string)=');

      break;

    default:
      ignore = sliceArray(arguments, 1);

      if ( isStringList(ignore) )
        isLoaded = makeLoadedTest(ignore);
      else
        throw setTypeError(new TypeError, 'ignoreKey', '(...string)=');
  }

  if ( !isString(cacheKey) )
    throw setTypeError(new TypeError, 'cacheKey', 'string');
  if (!cacheKey)
    throw setEmptyError(new Error, 'cacheKey');

  if ( !hasOwnProperty(global, cacheKey) || !isObject(global[cacheKey]) )
     return false;

  cache = global[cacheKey];

  if (!cache.__LOADED)
    return false;

  loaded = cache.__LOADED;

  if ( isBoolean(loaded) )
    return true;

  if ( !isObject(loaded) )
    return false;

  isLoaded = isLoaded || makeLoadedTest(null);

  for (key in loaded) {
    if ( !isLoaded(key, loaded[key]) ) {
      return false;
    }
  }
  return true;
}
/// #}}} @func isCacheLoaded

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = isCacheLoaded;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
