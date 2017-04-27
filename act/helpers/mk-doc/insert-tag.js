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
 * @const {!Object<string, function>}
 */
var IS = require('../is.js');

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

  pattern = new RegExp('?{{\\s*' + tag + '\\s+[\\s\\S]*?}}?', 'g');
  return src.replace(pattern, '');
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

  pattern = new RegExp('!{{\\s*' + tag + '\\s*}}!', 'g');
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

  pattern = new RegExp('?{{\\s*' + tag + '\\s+([\\s\\S]*?)\\s*}}?', 'g');
  return src.replace(pattern, '$1');
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

  /** @type {string} */
  var path;

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
