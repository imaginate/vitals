/**
 * ---------------------------------------------------------------------------
 * $HAS-UNC-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasUncDrive
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasUncDrive = (function __vitals$hasUncDrive__() {

  /// #{{{ @const _UNC
  /**
   * @private
   * @const {!RegExp}
   */
  var _UNC = /^[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]/;
  /// #}}} @const _UNC

  /// #{{{ @func $hasUncDrive
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasUncDrive(path) {
    return _UNC['test'](path);
  }
  /// #}}} @func $hasUncDrive

  return $hasUncDrive;
})();
/// #}}} @helper $hasUncDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
