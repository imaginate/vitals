/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: own
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = own;

/**
 * @private
 * @param {*} key
 * @return {boolean}
 */
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * @param {(!Object|function)} source
 * @param {*} key
 * @return {boolean}
 */
function own(source, key) {
  return hasOwn.call(source, key);
}
