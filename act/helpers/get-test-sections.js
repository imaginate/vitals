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

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} dirpath
 * @param {?Object|boolean=} opts
 *   If a `boolean` then it is `opts.deep`.
 * @param {?boolean=} opts.deep = `false`
 *   Make a recursive search for valid filenames.
 * @param {?boolean=} opts.full = `false`
 *   Return absolute filepaths instead of relative.
 * @param {?RegExp=} opts.valid
 *   An alias for `opts.validFiles`.
 * @param {?RegExp=} opts.invalid
 *   An alias for `opts.invalidFiles`.
 * @param {?RegExp=} opts.validFiles = `null`
 *   A pattern for matching valid filenames. If `null` is given then no check is
 *   performed.
 * @param {?RegExp=} opts.invalidFiles = `null`
 *   A pattern for matching invalid filenames. If `null` is given then no check
 *   is performed.
 * @param {?RegExp=} opts.validDirs = `null`
 *   Only used when `opts.deep` is `true`. A pattern for matching valid dirnames.
 *   If `null` is given then no check is performed.
 * @param {?RegExp=} opts.invalidDirs = `/^\.git|\.bak|node_modules|vendor|tmp|logs?$/`
 *   Only used when `opts.deep` is `true`. A pattern for matching invalid
 *   dirnames. If `null` is given then no check is performed.
 * @return {!Array<string>}
 */
var getFilepaths = require('./get-filepaths.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {(!Array<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var trimFileExtJS = require('./trim-file-ext.js').construct('.js');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {string}
 */
var REPO_DIR = require('./get-repo-root.js')();

/**
 * @private
 * @const {string}
 */
var TEST_SECTION_DIR = resolvePath(REPO_DIR, './test/setup/sections');

////////////////////////////////////////////////////////////////////////////////
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string=} invalid
 * @return {function(string): boolean}
 */
function mkSectionCheck(invalid) {

  if (!invalid)
    return function isValidSection(section) {
      return true;
    };

  /**
   * @private
   * @const {!RegExp}
   */
  var INVALID = new RegExp(invalid);

  return function isValidSection(section) {
    return !INVALID.test(section);
  };
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string=} invalid
 *   The invalid sections.
 * @return {!Array<string>}
 */
module.exports = function getTestSections(invalid) {

  /** @type {function(string): boolean} */
  var isValidSection;
  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var section;
  /** @type {!Array<string>} */
  var files;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  isValidSection = mkSectionCheck(invalid);
  files = getFilepaths(TEST_SECTION_DIR, {
    deep: false,
    full: false,
    valid: /\.js$/
  });
  sections = [];

  len = files.length;
  i = -1;
  while ( isLT(++i, len) ) {
    section = trimFileExtJS(files[i]);
    if ( isValidSection(section) )
      sections.push(section);
  }
  return sections;
};
