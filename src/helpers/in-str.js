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

/// #{{{ @helper $inStr
/**
 * @private
 * @param {string} src
 * @param {*} val
 * @return {boolean}
 */
var $inStr = (function $inStrPrivateScope() {

  /// #{{{ @docrefs $inStr
  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
  /// #}}} @docrefs $inStr

  /// #{{{ @func _inStr
  /**
   * @description
   *   Polyfills [String.prototype.includes][includes] if it does not exist.
   * @private
   * @param {string} src
   * @param {string} val
   * @return {boolean}
   */
  var _inStr = (function _inStrPrivateScope() {
    return 'includes' in STR_PROTO && $is.fun(STR_PROTO['includes'])
      ? function _inStr(src, val) {
          return src['includes'](val);
        }
      : function _inStr(src, val) {
          return src['indexOf'](val) !== -1;
        };
  })();
  /// #}}} @func _inStr

  /// #{{{ @func $inStr
  /**
   * @description
   *   A cross-platform shortcut for [String.prototype.includes][includes].
   * @param {string} src
   * @param {*} val
   * @return {boolean}
   */
  function $inStr(src, val) {
    val = $mkStr(val);
    return !src
      ? !val
      : !val
        ? YES
        : _inStr(src, val);
  }
  /// #}}} @func $inStr

  return $inStr;
})();
/// #}}} @helper $inStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
