/**
 * ---------------------------------------------------------------------------
 * GET-DIRPATHS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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

/// #{{{ @func cleanDirpath
/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirpath = require('./clean-dirpath.js');
/// #}}} @func cleanDirpath

/// #{{{ @func cloneObject
/**
 * @private
 * @param {(?Object|?Function)} src
 * @return {!Object}
 */
var cloneObject = require('./clone-object.js');
/// #}}} @func cloneObject

/// #{{{ @func getPathname
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathname = require('./get-pathname.js');
/// #}}} @func getPathname

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

/// #{{{ @func mkValidTest
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
var mkValidTest = require('./mk-valid-path-test.js');
/// #}}} @func mkValidTest

/// #{{{ @func mkValidTests
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
var mkValidTests = require('./mk-valid-path-tests.js');
/// #}}} @func mkValidTests

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

/// #{{{ @func resolvePath
/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');
/// #}}} @func resolvePath
/// #}}} @group HELPERS

/// #{{{ @group METHODS
//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

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
  var PWD = cleanDirpath(pwd);

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
    name = getPathname(names[i]);
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
  var PWD = cleanDirpath(pwd);

  /**
   * @private
   * @const {string}
   */
  var TREE = tree && cleanDirpath(tree);

  /**
   * @private
   * @const {boolean}
   */
  var FULL = full;

  names = readPaths(PWD);
  len = names.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathname(names[i]);
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

/// #{{{ @func getDirpaths
/**
 * @public
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid directory paths.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute filepaths instead of relative.
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
function getDirpaths(dirpath, opts) {

  /** @type {!function(string, string): boolean} */
  var isValidDir;

  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` data type (must be a `string`)');
  if ( !isDirectory(dirpath) )
    throw new Error('invalid `dirpath` path (must be a readable directory)');

  if ( isNull(opts) || isUndefined(opts) )
    opts = cloneObject(DFLT_OPTS);
  else if ( isBoolean(opts) ) {
    if (opts) {
      opts = cloneObject(DFLT_OPTS);
      opts['deep'] = true;
    }
    else {
      opts = cloneObject(DFLT_OPTS);
      opts['deep'] = false;
    }
  }
  else if ( !isObject(opts) || isRegExp(opts) || isArray(opts) )
    throw new TypeError('invalid `opts` data type (must be `(?Object|?boolean)=`)');
  else {
    if ( !isNull(opts['deep']) && !isUndefined(opts['deep']) && !isBoolean(opts['deep']) )
      throw new TypeError('invalid `opts.deep` data type (must be `?boolean=`)');
    if ( !isNull(opts['full']) && !isUndefined(opts['full']) && !isBoolean(opts['full']) )
      throw new TypeError('invalid `opts.full` data type (must be `?boolean=`)');
    if ( !isNull(opts['extend']) && !isUndefined(opts['extend']) && !isBoolean(opts['extend']) )
      throw new TypeError('invalid `opts.extend` data type (must be `?boolean=`)');
    if ( !isNull(opts['valid']) && !isUndefined(opts['valid']) && !isRegExp(opts['valid']) )
      throw new TypeError('invalid `opts.valid` data type (must be `?RegExp=`)');
    if ( !isNull(opts['invalid']) && !isUndefined(opts['invalid']) && !isRegExp(opts['invalid']) )
      throw new TypeError('invalid `opts.invalid` data type (must be `?RegExp=`)');
    if ( !isNull(opts['validDirs']) && !isUndefined(opts['validDirs']) && !isRegExp(opts['validDirs']) )
      throw new TypeError('invalid `opts.validDirs` data type (must be `?RegExp=`)');
    if ( !isNull(opts['invalidDirs']) && !isUndefined(opts['invalidDirs']) && !isRegExp(opts['invalidDirs']) )
      throw new TypeError('invalid `opts.invalidDirs` data type (must be `?RegExp=`)');
  }

  if ( !isUndefined(opts['valid']) && !isUndefined(opts['validDirs']) && (opts['valid'] !== opts['validDirs']) )
    throw new Error('conflicting values for alias `opts.valid` and `opts.validDirs`');
  if ( !isUndefined(opts['invalid']) && !isUndefined(opts['invalidDirs']) && (opts['invalid'] !== opts['invalidDirs']) )
    throw new Error('conflicting values for alias `opts.invalid` and `opts.invalidDirs`');

  if ( !isBoolean(opts['deep']) )
    opts['deep'] = DFLT_OPTS['deep'];
  if ( !isBoolean(opts['full']) )
    opts['full'] = DFLT_OPTS['full'];
  if ( !isBoolean(opts['extend']) )
    opts['extend'] = DFLT_OPTS['extend'];
  if ( !isUndefined(opts['valid']) )
    opts['validDirs'] = opts['valid'];
  else if ( isUndefined(opts['validDirs']) )
    opts['validDirs'] = opts['extend']
      ? null
      : DFLT_OPTS['validDirs'];
  if ( !isUndefined(opts['invalid']) )
    opts['invalidDirs'] = opts['invalid'];
  else if ( isUndefined(opts['invalidDirs']) )
    opts['invalidDirs'] = opts['extend']
      ? null
      : DFLT_OPTS['invalidDirs'];

  dirpath = resolvePath(dirpath);
  isValidDir = opts['extend']
    ? mkValidTests(DFLT_OPTS['validDirs'], DFLT_OPTS['invalidDirs'],
        opts['validDirs'], opts['invalidDirs'])
    : mkValidTest(opts['validDirs'], opts['invalidDirs']);
  return opts['deep']
    ? getDirsDeep(dirpath, '', opts['full'], [], [], isValidDir)
    : getDirs(dirpath, opts['full'], isValidDir);
}
/// #}}} @func getDirpaths

module.exports = getDirpaths;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
