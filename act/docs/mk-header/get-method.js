/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethod
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
var METHOD = /[a-z]+(?:\.[a-zA-Z._]+)?/;

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

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} line
 * @return {string}
 */
module.exports = function getMethod(line) {

  /** @type {string} */
  var method;

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');
  if ( !line )
    throw new Error('invalid empty `line` string');

  method = getMatch(line, METHOD);

  if (!method)
    throw new Error('no method found for `mkMethodRow` in `' + line + '`');

  return method;
};
