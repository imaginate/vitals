/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: hasEnum
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = hasEnum;

/**
 * @private
 * @param {*} key
 * @return {boolean}
 */
var hasEnumProp = Object.prototype.propertyIsEnumerable;

/**
 * @param {(!Object|function)} source
 * @param {*} key
 * @return {boolean}
 */
function hasEnum(source, key) {
  return hasEnumProp.call(source, key);
}
