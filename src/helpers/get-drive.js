/**
 * ---------------------------------------------------------------------------
 * $GET-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $getDrive = (function __vitals$getDrive__() {

  /// #{{{ @const _NOT_WIN_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _NOT_DRIVE = /:[\s\S]*$/;
  /// #}}} @const _NOT_WIN_DRIVE

  /// #{{{ @const _UNC_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _UNC_DRIVE = /^([\/\\][\/\\]+[^\/\\]+[\/\\])[\s\S]*$/;
  /// #}}} @const _UNC_DRIVE

  /// #{{{ @func $getDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $getDrive(path) {
    return !!path
      ? $hasWinDrive(path)
        ? path['replace'](_NOT_WIN_DRIVE, ':')
        : $hasUncDrive(path)
          ? path['replace'](_UNC_DRIVE, '$1')
          : ''
      : '';
  }
  /// #}}} @func $getDrive

  return $getDrive;
})();
/// #}}} @helper $getDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
