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

  /// #{{{ @const _LOW_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _LOW_DRIVE = /^[a-z](?=:)/;
  /// #}}} @const _LOW_DRIVE

  /// #{{{ @const _UNC
  /**
   * @private
   * @const {!RegExp}
   */
  var _UNC = /^[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]/;
  /// #}}} @const _UNC

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

    if ( _UNC['test'](path) ) {
      result = '/' + result;
    }
    else if ( _LOW_DRIVE['test'](path) ) {
      result = result['replace'](_LOW_DRIVE, _capitalizeDrive);
    }

    return result;
  }
  /// #}}} @func $cleanpath

  return $cleanpath;
})();
/// #}}} @helper $cleanpath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
