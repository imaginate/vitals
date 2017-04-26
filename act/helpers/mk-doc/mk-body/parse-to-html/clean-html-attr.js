/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: cleanHtmlAttr
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
var EOL = /[\r\n](?:\s|\S)*$/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var SCRIPT = /^\s*javascript\s*:\s*/i;

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
function cleanHtmlAttr(src) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` type (must be a string)');

  if (!src)
    return '';

  src = src.replace(EOL, '');
  src = src.replace(/"/g, "'");
  src = src.replace(SCRIPT, '');

  return src;
};
