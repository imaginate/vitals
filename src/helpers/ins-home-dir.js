/**
 * ---------------------------------------------------------------------------
 * $INS-HOME-DIR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $insHomeDir
/**
 * @private
 * @param {string} path
 * @param {(?string|?undefined)=} homedir
 * @return {string}
 */
var $insHomeDir = (function __vitals$insHomeDir__() {

  /// #{{{ @const _END_FORWARD_SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _END_FORWARD_SLASH = /\/$/;
  /// #}}} @const _END_FORWARD_SLASH

  /// #{{{ @const _TILDE_ONLY
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_ONLY = /^~\/?$/;
  /// #}}} @const _TILDE_ONLY

  /// #{{{ @const _TILDE_START
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_START = /^~\//;
  /// #}}} @const _TILDE_START

  /// #{{{ @func _addForwardSlash
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _addForwardSlash(path) {
    return !!path && !_END_FORWARD_SLASH['test'](path)
      ? path + '/'
      : path;
  }
  /// #}}} @func _addForwardSlash

  /// #{{{ @func _setupHomeDrive
  /**
   * @private
   * @param {string} PATH_DRIVE
   * @param {string} homedir
   * @return {string}
   */
  function _setupHomeDrive(PATH_DRIVE, homedir) {

    /** @const {string} */
    var HOME_DRIVE = $getDrive(homedir);

    return !!HOME_DRIVE
      ? HOME_DRIVE === PATH_DRIVE
        ? homedir
        : PATH_DRIVE
      : PATH_DRIVE + homedir;
  }
  /// #}}} @func _setupHomeDrive

  /// #{{{ @func $insHomeDir
  /**
   * @param {string} path
   *   The #path must be cleaned with the `$cleanPath` helper **before**
   *   calling this method.
   * @param {(?string|?undefined)=} homedir
   *   If the #homedir is a primitive string, the #homedir must be cleaned
   *   with the `$cleanPath` helper **before** calling this method.
   * @return {string}
   */
  function $insHomeDir(path, homedir) {

    /** @const {string} */
    var DRIVE = $getWinDrive(path);

    if ( !$is.str(homedir) ) {
      homedir = $getHomeDir();
    }

    if (!!DRIVE) {
      path = $trimWinDrive(path);
      homedir = _setupHomeDrive(DRIVE, homedir);
    }

    if ( _TILDE_ONLY['test'](path) ) {
      return homedir;
    }

    homedir = _addForwardSlash(homedir);
    return path['replace'](_TILDE_START, homedir);
  }
  /// #}}} @func $insHomeDir

  return $insHomeDir;
})();
/// #}}} @helper $insHomeDir

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
