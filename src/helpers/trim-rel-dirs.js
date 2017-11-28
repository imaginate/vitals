/**
 * ---------------------------------------------------------------------------
 * $TRIM-REL-DIRS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trimRelDirs
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $trimRelDirs = (function __vitals$trimRelDirs__() {

  /// #{{{ @const _ONLY_REL_DIR
  /**
   * @private
   * @const {!RegExp}
   */
  var _ONLY_REL_DIR = /^\.\.?$/;
  /// #}}} @const _ONLY_REL_DIR

  /// #{{{ @const _REL_DIRS
  /**
   * @private
   * @const {!RegExp}
   */
  var _REL_DIRS = /^(?:\.\.?\/)+/;
  /// #}}} @const _REL_DIRS

  /// #{{{ @func $trimRelDirs
  /**
   * @param {string} path
   *   The #path must be cleaned with the `$cleanPath` helper and the drive
   *   must be stripped **before** calling this method.
   * @return {string}
   */
  function $trimRelDirs(path) {
    return path
      && path['replace'](_REL_DIRS, '')
      && path['replace'](_ONLY_REL_DIR, '');
  }
  /// #}}} @func $trimRelDirs

  return $trimRelDirs;
})();
/// #}}} @helper $trimRelDirs

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
