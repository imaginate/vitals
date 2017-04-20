/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: hasOwnProperty
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
 * @param {string} prop
 * @return {boolean}
 */
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isObject = IS.object;

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
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
module.exports = function hasOwnProperty(src, prop) {

  if ( !isObject(src) )
    throw new TypeError('invalid `src` type (must be an object)');
  if ( !isString(prop) )
    throw new TypeError('invalid `prop` type (must be a string)');

  return hasOwn.call(src, prop);
};
