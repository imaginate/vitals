/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: getPrototype
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
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
