/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: cleanDirpath
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * Annotations:
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

  if ( !isString(dirpath) )
    throw new TypeError('invalid `dirpath` type (must be a string)');
  if ( !dirpath )
    throw new Error('invalid empty `dirpath` string');

  dirpath = cleanPath(dirpath);
  return appendSlash(dirpath);
};
