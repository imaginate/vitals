/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getSection
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
var SECTION = /^[\s\S]+?@section ([a-z-]+)[\s\S]+$/;

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
module.exports = function getSection(content) {

  /** @type {string} */
  var section;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');
  if ( !content )
    throw new Error('invalid empty `content` string');

  section = content.replace(SECTION, '$1');

  if (!section)
    throw new Error('no section found for `mkHeader` in `' + content + '`');

  return section;
};
