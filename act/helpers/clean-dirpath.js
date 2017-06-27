/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: cleanDirpath
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
 * @return {string}
 */
var appendSlash = require('./append-slash.js');

/**
 * @private
 * @param {string} path
 * @return {string}
 */
var cleanPath = require('./clean-path.js');

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} dirpath
 * @return {string}
 */
module.exports = function cleanDirpath(dirpath) {

  if ( isLT(arguments.length, 1) )
    throw new Error('invalid missing `dirpath` string');
  if ( isGT(arguments.length, 1) )
    throw new Error('invalid param count (only 1 `dirpath` allowed)');
  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` type (must be a string)');
  if ( !dirpath )
    throw new RangeError('invalid empty `dirpath` string');

  dirpath = cleanPath(dirpath);
  return appendSlash(dirpath);
};
