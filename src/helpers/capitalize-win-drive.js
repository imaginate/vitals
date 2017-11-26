/**
 * ---------------------------------------------------------------------------
 * $CAPITALIZE-WIN-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $capitalizeWinDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $capitalizeWinDrive = (function __vitals$capitalizeWinDrive__() {

  /// #{{{ @const _LOWER_CASE_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _LOWER_CASE_DRIVE = /^[a-z](?=:)/;
  /// #}}} @const _LOWER_CASE_DRIVE

  /// #{{{ @func _capitalizeDrive
  /**
   * @private
   * @param {string} drive
   * @return {string}
   */
  function _capitalizeDrive(drive) {
    return drive['toUpperCase']();
  }
  /// #}}} @func _capitalizeDrive

  /// #{{{ @func $capitalizeWinDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $capitalizeWinDrive(path) {
    return path['replace'](_LOWER_CASE_DRIVE, _capitalizeDrive);
  }
  /// #}}} @func $capitalizeWinDrive

  return $capitalizeWinDrive;
})();
/// #}}} @helper $capitalizeWinDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
