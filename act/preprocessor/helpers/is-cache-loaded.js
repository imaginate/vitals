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

/// #{{{ @func hasLoadedState
/**
 * @private
 * @param {!Object<string, *>} loaded
 * @param {?Object<string, *>} state
 * @return {boolean}
 */
function hasLoadedState(loaded, state) {

  /** @type {string} */
  var key;
  /** @type {*} */
  var val;

  if (!state)
    return true;

  for (key in state) {
    if ( hasOwnProperty(state, key) ) {
      if ( !(key in loaded) )
        return false;

      val = state[key];
      if ( !isUndefined(val) && loaded[key] !== val )
        return false;
    }
  }
  return true;
}
/// #}}} @func hasLoadedState

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func isCacheLoaded
/**
 * @public
 * @param {string} key
 * @param {?Object<string, *>=} state = `null`
 *   This parameter allows you to define key names and values that must be
 *   defined within the cache `object`, `global[key].__LOADED`.
 * @return {boolean}
 */
function isCacheLoaded(key, state) {

  /** @type {!Object<string, (?Object|?Function)>} */
  var cache;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'key');

    case 1:
      state = null;
      break;

    default:
      if ( isUndefined(state) )
        state = null;
      else if ( !isNull(state) && !isObject(state) )
        throw setTypeError(new TypeError, 'state', '?Object<string, *>=');
  }

  if ( !isString(key) )
    throw setTypeError(new TypeError, 'key', 'string');
  if (!key)
    throw setEmptyError(new Error, 'key');

  if ( !hasOwnProperty(global, key) || !isObject(global[key]) )
     return false;

  cache = global[key];
  return isObject(cache.__LOADED) && hasLoadedState(cache.__LOADED, state);
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
