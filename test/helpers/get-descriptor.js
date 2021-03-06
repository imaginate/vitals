/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: getDescriptor
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = getDescriptor;

/**
 * @private
 * @param {(!Object|function)} source
 * @param {*} key
 * @return {!Object}
 */
var getDesc = Object.getOwnPropertyDescriptor;

/**
 * @param {(!Object|function)} source
 * @param {*} key
 * @return {!Object}
 */
function getDescriptor(source, key) {
  return getDesc(source, key);
}
