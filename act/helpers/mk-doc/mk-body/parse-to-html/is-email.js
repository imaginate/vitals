/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: isEmail
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
 * @const {!RegExp}
 */
var EMAIL = /^[a-zA-Z0-9_\-+=\.]+@[a-zA-Z0-9_\-\.]+\.[a-z]{2,}([/?].*)?$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../is.js');

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
 * @return {boolean}
 */
module.exports = function isEmail(src) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` type (must be a string)');

  return EMAIL.test(src);
};
