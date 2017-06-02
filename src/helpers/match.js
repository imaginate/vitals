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

/// #{{{ @helper $match
/**
 * @private
 * @param {string} src
 * @param {*} patt
 * @return {boolean}
 */
var $match = (function $matchPrivateScope() {

  /// #{{{ @docrefs $match
  /// @docref [test]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
  /// #}}} @docrefs $match

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

  /// #{{{ @func $match
  /**
   * @description
   *   A cross-platform shortcut for [String.prototype.includes][includes] and
   *   [RegExp.prototype.test][test].
   * @param {string} src
   * @param {*} patt
   * @return {boolean}
   */
  function $match(src, patt) {

    if ( $is.regx(patt) )
      return patt['test'](src);

    patt = $mkStr(patt);
    return !src
      ? !patt
      : !patt
        ? YES
        : _inStr(src, patt);
  }
  /// #}}} @func $match

  return $match;
})();
/// #}}} @helper $match

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
