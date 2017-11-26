/**
 * ---------------------------------------------------------------------------
 * $HAS-LOWER-WIN-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasLowerWinDrive
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasLowerWinDrive = (function __vitals$hasLowerWinDrive__() {

  /// #{{{ @const _LOWER_CASE_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _LOWER_CASE_DRIVE = /^[a-z]:/;
  /// #}}} @const _LOWER_CASE_DRIVE

  /// #{{{ @func $hasLowerWinDrive
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasLowerWinDrive(path) {
    return _LOWER_CASE_DRIVE['test'](path);
  }
  /// #}}} @func $hasLowerWinDrive

  return $hasLowerWinDrive;
})();
/// #}}} @helper $hasLowerWinDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
