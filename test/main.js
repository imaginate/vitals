/**
 * ---------------------------------------------------------------------------
 * VITALS UNIT TESTS
 * ---------------------------------------------------------------------------
 * @file
 *   This module runs the unit tests for *vitals*. Use `act test` to call it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group LOADERS
//////////////////////////////////////////////////////////////////////////////
// LOADERS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func loadHelper
/**
 * @private
 * @param {string} name
 * @return {(!Object|!Function)}
 */
var loadHelper = require('./helpers/load-helper.js');
/// #}}} @func loadHelper

/// #}}} @group LOADERS

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
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const VERSION
/**
 * @private
 * @const {string}
 */
var VERSION = loadHelper('get-version')();
/// #}}} @const VERSION

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
var setError = loadHelper('set-error');
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

/// #{{{ @func setExtError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} path
 * @param {(string|!Array<string>)=} exts
 * @return {!RangeError}
 */
var setExtError = setError.ext;
/// #}}} @func setExtError

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

/// #{{{ @func setIndexError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} index
 * @param {number=} min = `0`
 * @return {!RangeError}
 */
var setIndexError = setError.index;
/// #}}} @func setIndexError

/// #{{{ @func setNewError
/**
 * @private
 * @param {!SyntaxError} err
 * @param {string} constructor
 * @return {!SyntaxError}
 */
var setNewError = setError.new_;
/// #}}} @func setNewError

/// #{{{ @func setNoArgError
/**
 * @private
 * @param {!Error} err
 * @param {string} param
 * @return {!Error}
 */
var setNoArgError = setError.noArg;
/// #}}} @func setNoArgError

/// #{{{ @func setRangeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} val
 * @param {!Array<string>} vals
 * @return {!RangeError}
 */
