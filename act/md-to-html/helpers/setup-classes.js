/**
 * ---------------------------------------------------------------------------
 * SETUP-CLASSES HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
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

/// #{{{ @const GLOBAL_KEY
/**
 * @private
 * @const {string}
 */
var GLOBAL_KEY = 'VITALS_MD_TO_HTML_CLASSES';
/// #}}} @const GLOBAL_KEY

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
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

/// #{{{ @group FS

/// #{{{ @func getDirectoryPaths
/**
 * @private
 * @param {string} src
 *   The #src must be a valid directory path (relative or absolute).
 * @param {(?Object|?boolean)=} opts
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

/// #{{{ @func getFilePaths
/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If the #opts is a `boolean`, the #opts.deep option is set to its value.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid files.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute file paths instead of relative file paths.
 * @param {?boolean=} opts.extend = `false`
 *   When supplying a valid or invalid pattern to check paths against, the
 *   #opts.extend option allows you to supplement instead of overwrite the
 *   default valid or invalid test. If the default value is `null`, this
 *   option does not have any side effects.
 * @param {?RegExp=} opts.valid = `null`
 *   A pattern for matching valid file or directory paths. If #opts.valid is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.valid pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.valid pattern.
 * @param {?RegExp=} opts.invalid = `null`
 *   A pattern for matching invalid file or directory paths. If #opts.invalid
 *   is `null`, no check is performed. If it is a `RegExp`, the source
 *   property is checked for a forward slash, `"/"`. If it has a forward
 *   slash, the path tree is tested against the #opts.invalid pattern.
 *   Otherwise (i.e. if it does not have a forward slash), the path name is
 *   tested against the #opts.invalid pattern.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when #opts.deep is `true`. A pattern for matching valid
 *   directory paths. If #opts.validDirs is `null`, no check is performed. If
 *   it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.validDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.validDirs pattern.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   Only used when #opts.deep is `true`. A pattern for matching invalid
 *   directory paths. If #opts.invalidDirs is `null`, no check is performed.
 *   If it is a `RegExp`, the source property is checked for a forward slash,
 *   `"/"`. If it has a forward slash, the path tree is tested against the
 *   #opts.invalidDirs pattern. Otherwise (i.e. if it does not have a forward
 *   slash), the path name is tested against the #opts.invalidDirs pattern.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid file paths. If #opts.validFiles is `null`,
 *   no check is performed. If it is a `RegExp`, the source property is
 *   checked for a forward slash, `"/"`. If it has a forward slash, the path
 *   tree is tested against the #opts.validFiles pattern. Otherwise (i.e. if
 *   it does not have a forward slash), the path name is tested against the
 *   #opts.validFiles pattern.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid file paths. If #opts.invalidFiles is
 *   `null`, no check is performed. If it is a `RegExp`, the source property
 *   is checked for a forward slash, `"/"`. If it has a forward slash, the
 *   path tree is tested against the #opts.invalidFiles pattern. Otherwise
 *   (i.e. if it does not have a forward slash), the path name is tested
 *   against the #opts.invalidFiles pattern.
 * @return {!Array<string>}
 */
var getFilePaths = loadTaskHelper('get-file-paths');
/// #}}} @func getFilePaths

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadTaskHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #}}} @group HAS

/// #{{{ @group IS

