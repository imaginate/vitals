/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getFilepaths
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('./is');
var fs = require('fs');

/**
 * @param {string} base
 * @param {boolean=} deep
 * @param {!RegExp=} valid
 * @param {!RegExp=} invalid
 * @return {!Array<string>}
 */
module.exports = function getFilepaths(base, deep, valid, invalid) {

  /** @type {function(string): boolean} */
  var isValid;

  base = prepDir(base);
  isValid = mkCheck(valid, invalid);
  return deep
    ? getFilesDeep(base, isValid)
    : getFiles(base, isValid);
};

/**
 * @private
 * @param {string} base
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getFiles(base, isValid) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  paths = fs.readdirSync(base);
  files = [];
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = base + paths[i];
    if ( is.file(path) ) files.push(path);
  }
  return files;
}

/**
 * @private
 * @param {string} base
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getFilesDeep(base, isValid) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var files;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var end;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  files = getFiles(base, isValid);
  dirs = getDirsDeep(base);
  end = dirs.length;
  i = -1;
  while (++i < end) {
    dir = prepDir(dirs[i]);
    paths = getFiles(base + dir, isValid);
    len = paths.length;
    ii = -1;
    while (++ii < len) files.push(dir + paths[ii]);
  }
  return files;
}

/**
 * @private
 * @param {string} base
 * @return {!Array<string>}
 */
function getDirs(base) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var path;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  paths = fs.readdirSync(base);
  dirs = [];
  len = paths.length;
  i = -1;
  while (++i < len) {
    path = base + paths[i];
    if ( is.dir(path) ) dirs.push(path);
  }
  return dirs;
}

/**
 * @private
 * @param {string} base
 * @return {!Array<string>}
 */
function getDirsDeep(base) {

  /** @type {!Array<string>} */
  var result;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  result = getDirs(base);
  i = -1;
  while (++i < result.length) {
    dir = prepDir(result[i]);
    dirs = getDirs(base + dir);
    len = dirs.length;
    ii = -1;
    while (++ii < len) result.push(dir + dirs[ii]);
  }
  return result;
}

/**
 * @private
 * @param {!RegExp=} valid
 * @param {!RegExp=} invalid
 * @return {function}
 */
function mkCheck(valid, invalid) {
  return function isValid(str) {
    return ( !valid || valid.test(str) ) && ( !invalid || !invalid.test(str) );
  };
}

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
function prepDir(dirpath) {
  return dirpath.replace(/[^\/]$/, '$&/');
}
