/**
 * ---------------------------------------------------------------------------
 * $ENUM HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $enum
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} key
 * @return {boolean}
 */
var $enum = (function __vitals$enum__() {

  /// #{{{ @docrefs $enum
  /// @docref [enum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
  /// #}}} @docrefs $enum

  /// #{{{ @func _hasEnum
  /**
   * @private
   * @this {(!Object|!Function)}
   * @param {*} key
   * @return {boolean}
   */
  var _hasEnum = $OBJ_PROTO['propertyIsEnumerable'];
  /// #}}} @func _hasEnum

  /// #{{{ @func $enum
  /**
   * @description
   *   A safe way to call [Object.prototype.propertyIsEnumerable][enum].
   * @param {(!Object|!Function)} src
   * @param {*} key
   * @return {boolean}
   */
  function $enum(src, key) {
    return _hasEnum['call'](src, key);
  }
  /// #}}} @func $enum

  return $enum;
})();
/// #}}} @helper $enum

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
