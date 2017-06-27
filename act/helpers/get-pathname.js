/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getPathname
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

/**
 * @private
 * @const {!RegExp}
 */
var PATH_NAME = /^.*\/([^\/]+)$/;

/**
 * @private
 * @const {!RegExp}
 */
var REL_DIR = /^\.\.?\/?$/;

/**
 * @private
 * @const {!RegExp}
 */
var ROOT_PATH = /^(?:[A-Z]:\/?|\/)$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

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

/**
 * @private
 * @param {string} dirpath
 * @return {string}
 */
var trimSlash = require('./trim-slash.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} path
 * @return {string}
 */
module.exports = function getPathname(path) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');
  if ( !path )
    throw new Error('invalid empty `path` string');
  if ( ROOT_PATH.test(path) )
    throw new Error('invalid root path for `path`');
  if ( REL_DIR.test(path) )
    throw new Error('invalid relative directory for `path`');

  path = cleanPath(path);
  path = trimSlash(path);
  return path.replace(PATH_NAME, '$1');
};
