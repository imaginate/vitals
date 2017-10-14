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

  /// #{{{ @func $insHome
  /**
   * @param {string} path
   * @param {string} home
   * @return {string}
   */
  function $insHome(path, home) {

    /// #{{{ @const WIN_DRIVE
    /**
     * @private
     * @const {string}
     */
    var WIN_DRIVE = $getWinDrive(path) || $getWinDrive(home);
    /// #}}} @const WIN_DRIVE

    path = $trimWinDrive(path);
    home = WIN_DRIVE + $trimWinDrive(home);

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
