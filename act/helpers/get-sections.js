/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getSections
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
var BROWSER_SKEL_DIR = resolvePath(REPO_DIR, './src/browser/skeletons');

/**
 * @private
 * @const {string}
 */
var SECTION_SKEL_DIR = resolvePath(REPO_DIR, './src/sections/skeletons');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {boolean=} fileform
 *   "<section>.js" vs "<section>"
 * @param {boolean=} browser
 *   Only get the browser sections.
 * @return {!Array<string>}
 */
module.exports = function getSections(fileform, browser) {

  /** @type {!Array<string>} */
  var sections;
  /** @type {string} */
  var section;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var dir;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  dir = browser
    ? BROWSER_SKEL_DIR
    : SECTION_SKEL_DIR;
  files = getFilepaths(dir, {
    deep: false,
    full: false,
    valid: /\.js$/
  });
  sections = [];

  len = files.length;
  i = -1;
  while ( isLT(++i, len) ) {
    section = files[i];
    if (!fileform)
      section = trimFileExtJS(section);
    sections.push(section);
  }
  return sections;
};
