/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: rmDummy
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = rmDummy;

var fs = require('fs');
var slashDir = require('./slash-dir');
var getDirpaths = require('./get-dirpaths');
var getFilepaths = require('./get-filepaths');

var DUMMY_BASE = DUMMY.base;

/**
 * @global
 * @type {function}
 */
function rmDummy() {
  rmDummyFiles(DUMMY_BASE);
  rmDummyDirs(DUMMY_BASE);
}

/**
 * @private
 * @param {string} base
 */
function rmDummyFiles(base) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  files = getFilepaths(base, true);
  base = slashDir(base);
  len = files.length;
  i = -1;
  while (++i < len) {
    file = base + files[i];
    fs.unlinkSync(file);
  }
}

/**
 * @private
 * @param {string} base
 */
function rmDummyDirs(base) {

  /** @type {!Array<string>} */
  var dirs;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var i;

  dirs = getDirpaths(base, true);
  base = slashDir(base);
  i = dirs.length;
  while (i--) {
    dir = base + dirs[i];
    fs.rmdirSync(dir);
  }
  fs.rmdirSync(base);
}
