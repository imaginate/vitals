/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMainMethod
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
var IS = require('../../is.js');

/**
 * @private
 * @const {!RegExp}
 */
var MAIN = /^[a-zA-Z0-9_]+/;

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
 * @param {string} method
 * @return {string}
 */
module.exports = function getMainMethod(method) {

  /** @type {string} */
  var main;

  if ( !isString(method) )
    throw new TypeError('invalid `method` type (must be a string)');

  main = getMatch(method, MAIN);

  if (!main)
    throw new Error('no main method found for `' + method + '`');

  return main;
};
