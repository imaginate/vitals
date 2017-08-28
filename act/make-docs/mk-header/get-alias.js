/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getAlias
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
var ALIAS = /\([a-zA-Z.*|_]+\)/;

/**
 * @private
 * @const {!Object<string, function>}
 */
var IS = require('../../is.js');

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
module.exports = function getAlias(line) {

  /** @type {string} */
  var alias;

  if ( !isString(line) )
    throw new TypeError('invalid `line` type (must be a string)');
  if ( !line )
    throw new Error('invalid empty `line` string');

  alias = getMatch(line, ALIAS);
  alias = alias.replace(/\|/g, ', ');
  alias = alias.replace(/[*()]/g, '');

  return alias;
};
