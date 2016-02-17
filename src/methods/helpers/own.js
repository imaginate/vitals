/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - HAS-OWN-PROPERTY
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
// PRIVATE HELPER - OWN
////////////////////////////////////////////////////////////////////////////////

var _own = (function _ownPrivateScope() {

  /**
   * @param {?(Object|function)} source
   * @param {*} key
   * @return {boolean}
   */
  function _own(source, key) {
    return !!source && _hasOwnProperty.call(source, key);
  }

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR OWN
  return _own;
})();


module.exports = _own;
