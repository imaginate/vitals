/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getDirpaths
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
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

/**
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/fs.html#fs_fs_readdirsync_path)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/fs.html#fs_fs_readdirsync_path_options)
 * @private
 * @param {string} dirpath
 * @return {!Array<string>}
 *   An array of all the dirnames and filenames in the directory.
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
 * @param {function(string): boolean} isValidDirname
 * @return {!Array<string>}
 */
function getDirs(pwd, full, isValidDirname) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  pwd = cleanDirpath(pwd);
  paths = readPaths(pwd);
  dirs = [];
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathname(paths[i]);
    path = pwd + name;
    if ( isDirectory(path) && isValidDirname(name) )
      dirs.push(full ? path : name);
  }
  return dirs;
}

/**
 * @private
 * @param {string} pwd
 * @param {string} prepend
 * @param {function(string): boolean} isValidDirname
 * @return {!Array<string>}
 */
function getDirsDeep(pwd, prepend, isValidDirname) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var path;
  /** @type {string} */
  var name;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  pwd = cleanDirpath(pwd);
  prepend = prepend && cleanDirpath(prepend);

  paths = readPaths(pwd);
  dirs = [];
  len = paths.length;
  i = -1;
  while ( isLT(++i, len) ) {
    name = getPathname(paths[i]);
    path = pwd + name;
    if ( isDirectory(path) && isValidDirname(name) ) {
      dir = prepend + name;
      dirs.push(dir);
      getDirsDeep(path, dir, isValidDirname);
    }
  }
  return dirs;
}

/**
 * @private
 * @param {!RegExp=} validNames
 * @param {!RegExp=} invalidNames
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

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid dirnames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute dirpaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   A pattern for matching valid dirnames.
 * @param {?RegExp=} opts.invalid = `/^\.git|\.bak|node_modules|vendor|tmp|logs?$/`
 *   A pattern for matching invalid dirnames.
 * @return {!Array<string>}
 */
module.exports = function getDirpaths(dirpath, opts) {

  /** @type {function(string): boolean} */
  var isValidDirname;

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

  if ( isUndefined(opts.invalid) )
    opts.invalid = INVALID_DIRS;

  dirpath = resolvePath(dirpath);
  isValidDirname = mkDirnameCheck(opts.valid, opts.invalid);
  return !!opts.deep
    ? getDirsDeep(dirpath, !!opts.full ? dirpath : '', isValidDirname)
    : getDirs(dirpath, !!opts.full, isValidDirname);
};
