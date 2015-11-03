/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - FREEZE
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.freeze]{@link https://github.com/imaginate/vitals/blob/master/src/js-methods/freeze.js}
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
// FREEZE
////////////////////////////////////////////////////////////////////////////////

var freeze = (function freezePrivateScope() {

  /**
   * Freezes an object with optional deep freeze.
   * @public
   * @param {?(Object|function)} obj
   * @param {boolean=} deep
   * @return {?(Object|function)}
   */
  function freeze(obj, deep) {

    if ( is.null(obj) ) return null;

    if ( !is._obj(obj) ) {
      throw new TypeError('Invalid obj param in vitals.freeze call.');
    }

    if (!HAS_OBJ_FREEZE) return obj;

    return deep ? _deepFreeze(obj) : Object.freeze(obj);
  }

  /**
   * Feature detect for Object.freeze.
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_OBJ_FREEZE = !!Object.freeze;

  /**
   * @private
   * @param {?(Object|function)} obj
   * @return {?(Object|function)}
   */
  function _deepFreeze(obj) {

    /** @type {string} */
    var key;
    /** @type {*} */
    var val;

    for (key in obj) {
      if ( _has(obj, key) ) {
        val = obj[key];
        if ( is._obj(val) ) {
          obj[key] = _deepFreeze(val);
        }
      }
    }
    return Object.freeze(obj);
  }

  /**
   * @private
   * @param {?(Object|function)} obj
   * @param {*} key
   * @return {boolean}
   */
  var _has = has.key;

  // END OF PRIVATE SCOPE FOR FREEZE
  return freeze;
})();


module.exports = freeze;
