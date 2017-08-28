/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: trimToMethods
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
var METHODS = /\n *\/\/ PUBLIC METHODS *\n(?: *\/\/ - [a-z]+(?:\.[a-zA-Z._]+)?(?: +\([a-zA-Z.*|_]+\))? *\n)+/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {string}
 */
var getMatch = require('../../get-match.js');

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var trimEol = require('./trim-eol.js');

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var trimTitle = require('./trim-title.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} content
 * @return {string}
 */
module.exports = function trimToMethods(content) {

  /** @type {string} */
  var result;

  if ( !isString(content) )
    throw new TypeError('invalid `content` type (must be a string)');

  result = getMatch(content, METHODS);

  if (!result)
    throw new Error('no public methods found for `mkHeader` in `' + content + '`');

  result = trimTitle(result);
  return trimEol(result);
};
