/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimSpace
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
 * @const {!RegExp}
 */
var START = /^[ \t]+/;

/**
 * @private
 * @const {!RegExp}
 */
var END = /[ \t]+$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

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
 * @param {string} src
 * @return {string}
 */
module.exports = function trimSpace(src) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` type (must be a string)');

  src = src.replace(START, '');
  return src.replace(END, '');
};
