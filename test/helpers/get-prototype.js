/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: getPrototype
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = getPrototype;

/**
 * @private
 * @param {!Object} obj
 * @return {Object}
 */
var getProto = Object.getPrototypeOf;

/**
 * @param {!Object} obj
 * @return {Object}
 */
function getPrototype(obj) {
  return getProto(obj);
}
