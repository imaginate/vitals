/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: escape
 * -----------------------------------------------------------------------------
 * @version 4.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
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
// VITALS HELPER: escape
////////////////////////////////////////////////////////////////////////////////

var escape = (function escapePrivateScope() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var CHARS = /[\\^$.*+?|(){}[\]]/g;

  /**
   * @param {string} source
   * @return {string}
   */
  function escape(source) {
    return source.replace(CHARS, '\\$&');
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: escape
  return escape;
})();


module.exports = escape;
