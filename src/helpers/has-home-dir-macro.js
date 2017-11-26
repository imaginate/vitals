/**
 * ---------------------------------------------------------------------------
 * $HAS-HOME-DIR-MACRO HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasHomeDirMacro
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasHomeDirMacro = (function __vitals$hasHomeDirMacro__() {

  /// #{{{ @const _HOME_DIR_MACRO
  /**
   * @private
   * @const {!RegExp}
   */
  var _HOME_DIR_MACRO = /^(?:[a-zA-Z]:)?~(?:[\/\\][\s\S]*)?$/;
  /// #}}} @const _HOME_DIR_MACRO

  /// #{{{ @func $hasHomeDirMacro
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasHomeDirMacro(path) {
    return _HOME_DIR_MACRO['test'](path);
  }
  /// #}}} @func $hasHomeDirMacro

  return $hasHomeDirMacro;
})();
/// #}}} @helper $hasHomeDirMacro

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
