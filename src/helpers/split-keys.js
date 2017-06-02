/**
 * ---------------------------------------------------------------------------
 * $SPLIT-KEYS HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
var $splitKeys = (function $splitKeysPrivateScope() {

  /// #{{{ @docrefs $splitKeys
  /// @docref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
  /// #}}} @docrefs $splitKeys

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

  /// #{{{ @func $splitKeys
  /**
   * @param {string} keys
   * @return {!Array<string>}
   */
  function $splitKeys(keys) {

    /** @type {string} */
    var separator;

    if (!keys)
      return [ '' ];

    separator = _inStr(keys, ', ')
      ? ', '
      : _inStr(keys, ',')
        ? ','
        : _inStr(keys, '|')
          ? '|'
          : ' ';

    return keys['split'](separator);
  }
  /// #}}} @func $splitKeys

  return $splitKeys;
})();
/// #}}} @helper $splitKeys

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
