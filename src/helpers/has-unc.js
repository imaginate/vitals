/**
 * ---------------------------------------------------------------------------
 * $HAS-UNC HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasUnc
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var $hasUnc = (function __vitals$hasUnc__() {

  /// #{{{ @const _UNC
  /**
   * @private
   * @const {!RegExp}
   */
  var _UNC = /^[\/\\][\/\\]+[^\/\\]+[\/\\]+[^\/\\]/;
  /// #}}} @const _UNC

  /// #{{{ @func $hasUnc
  /**
   * @param {string} path
   * @return {boolean}
   */
  function $hasUnc(path) {
    return _UNC['test'](path);
  }
  /// #}}} @func $hasUnc

  return $hasUnc;
})();
/// #}}} @helper $hasUnc

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
