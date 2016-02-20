/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: match
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
// VITALS HELPER: match
////////////////////////////////////////////////////////////////////////////////

var match = (function matchPrivateScope() {

  /**
   * A shortcut for `String.prototype.includes` and `RegExp.prototype.test`.
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function match(source, pattern) {
    return isRegex(pattern)
      ? pattern.test(source)
      : inStr(source, pattern);
  }

  /**
   * @private
   * @return {string}
   */
  var toStr = Object.prototype.toString;

  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function isRegex(val) {
    return !!val && typeof val === 'object' && toStr.call(val) === '[object RegExp]';
  }

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
   * @private
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
  // PRIVATE SCOPE END: match
  return match;
})();


module.exports = match;
