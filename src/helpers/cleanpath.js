/**
 * ---------------------------------------------------------------------------
 * $CLEANPATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $cleanpath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $cleanpath = (function __vitals$cleanpath__() {

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

  /// #{{{ @func $cleanpath
  /**
   * @param {string} path
   * @return {string}
   */
  function $cleanpath(path) {

    /** @type {string} */
    var result;

    result = path['replace'](/\\+/g, '/');
    result = result['replace'](/\/\/+/g, '/');

    if ( _LOWER_CASE_DRIVE['test'](path) ) {
      result = result['replace'](_LOWER_CASE_DRIVE, _capitalizeDrive);
    }
    else if ( $hasUncDrive(path) ) {
      result = '/' + result;
    }

    return result;
  }
  /// #}}} @func $cleanpath

  return $cleanpath;
})();
/// #}}} @helper $cleanpath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
