/**
 * ---------------------------------------------------------------------------
 * GET-FILEPATHS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 */
var FS = require('fs');
/// #}}} @const FS

/// #{{{ @const INVALID_DIRS
/**
 * @private
 * @const {!RegExp}
 */
var INVALID_DIRS = /^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i;
/// #}}} @const INVALID_DIRS

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

/// #{{{ @func isFile
/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFile = IS.file;
/// #}}} @func isFile

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

/// #{{{ @func getFiles
/**
 * @private
 * @param {string} pwd
 * @param {boolean} full
 * @param {!function(string): boolean} isValidFilename
 * @return {!Array<string>}
 */
function getFiles(pwd, full, isValidFilename) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  pwd = cleanDirpath(pwd);

  files = [];
  paths = readPaths(pwd);
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathname(paths[i]);
    path = pwd + name;
    if ( isFile(path) && isValidFilename(name) )
      files.push(full ? path : name);
  }
  return files;
}
/// #}}} @func getFiles

/// #{{{ @func getFilesDeep
/**
 * @private
 * @param {string} pwd
 * @param {string} prepend
 * @param {function(string): boolean} isValidFilename
 * @param {function(string): boolean} isValidDirname
 * @param {!Array<string>=} files
 * @return {!Array<string>}
 */
function getFilesDeep(pwd, prepend, isValidFilename, isValidDirname, files) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  pwd = cleanDirpath(pwd);
  prepend = prepend && cleanDirpath(prepend);

  if (!files)
    files = [];

  paths = readPaths(pwd);
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathname(paths[i]);
    path = pwd + name;
    if ( isFile(path) ) {
      if ( isValidFilename(name) )
        files.push(prepend + name);
    }
    else if ( isDirectory(path) ) {
      if ( isValidDirname(name) ) {
        name = prepend + name;
        getFilesDeep(path, name, isValidFilename, isValidDirname, files);
      }
    }
  }
  return files;
}
/// #}}} @func getFilesDeep

/// #{{{ @func mkFilenameCheck
/**
 * @private
 * @param {?RegExp} validNames
 * @param {?RegExp} invalidNames
 * @return {function(string): boolean}
 */
function mkFilenameCheck(validNames, invalidNames) {

  if (!!validNames && !!invalidNames)
    return function isValidFilename(filename) {
      return validNames.test(filename) && !invalidNames.test(filename);
    };

  if (!!validNames)
    return function isValidFilename(filename) {
      return validNames.test(filename);
    };

  if (!!invalidNames)
    return function isValidFilename(filename) {
      return !invalidNames.test(filename);
    };

  return function isValidFilename(filename) {
    return true;
  };
}
/// #}}} @func mkFilenameCheck

/// #{{{ @func mkDirnameCheck
/**
 * @private
 * @param {?RegExp} validNames
 * @param {?RegExp} invalidNames
 * @return {function(string): boolean}
 */
function mkDirnameCheck(validNames, invalidNames) {

  if (!!validNames && !!invalidNames)
    return function isValidDirname(dirname) {
      return validNames.test(dirname) && !invalidNames.test(dirname);
    };

  if (!!validNames)
    return function isValidDirname(dirname) {
      return validNames.test(dirname);
    };

  if (!!invalidNames)
    return function isValidDirname(dirname) {
      return !invalidNames.test(dirname);
    };

  return function isValidDirname(dirname) {
    return true;
  };
}
/// #}}} @func mkDirnameCheck
/// #}}} @group METHODS

/// #{{{ @group EXPORTS
//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

/// #{{{ @func getFilepaths
/**
 * @public
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid filenames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute filepaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   An alias for `opts.validFiles`.
 * @param {?RegExp=} opts.invalid
 *   An alias for `opts.invalidFiles`.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid filenames. If `null` is given then no check is
 *   performed.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid filenames. If `null` is given then no check
 *   is performed.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when `opts.deep` is `true`. A pattern for matching valid dirnames.
 *   If `null` is given then no check is performed.
 * @param {?RegExp=} opts.invalidDirs = `/^(?:\.git|\.bak|node_modules|vendor|\.?te?mp|\.?logs?|.*~)$/i`
 *   Only used when `opts.deep` is `true`. A pattern for matching invalid
 *   dirnames. If `null` is given then no check is performed.
 * @return {!Array<string>}
 */
