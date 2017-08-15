/**
 * ---------------------------------------------------------------------------
 * TEST TASK
 * ---------------------------------------------------------------------------
 * @file
 *   This task runs the unit tests for *vitals*. Use `act test` to run it.
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'runs vitals unit tests';
exports['value'] = '[SECTION|SUPER|METHOD[-SECTION|SUPER|METHOD]...[:]]...';
exports['default'] = '-node= all';
exports['methods'] = {
  'browser': {
    'desc': 'runs browser specific unit tests for one or more sections, '
      + 'super method groups, and/or methods',
    'value': '[SECTION|SUPER|METHOD[-SECTION|SUPER|METHOD]...[:]]...',
    'method': testBrowser
  },
  'node': {
    'desc': 'runs node specific unit tests for one or more sections, super '
      + 'method groups, and/or methods',
    'value': '[SECTION|SUPER|METHOD[-SECTION|SUPER|METHOD]...[:]]...',
    'method': testNode
  }
};
exports['done'] = false;

/// #}}} @group EXPORTS

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

/// #{{{ @const CONFIG
/**
 * @private
 * @const {!Object}
 */
var CONFIG = require('./build.json');
/// #}}} @const CONFIG

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var IS = loadHelper('is');
/// #}}} @const IS

/// #{{{ @const NOT_SUPER
/**
 * @private
 * @const {!RegExp}
 */
var NOT_SUPER = /\..*$/;
/// #}}} @const NOT_SUPER

/// #{{{ @const SUPER
/**
 * @private
 * @const {!RegExp}
 */
var SUPER = /^[^\.]+\.?/;
/// #}}} @const SUPER

/// #{{{ @const VERSION
/**
 * @private
 * @const {string}
 */
var VERSION = loadHelper('get-version')();
/// #}}} @const VERSION

/// #{{{ @const VITALS
/**
 * @private
 * @const {!RegExp}
 */
var VITALS = /^vitals\./i;
/// #}}} @const VITALS

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

/// #{{{ @func setTestItemError
/**
 * @private
 * @param {!RangeError} err
 * @param {!Array<!Array<string>>} itemsList
 * @param {string} itemsString
 * @return {!RangeError}
 */
function setTestItemError(err, itemsList, itemsString) {

  /// #{{{ @step declare-variables

  /** @type {!Object<string, boolean>} */
  var flags;
  /** @type {!Array<string>} */
  var items;
  /** @type {string} */
  var item;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'itemsList');
    case 2:
      throw setNoArgError(new Error, 'itemsString');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!RangeError');
  }
  if ( !isArrayList(itemsList) ) {
    throw setTypeError(new TypeError, 'itemsList', '!Array<!Array<string>>');
  }
  if ( !isString(itemsString) ) {
    throw setTypeError(new TypeError, 'itemsString', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-invalid-items

  testEachProperty(itemsList, function getInvalidItems(_items) {
    if ( isTestItems(_items) ) {
      return true;
    }
    items = _items;
    return false;
  });

  /// #}}} @step get-invalid-items

  /// #{{{ @step setup-flags

  flags = {
    'section': false,
    'super': false,
    'method': false,
    'fs': false
  };

  /// #}}} @step setup-flags

  /// #{{{ @step get-invalid-item

  testEachProperty(items, function getInvalidItem(_item) {
    if (_item === 'fs') {
      flags['fs'] = true;
      return true;
    }
    else if ( isSection(_item) ) {
      if (!flags['section']) {
        flags['section'] = true;
        return true;
      }
    }
    else if ( isSuperMethod(_item) ) {
      if (!flags['super']) {
        flags['super'] = true;
        return true;
      }
    }
    else if ( isMethod(_item) ) {
      if (!flags['method']) {
        flags['method'] = true;
        return true;
      }
    }
    item = _item;
    return false;
  });

  /// #}}} @step get-invalid-item

  /// #{{{ @step make-message

  msg = 'invalid `item` (i.e. `SECTION|SUPER|METHOD`) in `itemsString`\n'
    + '    items-string: `"' + itemsString + '"`\n'
    + '    invalid-item: `"' + item + '"`';

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
/// #}}} @func setTestItemError

/// #{{{ @func setTestModError
/**
 * @private
 * @param {!Error} err
 * @param {!Test} test
 * @param {?number} code
 * @param {?string} signal
 * @return {!Error}
 */
function setTestModError(err, test, code, signal) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var section;
  /** @type {string} */
  var method;
  /** @type {string} */
  var super;
  /** @type {string} */
  var msg;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'err');
    case 1:
      throw setNoArgError(new Error, 'test');
    case 2:
      throw setNoArgError(new Error, 'code');
    case 3:
      throw setNoArgError(new Error, 'signal');
  }

  if ( !isError(err) ) {
    throw setTypeError(new TypeError, 'err', '!Error');
  }
  if ( !isInstanceOf(test, Test) ) {
    throw setTypeError(new TypeError, 'test', '!Test');
  }
  if ( !isNullNumber(code) ) {
    throw setTypeError(new TypeError, 'code', '?number');
  }
  if ( !isNullString(signal) ) {
    throw setTypeError(new TypeError, 'signal', '?string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step prepare-values

  signal = isNull(signal)
    ? 'null'
    : '"' + signal + '"';
  section = isNull(test.section)
    ? 'null'
    : '"' + test.section + '"';
  super = isNull(test.super)
    ? 'null'
    : '"' + test.super + '"';
  method = isNull(test.method)
    ? 'null'
    : '"' + test.method + '"';

  /// #}}} @step prepare-values

  /// #{{{ @step make-message

  msg = 'internal test module failure\n'
    + '    exit-code: `' + code + '`\n'
    + '    exit-signal: `' + signal + '`\n'
    + '    test-options:\n'
    + '        build: `"' + test.build + '"`\n'
    + '        section: `' + section + '`\n'
    + '        super: `' + super + '`\n'
    + '        method: `' + method + '`\n'
    + '        fs: `' + test.fs + '`\n'
    + '        reporter: `"' + test.reporter + '"`\n'
    + '        slow: `"' + test.slow + '"`';

  /// #}}} @step make-message

  /// #{{{ @step set-error-name

  if (err.name !== 'Error') {
    err.name = 'Error';
  }

  /// #}}} @step set-error-name

  /// #{{{ @step return-error

  return setError(err, msg);

  /// #}}} @step return-error
}
/// #}}} @func setTestModError

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
function hasOption(opts, key) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'opts');
    case 1:
      throw setNoArgError(new Error, 'key');
  }

  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }
  if ( !isString(key) ) {
    throw setTypeError(new TypeError, 'key', 'string');
  }

  if (!key) {
    throw setEmptyError(new Error, 'key');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return hasOwnEnumProperty(opts, key) && !isUndefined(opts[key]);

  /// #}}} @step return-result
}
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