/// #{{{ @func isEmpty
/**
 * @description
 *   Checks if a value is considered empty. The definition of empty is
 *   defined as follows in order of priority (per the #val data type):
 *   - *`null`*!$
 *     `null` is considered empty.
 *   - *`undefined`*!$
 *     `undefined` is considered empty.
 *   - *`number`*!$
 *     Only `0` and `NaN` are considered empty.
 *   - *`string`*!$
 *     Only `""` is considered empty.
 *   - *`boolean`*!$
 *     Only `false` is considered empty.
 *   - *`function`*!$
 *     The length property must be `0` to be considered empty.
 *   - *`!Array`*!$
 *     The length property must be `0` to be considered empty.
 *   - *`!Object`*!$
 *     The `object` must **not** own any properties to be considered empty.
 *   - *`*`*!$
 *     All other data types are **not** considered empty.
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isEmpty = IS.empty;
/// #}}} @func isEmpty

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

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadTaskHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = loadTaskHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadTaskHelper('set-constant-property');
/// #}}} @func setConstantProperty

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
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadTaskHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func trimJsFileExtension
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimJsFileExtension = loadTaskHelper('trim-file-extension').construct(
  '.js');
/// #}}} @func trimJsFileExtension

/// #{{{ @func trimPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimPathName = loadTaskHelper('trim-path-name');
/// #}}} @func trimPathName

/// #}}} @group PATH

/// #{{{ @group STRING

/// #{{{ @func toCamelCase
/**
 * @private
 * @param {string} val
 * @return {string}
 */
var toCamelCase = loadTaskHelper('to-camel-case');
/// #}}} @func toCamelCase

/// #}}} @group STRING

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

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadConstructors
/**
 * @private
 * @param {!Object} CACHE
 * @return {void}
 */
function loadConstructors(CACHE) {

  /// #{{{ @step declare-variables

  /** @type {!Function} */
  var constructor;
  /** @type {!Array<string>} */
  var paths;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'CACHE');
  }
  if ( !isObject(CACHE) ) {
    throw setTypeError(new TypeError, 'CACHE', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step load-each-constructor

  paths = getDirectoryPaths(DIR.CLASSES, {
    'deep': false,
    'full': true,
    'extend': true,
    'invalidDirs': /^\./
  });
  forEachProperty(paths, function _loadConstructor(path) {
    path = resolvePath(path, 'constructor.js');
    constructor = require(path);
    constructor.ID = constructor.TYPE.ID;
    constructor.PATH = path;
    constructor.TREE = trimPathName(path);
    constructor.prototype = createObject(null);
    freezeObject(constructor);
    setConstantProperty(CACHE, constructor.TYPE.ID, constructor);
    setConstantProperty(constructor.prototype, 'constructor', constructor,
      false);
  });

  /// #}}} @step load-each-constructor
}
/// #}}} @func loadConstructors

/// #{{{ @func loadMethods
/**
 * @private
 * @param {!Object} CACHE
 * @return {void}
 */
function loadMethods(CACHE) {

  /// #{{{ @step declare-variables

  /** @type {!function} */
  var method;
  /** @type {!Array<string>} */
  var paths;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'CACHE');
  }
  if ( !isObject(CACHE) ) {
    throw setTypeError(new TypeError, 'CACHE', '!Object');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step load-each-method

  forEachProperty(CACHE, function _loadMethods(constructor) {
    path = resolvePath(constructor.TREE, 'methods');
    paths = getFilePaths(path, {
      'deep': false,
      'full': true,
      'extend': true,
      'validFiles': /\.js$/,
      'invalidFiles': /^\./
    });
    forEachProperty(paths, function _loadMethod(path) {
      name = getPathName(path);
      name = trimJsFileExtension(name);
      name = toCamelCase(name);
      method = require(path);
      method.NAME = name;
      method.PATH = path;
      freezeObject(method);
      setConstantProperty(constructor.prototype, name, method);
    });
    freezeObject(constructor.prototype);
  });

  /// #}}} @step load-each-method
}
/// #}}} @func loadMethods

/// #{{{ @func setupClasses
/**
 * @public
 * @return {void}
 */
function setupClasses() {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var cache;

  /// #}}} @step declare-variables

  /// #{{{ @step check-cache-state

  if (hasOwnEnumProperty(global, GLOBAL_KEY)
      && isObject(global[GLOBAL_KEY])
      && !isEmpty(global[GLOBAL_KEY]) ) {
    return;
  }

  /// #}}} @step check-cache-state

  /// #{{{ @step make-cache-object

  cache = createObject(null);

  setConstantProperty(global, GLOBAL_KEY, cache);

  loadConstructors(cache);
  loadMethods(cache);

  /// #}}} @step make-cache-object
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
