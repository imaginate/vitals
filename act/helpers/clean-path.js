/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: cleanPath
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
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
 * @param {*} val
 * @return {boolean}
 */
var isString = IS.string;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isGT = IS.greaterThan;

/**
 * @private
 * @param {number} val1
 * @param {number} val2
 * @return {boolean}
 */
var isLT = IS.lessThan;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} path
 * @return {string}
 */
module.exports = function cleanPath(path) {

  if ( isLT(arguments.length, 1) )
    throw new Error('invalid missing `path` string');
  if ( isGT(arguments.length, 1) )
    throw new Error('invalid param count (only 1 `path` allowed)');
  if ( !isString(path) )
    throw new TypeError('invalid `path` type (must be a string)');
  if ( !path )
    throw new RangeError('invalid empty `path` string');

  path = path.replace(/\\/g, '/');
  return path.replace(/\/\/+/g, '/');
};
