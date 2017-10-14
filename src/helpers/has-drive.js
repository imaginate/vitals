/**
 * ---------------------------------------------------------------------------
 * $HAS-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasDrive
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasDrive = (function __vitals$hasDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^[a-zA-Z]:/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $hasDrive
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasDrive(path) {
    return _DRIVE['test'](path);
  }
  /// #}}} @func $hasDrive

  return $hasDrive;
})();
/// #}}} @helper $hasDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