/// #{{{ @func isArrayList
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isArrayList = IS.arrayList;
/// #}}} @func isArrayList

/// #{{{ @func isBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;
/// #}}} @func isBoolean

/// #{{{ @func isBuild
/**
 * @private
 * @param {string} item
 * @return {boolean}
 */
function isBuild(item) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'item');
  }
  if ( !isString(item) ) {
    throw setTypeError(new TypeError, 'item', 'string');
  }
  if (!item) {
    throw setEmptyError(new Error, 'item');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-path

  path = resolvePath(DIR.DIST.MAIN, item);

  /// #}}} @step make-path

  /// #{{{ @step return-result

  return isDirectory(path);

  /// #}}} @step return-result
}
/// #}}} @func isBuild

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

/// #{{{ @func isMethod
/**
 * @private
 * @param {string} item
 * @return {boolean}
 */
function isMethod(item) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var superMethod;
  /** @type {string} */
  var subMethod;
  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'item');
  }
  if ( !isString(item) ) {
    throw setTypeError(new TypeError, 'item', 'string');
  }
  if (!item) {
    throw setEmptyError(new Error, 'item');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step get-super-method

  superMethod = getSuperMethod(item);

  /// #}}} @step get-super-method

  /// #{{{ @step check-super-method

  if ( !superMethod || !isSuperMethod(superMethod) ) {
    return false;
  }

  /// #}}} @step check-super-method

  /// #{{{ @step get-sub-method

  subMethod = trimSuperMethod(item);

  /// #}}} @step get-sub-method

  /// #{{{ @step check-main-sub-method

  if (!subMethod || subMethod === 'main') {
    return superMethod !== 'to';
  }

  /// #}}} @step check-main-sub-method

  /// #{{{ @step make-path

  path = superMethod + '.' + subMethod + '.js';
  path = resolvePath(DIR.TEST.METHODS, superMethod, path);

  /// #}}} @step make-path

  /// #{{{ @step return-result

  return isFile(path);

  /// #}}} @step return-result
}
/// #}}} @func isMethod

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNullNumber
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullNumber(val) {
  return isNull(val) || isNumber(val);
}
/// #}}} @func isNullNumber

/// #{{{ @func isNullString
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullString(val) {
  return isNull(val) || isString(val);
}
/// #}}} @func isNullString

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

