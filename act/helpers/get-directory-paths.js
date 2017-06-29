/**
 * ---------------------------------------------------------------------------
 * GET-DIRECTORY-PATHS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

/// #{{{ @group CONSTANTS
//////////////////////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @const DFLT_OPTS
/**
 * @private
 * @const {!Object<string, *>}
 * @dict
 */
var DFLT_OPTS = {
  'deep': false,
  'full': false,
  'extend': false,
  'validDirs': null,
  'invalidDirs': /^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i
};
/// #}}} @const DFLT_OPTS

/// #{{{ @const FS
/**
 * @private
 * @const {!Object<string, !function>}
 */
var FS = require('fs');
/// #}}} @const FS

/// #{{{ @const IS
/**
 * @private
 * @const {!Object<string, !function>}
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
function hasOption(opts, key) {
  return hasOwnProperty(opts, key) && !isUndefined(opts[key]);
}
/// #}}} @func hasOption

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

/// #{{{ @func isLT
/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;
/// #}}} @func isLT

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

/// #{{{ @func makeValidTest
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
var makeValidTest = require('./mk-valid-path-test.js');
/// #}}} @func makeValidTest

/// #{{{ @func makeValidTests
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
var makeValidTests = require('./mk-valid-path-tests.js');
/// #}}} @func makeValidTests

/// #}}} @group MAKE

/// #{{{ @group OBJECT

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #}}} @group OBJECT

/// #{{{ @group PATH

/// #{{{ @func cleanDirectoryPath
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirectoryPath = require('./clean-dirpath.js');
/// #}}} @func cleanDirectoryPath

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
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath

/// #}}} @group PATH

/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getDirectoryPaths
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
function getDirectoryPaths(src, opts) {

  /** @type {!function(string, string): boolean} */
  var isValidDir;

  switch (arguments.length) {
    case 0:
      throw setNoArgError(new Error, 'src');

    case 1:
      opts = cloneObject(DFLT_OPTS);
      break;

    default:
      if ( isNull(opts) || isUndefined(opts) ) {
        opts = cloneObject(DFLT_OPTS);
        break;
      }

      if ( isBoolean(opts) ) {
        if (opts) {
          opts = cloneObject(DFLT_OPTS);
          opts['deep'] = true;
        }
        else {
          opts = cloneObject(DFLT_OPTS);
          opts['deep'] = false;
        }
        break;
      }

      if ( !isObject(opts) || isRegExp(opts) || isArray(opts) )
        throw setTypeError(new TypeError, 'opts', '(?Object|?boolean)=');

      opts = cloneObject(opts);

      if ( !hasOption(opts, 'deep') )
        opts['deep'] = DFLT_OPTS['deep'];
      else if ( isNull(opts['deep']) )
        opts['deep'] = false;
      else if ( !isBoolean(opts['deep']) )
        throw setTypeError(new TypeError, 'opts.deep', '?boolean=');

      if ( !hasOption(opts, 'full') )
        opts['full'] = DFLT_OPTS['full'];
      else if ( isNull(opts['full']) )
        opts['full'] = false;
      else if ( !isBoolean(opts['full']) )
        throw setTypeError(new TypeError, 'opts.full', '?boolean=');

      if ( !hasOption(opts, 'extend') )
        opts['extend'] = DFLT_OPTS['extend'];
      else if ( isNull(opts['extend']) )
        opts['extend'] = false;
      else if ( !isBoolean(opts['extend']) )
        throw setTypeError(new TypeError, 'opts.extend', '?boolean=');

      if ( !hasOption(opts, 'valid') )
        opts['valid'] = undefined;
      else if ( !isNullOrRegExp(opts['valid']) )
        throw setTypeError(new TypeError, 'opts.valid', '?RegExp=');

      if ( !hasOption(opts, 'invalid') )
        opts['invalid'] = undefined;
      else if ( !isNullOrRegExp(opts['invalid']) )
        throw setTypeError(new TypeError, 'opts.invalid', '?RegExp=');

      if ( !hasOption(opts, 'validDirs') )
        opts['validDirs'] = isUndefined(opts['valid'])
          ? opts['extend']
            ? null
            : DFLT_OPTS['validDirs']
          : opts['valid'];
      else if ( !isNullOrRegExp(opts['validDirs']) )
        throw setTypeError(new TypeError, 'opts.validDirs', '?RegExp=');
      else if ( hasConflictingValues(opts, 'valid', 'validDirs') )
        throw setAliasError(new Error, opts, 'valid', 'validDirs');

      if ( !hasOption(opts, 'invalidDirs') )
        opts['invalidDirs'] = isUndefined(opts['invalid'])
          ? opts['extend']
            ? null
            : DFLT_OPTS['invalidDirs']
          : opts['invalid'];
      else if ( !isNullOrRegExp(opts['invalidDirs']) )
        throw setTypeError(new TypeError, 'opts.invalidDirs', '?RegExp=');
      else if ( hasConflictingValues(opts, 'invalid', 'invalidDirs') )
        throw setAliasError(new Error, opts, 'invalid', 'invalidDirs');

      break;
  }

  if ( !isString(src) )
    throw setTypeError(new TypeError, 'src', 'string');
  if (!src)
    throw setEmptyError(new Error, 'src');
  if ( !isDirectory(src) )
    throw setDirError(new Error, 'src', src);

  src = resolvePath(src);
  isValidDir = opts['extend']
    ? makeValidTests(DFLT_OPTS['validDirs'], DFLT_OPTS['invalidDirs'],
        opts['validDirs'], opts['invalidDirs'])
    : makeValidTest(opts['validDirs'], opts['invalidDirs']);
  return opts['deep']
    ? getDirsDeep(src, '', opts['full'], [], [], isValidDir)
    : getDirs(src, opts['full'], isValidDir);
}
/// #}}} @func getDirectoryPaths

