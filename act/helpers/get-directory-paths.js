/**
 * ---------------------------------------------------------------------------
 * GET-DIRECTORY-PATHS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const FS
/**
 * @private
 * @const {!Object<string, !function>}
 * @struct
 */
var FS = require('fs');
/// #}}} @const FS

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

/// #{{{ @func setAliasError
/**
 * @private
 * @param {!Error} err
 * @param {!Object} opts
 * @param {string} alias
 * @param {string} option
 * @return {!Error}
 */
var setAliasError = setError.alias;
/// #}}} @func setAliasError

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

/// #{{{ @func readPaths
/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/fs.html#fs_fs_readdirsync_path)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/fs.html#fs_fs_readdirsync_path_options)
 * @private
 * @param {string} dirpath
 * @return {!Array<string>}
 *   An array of all the dirnames and filenames in the directory.
 */
var readPaths = FS.readdirSync;
/// #}}} @func readPaths

/// #}}} @group FS

/// #{{{ @group HAS

/// #{{{ @func hasConflictingValues
/**
 * @private
 * @param {!Object} opts
 * @param {string} alias
 * @param {string} option
 * @return {boolean}
 */
function hasConflictingValues(opts, alias, option) {
  return !isUndefined(opts[alias]) && opts[alias] !== opts[option];
}
/// #}}} @func hasConflictingValues

/// #{{{ @func hasOption
/**
 * @private
 * @param {!Object} opts
 * @param {string} key
 * @return {boolean}
 */
var hasOption = require('./has-option.js');
/// #}}} @func hasOption

/// #{{{ @func hasOwnEnumProperty
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(string|number)} key
 * @return {boolean}
 */
var hasOwnEnumProperty = require('./has-own-enum-property.js');
/// #}}} @func hasOwnEnumProperty

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
 * @param {string} val
 * @return {boolean}
 */
var isDirectory = IS.directory;
/// #}}} @func isDirectory

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

/// #{{{ @func isNull
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isNull = IS.nil;
/// #}}} @func isNull

/// #{{{ @func isNullOrBoolean
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullOrBoolean(val) {
  return isNull(val) || isBoolean(val);
}
/// #}}} @func isNullOrBoolean

/// #{{{ @func isNullOrRegExp
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function isNullOrRegExp(val) {
  return isNull(val) || isRegExp(val);
}
/// #}}} @func isNullOrRegExp

/// #{{{ @func isObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;
/// #}}} @func isObject

/// #{{{ @func isPlainObject
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isPlainObject = IS.plainObject;
/// #}}} @func isPlainObject

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

/// #{{{ @func makeValidPathTest
/**
 * @private
 * @param {?RegExp} valid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} invalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @return {!function(string, string): boolean}
 */
var makeValidPathTest = require('./make-valid-path-test.js');
/// #}}} @func makeValidPathTest

/// #{{{ @func makeValidPathTests
/**
 * @private
 * @param {?RegExp} dfltValid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} dfltInvalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @param {?RegExp} usrValid
 *   A pattern for matching valid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #valid pattern. Otherwise (i.e. if it does not have a
 *   forward slash), the path name is tested against the #valid pattern.
 * @param {?RegExp} usrInvalid
 *   A pattern for matching invalid path names or trees. If it is `null`, no
 *   check is performed. If it is a `RegExp`, the source property is checked
 *   for a forward slash, `"/"`. If it has a forward slash, the path tree is
 *   tested against the #invalid pattern. Otherwise (i.e. if it does not have
 *   a forward slash), the path name is tested against the #invalid pattern.
 * @return {!function(string, string): boolean}
 */
var makeValidPathTests = require('./make-valid-path-tests.js');
/// #}}} @func makeValidPathTests

/// #{{{ @func makeValidTest
/**
 * @private
 * @param {!Object} opts
 * @param {string} valid
 * @param {string} invalid
 * @return {!function(string, string): boolean}
 */
function makeValidTest(opts, valid, invalid) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'opts');
    case 1:
      throw setNoArgError(new Error, 'valid');
    case 2:
      throw setNoArgError(new Error, 'invalid');
  }

  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }
  if ( !isString(valid) ) {
    throw setTypeError(new TypeError, 'valid', 'string');
  }
  if ( !isString(invalid) ) {
    throw setTypeError(new TypeError, 'invalid', 'string');
  }

  if (!valid) {
    throw setEmptyError(new Error, 'valid');
  }
  if (!invalid) {
    throw setEmptyError(new Error, 'invalid');
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-valid-path-test

  return opts['extend']
    ? makeValidPathTests(DFLTS[valid], DFLTS[invalid],
        opts[valid], opts[invalid])
    : makeValidPathTest(opts[valid], opts[invalid]);

  /// #}}} @step return-new-valid-path-test
}
/// #}}} @func makeValidTest

