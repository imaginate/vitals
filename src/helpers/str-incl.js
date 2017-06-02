/**
 * ---------------------------------------------------------------------------
 * $STR-INCL HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $strIncl
/**
 * @private
 * @param {string} src
 * @param {*} val
 * @return {boolean}
 */
var $strIncl = (function $strInclPrivateScope() {

  /// #{{{ @docrefs $strIncl
  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
  /// #}}} @docrefs $strIncl

  /// #{{{ @func $strIncl
  /**
   * @description
   *   Polyfills [String.prototype.includes][includes] if it does not exist.
   * @param {string} src
   * @param {string} val
   * @return {boolean}
   */
  var $strIncl = 'includes' in STR_PROTO && $is.fun(STR_PROTO['includes'])
    ? function $strIncl(src, val) {
        return src['includes'](val);
      }
    : function $strIncl(src, val) {
        return src['indexOf'](val) !== -1;
      };
  /// #}}} @func $strIncl

  return $strIncl;
})();
/// #}}} @helper $strIncl

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
