/**
 * ---------------------------------------------------------------------------
 * $OBJ-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $objStr
/**
 * @private
 * @param {!Object} source
 * @return {string}
 */
var $objStr = (function $objStrPrivateScope() {

  /// #{{{ @func $objStr
  /**
   * @param {!Object} source
   * @return {string}
   */
  function $objStr(source) {
    return _objToStr['call'](source);
  }
  /// #}}} @func $objStr

  /// #{{{ @func _objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var _objToStr = OBJ_PROTO['toString'];
  /// #}}} @func _objToStr

  return $objStr;
})();
/// #}}} @helper $objStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
