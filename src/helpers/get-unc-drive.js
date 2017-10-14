/**
 * ---------------------------------------------------------------------------
 * $GET-UNC-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getUncDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $getUncDrive = (function __vitals$getUncDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^([\/\\][\/\\]+[^\/\\]+[\/\\])[\s\S]*$/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $getUncDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $getUncDrive(path) {
    return !!path && $hasUncDrive(path)
      ? path['replace'](_DRIVE, '$1')
      : '';
  }
  /// #}}} @func $getUncDrive

  return $getUncDrive;
})();
/// #}}} @helper $getUncDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
