/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getTestSections
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var is = require('./is');
var fs = require('fs');

var BASE = './test/setup/sections';

/**
 * @param {string=} invalid - The invalid sections.
 * @return {!Array<string>}
 */
module.exports = function getTestSections(invalid) {

  /** @type {!Array<string>} */
  var filepaths;
  /** @type {string} */
  var filepath;
  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var section;
  /** @type {function(string): boolean} */
  var isValid;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  filepaths = fs.readdirSync(BASE);
  sections = [];
  isValid = mkCheck(invalid);
  len = filepaths.length;
  i = -1;
  while (++i < len) {
    filepath = filepaths[i];
    section  = cutFileExt(filepath);
    filepath = BASE + '/' + filepath;
    if ( is.file(filepath) && isValid(section) ) sections.push(section);
  }
  return sections;
};

/**
 * @private
 * @param {string=} invalid
 * @return {function}
 */
function mkCheck(invalid) {
  invalid = invalid && new RegExp(invalid);
  return invalid
    ? function isValid(section) { return !invalid.test(section); }
    : function isValid(section) { return true; };
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function cutFileExt(filepath) {
  return filepath.replace(/\.js$/, '');
}
