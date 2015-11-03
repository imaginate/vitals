/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - SEAL
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.seal]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/seal.js}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var is = require('node-are').is;
var has = require('./has.js');


////////////////////////////////////////////////////////////////////////////////
// SEAL
////////////////////////////////////////////////////////////////////////////////

var seal = (function sealPrivateScope() {

  /**
   * Seals an object with optional deep seal.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj) ) {
      throw new TypeError('Invalid obj param in vitals.seal call.');
    }

    if (!HAS_OBJ_SEAL) return obj;

    return deep ? _deepSeal(obj) : Object.seal(obj);
  }

  /**
   * Feature detect for Object.seal.
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_OBJ_SEAL = !!Object.seal;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  function _deepSeal(obj) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in obj) {
      if ( _has(obj, key) ) {
        val = obj[key];
        if ( is._obj(val) ) {
          obj[key] = _deepSeal(val);
        }
      }
    }
    return Object.seal(obj);
  }

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _has = has.key;

  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();


module.exports = seal;
