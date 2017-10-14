/**
 * ---------------------------------------------------------------------------
 * $TRIM-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trimDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $trimDrive = (function __vitals$trimDrive__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^(?:[a-zA-Z]:|[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]+[\/\\]*)/;
  /// #}}} @const _DRIVE

  /// #{{{ @func $trimDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $trimDrive(path) {
    return path && path['replace'](_DRIVE, '');
  }
  /// #}}} @func $trimDrive

  return $trimDrive;
})();
/// #}}} @helper $trimDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
