/**
 * ---------------------------------------------------------------------------
 * $MATCH HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $MATCH HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
var $match = (function $matchPrivateScope() {

  /* {{{3 Match References
   * @ref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * @ref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   */

  /// {{{3
  /// @func $match
  /**
   * A cross-platform shortcut for [String.prototype.includes][includes] and
   * [RegExp.prototype.test][test].
   *
   * @param {string} source
   * @param {*} pattern
   * @return {boolean}
   */
  function $match(source, pattern) {

    if ( $is.regx(pattern) )
      return pattern['test'](source);

    if ( !$is.str(pattern) )
      pattern = String(pattern);

    return !source
      ? !pattern
      : !pattern
        ? true
        : _inStr(source, pattern);
  }

  ///////////////////////////////////////////////////// {{{3
  // MATCH HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func _inStr
  /**
   * Polyfills [String.prototype.includes][includes] if it does not exist.
   *
   * @private
   * @param {string} source
   * @param {string} substr
   * @return {boolean}
   */
  var _inStr = (function _inStrPrivateScope() {

    /**
     * @private
     * @const {!Object}
     */
    var PROTO = String['prototype'];

    return 'includes' in PROTO && $is.fun(PROTO['includes'])
      ? function _inStr(source, substr) {
          return source['includes'](substr);
        }
      : function _inStr(source, substr) {
          return source['indexOf'](substr) !== -1;
        };
  })();
  /// }}}3

  // END OF PRIVATE SCOPE FOR $MATCH
  return $match;
})();
/// }}}2

module.exports = $match;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
