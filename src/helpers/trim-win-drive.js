/**
 * ---------------------------------------------------------------------------
 * $TRIM-WIN-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trimWinDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $trimWinDrive = (function __vitals$trimWinDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^[a-zA-Z]:/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $trimWinDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $trimWinDrive(path) {
    return path && path['replace'](_DRIVE, '');
  }
  /// #}}} @func $trimWinDrive

  return $trimWinDrive;
})();
/// #}}} @helper $trimWinDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
