/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: mkDummy
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

module.exports = mkDummy;

var fs = require('fs');
var is = require('./is');
var own = require('./has-own');
var isDir = require('./is-directory');
var slashDir = require('./slash-dir');

var DUMMY_BASE = DUMMY.base;
var DUMMY_CONTENT = DUMMY.content;

/**
 * @typedef {(string|Array<string>)} Files
 * @typedef {Object<string, ?(Files|Dirs)>} Dirs
 */

/**
 * @global
 * @param {!(Files|Dirs)} paths
 */
function mkDummy(paths) {

  if ( !is.obj(paths) && !is.str(paths) ) throw new TypeError('invalid paths');

  mkDummyDir(DUMMY_BASE, paths);
}

/**
 * @private
 * @param {!Dirs} dirs
 * @param {string} base
 */
function mkDummyDirs(dirs, base) {

  /** @type {!(Files|Dirs)} */
  var paths;
  /** @type {string} */
  var dir;

  for (dir in dirs) {
    if ( own(dirs, dir) ) {
      paths = dirs[dir];
      dir = dir === 'root' ? base : base + dir;
      mkDummyDir(dir, paths);
    }
  }
}

/**
 * @private
 * @param {string} dir
 * @param {?(Files|Dirs)} paths
 */
function mkDummyDir(dir, paths) {

  if ( !isDir(dir) ) fs.mkdirSync(dir);
  dir = slashDir(dir);

  if ( is.obj(paths) ) {
    if ( is.arr(paths) ) mkDummyFiles(paths, dir);
    else mkDummyDirs(paths, dir);
  }
  else if ( is.str(paths) ) mkDummyFile(paths, dir);
}

/**
 * @private
 * @param {!Files} files
 * @param {string} base
 */
function mkDummyFiles(files, base) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = files.length;
  i = -1;
  while (++i < len) mkDummyFile(files[i], base);
}

/**
 * @private
 * @param {string} file
 * @param {string=} base
 */
function mkDummyFile(file, base) {
  base = base || '';
  file = base + file;
  fs.writeFileSync(file, DUMMY_CONTENT);
}
