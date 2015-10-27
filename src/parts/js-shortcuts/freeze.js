/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - FREEZE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.freeze]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/freeze.js}
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

module.exports = freeze;

var is = require('node-are').is;
var are = require('node-are').are;
var has = require('./has.js');


/**
 * Freezes an object with optional deep freeze.
 * @public
 * @param {?(Object|function)} obj
 * @param {boolean=} deep
 * @return {?(Object|function)}
 */
var freeze = (function() {

  /**
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function freeze(obj, deep) {

    /** @type {string} */
    var prop;

    if ( is.null(obj) ) {
      return null;
    }

    if ( !is._obj(obj) ) {
      throw new TypeError('Invalid obj param in vitals.freeze call.');
    }

    if (!HAS_OBJ_FREEZE) {
      return obj;
    }

    if (deep) {
      for (prop in obj) {
        if ( has(obj, prop) && is._obj( obj[prop] ) ) {
          obj[prop] = freeze(obj[prop], true);
        }
      }
    }

    return Object.freeze(obj);
  }

  /**
   * Feature detect for Object.freeze.
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_OBJ_FREEZE = !!Object.freeze;

  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();
