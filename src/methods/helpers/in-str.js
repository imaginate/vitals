/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: inStr
 * -----------------------------------------------------------------------------
 * @version 4.0.0
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
// VITALS HELPER: inStr
////////////////////////////////////////////////////////////////////////////////

var inStr = (function inStrPrivateScope() {

  /**
   * @private
   * @param {string} source
   * @param {string} str
   * @return {boolean}
   */
  var baseInStr = !!String.prototype.includes
    ? function baseInStr(source, str) { return source.includes(str); }
    : function baseInStr(source, str) { return source.indexOf(str) !== -1; };

  /**
   * A shortcut for `String.prototype.includes`.
   * @param {string} source
   * @param {*} str
   * @return {boolean}
   */
  function inStr(source, str) {
    str = String(str);
    if (!source) return !str;
    if (!str) return true;
    return baseInStr(source, str);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: inStr
  return inStr;
})();


module.exports = inStr;
