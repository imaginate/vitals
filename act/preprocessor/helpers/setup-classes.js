/**
 * ---------------------------------------------------------------------------
 * SETUP-CLASSES HELPER
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
var setError = require('./set-error-base.js');
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

/// #{{{ @group MAKE

/// #{{{ @func makeTypeIds
/**
 * @private
 * @return {!Object<string, !TypeId>}
 */
var makeTypeIds = require('./make-type-ids.js');
/// #}}} @func makeTypeIds

/// #}}} @group MAKE

/// #{{{ @group OBJECT

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadTaskHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

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

/// #{{{ @func setupOnProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} value
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setupOnProperty = require('./setup-on-property.js');
/// #}}} @func setupOnProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @enum {string}
 * @const
 * @struct
 */
var DIR = freezeObject({
  HELPERS: resolvePath(__dirname)
});
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @enum {string}
 * @const
 * @struct
 */
var FILE = freezeObject({
  CONSTRUCTORS: resolvePath(DIR.HELPERS, './load-constructors.js'),
  METHODS: resolvePath(DIR.HELPERS, './load-methods.js'),
  IDS: resolvePath(DIR.HELPERS, './setup-type-ids.js')
});
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func setupClasses
/**
 * @public
 * @return {void}
 */
function setupClasses() {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, boolean>} */
  var loaded;
  /** @type {!Object<string, !Function>} */
  var cache;
  /** @type {!Object<string, !TypeId>} */
  var ids;

  /// #}}} @step declare-variables

  /// #{{{ @step check-cache-states

  if (CACHE_KEY in global) {
    cache = global[CACHE_KEY];

    if ( !isObject(cache)
        || !isObject(cache.__TYPE_IDS)
        || !isObject(cache.__LOADED) )
      throw setError(new Error,
        'invalid property value set for `global.' + CACHE_KEY + '`');

    loaded = cache.__LOADED;

    if (!loaded.constructors || !loaded.methods || !loaded.classes)
      throw setError(new Error,
        'invalid incomplete state for `global.' + CACHE_KEY + '`');

    return;
  }

  /// #}}} @step check-cache-states

  /// #{{{ @step make-loaded-object

  loaded = createObject(null);
  setupOnProperty(loaded, 'constructors', false);
  setupOnProperty(loaded, 'methods', false);
  setupOnProperty(loaded, 'classes', false);
  capObject(loaded);

  /// #}}} @step make-loaded-object

  /// #{{{ @step make-type-ids-object

  ids = makeTypeIds();

  /// #}}} @step make-type-ids-object

  /// #{{{ @step make-cache-object

  cache = createObject(null);
  setupOffProperty(cache, '__TYPE_IDS', ids);
  setupOffProperty(cache, '__LOADED', loaded);
  setupOffProperty(global, CACHE_KEY, cache, true);
  require(FILE.CONSTRUCTORS)();
  freezeObject(cache);

  /// #}}} @step make-cache-object

  /// #{{{ @step load-class-methods

  require(FILE.METHODS)();

  /// #}}} @step load-class-methods

  /// #{{{ @step update-load-state

  setupOffProperty(loaded, 'classes', true, true);

  /// #}}} @step update-load-state
}
/// #}}} @func setupClasses

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = setupClasses;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
