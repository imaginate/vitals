/**
 * ---------------------------------------------------------------------------
 * $INS-HOME HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $insHome
/**
 * @private
 * @param {string} path
 * @param {string} home
 * @return {string}
 */
var $insHome = (function __vitals$insHome__() {

  /// #{{{ @const _END_SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_SLASH = /[\/\\]$/;
  /// #}}} @const _END_SLASH

  /// #{{{ @const _LOWER_CASE_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _LOWER_CASE_DRIVE = /^[a-z]/;
  /// #}}} @const _LOWER_CASE_DRIVE

  /// #{{{ @const _TILDE_ONLY
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_ONLY = /^~[\/\\]?$/;
  /// #}}} @const _TILDE_ONLY

  /// #{{{ @const _TILDE_START
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_START = /^~[\/\\]/;
  /// #}}} @const _TILDE_START

  /// #{{{ @func _addSlash
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _addSlash(path) {
    return !!path && !_END_SLASH['test'](path)
      ? path + '/'
      : path;
  }
  /// #}}} @func _addSlash

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

  /// #{{{ @func _getWinDrive
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _getWinDrive(path) {

    /** @type {string} */
    var drive;

    drive = $getWinDrive(path);
    return !!drive
      ? _LOWER_CASE_DRIVE['test'](drive)
        ? drive['replace'](_LOWER_CASE_DRIVE, _capitalizeDrive)
        : drive
      : '';
  }
  /// #}}} @func _getWinDrive

  /// #{{{ @func _prepHome
  /**
   * @private
   * @param {string} PATH_DRIVE
   * @param {string} home
   * @return {string}
   */
  function _prepHome(PATH_DRIVE, home) {

    /** @const {string} */
    var HOME_DRIVE = _getWinDrive(home);

    return !!HOME_DRIVE
      ? HOME_DRIVE === PATH_DRIVE
        ? home
        : PATH_DRIVE
      : $hasUncDrive(home)
        ? PATH_DRIVE
        : PATH_DRIVE + home;
  }
  /// #}}} @func _prepHome

  /// #{{{ @func $insHome
  /**
   * @param {string} path
   * @param {string} home
   * @return {string}
   */
  function $insHome(path, home) {

    /** @const {string} */
    var PATH_DRIVE = _getWinDrive(path);

    if (!!PATH_DRIVE) {
      path = $trimWinDrive(path);
      home = _prepHome(PATH_DRIVE, home);
    }

    if ( _TILDE_ONLY['test'](path) ) {
      return home;
    }

    home = _addSlash(home);
    return path['replace'](_TILDE_START, home);
  }
  /// #}}} @func $insHome

  return $insHome;
})();
/// #}}} @helper $insHome

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
