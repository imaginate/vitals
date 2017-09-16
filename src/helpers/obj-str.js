/**
 * ---------------------------------------------------------------------------
 * $OBJ-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $objStr
/**
 * @private
 * @param {!Object} src
 * @return {string}
 */
var $objStr = (function __vitals$objStr__() {

  /// #{{{ @func _objToStr
  /**
   * @private
   * @this {!Object}
   * @return {string}
   */
  var _objToStr = $OBJ_PROTO['toString'];
  /// #}}} @func _objToStr

  /// #{{{ @func $objStr
  /**
   * @param {!Object} src
   * @return {string}
   */
  function $objStr(src) {
    return _objToStr['call'](src);
  }
  /// #}}} @func $objStr

  return $objStr;
})();
/// #}}} @helper $objStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
