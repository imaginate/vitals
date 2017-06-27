/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: getDirpaths
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = getDirpaths;

var fs = require('fs');
var isDir = require('./is-directory');
var slashDir = require('./slash-dir');

/**
 * @param {string} base
 * @param {boolean=} deep
 * @param {!RegExp=} valid
 * @param {!RegExp=} invalid
 * @return {!Array<string>}
 */
function getDirpaths(base, deep, valid, invalid) {

  /** @type {function(string): boolean} */
  var isValid;

  base = slashDir(base);
  isValid = mkCheck(valid, invalid);
  return deep
    ? getDirsDeep(base, isValid)
    : getDirs(base, isValid);
}

/**
 * @private
 * @param {string} base
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getDirs(base, isValid) {

  /** @type {!Array<string>} */
  var paths;
  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var path;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  paths = fs.readdirSync(base);
  dirs = [];
  len = paths.length;
  i = -1;
  while (++i < len) {
    dir = paths[i];
    path = base + dir;
    if ( isDir(path) && isValid(dir) ) dirs.push(dir);
  }
  return dirs;
}

/**
 * @private
 * @param {string} base
 * @param {function(string): boolean} isValid
 * @return {!Array<string>}
 */
function getDirsDeep(base, isValid) {

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

  result = getDirs(base, isValid);
  i = -1;
  while (++i < result.length) {
    dir = slashDir(result[i]);
    dirs = getDirs(base + dir, isValid);
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
