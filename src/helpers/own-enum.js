/**
 * ---------------------------------------------------------------------------
 * $OWN-ENUM HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $ownEnum
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} key
 * @return {boolean}
 */
var $ownEnum = (function $ownEnumPrivateScope() {

  /// #{{{ @docrefs $ownEnum
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [enum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
  /// #}}} @docrefs $ownEnum

  /// #{{{ @func _hasEnum
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasEnum = OBJ_PROTO['propertyIsEnumerable'];
  /// #}}} @func _hasEnum

  /// #{{{ @func $ownEnum
  /**
   * @description
   *   A safe way to call [Object.prototype.hasOwnProperty][own] and
   *   [Object.prototype.propertyIsEnumerable][enum].
   * @param {(!Object|!Function)} src
   * @param {*} key
   * @return {boolean}
   */
  function $ownEnum(src, key) {
    return $own(src, key) && _hasEnum['call'](src, key);
  }
  /// #}}} @func $ownEnum

  return $ownEnum;
})();
/// #}}} @helper $ownEnum

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
