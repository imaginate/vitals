/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: ownEnum
 * -----------------------------------------------------------------------------
 * @version 4.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: ownEnum
////////////////////////////////////////////////////////////////////////////////

var ownEnum = (function ownEnumPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasEnum = Object.prototype.propertyIsEnumerable;

  /**
   * @param {(Object|?function)} source
   * @param {*} key
   * @return {boolean}
   */
  function ownEnum(source, key) {
    return !!source && hasEnum.call(source, key);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: ownEnum
  return ownEnum;
})();


module.exports = ownEnum;