/// #{{{ @func isReporter
/**
 * @private
 * @param {string} item
 * @return {boolean}
 */
function isReporter(item) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'item');
  }
  if ( !isString(item) ) {
    throw setTypeError(new TypeError, 'item', 'string');
  }
  if (!item) {
    throw setEmptyError(new Error, 'item');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-path

  path = item + '.js';
  path = resolvePath(DIR.TEST.REPORTERS, path);

  /// #}}} @step make-path

  /// #{{{ @step return-result

  return isFile(path);

  /// #}}} @step return-result
}
/// #}}} @func isReporter

/// #{{{ @func isSection
/**
 * @private
 * @param {string} item
 * @return {boolean}
 */
function isSection(item) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'item');
  }
  if ( !isString(item) ) {
    throw setTypeError(new TypeError, 'item', 'string');
  }
  if (!item) {
    throw setEmptyError(new Error, 'item');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-path

  path = item + '.js';
  path = resolvePath(DIR.SRC.SECTIONS, path);

  /// #}}} @step make-path

  /// #{{{ @step return-result

  return isFile(path);

  /// #}}} @step return-result
}
/// #}}} @func isSection

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

/// #{{{ @func isSuperMethod
/**
 * @private
 * @param {string} item
 * @return {boolean}
 */
function isSuperMethod(item) {

  /// #{{{ @step declare-variables

  /** @type {string} */
  var path;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'item');
  }
  if ( !isString(item) ) {
    throw setTypeError(new TypeError, 'item', 'string');
  }
  if (!item) {
    throw setEmptyError(new Error, 'item');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-path

  path = resolvePath(DIR.TEST.METHODS, item);

  /// #}}} @step make-path

  /// #{{{ @step return-result

  return isDirectory(path);

  /// #}}} @step return-result
}
/// #}}} @func isSuperMethod

/// #{{{ @func isTestItems
/**
 * @private
 * @param {!Array<string>} items
 * @return {boolean}
 */
function isTestItems(items) {

  /// #{{{ @step declare-variables

  /** @type {boolean} */
  var result;
  /** @type {!Object<string, boolean>} */
  var flags;
  /** @type {string} */
  var item;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'items');
  }
  if ( !isArray(items) || !isStringList(items) ) {
    throw setTypeError(new TypeError, 'items', '!Array<string>');
  }
  if (!items.length) {
    throw setEmptyItemsError(new RangeError, 'items');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step setup-flags

  flags = {
    'section': false,
    'super': false,
    'method': false,
    'fs': false
  };

  /// #}}} @step setup-flags

  /// #{{{ @step test-each-item

  result = testEachProperty(items, function isTestItem(item) {
    if (item === 'fs') {
      flags['fs'] = true;
      return true;
    }
    if ( isSection(item) ) {
      if (flags['section']) {
        return false;
      }
      flags['section'] = true;
      return true;
    }
    if ( isSuperMethod(item) ) {
      if (flags['super']) {
        return false;
      }
      flags['super'] = true;
      return true;
    }
    if ( isMethod(item) ) {
      if (flags['method']) {
        return false;
      }
      flags['method'] = true;
      return true;
    }
    return false;
  });

  /// #}}} @step test-each-item

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func isTestItems

/// #{{{ @func isTestItemsList
/**
 * @private
 * @param {!Array<!Array<string>>} itemsList
 * @return {boolean}
 */
function isTestItemsList(itemsList) {

  /// #{{{ @step declare-variables

  /** @type {boolean} */
  var result;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'itemsList');
  }
  if ( !isArray(itemsList) || !isArrayList(itemsList) ) {
    throw setTypeError(new TypeError, 'itemsList', '!Array<!Array<string>>');
  }
  if (!itemsList.length) {
    throw setEmptyItemsError(new RangeError, 'itemsList');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step test-each-items

  result = testEachProperty(itemsList, isTestItems);

  /// #}}} @step test-each-items

  /// #{{{ @step return-result

  return result;

  /// #}}} @step return-result
}
/// #}}} @func isTestItemsList

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

/// #{{{ @func makeTestItems
/**
 * @private
 * @param {string} itemsString
 * @return {!Array<string>}
 */
function makeTestItems(itemsString) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var items;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'itemsString');
  }
  if ( !isString(itemsString) ) {
    throw setTypeError(new TypeError, 'itemsString', 'string');
  }
  if (!itemsString) {
    throw setEmptyError(new Error, 'itemsString');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-items

  items = itemsString.split('-');

  /// #}}} @step make-items

  /// #{{{ @step return-items

  return items;

  /// #}}} @step return-items
}
/// #}}} @func makeTestItems

