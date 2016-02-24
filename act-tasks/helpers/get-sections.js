/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getSections
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var is = require('./is');
var fs = require('fs');

var BASE = './src/sections/skeletons';
var BWSR = './src/browser/skeletons';

/**
 * @param {boolean=} fileform - "<section>.js" vs "<section>"
 * @param {boolean=} browser - only get the browser sections
 * @return {!Array<string>}
 */
module.exports = function getSections(fileform, browser) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {string} */
  var filepath;
  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var section;
  /** @type {string} */
  var base;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  base = browser ? BWSR : BASE;
  filepaths = fs.readdirSync(base);
  sections = [];
  len = filepaths.length;
  i = -1;
  while (++i < len) {
    filepath = filepaths[i];
    section  = fileform ? filepath : cutFileExt(filepath);
    filepath = base + '/' + filepath;
    if ( is.file(filepath) ) sections.push(section);
  }
  return sections;
};

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function cutFileExt(filepath) {
  return filepath.replace(/\.js$/, '');
}
