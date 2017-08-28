/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimTemplateComments
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
var END_COMMENT = /\n[ \t]*#[^\n]*$/;

/**
 * @private
 * @const {!RegExp}
 */
var INIT_COMMENT = /^[ \t]*#[^\n]*\n/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var SUB_COMMENT = /\n[ \t]*#[^\n]*(?=\n)/g;

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
 * @param {string} content
 * @return {string}
 */
module.exports = function trimTemplateComments(content) {

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');

  content = content.replace(SUB_COMMENT, '');
  content = content.replace(INIT_COMMENT, '');
  return content.replace(END_COMMENT, '');
};
