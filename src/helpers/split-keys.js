/**
 * ---------------------------------------------------------------------------
 * $SPLIT-KEYS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $splitKeys
/**
 * @private
 * @param {string} keys
 *   The #keys are split using one of the values in the following list as the
 *   separator (values listed in order of rank):
 *   - `", "`
 *   - `","`
 *   - `"|"`
 *   - `" "`
 * @return {!Array<string>}
 */
var $splitKeys = (function __vitals$splitKeys__() {

  /// #{{{ @const _BAR
  /**
   * @private
   * @const {!RegExp}
   */
  var _BAR = /\|/;
  /// #}}} @const _BAR

  /// #{{{ @const _COMMA
  /**
   * @private
   * @const {!RegExp}
   */
  var _COMMA = /,/;
  /// #}}} @const _COMMA

  /// #{{{ @const _COMMA_SPACE
  /**
   * @private
   * @const {!RegExp}
   */
  var _COMMA_SPACE = /, /;
  /// #}}} @const _COMMA_SPACE

  /// #{{{ @func _getSeparator
  /**
   * @private
   * @param {string} keys
   * @return {string}
   */
  function _getSeparator(keys) {
    return _COMMA_SPACE['test'](keys)
      ? ', '
      : _COMMA['test'](keys)
        ? ','
        : _BAR['test'](keys)
          ? '|'
          : ' ';
  }
  /// #}}} @func _getSeparator

  /// #{{{ @func $splitKeys
  /**
   * @param {string} keys
   * @return {!Array<string>}
   */
  function $splitKeys(keys) {

    /** @type {string} */
    var separator;

    if (!keys) {
      return [ '' ];
    }

    separator = _getSeparator(keys);
    return keys['split'](separator);
  }
  /// #}}} @func $splitKeys

  return $splitKeys;
})();
/// #}}} @helper $splitKeys

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
