/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: cloneObj
 * -----------------------------------------------------------------------------
 * @version 4.1.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: cloneObj
////////////////////////////////////////////////////////////////////////////////

var cloneObj = (function cloneObjPrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
 * @param {!Object} obj
 * @return {!Object}
   */
  function cloneObj(obj) {

    /** @type {!Object} */
    var clone;
    /** @type {string} */
    var key;

    clone = {};
    for (key in obj) {
      if ( hasOwn.call(obj, key) ) clone[key] = obj[key];
    }
    return clone;
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: cloneObj
  return cloneObj;
})();


module.exports = cloneObj;
