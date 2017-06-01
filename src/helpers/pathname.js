/**
 * ---------------------------------------------------------------------------
 * $PATHNAME HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $pathname
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $pathname = (function $pathnamePrivateScope() {

  /// #{{{ @const _DIRNAME
  /**
   * @private
   * @const {!RegExp}
   */
  var _DIRNAME = /^.*[\/\\]/;
  /// #}}} @const _DIRNAME

  /// #{{{ @const _END_SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_SLASH = /[\/\\]$/;
  /// #}}} @const _END_SLASH

  /// #{{{ @func $pathname
  /**
   * @param {string} path
   * @return {string}
   */
  function $pathname(path) {
    path = path['replace'](_END_SLASH, '');
    return path['replace'](_DIRNAME, '');
  }
  /// #}}} @func $pathname

  return $pathname;
})();
/// #}}} @helper $pathname

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
