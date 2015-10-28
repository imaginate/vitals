/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - HAS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.has]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/has.js}
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


////////////////////////////////////////////////////////////////////////////////
// HAS
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for Object.prototype.hasOwnProperty that accepts null objects or a
 *   shortcut for String.prototype.includes and RegExp.prototype.test.
 * @public
 * @param {?(Object|function|string)} source
 * @param {*} prop
 * @return {boolean}
 */
var has = (function() {

  /**
   * @public
   * @param {?(Object|function|string)} source
   * @param {*} prop
   * @return {boolean}
   */
  function has(source, prop) {

    if (!source) {
      if ( !is('?str', source) ) {
        throw new TypeError('Invalid source param in vitals.has call.');
      }
      return false;
    }

    if ( is.str(source) ) {

      if ( is.str(prop) ) {
        return HAS_STR_INCLUDES ?
          source.includes(prop) : source.indexOf(prop) !== -1;
      }

      if ( is.regex(prop) ) {
        return prop.test(source);
      }

      throw new TypeError('Invalid prop param in vitals.has call.');
    }

    if ( is._obj(source) ) {
      prop = String(prop);
      return 'hasOwnProperty' in source ?
        source.hasOwnProperty(prop) : prop in source;
    }

    throw new TypeError('Invalid source param in vitals.has call.');
  }

  /**
   * Feature detect for String.prototype.includes.
   * @private
   * @type {boolean}
   * @const
   */
  var HAS_STR_INCLUDES = !!String.prototype.includes;

  // END OF PRIVATE SCOPE FOR HAS
  return has;
})();


module.exports = has;
