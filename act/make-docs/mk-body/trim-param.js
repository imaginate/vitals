/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimParam
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
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var PARAM = /^[a-zA-Z_.$]+[ \t]*/;

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
 * @param {string} line
 * @return {string}
 */
module.exports = function trimParam(line) {

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');

  return line.replace(PARAM, '');
};
