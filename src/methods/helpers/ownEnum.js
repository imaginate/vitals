/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - PROPERTY-IS-ENUMERABLE
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - OWN-ENUM
////////////////////////////////////////////////////////////////////////////////

var _ownEnum = (function _ownEnumPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _ownEnum(source, key) {
    return !!source && _propertyIsEnumerable.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN-ENUM
  return _ownEnum;
})();


module.exports = _ownEnum;
