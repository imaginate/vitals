/**
 * ---------------------------------------------------------------------------
 * $GET-WIN-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getWinDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $getWinDrive = (function __vitals$getWinDrive__() {

  /// #{{{ @const _NOT_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _NOT_DRIVE = /:[\s\S]*$/;
  /// #}}} @const _NOT_DRIVE

  /// #{{{ @func $getWinDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $getWinDrive(path) {
    return !!path && $hasWinDrive(path)
      ? path['replace'](_NOT_DRIVE, ':')
      : '';
  }
  /// #}}} @func $getWinDrive

  return $getWinDrive;
})();
/// #}}} @helper $getWinDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
