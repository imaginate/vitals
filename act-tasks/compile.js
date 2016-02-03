/**
 * -----------------------------------------------------------------------------
 * ACT TASK: compile
 * -----------------------------------------------------------------------------
 * @file Use `$ act compile` to access this file.
 *
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

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var BROWSER  = 'src/browser';
var SECTIONS = 'src/sections';
var INSERTS  = / *\/\/ INSERT ([a-zA-Z-_\/]+\.js)\n/g;
var INTRO    = /^[\s\S]*?(\n\/{80}\n)/;
var EXPORTS  = /\n *module\.exports = [a-zA-Z_]+;\n$/;
var XBROWSER = /\n *\/\/ BROWSER ONLY *\n[\s\S]*?\n *\/\/ BROWSER ONLY END *\n/g;

exports['desc'] = 'compiles the src';
exports['default'] = '-browser -sections';
exports['methods'] = {
  'browser': {
    'desc': 'compiles the browser src',
    'method': compileBrowser
  },
  'sections': {
    'desc': 'compiles the src sections',
    'method': compileSections
  }
};

/**
 * @public
 * @type {function}
 */
function compileBrowser() {

  /** @type {!Array} */
  var filenames;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {string} */
  var base;

  base = fuse(BROWSER, '/skeletons');
  filenames = get.filepaths(base);
  each(filenames, function(filename) {
    filepath = fuse(base, '/', filename);
    content = get.file(filepath);
    content = insertFiles(content);
    filepath = fuse(BROWSER, '/', filename);
    to.file(content, filepath);
  });
}

/**
 * @public
 * @type {function}
 */
function compileSections() {

  /** @type {!Array} */
  var filenames;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {string} */
  var base;

  base = fuse(SECTIONS, '/skeletons');
  filenames = get.filepaths(base);
  each(filenames, function(filename) {
    filepath = fuse(base, '/', filename);
    content = get.file(filepath);
    content = insertFiles(content);
    content = cut(content, XBROWSER);
    filepath = fuse(SECTIONS, '/', filename);
    to.file(content, filepath);
  });
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
function insertFiles(content) {
  return remap(content, INSERTS, function(o, filepath) {
    filepath = fuse('src/', filepath);
    content = get.file(filepath);
    content = remap(content, INTRO, '$1');
    return cut(content, EXPORTS);
  });
}
