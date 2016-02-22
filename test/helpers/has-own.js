/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: hasOwn
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = hasOwn;

/**
 * @private
 * @param {*} key
 * @return {boolean}
 */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @param {(!Object|function)} source
 * @param {*} key
 * @return {boolean}
 */
function hasOwn(source, key) {
  return hasOwnProp.call(source, key);
}