/// #{{{ @func getDirs
/**
 * @private
 * @param {string} pwd
 * @param {boolean} full
 * @param {!function(string, string): boolean} isValidDir
 * @return {!Array<string>}
 */
function getDirs(pwd, full, isValidDir) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var trees;
  /** @type {!Array<string>} */
  var names;
  /** @type {string} */
  var name;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /**
   * @private
   * @const {string}
   */
  var PWD = cleanDirectoryPath(pwd);

  /**
   * @private
   * @const {boolean}
   */
  var FULL = full;

  paths = [];
  trees = [];

  names = readPaths(PWD);
  len = names.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathName(names[i]);
    path = PWD + name;
    if ( isDirectory(path) && isValidDir(name, name) ) {
      paths.push(path);
      trees.push(name);
    }
  }
  return FULL
    ? paths
    : trees;
}
/// #}}} @func getDirs

/// #{{{ @func getDirsDeep
/**
 * @private
 * @param {string} pwd
 * @param {string} tree
 * @param {boolean} full
 * @param {!Array<string>} paths
 * @param {!Array<string>} trees
 * @param {!function(string, string): boolean} isValidDir
 * @return {!Array<string>}
 */
function getDirsDeep(pwd, tree, full, paths, trees, isValidDir) {

  /** @type {!Array<string>} */
  var names;
  /** @type {string} */
  var name;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  /**
   * @private
   * @const {string}
   */
  var PWD = cleanDirectoryPath(pwd);

  /**
   * @private
   * @const {string}
   */
  var TREE = tree && cleanDirectoryPath(tree);

  /**
   * @private
   * @const {boolean}
   */
  var FULL = full;

  names = readPaths(PWD);
  len = names.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathName(names[i]);
    tree = TREE + name;
    path = PWD + name;
    if ( isDirectory(path) && isValidDir(name, tree) ) {
      trees.push(tree);
      paths.push(path);
      getDirsDeep(path, tree, FULL, paths, trees, isValidDir);
    }
  }
  return FULL
    ? paths
    : trees;
}
/// #}}} @func getDirsDeep

/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

module.exports = getDirectoryPaths;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
