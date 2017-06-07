/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkFooter
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
var IS = require('../is.js');

/**
 * @private
 * @const {string}
 */
var TEMPLATE = require('./get-template.js')('footer');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isUndefined = IS.undefined;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @param {string=} fscontent
 * @return {string}
 */
module.exports = function mkFooter(content, fscontent) {

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !isString(fscontent) && !isUndefined(fscontent) )
    throw new TypeError('invalid `fscontent` type (must be a string or undefined)');

  return TEMPLATE;
};
