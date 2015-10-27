/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - SEAL
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.seal]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/seal.js}
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

module.exports = seal;

var is = require('node-are').is;
var has = require('./has.js');


/**
 * Seals an object with optional deep seal.
 * @public
 * @param {?(Object|function)} obj
 * @param {boolean=} deep
 * @return {?(Object|function)}
 */
var seal = (function() {

  /**
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function seal(obj, deep) {

    /** @type {string} */
    var prop;

    if ( is.null(obj) ) {
      return null;
    }

    if ( !is._obj(obj) ) {
      throw new TypeError('Invalid obj param in vitals.seal call.');
    }

    if (!HAS_OBJ_SEAL) {
      return obj;
    }

    if (deep) {
      for (prop in obj) {
        if ( has(obj, prop) && is._obj( obj[prop] ) ) {
          obj[prop] = seal(obj[prop], true);
        }
      }
    }

    return Object.seal(obj);
  }

  /**
   * Feature detect for Object.seal.
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_OBJ_SEAL = !!Object.seal;

  // END OF PRIVATE SCOPE FOR SEAL
  return seal;
})();
