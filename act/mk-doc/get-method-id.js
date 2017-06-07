/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getMethodID
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

/**
 * @private
 * @const {!RegExp}
 */
var MAIN = /^[a-zA-Z0-9_]+\./;

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
 * @param {string} method
 * @return {string}
 */
module.exports = function getMethodID(method) {

  /** @type {string} */
  var id;

  if ( !isString(method) )
    throw new TypeError('invalid `method` type (must be a string)');
  if ( !method )
    throw new Error('invalid empty `method` string');

  if ( !MAIN.test(method) )
    return 'main';

  id = method.replace(MAIN, '');
  return id.replace(/\./g, '-');
};
