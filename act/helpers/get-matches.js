/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMatches
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
var IS = require('./is.js');

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isNE = IS.notEqualTo;

/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var isRegExp = IS.regexp;

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
 * @param {string} source
 * @param {!RegExp} pattern
 * @return {!Array<string>}
 */
module.exports = function getMatches(source, pattern) {

  /** @type {!Array<string>} */
  var matches;
  /** @type {?Object} */
  var obj;

  if ( !isString(source) )
    throw new TypeError('invalid `source` type (must be a string)');
  if ( !isRegExp(pattern) )
    throw new Error('invalid `pattern` type (must be a RegExp)');

  if (!source)
    return [];

  if ( !pattern.global )
    pattern = new RegExp(pattern.source, 'g');
  if ( isNE(pattern.lastIndex, 0) )
    pattern.lastIndex = 0;

  matches = [];
  obj = pattern.exec(source);
  while (obj) {
    matches.push(obj[0]);
    obj = pattern.exec(source);
  }
  return matches;
};
