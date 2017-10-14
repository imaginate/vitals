/**
 * ---------------------------------------------------------------------------
 * $HAS-WIN-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasWinDrive
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasWinDrive = (function __vitals$hasWinDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^[a-zA-Z]:/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $hasWinDrive
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasWinDrive(path) {
    return _DRIVE['test'](path);
  }
  /// #}}} @func $hasWinDrive

  return $hasWinDrive;
})();
/// #}}} @helper $hasWinDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
