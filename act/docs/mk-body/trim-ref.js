/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimRef
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
var OPEN = /^\s*\$\{\{\s*/;

/**
 * @private
 * @const {!RegExp}
 */
var CLOSE = /\s*\}\}\$\s*$/;

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
 * @param {string} ref
 * @return {string}
 */
module.exports = function trimRef(ref) {

  if ( !isString(ref) )
    throw new TypeError('invalid `ref` type (must be a string)');

  ref = ref.replace(OPEN, '');
  return ref.replace(CLOSE, '');
};