/// #{{{ @func makeTestItemsList
/**
 * @private
 * @param {string} itemsString
 * @return {!Array<!Array<string>>}
 */
function makeTestItemsList(itemsString) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var itemsStrings;
  /** @type {!Array<!Array<string>>} */
  var itemsList;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'itemsString');
  }
  if ( !isString(itemsString) ) {
    throw setTypeError(new TypeError, 'itemsString', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step clean-items-string

  if (itemsString) {
    itemsString = itemsString.replace(/[ \t]/g, '');
    itemsString = itemsString.replace(/--+/g, '-');
    itemsString = itemsString.replace(/::+/g, ':');
    itemsString = itemsString.replace(/(?:-:-|-:|:-)/g, ':');
    itemsString = itemsString.replace(/^[\-:]/, '');
    itemsString = itemsString.replace(/[\-:]$/, '');
    itemsString = itemsString.replace(/::+/g, ':');
  }

  /// #}}} @step clean-items-string

  /// #{{{ @step make-items-list

  if (itemsString) {
    itemsStrings = itemsString.split(':');
    itemsList = remapEachProperty(itemsStrings, makeTestItems);
  }
  else {
    itemsList = [
      [ 'all' ]
    ];
  }

  /// #}}} @step make-items-list

  /// #{{{ @step return-items-list

  return itemsList;

  /// #}}} @step return-items-list
}
/// #}}} @func makeTestItemsList

/// #{{{ @func makeTestOptions
/**
 * @private
 * @param {!Array<string>} items
 * @return {!Object}
 */
function makeTestOptions(items) {

  /// #{{{ @step declare-variables

  /** @type {!Object} */
  var opts;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'items');
  }
  if ( !isArray(items) || !isStringList(items) ) {
    throw setTypeError(new TypeError, 'items', '!Array<string>');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-options

  opts = {};
  forEachProperty(items, function appendTestOption(item) {
    if (item === 'fs') {
      opts.fs = true;
    }
    else if ( isSection(item) ) {
      opts.section = item;
    }
    else if ( isSuperMethod(item) ) {
      opts.super = item;
    }
    else if ( isMethod(item) ) {
      opts.method = item;
    }
  });

  /// #}}} @step make-options

  /// #{{{ @step return-options

  return opts;

  /// #}}} @step return-options
}
/// #}}} @func makeTestOptions

/// #}}} @group MAKE

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

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = loadHelper('create-object');
/// #}}} @func createObject

/// #{{{ @func deepMergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var deepMergeObject = loadHelper('deep-merge-object');
/// #}}} @func deepMergeObject

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

/// #{{{ @func mergeObject
/**
 * @private
 * @param {...(?Object|?Function)} src
 * @return {!Object}
 */
var mergeObject = loadHelper('merge-object');
/// #}}} @func mergeObject

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

/// #{{{ @func setConstantProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} visible = `true`
 * @return {!Object}
 */
var setConstantProperty = loadHelper('set-constant-property');
/// #}}} @func setConstantProperty

/// #{{{ @func setProperty
/**
 * @private
 * @param {!Object} src
 * @param {string} key
 * @param {*} val
 * @param {boolean=} seal = `false`
 * @return {!Object}
 */
var setProperty = loadHelper('set-property');
/// #}}} @func setProperty

/// #{{{ @func testEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string)): *} func
 * @return {boolean}
 */
var testEachProperty = loadHelper('test-each-property');
/// #}}} @func testEachProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = loadHelper('clean-path');
/// #}}} @func cleanPath

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

/// #{{{ @group PROCESS

/// #{{{ @func forkProcess
/**
 * @private
 * @param {string} path
 * @param {!Array} args
 * @param {!Object} opts
 * @return {!ChildProcess}
 */
var forkProcess = require('child_process').fork;
/// #}}} @func forkProcess

/// #}}} @group PROCESS

/// #{{{ @group REGEXP

/// #{{{ @func escapeSource
/**
 * @private
 * @param {string} src
 * @return {string}
 */
var escapeSource = loadHelper('escape-source');
/// #}}} @func escapeSource

/// #}}} @group REGEXP

/// #{{{ @group STRING

/// #{{{ @func getSuperMethod
/**
 * @private
 * @param {string} opt
 * @return {string}
 */