/// #}}} @group MAKE

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #{{{ @func createObject
/**
 * @private
 * @param {?Object} proto
 * @return {!Object}
 */
var createObject = require('./create-object.js');
/// #}}} @func createObject

/// #{{{ @func forEachProperty
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {!function(*, (number|string))} func
 * @return {(!Array|!Arguments|!Object|!Function)}
 */
var forEachProperty = require('./for-each-property.js');
/// #}}} @func forEachProperty

/// #{{{ @func freezeObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @param {boolean=} deep = `false`
 * @return {(?Object|?Function)}
 */
var freezeObject = require('./freeze-object.js');
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
var setConstantProperty = require('./set-constant-property.js');
/// #}}} @func setConstantProperty

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func appendSlash
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var appendSlash = require('./append-slash.js');
/// #}}} @func appendSlash

/// #{{{ @func getPathName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathName = require('./get-path-name.js');
/// #}}} @func getPathName

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|!Arguments<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group DEFAULTS
//////////////////////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLTS
/**
 * @private
 * @const {!Object<string, *>}
 * @dict
 */
var DFLTS = freezeObject({
  'deep': false,
  'full': false,
  'extend': false,
  'validDirs': null,
  'invalidDirs': /^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i
});
/// #}}} @const DFLTS

/// #}}} @group DEFAULTS

/// #{{{ @group CLASSES
//////////////////////////////////////////////////////////////////////////////
// CLASSES
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @group DIRECTORY-PATHS

/// #{{{ @func DirectoryPaths
/**
 * @private
 * @param {string} src
 * @param {!Object} opts
 * @constructor
 * @struct
 */
function DirectoryPaths(src, opts) {

  /// #{{{ @step verify-new-keyword

  if ( !isInstanceOf(this, DirectoryPaths) ) {
    throw setNewError(new SyntaxError, 'DirectoryPaths');
  }

  /// #}}} @step verify-new-keyword

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const SRC
  /**
   * @private
   * @const {string}
   */
  var SRC = resolvePath(src);
  /// #}}} @const SRC

  /// #{{{ @const OPTS
  /**
   * @private
   * @const {!Object}
   */
  var OPTS = freezeObject(opts);
  /// #}}} @const OPTS

  /// #{{{ @func isValidDir
  /**
   * @private
   * @param {string} name
   * @param {string} tree
   * @return {boolean}
   */
  var isValidDir = makeValidTest(OPTS, 'validDirs', 'invalidDirs');
  /// #}}} @func isValidDir

  /// #}}} @step set-constants

  /// #{{{ @step set-members

  /// #{{{ @member SRC
  /**
   * @const {string}
   */
  setConstantProperty(this, 'SRC', SRC);
  /// #}}} @member SRC

  /// #{{{ @member OPTS
  /**
   * @const {!Object}
   */
  setConstantProperty(this, 'OPTS', OPTS);
  /// #}}} @member OPTS

  /// #{{{ @member isValidDir
  /**
   * @param {string} name
   * @param {string} tree
   * @return {boolean}
   */
  setConstantProperty(this, 'isValidDir', isValidDir);
  /// #}}} @member isValidDir

  /// #{{{ @member trees
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'trees', []);
  /// #}}} @member trees

  /// #{{{ @member paths
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'paths', []);
  /// #}}} @member paths

  /// #{{{ @member result
  /**
   * @const {!Array<string>}
   */
  setConstantProperty(this, 'result',
    OPTS['full']
      ? this.paths
      : this.trees);
  /// #}}} @member result

  /// #}}} @step set-members

  /// #{{{ @step freeze-instance

  freezeObject(this);

  /// #}}} @step freeze-instance

  /// #{{{ @step load-paths

  this.getDirPaths(SRC, '');

  if (OPTS['deep']) {
    this.getDirPathsDeep();
  }

  /// #}}} @step load-paths

  /// #{{{ @step freeze-members

  freezeObject(this.trees);
  freezeObject(this.paths);

  /// #}}} @step freeze-members
}
/// #}}} @func DirectoryPaths

/// #{{{ @func newDirectoryPaths
/**
 * @private
 * @param {string} src
 * @param {!Object} opts
 * @return {!DirectoryPaths}
 */
