/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: parseElement
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
 * @const {!RegExp}
 */
var VALID = /^-+$/;

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} line
 * @return {string}
 */
var trimSpace = require('../../trim-space.js');

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} lines
 * @param {number} depth
 * @return {string}
 */
module.exports = function parseElement(lines, depth) {

  /** @type {string} */
  var line;

  line = trimSpace(lines[0]);

  if ( !VALID.test(line) )
    throw new Error('invalid `hr` syntax in line `' + lines[0] + '`');

  return '<hr>';
};