function getSuperMethod(opt) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'opt');
  }
  if ( !isString(opt) ) {
    throw setTypeError(new TypeError, 'opt', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  opt = trimVitals(opt);
  return opt && opt.replace(NOT_SUPER, '');

  /// #}}} @step return-result
}
/// #}}} @func getSuperMethod

/// #{{{ @func trimSuperMethod
/**
 * @private
 * @param {string} opt
 * @return {string}
 */
function trimSuperMethod(opt) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'opt');
  }
  if ( !isString(opt) ) {
    throw setTypeError(new TypeError, 'opt', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  opt = trimVitals(opt);
  return opt && opt.replace(SUPER, '');

  /// #}}} @step return-result
}
/// #}}} @func trimSuperMethod

/// #{{{ @func trimVitals
/**
 * @private
 * @param {string} opt
 * @return {string}
 */
function trimVitals(opt) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'opt');
  }
  if ( !isString(opt) ) {
    throw setTypeError(new TypeError, 'opt', 'string');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-result

  return opt && opt.replace(VITALS, '');

  /// #}}} @step return-result
}
/// #}}} @func trimVitals

/// #}}} @group STRING

/// #}}} @group HELPERS

/// #{{{ @group PATHS
//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const REPO
/**
 * @private
 * @const {string}
 */
var REPO = loadHelper('get-repo-root')();
/// #}}} @const REPO

/// #{{{ @const DIR
/**
 * @private
 * @const {!Object<string, !Object<string, (string|!Object<string, string>)>>}
 * @struct
 */
var DIR = freezeObject({
  SRC: {
    MAIN: resolvePath(REPO, CONFIG.src),
    METHODS: resolvePath(REPO, CONFIG.src, 'methods'),
    SECTIONS: resolvePath(REPO, CONFIG.src, 'sections')
  },
  DIST: {
    MAIN: resolvePath(REPO, CONFIG.dest),
    BROWSER: {
      MAIN: resolvePath(REPO, CONFIG.dest, 'browser'),
      METHODS: resolvePath(REPO, CONFIG.dest, 'browser/methods'),
      SECTIONS: resolvePath(REPO, CONFIG.dest, 'browser/sections')
    },
    NODE: {
      MAIN: resolvePath(REPO, CONFIG.dest, 'node'),
      METHODS: resolvePath(REPO, CONFIG.dest, 'node/methods'),
      SECTIONS: resolvePath(REPO, CONFIG.dest, 'node/sections')
    }
  },
  TASK: {
    MAIN: resolvePath(__dirname),
    HELPERS: resolvePath(__dirname, 'helpers')
  },
  TEST: {
    MAIN: resolvePath(REPO, 'test'),
    SETUP: resolvePath(REPO, 'test/setup'),
    TESTS: resolvePath(REPO, 'test/methods'),
    REPORTERS: resolvePath(REPO, 'test/reporters')
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
  },
  TASK: {
    TESTMOD: resolvePath(DIR.TASK.HELPERS, 'test-wrapper.js')
  }
}, true);
/// #}}} @const FILE

/// #}}} @group PATHS

/// #{{{ @group CLASSES
//////////////////////////////////////////////////////////////////////////////
// CLASSES
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group TEST

/// #{{{ @func Test
/**
 * @private
 * @param {string} build
 *   The available @vitals builds are:
 *   - `"browser"`
 *   - `"node"`
 * @param {!Object} opts
 * @param {?string=} opts.section = `null`
 * @param {?string=} opts.super = `null`
 * @param {?string=} opts.method = `null`
 * @param {boolean=} opts.fs = `false`
 * @param {string=} opts.reporter = `"specky"`
 *   The available mocha test reporters are:
 *   - `"dotty"`
 *   - `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {?Test=} prev = `null`
 * @constructor
 * @struct
 */
