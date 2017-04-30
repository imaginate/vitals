/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: insertTag
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
 * @const {string}
 */
var CONTENT = '\\s+([\\s\\S]*?)';

/**
 * @private
 * @const {string}
 */
var HARD_CLOSE = '\\s*\\}\\}!';

/**
 * @private
 * @const {string}
 */
var HARD_OPEN = '!\\{\\{\\s*';

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../is.js');

/**
 * @private
 * @const {string}
 */
var NOT = '!\\s*';

/**
 * @private
 * @const {string}
 */
var SOFT_CLOSE = '\\s*\\}\\}\\?';

/**
 * @private
 * @const {string}
 */
var SOFT_OPEN = '\\?\\{\\{\\s*';

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
// METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @return {string}
 */
function clearSoftTag(src, tag) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(SOFT_OPEN + tag + CONTENT + SOFT_CLOSE, 'g');
  src = src.replace(pattern, '');

  pattern = new RegExp(SOFT_OPEN + NOT + tag + CONTENT + SOFT_CLOSE, 'g');
  return src.replace(pattern, '$1');
}

/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
function insertHardTag(src, tag, val) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(HARD_OPEN + tag + HARD_CLOSE, 'g');
  return src.replace(pattern, val);
}

/**
 * @private
 * @param {string} src
 * @param {string} tag
 * @return {string}
 */
function saveSoftTag(src, tag) {

  /** @type {!RegExp} */
  var pattern;

  pattern = new RegExp(SOFT_OPEN + tag + CONTENT + SOFT_CLOSE, 'g');
  src = src.replace(pattern, '$1');

  pattern = new RegExp(SOFT_OPEN + NOT + tag + CONTENT + SOFT_CLOSE, 'g');
  return src.replace(pattern, '');
}

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} src
 * @param {string} tag
 * @param {string} val
 * @return {string}
 */
module.exports = function insertTag(src, tag, val) {

  if ( !isString(src) )
    throw new TypeError('invalid `src` type (must be a string)');
  if ( !isString(tag) )
    throw new TypeError('invalid `tag` type (must be a string)');
  if ( !isString(val) )
    throw new TypeError('invalid `val` type (must be a string)');

  src = insertHardTag(src, tag, val);
  return !!val
    ? saveSoftTag(src, tag)
    : clearSoftTag(src, tag);
};
