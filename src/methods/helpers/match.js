/**
 * ---------------------------------------------------------------------------
 * MATCH HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// MATCH HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
var match = (function matchPrivateScope() {

  /* {{{3 Match References
   * @ref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * @ref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   */

  /// {{{3
  /// @func match
  /**
   * A cross-platform shortcut for [String.prototype.includes][includes] and
   * [RegExp.prototype.test][test].
   *
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function match(source, pattern) {

    if ( isRegExp(pattern) )
      return pattern.test(source);

    pattern = toStr(pattern);
    return !source
      ? !pattern
      : !pattern
        ? true
        : inStr(source, pattern);
  }

  ///////////////////////////////////////////////////// {{{3
  // MATCH HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func hasIncludes
  /**
   * Checks if [String.prototype.includes][includes] exists.
   *
   * @private
   * @return {boolean}
   */
  function hasIncludes() {
    return 'includes' in String.prototype
      && typeof String.prototype.includes === 'function';
  }

  /// {{{4
  /// @func inStr
  /**
   * @private
   * @param {string} source
   * @param {string} substr
   * @return {boolean}
   */
  var inStr = hasIncludes()
    ? function inStr(source, substr) {
        return source.includes(substr);
      }
    : function inStr(source, substr) {
        return source.indexOf(substr) !== -1;
      };

  /// {{{4
  /// @func isRegExp
  /**
   * @private
   * @param {*} val
   * @return {boolean}
   */
  function isRegExp(val) {
    return !!val
      && typeof val === 'object'
      && objToStr.call(val) === '[object RegExp]';
  }

  /// {{{4
  /// @func objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var objToStr = Object.prototype.toString;

  /// {{{4
  /// @func toStr
  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function toStr(val) {
    return typeof val === 'string'
      ? val
      : String(val);
  }

  /// }}}3
  // END OF PRIVATE SCOPE FOR MATCH
  return match;
})();
/// }}}2

module.exports = match;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