function Test(build, opts, prev) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, Test) ) {
    throw setNewError(new SyntaxError, 'Test');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'build');
    case 1:
      throw setNoArgError(new Error, 'opts');
    case 2:
      prev = null;
      break;
    default:
      if ( isNull(prev) || isUndefined(prev) ) {
        prev = null;
      }
      else if ( !isInstanceOf(prev, Test) ) {
        throw setTypeError(new TypeError, 'prev', '?Test=');
      }
  }

  if ( !isString(build) ) {
    throw setTypeError(new TypeError, 'build', 'string');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  if (!build) {
    throw setEmptyError(new Error, 'build');
  }

  if ( !isBuild(build) ) {
    throw setDirError(new Error, 'build', resolvePath(DIR.DIST.MAIN, build));
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step verify-options

  opts = cloneObject(opts);

  if ( hasOption(opts, 'section') && !isNullString(opts['section']) ) {
    throw setTypeError(new TypeError, 'opts.section', '?string=');
  }
  else if (!opts['section']) {
    opts['section'] = null;
  }
  else if ( !isSection(opts['section']) ) {
    throw setFileError(new Error, 'opts.section',
      resolvePath(DIR.SRC.SECTIONS, opts['section'] + '.js'));
  }

  if ( hasOption(opts, 'super') && !isNullString(opts['super']) ) {
    throw setTypeError(new TypeError, 'opts.super', '?string=');
  }
  else if (!opts['super']) {
    opts['super'] = null;
  }
  else if ( !isSuperMethod(opts['super']) ) {
    throw setDirError(new Error, 'opts.super',
      resolvePath(DIR.TEST.METHODS, opts['super']));
  }

  if ( hasOption(opts, 'method') && !isNullString(opts['method']) ) {
    throw setTypeError(new TypeError, 'opts.method', '?string=');
  }
  else if (!opts['method']) {
    opts['method'] = null;
  }
  else if ( !isMethod(opts['method']) ) {
    throw setFileError(new Error, 'opts.method', 
      resolvePath(DIR.TEST.METHODS,
        getSuperMethod(opts['method']), opts['method'] + '.js'));
  }

  if ( hasOption(opts, 'fs') && !isBoolean(opts['fs']) ) {
    throw setTypeError(new TypeError, 'opts.fs', 'boolean=');
  }
  else if (!opts['fs']) {
    opts['fs'] = false;
  }

  if ( !hasOption(opts, 'reporter') ) {
    opts['reporter'] = DFLT_REPORTER;
  }
  else if ( !isString(opts['reporter']) ) {
    throw setTypeError(new TypeError, 'opts.reporter', 'string=');
  }
  else if (!opts['reporter']) {
    throw setEmptyError(new Error, 'opts.reporter');
  }
  else if ( !isReporter(opts['reporter']) ) {
    throw setFileError(new Error, 'opts.reporter',
      resolvePath(DIR.TEST.REPORTERS, opts['reporter'] + '.js'));
  }

  if ( !hasOption(opts, 'slow') ) {
    opts['slow'] = DFLT_SLOW;
  }
  else if ( !isNumber(opts['slow']) ) {
    throw setTypeError(new TypeError, 'opts.slow', 'number=');
  }
  else if (opts['slow'] < 1) {
    opts['slow'] = 1;
  }

  /// #}}} @step verify-options

  /// #{{{ @step set-constants

  /// #{{{ @const BUILD
  /**
   * @private
   * @const {string}
   */
  var BUILD = build;
  /// #}}} @const BUILD

  /// #{{{ @const OPTS
  /**
   * @private
   * @const {!Object}
   */
  var OPTS = freezeObject(opts);
  /// #}}} @const OPTS

  /// #{{{ @const SECTION
  /**
   * @private
   * @const {?string}
   */
  var SECTION = OPTS['section'];
  /// #}}} @const SECTION

  /// #{{{ @const SUPER
  /**
   * @private
   * @const {?string}
   */
  var SUPER = OPTS['super'];
  /// #}}} @const SUPER

  /// #{{{ @const METHOD
  /**
   * @private
   * @const {?string}
   */
  var METHOD = OPTS['method'];
  /// #}}} @const METHOD

  /// #{{{ @const FS
  /**
   * @private
   * @const {boolean}
   */
  var FS = OPTS['fs'];
  /// #}}} @const FS

  /// #{{{ @const REPORTER
  /**
   * @private
   * @const {string}
   */
  var REPORTER = OPTS['reporter'];
  /// #}}} @const REPORTER

  /// #{{{ @const SLOW
  /**
   * @private
   * @const {string}
   */
  var SLOW = OPTS['slow'] + 'ms';
  /// #}}} @const SLOW

  /// #{{{ @const PREV
  /**
   * @private
   * @const {?Test}
   */
  var PREV = prev;
  /// #}}} @const PREV

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member build
  /**
   * @const {string}
   */
  setConstantProperty(this, 'build', BUILD);
  /// #}}} @member build

  /// #{{{ @member section
  /**
   * @const {?string}
   */
  setConstantProperty(this, 'section', SECTION);
  /// #}}} @member section

  /// #{{{ @member super
  /**
   * @const {?string}
   */
  setConstantProperty(this, 'super', SUPER);
  /// #}}} @member super

  /// #{{{ @member method
  /**
   * @const {?string}
   */
  setConstantProperty(this, 'method', METHOD);
  /// #}}} @member method

  /// #{{{ @member fs
  /**
   * @const {boolean}
   */
  setConstantProperty(this, 'fs', FS);
  /// #}}} @member fs

  /// #{{{ @member reporter
  /**
   * @const {string}
   */
  setConstantProperty(this, 'reporter', REPORTER);
  /// #}}} @member reporter

  /// #{{{ @member slow
  /**
   * @const {string}
   */
  setConstantProperty(this, 'slow', SLOW);
  /// #}}} @member slow

  /// #{{{ @member prev
  /**
   * @const {?Test}
   */
  setConstantProperty(this, 'prev', PREV);
  /// #}}} @member prev

  /// #{{{ @member next
  /**
   * @type {?Test}
   */
  setProperty(this, 'next', null);
  /// #}}} @member next

  /// #{{{ @member exitCode
  /**
   * @type {number}
   */
  setProperty(this, 'exitCode', 0);
  /// #}}} @member exitCode

  /// #}}} @step set-members

  /// #{{{ @step cap-instance

  capObject(this);

  /// #}}} @step cap-instance
}
/// #}}} @func Test

/// #{{{ @func newTest
/**
 * @private
 * @param {string} build
 *   The available @vitals builds are:
 *   - `"browser"`
 *   - `"node"`
 * @param {!Object} opts
 * @param {?string=} opts.section = `null`
 * @param {?string=} opts.super = `null`
 * @param {?string=} opts.method = `null`
 * @param {boolean=} opts.fs = `false`
 * @param {string=} opts.reporter = `"specky"`
 *   The available mocha test reporters are:
 *   - `"dotty"`
 *   - `"specky"`
 * @param {number=} opts.slow = `5`
 * @param {?Test=} prev = `null`
 * @return {!Test}
 */
function newTest(build, opts, prev) {
  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'build');
    case 1:
      throw setNoArgError(new Error, 'opts');
    case 2:
      return new Test(build, opts);
    default:
      return new Test(build, opts, prev);
  }
}
/// #}}} @func newTest

