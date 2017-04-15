/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimSlash
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
 * @const {!RegExp}
 */
var END_SLASH = /\/$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('./is.js');

/**
 * @private
 * @const {!RegExp}
 */
var UNIX_ROOT = /^\/$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

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
 * @param {string} path
 * @return {string}
 */
module.exports = function trimSlash(path) {

  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');
  if ( !path )
    throw new Error('invalid empty `path` string');
  if ( UNIX_ROOT.test(path) )
    throw new Error('invalid root `path`');

  return path.replace(END_SLASH, '');
};
