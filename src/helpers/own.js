/**
 * ---------------------------------------------------------------------------
 * $OWN HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $own
/**
 * @private
 * @param {(!Object|!Function)} source
 * @param {*} key
 * @return {boolean}
 */
var $own = (function $ownPrivateScope() {

  /// #{{{ @docrefs $own
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// #}}} @docrefs $own

  /// #{{{ @func $own
  /**
   * @description
   *   A safe way to call [Object.prototype.hasOwnProperty][own].
   * @param {(!Object|!Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function $own(source, key) {
    return _hasOwnProp['call'](source, key);
  }
  /// #}}} @func $own

  /// #{{{ @func _hasOwnProp
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwnProp = OBJ_PROTO['hasOwnProperty'];
  /// #}}} @func _hasOwnProp

  return $own;
})();
/// #}}} @helper $own

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