/// #{{{ @func Test.prototype.chain
/**
 * @this {!Test}
 * @param {string} build
 *   The available @vitals builds are:
 *   - `"browser"`
 *   - `"node"`
 * @param {!Object} opts
 * @param {?string=} opts.section = `null`
 * @param {?string=} opts.super = `null`
 * @param {?string=} opts.method = `null`
 * @param {boolean=} opts.fs = `false`
 * @param {string=} opts.reporter = `"specky"`
 *   The available mocha test reporters are:
 *   - `"dotty"`
 *   - `"specky"`
 * @param {number=} opts.slow = `5`
 * @return {!Test}
 *   The original `Test` instance (i.e. not the newly created instance).
 */
function chainTest(build, opts) {

  /// #{{{ @step declare-variables

  /** @type {!Test} */
  var next;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'build');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  if ( !isString(build) ) {
    throw setTypeError(new TypeError, 'build', 'string');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  if (!build) {
    throw setEmptyError(new Error, 'build');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step check-next-property

  if (this.next) {
    this.next.chain(build, opts);
    return this;
  }

  /// #}}} @step check-next-property

  /// #{{{ @step make-new-test-instance

  next = new Test(build, opts, this);

  /// #}}} @step make-new-test-instance

  /// #{{{ @step append-new-test-instance

  setConstantProperty(this, 'next', next);

  /// #}}} @step append-new-test-instance

  /// #{{{ @step return-test-instance

  return this;

  /// #}}} @step return-test-instance
}
/// #}}} @func Test.prototype.chain

/// #{{{ @func Test.prototype.exit
/**
 * @this {!Test}
 * @return {void}
 */
function exitTest() {
  /// #{{{ @step exit-current-process

  process.exit(this.exitCode);

  /// #}}} @step exit-current-process
}
/// #}}} @func Test.prototype.exit

/// #{{{ @func Test.prototype.run
/**
 * @this {!Test}
 * @return {!Test}
 */
function runTest() {

  /// #{{{ @step declare-variables

  /** @type {!ChildProcess} */
  var cp;

  /// #}}} @step declare-variables

  /// #{{{ @step set-this-constant

  /** @const {!Test} */
  var THIS = this;

  /// #}}} @step set-this-constant

  /// #{{{ @step fork-test-module

  cp = forkProcess(FILE.TASK.TESTMOD, [
    THIS.build,
    THIS.section,
    THIS.super,
    THIS.method,
    THIS.fs,
    THIS.reporter,
    THIS.slow
  ], {
    'stdio': 'inherit'
  });

  /// #}}} @step fork-test-module

  /// #{{{ @step set-exit-event

  cp.on('exit', function uponExit(code, signal) {
    if ( isNull(code) || ( !!code && isNumber(code) && code !== 15 ) ) {
      throw setTestModError(new Error, THIS, code, signal);
    }
    THIS.setExitCode(code);
    if (THIS.next) {
      THIS.next.run();
    }
    else {
      THIS.exit();
    }
  });

  /// #}}} @step set-exit-event

  /// #{{{ @step return-test-instance

  return THIS;

  /// #}}} @step return-test-instance
}
/// #}}} @func Test.prototype.run

/// #{{{ @func Test.prototype.setExitCode
/**
 * @this {!Test}
 * @param {number} code
 * @return {!Test}
 */
function setTestExitCode(code) {

  /// #{{{ @step verify-parameters

  if (!arguments.length) {
    throw setNoArgError(new Error, 'code');
  }
  if ( !isNumber(code) ) {
    throw setTypeError(new TypeError, 'code', 'number');
  }
  if ( !isWholeNumber(code) ) {
    throw setWholeError(new RangeError, 'code', code);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-exit-code

  if (this.prev && this.prev.exitCode) {
    setConstantProperty(this, 'exitCode', this.prev.exitCode);
  }
  else {
    setConstantProperty(this, 'exitCode', code);
  }

  /// #}}} @step set-exit-code

  /// #{{{ @step return-test-instance

  return this;

  /// #}}} @step return-test-instance
}
/// #}}} @func Test.prototype.setExitCode

/// #{{{ @step setup-test-constructor

Test.Test = Test;
Test.newTest = newTest;
Test.construct = newTest;
Test.prototype = createObject(null);

freezeObject(Test);

/// #}}} @step setup-test-constructor

/// #{{{ @step setup-test-prototype

setConstantProperty(Test.prototype, 'chain', chainTest);
setConstantProperty(Test.prototype, 'exit', exitTest);
setConstantProperty(Test.prototype, 'run', runTest);
setConstantProperty(Test.prototype, 'setExitCode', setTestExitCode);
setConstantProperty(Test.prototype, 'constructor', Test, false);

freezeObject(Test.prototype);

/// #}}} @step setup-test-prototype

/// #}}} @group TEST

/// #}}} @group CLASSES

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func testBrowser
/**
 * @public
 * @param {(?string|?undefined)=} itemsString = `"all"`
 * @return {void}
 */
function testBrowser(itemsString) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Array<string>>} */
  var itemsList;
  /** @type {!Array<!Object>} */
  var optsList;
  /** @type {!Test} */
  var tests;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isNull(itemsString) || isUndefined(itemsString) ) {
    itemsString = '';
  }
  else if ( !isString(itemsString) ) {
    throw setTypeError(new TypeError, 'itemsString', '?string=');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-items

  itemsList = makeItemsList(itemsString);

  /// #}}} @step make-items

  /// #{{{ @step verify-items

  if ( !isTestItemsList(itemsList) ) {
    throw setTestItemError(new RangeError, itemsList, itemsString);
  }

  /// #}}} @step verify-items

  /// #{{{ @step make-options

  optsList = remapEachProperty(itemsList, makeTestOptions);

  /// #}}} @step make-options

  /// #{{{ @step make-tests

  tests = new Test('browser', optsList[0]);
  optsList.shift();
  forEachProperty(optsList, function makeNewTest(opts) {
    tests.chain('browser', opts);
  });

  /// #}}} @step make-tests

  /// #{{{ @step run-tests

  tests.run();

  /// #}}} @step run-tests
}
/// #}}} @func testBrowser

