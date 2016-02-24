/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: buildTest
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
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
  while (++i < len) test = newTest(sections[i], test);
  return test;
};
