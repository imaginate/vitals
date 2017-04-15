/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getFilepaths
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var FS = require('fs');

/**
 * @private
 * @const {!RegExp}
 */
var INVALID_DIRS = /^\.git|\.bak|node_modules|vendor|tmp|logs?$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var cleanDirpath = require('./clean-dirpath.js');

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var getPathname = require('./get-pathname.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isBoolean = IS.boolean;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isDirectory = IS.directory;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isFile = IS.file;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} dirname
 * @return {boolean}
 */
function isValidDirname(dirname) {
  return !INVALID_DIRS.test(dirname);
}

/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/fs.html#fs_fs_readdirsync_path)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/fs.html#fs_fs_readdirsync_path_options)
 * @private
 * @param {string} dirpath
 * @return {!Array<string>} - An array of all the dirnames and filenames in
 *   the directory.
 */
var readPaths = FS.readdirSync;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} pwd
 * @param {boolean} full
 * @param {function(string): boolean} isValidFilename
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

/**
 * @private
 * @param {string} pwd
 * @param {string} prepend
 * @param {function(string): boolean} isValidFilename
 * @return {!Array<string>}
 */
function getFilesDeep(pwd, prepend, isValidFilename) {

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
  prepend = prepend && cleanDirpath(prepend);

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
      if ( isValidDirname(name) )
        getFilesDeep(path, prepend + name, isValidFilename);
    }
  }
  return files;
}

/**
 * @private
 * @param {!RegExp=} validNames
 * @param {!RegExp=} invalidNames
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

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} dirpath
 * @param {?Object|boolean=} opts - If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep - Make a recursive search for valid filenames.
 * @param {?boolean=} opts.full - Return absolute filepaths instead of relative.
 * @param {?RegExp=} opts.valid - A pattern for matching valid filenames.
 * @param {?RegExp=} opts.invalid - A pattern for matching invalid filenames.
 * @return {!Array<string>}
 */
module.exports = function getFilepaths(dirpath, opts) {

  /** @type {function(string): boolean} */
  var isValidFilename;

  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` type (must be a string)');
  if ( !isDirectory(dirpath) )
    throw new Error('invalid `dirpath` path (must be a readable directory)');

  if (!opts)
    opts = {};
  else {
    if ( !!opts.deep && !isBoolean(opts.deep) )
      throw new TypeError('invalid `opts.deep` type (must be a boolean or undefined)');
    if ( !!opts.full && !isBoolean(opts.full) )
      throw new TypeError('invalid `opts.full` type (must be a boolean or undefined)');
    if ( !!opts.valid && !isRegExp(opts.valid) )
      throw new TypeError('invalid `opts.valid` type (must be a RegExp or undefined)');
    if ( !!opts.invalid && !isRegExp(opts.invalid) )
      throw new TypeError('invalid `opts.invalid` type (must be a RegExp or undefined)');
  }

  dirpath = resolvePath(dirpath);
  isValidFilename = mkFilenameCheck(opts.valid, opts.invalid);
  return !!opts.deep
    ? getFilesDeep(dirpath, !!opts.full ? dirpath : '', isValidFilename)
    : getFiles(dirpath, !!opts.full, isValidFilename);
};
