/**
 * ---------------------------------------------------------------------------
 * $TRIM-UNC-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trimUncDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $trimUncDrive = (function __vitals$trimUncDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]+/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $trimUncDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $trimUncDrive(path) {
    return path && path['replace'](_DRIVE, '');
  }
  /// #}}} @func $trimUncDrive

  return $trimUncDrive;
})();
/// #}}} @helper $trimUncDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
