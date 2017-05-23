/**
 * ---------------------------------------------------------------------------
 * $HAS-ARGS HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

///////////////////////////////////////////////////////////////////////// {{{2
// $HAS-ARGS HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @const {!Object<string, boolean>}
 * @struct
 */
var $HAS_ARGS = (function $HAS_ARGS_PrivateScope() {

  /// {{{3
  /// @func objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var objToStr = Object['prototype']['toString'];

  /// {{{3
  /// @const PRIMARY
  /**
   * Verify the platform's ability to use the primary test for `Arguments`.
   *
   * @const {boolean}
   */
  var PRIMARY = (function PRIMARY_PrivateScope() {
    return objToStr['call'](arguments) === '[object Arguments]';
  })();

  /// {{{3
  /// @const POLYFILL
  /**
   * Verify the platform's ability to use a polyfill to test for `Arguments`.
   *
   * @const {boolean}
   */
  var POLYFILL = (function POLYFILL_PrivateScope() {
    try {
      'callee' in {};
    }
    catch (e) {
      return false;
    }
    return 'callee' in arguments;
  })();

  /// {{{3
  /// @const HAS_ARGS
  /**
   * @const {!Object<string, boolean>}
   * @struct
   */
  var HAS_ARGS = {
    PRIMARY:  PRIMARY,
    POLYFILL: POLYFILL
  };
  /// }}}3

  // END OF PRIVATE SCOPE FOR $HAS_ARGS
  return HAS_ARGS;
})();
/// }}}2

module.exports = $HAS_ARGS;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
