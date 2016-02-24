/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: getFilepaths
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = getFilepaths;

var fs = require('fs');
var isFile = require('./is-file');
var getDirs = require('./get-dirpaths');
var slashDir = require('./slash-dir');

/**
 * @param {string} base
 * @param {boolean=} deep
 * @param {!RegExp=} valid
 * @param {!RegExp=} invalid
 * @return {!Array<string>}
 */
function getFilepaths(base, deep, valid, invalid) {

  /** @type {function(string): boolean} */
  var isValid;

  base = slashDir(base);
  isValid = mkCheck(valid, invalid);
  return deep
    ? getFilesDeep(base, isValid)
    : getFiles(base, isValid);
}

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
  /** @type {string} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  paths = fs.readdirSync(base);
  files = [];
  len = paths.length;
  i = -1;
  while (++i < len) {
    file = paths[i];
    path = base + file;
    if ( isFile(path) && isValid(file) ) files.push(file);
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
  dirs = getDirs(base, true);
  end = dirs.length;
  i = -1;
  while (++i < end) {
    dir = slashDir(dirs[i]);
    paths = getFiles(base + dir, isValid);
    len = paths.length;
    ii = -1;
    while (++ii < len) files.push(dir + paths[ii]);
  }
  return files;
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
