/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getTestSections
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var fs = require('fs');

var BASE = './test/setup/sections';

/**
 * @param {string=} invalid - The invalid sections.
 * @return {!Array<string>}
 */
module.exports = function getTestSections(invalid) {

  /** @type {!Array<string>} */
  var filepaths;
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
    section = cutFileExt(filepaths[i]);
    if ( isValid(section) ) sections.push(section);
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
    ? function isValid(section) { return !invalid.test(str); }
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
