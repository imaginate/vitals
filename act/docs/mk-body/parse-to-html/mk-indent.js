/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: mkIndent
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
 * The number of spaces per indent.
 *
 * @private
 * @const {number}
 */
var INDENT_COUNT = 2;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * Note that the properties `construct` and `COUNT` are appended to this
 * function.
 *
 * @public
 * @param {number} depth
 * @return {string}
 */
module.exports = require('../../mk-indent.js').construct(INDENT_COUNT);
