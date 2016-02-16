/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: SETUP GENERAL HELPERS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

// appends global helpers
require('node-are')();
require('log-ocd')('log');
require('node-vitals')(2, 'base', 'strict', 'fs');
require('./display');

global.assert = require('assert');
global.setEol = setEol;
global.mkDummy = mkDummy;
global.rmDummy = rmDummy;

global.VERSION = getVersion(process.version);
global.BROWSER_TESTS = false;

var DUMMY_BASE = './test/dummy';
var DUMMY_CONTENT = '// test\n';

global.DUMMY = {
  base:    DUMMY_BASE,
  content: DUMMY_CONTENT
};

var EOL = {
  'CR':   '\r',
  'LF':   '\n',
  'CRLF': '\r\n'
};
var FIND_EOL = {
  'CR':   /\r?\n/g,
  'LF':   /\r\n?/g,
  'CRLF': /\r?\n|\r\n?/g
};

/**
 * @global
 * @param {string} str
 * @param {string} eol
 * @return {string}
 */
function setEol(str, eol) {
  return remap(str, FIND_EOL[eol], EOL[eol]);
}

/**
 * @typedef {(string|Array<string>)} Files
 * @typedef {Object<string, ?(Files|Dirs)>} Dirs
 */

var fs = require('fs');

/**
 * @global
 * @param {!(Files|Dirs)} paths
 */
function mkDummy(paths) {
  if ( !is('!obj|str', paths) ) throw new TypeError('invalid paths');
  mkDummyDir(DUMMY_BASE, paths);
}

/**
 * @private
 * @param {!Dirs} dirs
 * @param {string} base
 */
function mkDummyDirs(dirs, base) {
  each(dirs, function(paths, dir) {
    dir = dir === 'root' ? base : fuse(base, dir);
    mkDummyDir(dir, paths);
  });
}

/**
 * @private
 * @param {string} dir
 * @param {?(Files|Dirs)} paths
 */
function mkDummyDir(dir, paths) {

  if ( !is.dir(dir) ) fs.mkdirSync(dir);
  dir = remap(dir, /[^\/]$/, '$&/');

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
  each(files, function(file) {
    mkDummyFile(file, base);
  });
}

/**
 * @private
 * @param {string} file
 * @param {string=} base
 */
function mkDummyFile(file, base) {
  base = base || '';
  file = fuse(base, file);
  fs.writeFileSync(file, DUMMY_CONTENT);
}

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

  files = get.filepaths(base, true);
  base = remap(base, /[^\/]$/, '$&/');
  each(files, function(file) {
    file = fuse(base, file);
    fs.unlinkSync(file);
  });
}

/**
 * @private
 * @param {string} base
 */
function rmDummyDirs(base) {

  /** @type {!Array<string>} */
  var dirs;

  dirs = get.dirpaths(base, true);
  dirs = dirs.reverse();
  base = remap(base, /[^\/]$/, '$&/');
  each(dirs, function(dir) {
    dir = fuse(base, dir);
    fs.rmdirSync(dir);
  });
  fs.rmdirSync(base);
}

/**
 * @typedef {!{
 *   major:  number,
 *   minor:  number,
 *   syncFs: boolean
 * }} Version
 */

/**
 * @private
 * @param {string} version
 * @return {Version}
 */
function getVersion(version) {
  version = {
    major: remap(version, /^v?([0-9]+)\.[0-9\.]+$/, '$1'),
    minor: remap(version, /^v?[0-9]+\.([0-9]+)\.[0-9]+$/, '$1')
  };
  version = remap(version, function(val) {
    return Number(val);
  });
  version.syncFs = version.major > 0 || version.minor > 7;
  return version;
}

//////////////////////////////////////////////////////////////////////////////
// SETUP LOG-OCD

log.error.setConfig({
  'logger': logError,
  'throw':  false,
  'exit':   false
});

log.error.setFormat({
  'linesAfter': 2
});

log.fail.setFormat({
  'linesAfter': 0,
  'header': {
    'spaceBefore': 0,
    'spaceAfter':  0,
    'accentMark': ''
  }
});

log.fail.setStyle({
  'header': {
    'color': 'red',
    'bg':    ''
  }
});

/**
 * @param {string} result
 */
function logError(result) {
  result = remap(result, /\n/g, '\n    ');
  result = fuse('  ', result);
  console.log(result);
}
