/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: cleanHttpChar
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
 * @const {!Object<string, string>}
 */
var CHARS = {
  ' ': '%20',
  '"': ''
};

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
 * @param {!Object} src
 * @param {string} prop
 * @return {boolean}
 */
var hasProp = require('../../../has-own-property.js');

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
 * @param {string} ch
 * @return {string}
 */
function cleanHttpChar(ch) {

  if ( !isString(ch) )
    throw new TypeError('invalid `ch` type (must be a string)');

  return !!ch && hasProp(CHARS, ch)
    ? CHARS[ch]
    : ch;
};