function newDirectoryPaths(src, opts) {

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');
    case 1:
      throw setNoArgError(new Error, 'opts');
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }
  if ( !isObject(opts) ) {
    throw setTypeError(new TypeError, 'opts', '!Object');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step return-new-directory-paths-instance

  return new DirectoryPaths(src, opts);

  /// #}}} @step return-new-directory-paths-instance
}
/// #}}} @func newDirectoryPaths

/// #{{{ @func DirectoryPaths.prototype.getDirPaths
/**
 * @private
 * @this {!DirectoryPaths}
 * @param {string} path
 * @param {string} tree
 * @return {!DirectoryPaths}
 */
function getDirPaths(path, tree) {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var trees;
  /** @type {!Array<string>} */
  var names;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'path');
    case 1:
      throw setNoArgError(new Error, 'tree');
  }

  if ( !isString(path) ) {
    throw setTypeError(new TypeError, 'path', 'string');
  }
  if ( !isString(tree) ) {
    throw setTypeError(new TypeError, 'tree', 'string');
  }

  if (!path) {
    throw setEmptyError(new Error, 'path');
  }

  if ( !isDirectory(path) ) {
    throw setDirError(new Error, 'path', path);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step set-constants

  /// #{{{ @const TREE
  /**
   * @private
   * @const {string}
   */
  var TREE = tree && appendSlash(tree);
  /// #}}} @const TREE

  /// #{{{ @const PATH
  /**
   * @private
   * @const {string}
   */
  var PATH = appendSlash(path);
  /// #}}} @const PATH

  /// #{{{ @func isValidDir
  /**
   * @private
   * @param {string} name
   * @param {string} tree
   * @return {boolean}
   */
  var isValidDir = this.isValidDir;
  /// #}}} @func isValidDir

  /// #}}} @step set-constants

  /// #{{{ @step set-member-refs

  trees = this.trees;
  paths = this.paths;

  /// #}}} @step set-member-refs

  /// #{{{ @step append-paths

  names = readPaths(PATH);
  forEachProperty(names, function appendDirPath(name) {
    name = getPathName(name);
    tree = TREE + name;
    path = PATH + name;
    if ( isDirectory(path) ) {
      if ( isValidDir(name, tree) ) {
        trees.push(tree);
        paths.push(path);
      }
    }
  });

  /// #}}} @step append-paths

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func DirectoryPaths.prototype.getDirPaths

/// #{{{ @func DirectoryPaths.prototype.getDirPathsDeep
/**
 * @private
 * @this {!DirectoryPaths}
 * @return {!DirectoryPaths}
 */
function getDirPathsDeep() {

  /// #{{{ @step declare-variables

  /** @type {!Array<string>} */
  var trees;
  /** @type {string} */
  var tree;
  /** @type {string} */
  var path;
  /** @type {number} */
  var i;

  /// #}}} @step declare-variables

  /// #{{{ @step set-constants

  /// #{{{ @const PATH
  /**
   * @private
   * @const {string}
   */
  var PATH = appendSlash(this.SRC);
  /// #}}} @const PATH

  /// #}}} @step set-constants

  /// #{{{ @step set-member-refs

  trees = this.trees;

  /// #}}} @step set-member-refs

  /// #{{{ @step append-paths

  i = -1;
  while (++i < trees.length) {
    tree = trees[i];
    path = PATH + tree;
    this.getDirPaths(path, tree);
  }

  /// #}}} @step append-paths

  /// #{{{ @step return-instance

  return this;

  /// #}}} @step return-instance
}
/// #}}} @func DirectoryPaths.prototype.getDirPathsDeep

/// #{{{ @step setup-directory-paths-constructor

DirectoryPaths.DirectoryPaths = DirectoryPaths;
DirectoryPaths.newDirectoryPaths = newDirectoryPaths;
DirectoryPaths.construct = newDirectoryPaths;
DirectoryPaths.prototype = createObject(null);

freezeObject(DirectoryPaths);

/// #}}} @step setup-directory-paths-constructor

/// #{{{ @step setup-directory-paths-prototype

setConstantProperty(DirectoryPaths.prototype, 'getDirPaths', getDirPaths);
setConstantProperty(DirectoryPaths.prototype, 'getDirPathsDeep',
  getDirPathsDeep);
setConstantProperty(DirectoryPaths.prototype, 'constructor',
  DirectoryPaths, false);

freezeObject(DirectoryPaths.prototype);

/// #}}} @step setup-directory-paths-prototype

/// #}}} @group DIRECTORY-PATHS

/// #}}} @group CLASSES

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getDirectoryPaths
/// #{{{ @docs getDirectoryPaths
/**
 * @public
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
/// #}}} @docs getDirectoryPaths
/// #{{{ @code getDirectoryPaths
function getDirectoryPaths(src, opts) {

  /// #{{{ @step declare-variables

  /** @type {!DirectoryPaths} */
  var dirpaths;

  /// #}}} @step declare-variables

  /// #{{{ @step verify-parameters

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');

    case 1:
      opts = cloneObject(DFLTS);
      break;

    default:
      if ( isNull(opts) || isUndefined(opts) ) {
        opts = cloneObject(DFLTS);
        break;
      }

      if ( isBoolean(opts) ) {
        if (opts) {
          opts = cloneObject(DFLTS);
          opts['deep'] = true;
        }
        else {
          opts = cloneObject(DFLTS);
          opts['deep'] = false;
        }
        break;
      }

      if ( !isPlainObject(opts) ) {
        throw setTypeError(new TypeError, 'opts', '(?Object|?boolean)=');
      }

      opts = cloneObject(opts);

      if ( !hasOption(opts, 'deep') ) {
        opts['deep'] = DFLTS['deep'];
      }
      else if ( isNull(opts['deep']) ) {
        opts['deep'] = false;
      }
      else if ( !isBoolean(opts['deep']) ) {
        throw setTypeError(new TypeError, 'opts.deep', '?boolean=');
      }

      if ( !hasOption(opts, 'full') ) {
        opts['full'] = DFLTS['full'];
      }
      else if ( isNull(opts['full']) ) {
        opts['full'] = false;
      }
      else if ( !isBoolean(opts['full']) ) {
        throw setTypeError(new TypeError, 'opts.full', '?boolean=');
      }

      if ( !hasOption(opts, 'extend') ) {
        opts['extend'] = DFLTS['extend'];
      }
      else if ( isNull(opts['extend']) ) {
        opts['extend'] = false;
      }
      else if ( !isBoolean(opts['extend']) ) {
        throw setTypeError(new TypeError, 'opts.extend', '?boolean=');
      }

      if ( !hasOption(opts, 'valid') ) {
        opts['valid'] = undefined;
      }
      else if ( !isNullOrRegExp(opts['valid']) ) {
        throw setTypeError(new TypeError, 'opts.valid', '?RegExp=');
      }

      if ( !hasOption(opts, 'invalid') ) {
        opts['invalid'] = undefined;
      }
      else if ( !isNullOrRegExp(opts['invalid']) ) {
        throw setTypeError(new TypeError, 'opts.invalid', '?RegExp=');
      }

      if ( !hasOption(opts, 'validDirs') ) {
        opts['validDirs'] = isUndefined(opts['valid'])
          ? opts['extend']
            ? null
            : DFLTS['validDirs']
          : opts['valid'];
      }
      else if ( !isNullOrRegExp(opts['validDirs']) ) {
        throw setTypeError(new TypeError, 'opts.validDirs', '?RegExp=');
      }
      else if ( hasConflictingValues(opts, 'valid', 'validDirs') ) {
        throw setAliasError(new Error, opts, 'valid', 'validDirs');
      }

      if ( !hasOption(opts, 'invalidDirs') ) {
        opts['invalidDirs'] = isUndefined(opts['invalid'])
          ? opts['extend']
            ? null
            : DFLTS['invalidDirs']
          : opts['invalid'];
      }
      else if ( !isNullOrRegExp(opts['invalidDirs']) ) {
        throw setTypeError(new TypeError, 'opts.invalidDirs', '?RegExp=');
      }
      else if ( hasConflictingValues(opts, 'invalid', 'invalidDirs') ) {
        throw setAliasError(new Error, opts, 'invalid', 'invalidDirs');
      }
  }

  if ( !isString(src) ) {
    throw setTypeError(new TypeError, 'src', 'string');
  }

  if (!src) {
    throw setEmptyError(new Error, 'src');
  }

  if ( !isDirectory(src) ) {
    throw setDirError(new Error, 'src', src);
  }

  /// #}}} @step verify-parameters

  /// #{{{ @step make-directory-paths-instance

  dirpaths = new DirectoryPaths(src, opts);

  /// #}}} @step make-directory-paths-instance

  /// #{{{ @step return-directory-paths

  return dirpaths.result;

  /// #}}} @step return-directory-paths
}
/// #}}} @code getDirectoryPaths
/// #}}} @func getDirectoryPaths

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getDirectoryPaths;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