function setRangeError(err, param, val, vals) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'param');
    case 2:
      throw setNoArgError(new Error, 'val');
    case 3:
      throw setNoArgError(new Error, 'vals');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(val) ) {
    throw setTypeError(new TypeError, 'val', 'string');
  }
  if ( !isArray(vals) || !isStringList(vals) ) {
    throw setTypeError(new TypeError, 'vals', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-message

  msg = 'invalid option value for `' + param + '`\n'
    + '    invalid-value: `"' + val + '"`\n'
    + '    valid-values:\n'
    + '        `"' + vals.join('"`\n        `"') + '"`';

  /// #}}} @step make-message

  /// #{{{ @step set-error-name

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setRangeError

/// #{{{ @func setRetError
/**
 * @private
 * @param {!TypeError} err
 * @param {string} method
 * @param {string} types
 * @return {!TypeError}
 */
var setRetError = setError.ret;
/// #}}} @func setRetError

/// #{{{ @func setTimeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {string} val
 * @return {!RangeError}
 */
function setTimeError(err, param, val) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'param');
    case 2:
      throw setNoArgError(new Error, 'val');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isString(param) ) {
    throw setTypeError(new TypeError, 'param', 'string');
  }
  if ( !isString(val) ) {
    throw setTypeError(new TypeError, 'val', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-message

  msg = 'invalid time for `' + param + '`\n'
    + '    invalid-time: `"' + val + '"`\n'
    + '    valid-time-test: `/^[0-9]*\\.?[0-9]+ *(ms|s|m|h|d|y)?$/i`';

  /// #}}} @step make-message

  /// #{{{ @step set-error-name

  if (err.name !== 'RangeError') {
    err.name = 'RangeError';
  }

  /// #}}} @step set-error-name

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setTimeError

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

/// #{{{ @func setWholeError
/**
 * @private
 * @param {!RangeError} err
 * @param {string} param
 * @param {number} value
 * @return {!RangeError}
 */
var setWholeError = setError.whole;
/// #}}} @func setWholeError

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
var getDirectoryPaths = loadHelper('get-directory-paths');
/// #}}} @func getDirectoryPaths

/// #{{{ @func getFileContent
/**
 * @private
 * @param {string} path
 * @param {boolean=} buffer
 * @return {(!Buffer|string)}
 */
var getFileContent = loadHelper('get-file-content');
/// #}}} @func getFileContent

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
var getFilePaths = loadHelper('get-file-paths');
/// #}}} @func getFilePaths

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
var hasOption = loadHelper('has-option');
/// #}}} @func hasOption

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = loadHelper('has-own-enum-property');
/// #}}} @func hasOwnEnumProperty

/// #{{{ @func hasOwnProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnProperty = loadHelper('has-own-property');
/// #}}} @func hasOwnProperty

/// #}}} @group HAS

/// #{{{ @group IS

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

/// #{{{ @func isDirectory
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

/// #{{{ @func isError
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isError = IS.error;
/// #}}} @func isError

/// #{{{ @func isFile
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

/// #{{{ @func isFileSystem
/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
var isFileSystem = IS.fileSystemSection;
/// #}}} @func isFileSystem

/// #{{{ @func isFunction
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFunction = IS.func;
/// #}}} @func isFunction

/// #{{{ @func isInstanceOf
/**
 * @private
 * @param {*} inst
 * @param {!Function} constructor
 * @return {boolean}
 */
var isInstanceOf = IS.instanceOf;
/// #}}} @func isInstanceOf

/// #{{{ @func isList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isList = IS.list;
/// #}}} @func isList

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

/// #{{{ @func isRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;
/// #}}} @func isRegExp

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

/// #{{{ @func isUndefined
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.void;
/// #}}} @func isUndefined

/// #}}} @group IS

/// #{{{ @group LOG

/// #{{{ @func logEmpty
/**
 * @private
 * @param {!Object} opts
 * @return {void}
 */
var logEmpty = loadHelper('log-empty');
/// #}}} @func logEmpty

/// #{{{ @func logEnd
/**
 * @private
 * @param {number} failures
 * @param {!Object} opts
 * @return {void}
 */
var logEnd = loadHelper('log-end');
/// #}}} @func logEnd

/// #{{{ @func logStart
/**
 * @private
 * @param {!Object} opts
 * @return {void}
 */
var logStart = loadHelper('log-start');
/// #}}} @func logStart

/// #}}} @group LOG

/// #{{{ @group MOCHA

/// #{{{ @func Mocha
/**
 * @private
 * @constructor
 */
var Mocha = require('mocha');
/// #}}} @func Mocha

/// #}}} @group MOCHA

/// #{{{ @group OBJECT

/// #{{{ @func capObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var capObject = loadHelper('cap-object');
/// #}}} @func capObject

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = loadHelper('clone-object');
/// #}}} @func cloneObject

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = loadHelper('for-each-property');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {?Object}
 */
var freezeObject = loadHelper('freeze-object');
/// #}}} @func freezeObject

/// #{{{ @func remapEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @param {boolean=} alterSrc = `false`
 *   If #alterSrc is set to `false`, a new `array` or `object` is created. If
 *   #alterSrc is set to `true`, the #src `array`, `arguments`, `object`, or
 *   `function` is directly altered.
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var remapEachProperty = loadHelper('remap-each-property');
/// #}}} @func remapEachProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = loadHelper('get-path-name');
/// #}}} @func getPathName

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = loadHelper('resolve-path');
/// #}}} @func resolvePath

/// #{{{ @func trimJsFileExtension
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimJsFileExtension = loadHelper('trim-file-extension').construct('.js');
/// #}}} @func trimJsFileExtension

/// #}}} @group PATH

/// #{{{ @group STRING

/// #{{{ @func getSuperMethod
/**
 * @private
 * @param {string} method
 * @return {string}
 */
var getSuperMethod = loadHelper('get-super-method');
/// #}}} @func getSuperMethod

/// #{{{ @func trimSuperMethod
/**
 * @private
 * @param {string} method
 * @return {string}
 */
var trimSuperMethod = loadHelper('trim-super-method');
/// #}}} @func trimSuperMethod

/// #{{{ @func trimVitals
/**
 * @private
 * @param {string} method
 * @return {string}
 */
var trimVitals = loadHelper('trim-vitals');
/// #}}} @func trimVitals

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, !Object<string, (string|!Object<string, string>)>>}
 * @struct
 */
var DIR = freezeObject({
  REPO: resolvePath(__dirname, '..'),
  SRC: {
    MAIN: resolvePath(__dirname, '../src'),
    METHODS: resolvePath(__dirname, '../src/methods'),
    SECTIONS: resolvePath(__dirname, '../src/sections')
  },
  DIST: {
    MAIN: resolvePath(__dirname, '../dist'),
    BROWSER: {
      MAIN: resolvePath(__dirname, '../dist/browser'),
      METHODS: resolvePath(__dirname, '../dist/browser/methods'),
      SECTIONS: resolvePath(__dirname, '../dist/browser/sections')
    },
    NODE: {
      MAIN: resolvePath(__dirname, '../dist/node'),
      METHODS: resolvePath(__dirname, '../dist/node/methods'),
      SECTIONS: resolvePath(__dirname, '../dist/node/sections')
    }
  },
  TEST: {
    MAIN: resolvePath(__dirname),
    DUMMY: resolvePath(__dirname, './.dummy'),
    HELPERS: resolvePath(__dirname, './helpers')
    METHODS: resolvePath(__dirname, './methods'),
    REPORTERS: resolvePath(__dirname, './reporters')
  }
}, true);
/// #}}} @const DIR

/// #{{{ @const FILE
/**
 * @private
 * @const {!Object<string, !Object<string, (string|!Object<string, string>)>>}
 * @struct
 */
var FILE = freezeObject({
  DIST: {
    BROWSER: {
      MAIN: resolvePath(DIR.DIST.BROWSER, 'vitals.js')
    },
    NODE: {
      MAIN: resolvePath(DIR.DIST.NODE, 'vitals.js')
    }
  }
}, true);
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group DEFAULTS
//////////////////////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLTS
/**
 * @private
 * @const {!Object<string, (?string|?boolean)>}
 * @dict
 */
var DFLTS = freezeObject({
  'build': 'node',
  'main': true,
  'section': 'all',
  'super': null,
  'method': null,
  'fs': true,
  'reporter': 'specky',
  'slow': '5ms'
});
/// #}}} @const DFLTS

/// #{{{ @const OPTS
/**
 * @private
 * @const {!Object<string, !Array<string>>}
 * @dict
 */
var OPTS = freezeObject({
  'build': remapEachProperty(
    getDirectoryPaths(DIR.DIST.MAIN, {
      'deep': false,
      'full': false,
      'extend': true,
      'invalidDirs': /^[_\.]/
    }), function makeBuildValue(path) {
      return getPathName(path);
    }, true),
  'section': remapEachProperty(
    getFilePaths(DIR.SRC.SECTIONS, {
      'deep': false,
      'full': false,
      'extend': true,
      'validFiles': /\.js$/,
      'invalidFiles': /-fs\.js$/
    }), function makeSectionValue(path) {
      path = getPathName(path);
      return trimJsFileExtension(path);
    }, true),
  'super': remapEachProperty(
    getDirectoryPaths(DIR.TEST.METHODS, {
      'deep': false,
      'full': false,
      'extend': true,
      'invalidDirs': /^[_\.]/
    }), function makeSuperValue(path) {
      return getPathName(path);
    }, true),
  'method': remapEachProperty(
    getFilePaths(DIR.TEST.METHODS, {
      'deep': true,
      'full': false,
      'extend': true,
      'invalidDirs': /^[_\.]/,
      'validFiles': /\.js$/,
      'invalidFiles': /^[_\.]/
    }), function makeMethodValue(path) {
      path = getPathName(path);
      return trimJsFileExtension(path);
    }, true),
  'reporter': remapEachProperty(
    getFilePaths(DIR.TEST.REPORTERS, {
      'deep': false,
      'full': false,
      'extend': true,
      'validFiles': /\.js$/,
      'invalidFiles': /^[_\.]/
    }), function makeReporterValue(path) {
      path = getPathName(path);
      return trimJsFileExtension(path);
    }, true)
}, true);
/// #}}} @const OPTS

/// #}}} @group DEFAULTS

/// #{{{ @group MAIN
//////////////////////////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func main
/**
 * @public
 * @param {?Object=} opts
 * @param {string=} opts.build = `"node"`
 *   The #opts.build option allows you to set which @vitals build tests to
 *   run. The available @vitals builds are:
 *   - `"browser"`
 *   - `"node"`
 * @param {boolean=} opts.main = `true`
 *   The #opts.main option allows you to require the main @vitals distribution
 *   (i.e. `../dist/BUILD/vitals.js`) to run tests against.
 * @param {?string=} opts.section = `"all"`
 *   The #opts.section option allows you to set which @vitals section tests to
 *   run. If #opts.section is `null`, no section tests are ran. The available
 *   @vitals sections are:
 *   - `"all"`
 *   - `"base"`
 *   - `"fs"`
 *   - `"shell"`
 *   - `"strict"`
 * @param {?string=} opts.super = `null`
 *   The #opts.super option allows you to set which @vitals super method tests
 *   to run. If #opts.super is `null`, no super method tests are ran. The
 *   available @vitals super methods are the names of each directory located
 *   in the directory `./methods` (relative to the `test` directory at the top
 *   of the repository tree).
 * @param {?string=} opts.method = `null`
 *   The #opts.method option allows you to set which @vitals method tests to
 *   run. If #opts.method is `null`, no method tests are ran. The available
 *   @vitals methods are the names of each file located within each directory
 *   in the directory `./methods` (i.e. `./methods/SUPER/METHOD.js`) (relative
 *   to the `test` directory at the top of the repository tree).
 * @param {boolean=} opts.fs = `true`
 *   The #opts.fs option allows you to run the `"fs"` version of a section,
 *   super, or method if it is available.
 * @param {string=} opts.reporter = `"specky"`
 *   The #opts.reporter option allows you to set which reporter to use when
 *   reporting test results. The available reporters are:
 *   - `"dotty"`
 *   - `"specky"`
 * @param {(number|string)=} opts.slow = `5`
 *   The #opts.slow option allows you to set the threshhold of time at which
 *   a unit test is considered slow or poorly performing. If #opts.slow is a
 *   `number`, it is measured in milliseconds and must be greater than or
 *   equal to `1`. If it is a `string`, it may include a shorthand identifier
 *   specifying the unit of time following the stringified `number` of time.
 *   If no unit of time is specified, it defaults to `"ms"`. The available
 *   units of time are:
 *   - `"ms"`
 *   - `"s"`
 *   - `"m"`
 *   - `"h"`
 *   - `"d"`
 *   - `"y"`
 * @return {void}
 */
function main(opts) {

  /// #{{{ @step declare-variables

  /** @type {(!Object|!Function)} */
  var vitals;
  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var files;
  /** @type {!Array<string>} */
  var args;
  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( !isUndefined(opts) && !isNull(opts) && !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '?Object=');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-options

  if (opts) {
    opts = cloneObject(opts);

    if ( !hasOption(opts, 'build') ) {
      opts['build'] = DFLTS['build'];
    }
    else if ( !isString(opts['build']) ) {
      throw setTypeError(new TypeError, 'opts.build', 'string=');
    }
    else if ( !isInArray(OPTS['build'], opts['build']) ) {
      throw setRangeError(new RangeError, 'opts.build', OPTS['build']);
    }

    if ( !hasOption(opts, 'main') ) {
      opts['main'] = DFLTS['main'];
    }
    else if ( !isBoolean(opts['main']) ) {
      throw setTypeError(new TypeError, 'opts.main', 'boolean=');
    }

    if ( !hasOption(opts, 'section') ) {
      opts['section'] = DFLTS['section'];
    }
    else if ( !isNull(opts['section']) && !isString(opts['section']) ) {
      throw setTypeError(new TypeError, 'opts.section', '?string=');
    }
    else if (!opts['section']) {
      opts['section'] = null;
    }
    else if ( isFileSystem(opts['section']) ) {
      opts['section'] = 'fs';
    }
    else if ( !isInArray(OPTS['section'], opts['section'].toLowerCase()) ) {
      throw setRangeError(new RangeError, 'opts.section', OPTS['section']);
    }
    else {
      opts['section'] = opts['section'].toLowerCase();
    }

    if ( !hasOption(opts, 'super') ) {
      opts['super'] = DFLTS['super'] && trimVitals(DFLTS['super']);
    }
    else if ( !isNull(opts['super']) && !isString(opts['super']) ) {
      throw setTypeError(new TypeError, 'opts.super', '?string=');
    }
    else if ( !opts['super'] || !trimVitals(opts['super']) ) {
      opts['super'] = null;
    }
    else {
      opts['super'] = opts['super'].toLowerCase();
      opts['super'] = trimVitals(opts['super']);
      if ( !isInArray(OPTS['super'], opts['super']) ) {
        throw setRangeError(new RangeError, 'opts.super', OPTS['super']);
      }
    }

    if ( !hasOption(opts, 'method') ) {
      opts['method'] = DFLTS['method'] && trimVitals(DFLTS['method']);
      if (opts['method']) {
        if (opts['super']) {
          opts['method'] = opts['super'] + trimSuperMethod(opts['method']);
        }
        else {
          opts['super'] = getSuperMethod(opts['method']);
        }
      }
    }
    else if ( !isNull(opts['method']) && !isString(opts['method']) ) {
      throw setTypeError(new TypeError, 'opts.method', '?string=');
    }
    else if ( !opts['method'] || !trimVitals(opts['method']) ) {
      opts['method'] = null;
    }
    else {
      opts['method'] = opts['method'].toLowerCase();
      opts['method'] = trimVitals(opts['method']);
      if ( !isInArray(OPTS['method'], opts['method']) ) {
        throw setRangeError(new RangeError, 'opts.method', OPTS['method']);
      }
      if (!opts['super']) {
        opts['super'] = getSuperMethod(opts['method']) || null;
      }
    }

    if ( !hasOption(opts, 'fs') ) {
      opts['fs'] = DFLTS['fs'];
    }
    else if ( !isBoolean(opts['fs']) ) {
      throw setTypeError(new TypeError, 'opts.fs', 'boolean=');
    }

    if ( !hasOption(opts, 'reporter') ) {
      opts['reporter'] = DFLTS['reporter'];
    }
    else if ( !isString(opts['reporter']) ) {
      throw setTypeError(new TypeError, 'opts.reporter', 'string=');
    }
    else if ( !isInArray(OPTS['reporter'], opts['reporter']) ) {
      throw setRangeError(new RangeError, 'opts.reporter', OPTS['reporter']);
    }

    if ( !hasOption(opts, 'slow') ) {
      opts['slow'] = DFLTS['slow'];
    }
    else if ( isNumber(opts['slow']) ) {
      if (opts['slow'] < 1) {
        opts['slow'] = 1;
      }
      opts['slow'] += 'ms';
    }
    else if ( !isString(opts['slow']) ) {
      throw setTypeError(new TypeError, 'opts.slow', '(number|string)=');
    }
    else if ( !isTime(opts['slow']) ) {
      throw setTimeError(new RangeError, 'opts.slow', opts['slow']);
    }
  }
  else {
    opts = cloneObject(DFLTS);
  }

  if (!opts['fs'] && opts['section'] === 'fs') {
    opts['fs'] = true;
  }

  if (opts['fs'] && opts['build'] === 'browser') {
    opts['fs'] = false;
  }

  opts = freezeObject(opts);

  /// #}}} @step verify-options

  /// #{{{ @step load-vitals

  if (opts['main']) {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'vitals.js');
  }
  else if (opts['section'] && opts['fs'] && opts['section'] !== 'fs') {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'sections',
      opts['section'] + '-fs.js');
    if ( !isFile(path) ) {
      path = resolvePath(DIR.DIST.MAIN, opts['build'], 'sections',
        opts['section'] + '.js');
    }
  }
  else if (opts['section']) {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'sections',
      opts['section'] + '.js');
  }
  else if (opts['super'] && opts['fs']) {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'methods',
      opts['super'] + '-fs.js');
    if ( !isFile(path) ) {
      path = resolvePath(DIR.DIST.MAIN, opts['build'], 'methods',
        opts['super'] + '.js');
    }
  }
  else if (opts['super']) {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'methods',
      opts['super'] + '.js');
  }
  else {
    path = resolvePath(DIR.DIST.MAIN, opts['build'], 'sections/all.js');
  }

  if ( !isFile(path) ) {
    logEmpty(opts);
    return;
  }

  vitals = require(path);

  if (opts['main'] && opts['build'] === 'node') {
    args = [];
    if (opts['section']) {
      args.push(opts['section']);
      if (opts['fs']) {
        if (opts['section'] !== 'all' && opts['section'] !== 'fs') {
          args.push('fs');
        }
      }
    }
    else if (opts['super']) {
      args.push(opts['super']);
      if (opts['fs']) {
        args.push('fs');
      }
    }
    vitals = vitals(args);
  }

  /// #}}} @step load-vitals

  /// #{{{ @step get-test-files

  paths = getFilePaths(DIR.TEST.METHODS, {
    'deep': true,
    'full': true,
    'extend': true,
    'validDirs': !!opts['super']
      ? new RegExp('^' + opts['super'] + '$')
      : null,
    'invalidDirs': /^[_\.]/,
    'validFiles': !!opts['method']
      ? new RegExp('^' + opts['method'].replace(/\./g, '\\.') + '\\.js$')
      : /\.js$/,
    'invalidFiles': /^[_\.]/
  });

  if (opts['section']) {
    paths = remapEachProperty(paths, function filterFileBySection(path) {
      return hasSection(path, opts['section'])
        ? path
        : '';
    });
  }

  if (!opts['fs']) {
    paths = remapEachProperty(paths, function filterFileByFileSystem(path) {
      return !!path && hasSection(path, 'fs')
        ? ''
        : path;
    });
  }

  files = [];
  forEachProperty(paths, function makeTestFile(path) {
    if (path) {
      files.push(path);
    }
  });

  if (!files.length) {
    logEmpty(opts);
    return;
  }

  /// #}}} @step get-test-files

  /// #{{{ @step setup-mocha-reporters

  forEachProperty(OPTS['reporters'], function setupReporter(key) {

    /** @type {string} */
    var path;

    path = resolvePath(DIR.TEST.REPORTERS, key + '.js');
    Mocha.reporters[key] = require(path);
  });

  /// #}}} @step setup-mocha-reporters

  /// #{{{ @step setup-mocha-interface

  require(FILE.TEST.INTERFACE);

  /// #}}} @step setup-mocha-interface

  /// #{{{ @step make-new-mocha-instance

  mocha = new Mocha();
  mocha.slow(opts['slow']);
  mocha.reporter(opts['reporter']);
  mocha.ui('vitals');

  /// #}}} @step make-new-mocha-instance

  /// #{{{ @step make-global-object

  global.VITALS_TEST = capObject({
    'DUMMY': DIR.TEST.DUMMY,
    'VITALS': vitals,
    'VERSION': VERSION,
    'failures': 0,
    'loadHelper': loadHelper
  });

  /// #}}} @step make-global-object

  /// #{{{ @step set-exit-event

  process.on('exit', function uponExit(code, signal) {
    if (code !== 0) {
      return;
    }
    code = global.VITALS_TEST.failures === 0
      ? 0
      : 15;
    process.exit(code);
  });

  /// #}}} @step set-exit-event

  /// #{{{ @step append-test-files-to-mocha

  forEachProperty(files, function appendTestFile(path) {
    mocha.addFile(path);
  });

  /// #}}} @step append-test-files-to-mocha

  /// #{{{ @step run-mocha

  logStart(opts);

  mocha.run(function callback(failures) {
    global.VITALS_TEST.failures = failures;
    logEnd(failures, opts);
  });

  /// #}}} @step run-mocha
}
/// #}}} @func main

/// #}}} @group MAIN

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol