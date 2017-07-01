/**
 * ---------------------------------------------------------------------------
 * LOAD-CONSTRUCTORS HELPER
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

/// #{{{ @const CLASSES
/**
 * @private
 * @enum {!Object}
 * @const
 * @dict
 */
var CLASSES = require('./get-class-config.js')();
/// #}}} @const CLASSES

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

/// #{{{ @func setDirError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setDirError = setError.dir;
/// #}}} @func setDirError

/// #{{{ @func setEmptyError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setEmptyError = setError.empty;
/// #}}} @func setEmptyError

/// #{{{ @func setFileError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @param {string} path
 * @return {!Error}
 */
var setFileError = setError.file;
/// #}}} @func setFileError

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

/// #{{{ @func isCacheLoaded
/**
 * @private
 * @param {string} key
 * @param {?Object<string, *>=} state = `null`
 *   This parameter allows you to define key names and values that must be
 *   defined within the cache `object`, `global[key].__LOADED`.
 * @return {boolean}
 */
var isCacheLoaded = require('./is-cache-loaded.js');
/// #}}} @func isCacheLoaded

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

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
  CLASSES: resolvePath(__dirname, '../classes')
});
/// #}}} @const DIR

/// #}}} @group PATHS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadConstructors
/**
 * @public
 * @return {void}
 */
function loadConstructors() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var config;
  /** @type {!Object<string, !Function>} */
  var cache;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-cache

  if ( !isCacheLoaded(CACHE_KEY) )
    throw setError(new Error,
      'called jspp `loadConstructors` before `setupClasses` started');

  /// #}}} @step verify-cache

  /// #{{{ @step set-cache-ref

  cache = global[CACHE_KEY];

  /// #}}} @step set-cache-ref

  /// #{{{ @step check-cache-state

  if (cache.__LOADED.constructors)
    return;

  /// #}}} @step check-cache-state

  /// #{{{ @step verify-classes-directory

  if ( !isDirectory(DIR.CLASSES) )
    throw setDirError(new Error, 'DIR.CLASSES', DIR.CLASSES);

  /// #}}} @step verify-classes-directory

  /// #{{{ @step load-each-constructor

  for (name in CLASSES) {
    if ( hasOwnProperty(CLASSES, name) ) {
      config = CLASSES[name];
      name = config.classname;
      path = resolvePath(DIR.CLASSES, name, 'constructor.js');

      if ( !isFile(path) )
        throw setFileError(new Error, 'path', path);

      setupOffProperty(cache, name, require(path), true);

      if ( !isFunction(cache[name]) )
        throw setError(new TypeError,
          'invalid data type exported for `' + name + '` class constructor\n' +
          '    module-path: `' + path + '`');
    }
  }

  /// #}}} @step load-each-constructor

  /// #{{{ @step update-load-state

  setupOffProperty(cache.__LOADED, 'constructors', true, true);

  /// #}}} @step update-load-state
}
/// #}}} @func loadConstructors

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = loadConstructors;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
