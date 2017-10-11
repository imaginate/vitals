/**
 * ---------------------------------------------------------------------------
 * $HAS-HOME HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasHome
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasHome = (function __vitals$hasHome__() {

  /// #{{{ @const _HOME
  /**
   * @private
   * @const {!RegExp}
   */
  var _HOME = /^~(?:[\/\\][\s\S]*)?$/;
  /// #}}} @const _HOME

  /// #{{{ @func $hasHome
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasHome(path) {
    return _HOME['test'](path);
  }
  /// #}}} @func $hasHome

  return $hasHome;
})();
/// #}}} @helper $hasHome

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