/// #{{{ @func testNode
/**
 * @public
 * @param {(?string|?undefined)=} itemsString = `"all"`
 * @return {void}
 */
function testNode(itemsString) {

  /// #{{{ @step declare-variables

  /** @type {!Array<!Array<string>>} */
  var itemsList;
  /** @type {!Array<!Object>} */
  var optsList;
  /** @type {!Test} */
  var tests;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  if ( isNull(itemsString) || isUndefined(itemsString) ) {
    itemsString = '';
  }
  else if ( !isString(itemsString) ) {
    throw setTypeError(new TypeError, 'itemsString', '?string=');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-items

  itemsList = makeItemsList(itemsString);

  /// #}}} @step make-items

  /// #{{{ @step verify-items

  if ( !isTestItemsList(itemsList) ) {
    throw setTestItemError(new RangeError, itemsList, itemsString);
  }

  /// #}}} @step verify-items

  /// #{{{ @step make-options

  optsList = remapEachProperty(itemsList, makeTestOptions);

  /// #}}} @step make-options

  /// #{{{ @step make-tests

  tests = new Test('node', optsList[0]);
  optsList.shift();
  forEachProperty(optsList, function makeNewTest(opts) {
    tests.chain('node', opts);
  });

  /// #}}} @step make-tests

  /// #{{{ @step run-tests

  tests.run();

  /// #}}} @step run-tests
}
/// #}}} @func testNode

/// #}}} @group METHODS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