function getFilepaths(dirpath, opts) {

  /** @type {function(string): boolean} */
  var isValidFilename;
  /** @type {function(string): boolean} */
  var isValidDirname;

  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` type (must be a string)');
  if ( !isDirectory(dirpath) )
    throw new Error('invalid `dirpath` path (must be a readable directory)');

  if ( isBoolean(opts) )
    opts = { deep: opts };
  else if ( isNull(opts) || isUndefined(opts) )
    opts = {};
  else {
    if ( !isObject(opts) || isRegExp(opts) )
      throw new TypeError('invalid `opts` type (must be an object, boolean, undefined, or null)');
    if ( !isNull(opts.deep) && !isUndefined(opts.deep) && !isBoolean(opts.deep) )
      throw new TypeError('invalid `opts.deep` type (must be a boolean, undefined, or null)');
    if ( !isNull(opts.full) && !isUndefined(opts.full) && !isBoolean(opts.full) )
      throw new TypeError('invalid `opts.full` type (must be a boolean, undefined, or null)');
    if ( !isNull(opts.valid) && !isUndefined(opts.valid) && !isRegExp(opts.valid) )
      throw new TypeError('invalid `opts.valid` type (must be a RegExp, undefined, or null)');
    if ( !isNull(opts.invalid) && !isUndefined(opts.invalid) && !isRegExp(opts.invalid) )
      throw new TypeError('invalid `opts.invalid` type (must be a RegExp, undefined, or null)');
    if ( !isNull(opts.validFiles) && !isUndefined(opts.validFiles) && !isRegExp(opts.validFiles) )
      throw new TypeError('invalid `opts.validFiles` type (must be a RegExp, undefined, or null)');
    if ( !isNull(opts.invalidFiles) && !isUndefined(opts.invalidFiles) && !isRegExp(opts.invalidFiles) )
      throw new TypeError('invalid `opts.invalidFiles` type (must be a RegExp, undefined, or null)');
    if ( !isNull(opts.validDirs) && !isUndefined(opts.validDirs) && !isRegExp(opts.validDirs) )
      throw new TypeError('invalid `opts.validDirs` type (must be a RegExp, undefined, or null)');
    if ( !isNull(opts.invalidDirs) && !isUndefined(opts.invalidDirs) && !isRegExp(opts.invalidDirs) )
      throw new TypeError('invalid `opts.invalidDirs` type (must be a RegExp, undefined, or null)');
  }

  if ( !isUndefined(opts.valid) && !isUndefined(opts.validFiles) && (opts.valid !== opts.validFiles) )
    throw new Error('conflicting values for alias `opts.valid` and `opts.validFiles`');
  if ( !isUndefined(opts.invalid) && !isUndefined(opts.invalidFiles) && (opts.invalid !== opts.invalidFiles) )
    throw new Error('conflicting values for alias `opts.invalid` and `opts.invalidFiles`');

  if ( !isBoolean(opts.deep) )
    opts.deep = false;
  if ( !isBoolean(opts.full) )
    opts.full = false;
  if ( !isUndefined(opts.valid) )
    opts.validFiles = opts.valid;
  else if ( isUndefined(opts.validFiles) )
    opts.validFiles = null;
  if ( !isUndefined(opts.invalid) )
    opts.invalidFiles = opts.invalid;
  else if ( isUndefined(opts.invalidFiles) )
    opts.invalidFiles = null;
  if ( isUndefined(opts.validDirs) )
    opts.validDirs = null;
  if ( isUndefined(opts.invalidDirs) )
    opts.invalidDirs = INVALID_DIRS;

  dirpath = resolvePath(dirpath);
  isValidFilename = mkFilenameCheck(opts.validFiles, opts.invalidFiles);

  if (!opts.deep)
    return getFiles(dirpath, opts.full, isValidFilename);

  isValidDirname = mkDirnameCheck(opts.validDirs, opts.invalidDirs);
  return getFilesDeep(dirpath, opts.full ? dirpath : '', isValidFilename, isValidDirname);
}
/// #}}} @func getFilepaths

module.exports = getFilepaths;

/// #}}} @group EXPORTS

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
