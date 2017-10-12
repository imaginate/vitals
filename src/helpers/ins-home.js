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
 * @param {string=} home
 * @return {string}
 */
var $insHome = (function __vitals$insHome__() {

  /// #{{{ @const _DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _DRIVE = /^[a-zA-Z]:/;
  /// #}}} @const _DRIVE

    /// #{{{ @const _END_SLASH
    /**
     * @private
     * @const {!RegExp}
     */
    var _END_SLASH = /[\/\\]$/;
    /// #}}} @const _END_SLASH

  /// #{{{ @const _NOT_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _NOT_DRIVE = /:[\s\S]*$/;
  /// #}}} @const _NOT_DRIVE

  /// #{{{ @const _TILDE_ONLY
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_ONLY = /^(?:[a-zA-Z]:)?~[\/\\]?$/;
  /// #}}} @const _TILDE_ONLY

  /// #{{{ @const _TILDE_START
  /**
   * @private
   * @const {!RegExp}
   */
  var _TILDE_START = /^(?:[a-zA-Z]:)?~[\/\\]/;
  /// #}}} @const _TILDE_START

  /// #{{{ @func $insHome
  /**
   * @param {string} path
   * @param {string=} home
   * @return {string}
   */
  function $insHome(path, home) {

    if ( !$hasHome(path) ) {
      return path;
    }

    if ( !$is.str(home) ) {
      home = $homedir();
    }

    if ( _DRIVE['test'](path) ) {
      home = home['replace'](_DRIVE, '');
      home = path['replace'](_NOT_DRIVE, '')['toUpperCase']() + ':' + home;
    }

    if ( _TILDE_ONLY['test'](path) ) {
      return home;
    }

    if ( !!home && !_END_SLASH['test'](home) ) {
      home += '/';
    }

    return path['replace'](_TILDE_START, home);
  }
  /// #}}} @func $insHome

  return $insHome;
})();
/// #}}} @helper $insHome

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
