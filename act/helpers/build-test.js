/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: buildTest
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
var isLT = IS.lessThan;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {!Array<string>} sections
 * @param {function} newTest
 * @return {function}
 */
module.exports = function buildTest(sections, newTest) {

  /** @type {function} */
  var test;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = sections.length;
  i = -1;
  while ( isLT(++i, len) )
    test = newTest(sections[i], test);

  return test;
};
