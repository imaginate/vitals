/**
 * ---------------------------------------------------------------------------
 * $MKDIR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $mkdir
/**
 * @private
 * @param {string} path
 * @return {void}
 */
var $mkdir = (function $mkdirPrivateScope() {

  /// #{{{ @func _mkdir
  /**
   * @private
   * @param {string} path
   * @return {void}
   */
  var _mkdir = FS['mkdirSync'];
  /// #}}} @func _mkdir

  /// #{{{ @func $mkdir
  /**
   * @param {string} path
   * @return {void}
   */
  function $mkdir(path) {
    if ( !$is.dir(path) )
      _mkdir(path);
  }
  /// #}}} @func $mkdir

  return $mkdir;
})();
/// #}}} @helper $mkdir

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
