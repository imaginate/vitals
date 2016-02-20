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
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

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

var BROWSER  = './src/browser';
var SECTIONS = './src/sections';

var INSERTS  = / *\/\/ INSERT ([a-zA-Z-_\/]+\.js)\n/g;
var INTRO    = /^[\s\S]*?(\n\/{80}\n)/;
var EXPORTS  = /\n *module\.exports = [a-zA-Z_]+;\n$/;
var XBROWSER = /\n *\/\/ BROWSER ONLY *\n[\s\S]*?\n *\/\/ BROWSER ONLY END *\n/g;

var getSections = require('./helpers/get-sections');
var getFile = require('./helpers/get-file');
var toFile = require('./helpers/to-file');

/**
 * @public
 * @type {function}
 */
function compileBrowser() {

  /** @type {!Array} */
  var filenames;
  /** @type {string} */
  var filename;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {string} */
  var base;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  filenames = getSections(true, true);
  base = BROWSER + '/skeletons';
  len = filenames.length;
  i = -1;
  while (++i < len) {
    filename = filenames[i];
    filepath = base + '/' + filename;
    content  = getFile(filepath);
    content  = insertFiles(content);
    filepath = BROWSER + '/' + filename;
    toFile(content, filepath);
  }
}

/**
 * @public
 * @type {function}
 */
function compileSections() {

  /** @type {!Array} */
  var filenames;
  /** @type {string} */
  var filename;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var content;
  /** @type {string} */
  var base;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  filenames = getSections(true);
  base = fuse(SECTIONS, '/skeletons');
  len = filenames.length;
  i = -1;
  while (++i < len) {
    filename = filenames[i];
    filepath = base + '/' + filename;
    content  = getFile(filepath);
    content  = insertFiles(content);
    content  = content.replace(XBROWSER, '');
    filepath = SECTIONS + '/' + filename;
    toFile(content, filepath);
  }
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
function insertFiles(content) {
  return content.replace(INSERTS, function(o, filepath) {
    filepath = 'src/' + filepath;
    content = getFile(filepath);
    content = content.replace(INTRO, '$1');
    return content.replace(EXPORTS, '');
  });
}
