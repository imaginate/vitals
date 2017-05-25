/**
 * ---------------------------------------------------------------------------
 * $IN-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $IN-STR HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
var $inStr = (function $inStrPrivateScope() {

  /* {{{3 $inStr References
   * @ref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   */

  /// {{{3
  /// @func $inStr
  /**
   * A cross-platform shortcut for [String.prototype.includes][includes].
   *
   * @param {string} source
   * @param {*} substr
   * @return {boolean}
   */
  function $inStr(source, substr) {

    if ( !$is.str(substr) )
      substr = $is.regx(substr)
        ? substr['toString']()
        : String(substr);

    return !source
      ? !substr
      : !substr
        ? true
        : _inStr(source, substr);
  }

  ///////////////////////////////////////////////////// {{{3
  // $IN-STR HELPERS
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

  // END OF PRIVATE SCOPE FOR $IN-STR
  return $inStr;
})();
/// }}}2

module.exports = $inStr;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
