/**
 * ---------------------------------------------------------------------------
 * LOAD-METHODS HELPER
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

/// #{{{ @const CACHE_KEY
/**
 * @private
 * @const {string}
 */
var CACHE_KEY = '__VITALS_JSPP_CLASS_CACHE';
/// #}}} @const CACHE_KEY

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

/// #{{{ @func isCacheLoaded
/**
 * @private
 * @param {string} cacheKey
 * @param {(...string)=} ignoreKey
 *   If `global[cacheKey].__LOADED` is an `object` (i.e. not a `boolean`), the
 *   #ignoreKey parameter allows you to set key names within the `"__LOADED"`
 *   `object` that are not required to be `true` for this `function` to return
 *   `true`.
 * @return {boolean}
 */
var isCacheLoaded = require('./is-cache-loaded.js');
/// #}}} @func isCacheLoaded

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

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

/// #{{{ @group OBJECT

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #}}} @group OBJECT

/// #{{{ @group SETUP

/// #{{{ @func setupOffProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `false`
 * @return {!Object}
 */
var setupOffProperty = require('./setup-off-property.js');
/// #}}} @func setupOffProperty

/// #}}} @group SETUP

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadMethods
/**
 * @public
 * @return {void}
 */
function loadMethods() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Method>} */
  var methods;
  /** @type {!Object<string, !Function>} */
  var cache;
  /** @type {!Object} */
  var proto;
  /** @type {string} */
  var name;
  /** @type {string} */
  var key;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-cache

  if ( !isCacheLoaded(CACHE_KEY, 'methods', 'classes') )
    throw setError(new Error,
      'called jspp `loadMethods` before `loadConstructors` completed');

  /// #}}} @step verify-cache

  /// #{{{ @step set-cache-ref

  cache = global[CACHE_KEY];

  /// #}}} @step set-cache-ref

  /// #{{{ @step check-cache-state

  if (cache.__LOADED.methods)
    return;

  /// #}}} @step check-cache-state

  /// #{{{ @step load-each-method

  for (name in cache) {
    proto = cache[name].prototype;
    methods = proto.__METHODS;
    for (key in methods) {
      methods[key].load();
    }
    freezeObject(proto);
  }

  /// #}}} @step load-each-method

  /// #{{{ @step update-load-state

  setupOffProperty(cache.__LOADED, 'methods', true, true);

  /// #}}} @step update-load-state
}
/// #}}} @func loadMethods

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = loadMethods;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
