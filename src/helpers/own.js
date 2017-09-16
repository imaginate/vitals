/**
 * ---------------------------------------------------------------------------
 * $OWN HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $own
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} key
 * @return {boolean}
 */
var $own = (function __vitals$own__() {

  /// #{{{ @docrefs $own
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// #}}} @docrefs $own

  /// #{{{ @func _hasOwn
  /**
   * @private
   * @this {(!Object|!Function)}
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwn = $OBJ_PROTO['hasOwnProperty'];
  /// #}}} @func _hasOwn

  /// #{{{ @func $own
  /**
   * @description
   *   A safe way to call [Object.prototype.hasOwnProperty][own].
   * @param {(!Object|!Function)} src
   * @param {*} key
   * @return {boolean}
   */
  function $own(src, key) {
    return _hasOwn['call'](src, key);
  }
  /// #}}} @func $own

  return $own;
})();
/// #}}} @helper $own

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
