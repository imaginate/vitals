/**
 * ---------------------------------------------------------------------------
 * $ADD-SLASH HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $addSlash
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $addSlash = (function $addSlashPrivateScope() {

    /// #{{{ @const _END_SLASH
    /**
     * @private
     * @const {!RegExp}
     */
    var _END_SLASH = /\/$/;
    /// #}}} @const _END_SLASH

  /// #{{{ @func $addSlash
  /**
   * @param {string} path
   * @return {string}
   */
  function $addSlash(path) {
    return _END_SLASH['test'](path)
      ? path
      : path + '/';
  }
  /// #}}} @func $addSlash

  return $addSlash;
})();
/// #}}} @helper $addSlash

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
