/**
 * ---------------------------------------------------------------------------
 * LOAD-CLASS HELPER
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

/// #{{{ @const JS_EXT
/**
 * @private
 * @const {!RegExp}
 */
var JS_EXT = /\.js$/;
/// #}}} @const JS_EXT

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

/// #{{{ @group FS

/// #{{{ @func getDirectoryPaths
/**
 * @private
 * @param {string} dirpath
 * @param {(?Object|boolean)=} opts
 *   If the #opts is a `boolean`, the #opts.deep option is set to its value.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid directory paths.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute directory paths instead of relative directory paths.
 * @param {?boolean=} opts.extend = `false`
 *   When supplying a valid or invalid pattern to check paths against, the
 *   #opts.extend option allows you to supplement instead of overwrite the
 *   default valid or invalid test. If the default value is `null`, this
 *   option does not have any side effects.
 * @param {?RegExp=} opts.valid
 *   An alias for `opts.validDirs`.
 * @param {?RegExp=} opts.invalid
 *   An alias for `opts.invalidDirs`.
 * @param {?RegExp=} opts.validDirs = `null`
 *   A pattern for matching valid directory paths. If #opts.validDirs is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.validDirs pattern. Otherwise (i.e.
 *   if it does not have a forward slash), the path name is tested against the
 *   #opts.validDirs pattern.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   A pattern for matching invalid directory paths. If #opts.invalidDirs is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.invalidDirs pattern. Otherwise
 *   (i.e. if it does not have a forward slash), the path name is tested
 *   against the #opts.invalidDirs pattern.
 * @return {!Array<string>}
 */
var getDirectoryPaths = loadTaskHelper('get-directory-paths');
/// #}}} @func getDirectoryPaths

/// #}}} @group FS

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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadTaskHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func defineProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {!Object} descriptor
 * @return {!Object}
 */
var defineProperty = loadTaskHelper('define-property');
/// #}}} @func defineProperty

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

/// #{{{ @group PATH

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadTaskHelper('get-path-name');
/// #}}} @func getPathName

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
 * @const {!Object<string, string>}
 * @struct
 */
var DIR = freezeObject({
  CLASSES: resolvePath(__dirname, '../classes')
});
/// #}}} @const DIR

/// #}}} @group PATHS

/// #{{{ @group CACHE
//////////////////////////////////////////////////////////////////////////////
// CACHE
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const HAS_GLOBAL_CACHE
/**
 * @private
 * @const {boolean}
 */
var HAS_GLOBAL_CACHE = '__VITALS_JSPP_CLASS_CACHE' in global
  && isObject(global.__VITALS_CLASS_LOAD_CACHE);
/// #}}} @const HAS_GLOBAL_CACHE

/// #{{{ @const CACHE
/**
 * @public
 * @const {!Object<string, !Function>}
 * @dict
 */
var CACHE = HAS_GLOBAL_CACHE
  ? global.__VITALS_JSPP_CLASS_CACHE
  : makeCache(DIR.CLASSES);
/// #}}} @const CACHE

/// #{{{ @const global.__VITALS_JSPP_CLASS_CACHE
if (!HAS_GLOBAL_CACHE) {
  defineProperty(global, '__VITALS_JSPP_CLASS_CACHE', {
    'value': CACHE,
    'writable': false,
    'enumerable': true,
    'configurable': false
  });
}
/// #}}} @const global.__VITALS_JSPP_CLASS_CACHE

/// #}}} @group CACHE

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadClass
/**
 * @public
 * @param {string} name
 * @return {!Function}
 */
function loadClass(name) {

  if ( !isString(name) )
    throw setTypeError(new TypeError, 'name', 'string');

  name = getPathName(name);
  name = name.replace(JS_EXT, '');

  if (!name)
    throw setEmptyError(new Error, 'name');
  if ( !(name in CACHE) )
    throw setError(new Error,
      'invalid jspp `class` name for `name` parameter\n' +
      '    invalid-name: `' + name + '`');

  return CACHE[name];
}
/// #}}} @func loadClass

/// #{{{ @func makeCache
/**
 * @private
 * @param {string} path
 * @return {!Object}
 */
function makeCache(path) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, !Method>} */
  var methods;
  /** @type {!Object<string, !Function>} */
  var cache;
  /** @type {!Array<string>} */
  var paths;
  /** @type {string} */
  var name;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isString(path) )
    throw setTypeError(new TypeError, 'path', 'string');
  if (!path)
    throw setEmptyError(new Error, 'path');
  if ( !isDirectory(path) )
    throw setDirError(new Error, 'path', path);

  /// #}}} @step verify-parameters

  /// #{{{ @step make-empty-cache

  cache = createObject(null);

  /// #}}} @step make-empty-cache

  /// #{{{ @step get-class-dirs

  paths = getDirectoryPaths(path, {
    'deep': false,
    'full': true,
    'extend': true,
    'validDirs': /^[a-z\-]+$/,
    'invalidDirs': /^\./
  });

  /// #}}} @step get-class-dirs

  /// #{{{ @step require-each-constructor

  len = paths.length;
  i = -1;
  while (++i < len) {
    path = paths[i];
    name = getPathName(path);

    if (!name)
      throw setError(new RangeError,
        'invalid empty `class` name for directory path\n' +
        '    dir-path: `' + path + '`');

    path = resolvePath(path, './constructor.js');

    if ( !isFile(path) )
      throw setFileError(new Error, 'path', path);

    defineProperty(cache, name, {
      'value': require(path),
      'writable': false,
      'enumerable': true,
      'configurable': false
    });

    if ( !isFunction(cache[name]) )
      throw setError(new TypeError,
        'invalid data type exported for `' + name + '` class constructor\n' +
        '    module-path: `' + path + '`');
  }

  /// #}}} @step require-each-constructor

  /// #{{{ @step require-each-method

  for (name in cache) {
    methods = cache[name].prototype.__METHODS;
    for (key in methods) {
      methods[key].load();
    }
  }

  /// #}}} @step require-each-method

  /// #{{{ @step return-cache

  return cache;

  /// #}}} @step return-cache
}
/// #}}} @func makeCache

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = loadClass;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
