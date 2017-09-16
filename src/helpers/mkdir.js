/**
 * ---------------------------------------------------------------------------
 * $MKDIR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $mkdir
/**
 * @private
 * @param {string} path
 * @return {void}
 */
var $mkdir = (function __vitals$mkdir__() {

  /// #{{{ @func _mkdir
  /**
   * @private
   * @param {string} path
   * @param {number} mode
   * @return {void}
   */
  var _mkdir = $FS['mkdirSync'];
  /// #}}} @func _mkdir

  /// #{{{ @func $mkdir
  /**
   * @param {string} path
   * @param {number} mode
   * @return {void}
   */
  function $mkdir(path, mode) {

    /** @type {*} */
    var err;

    try {
      _mkdir(path, mode);
    }
    catch (err) {
      if ( !$is.existerr(err) ) {
        throw err;
      }
    }
  }
  /// #}}} @func $mkdir

  return $mkdir;
})();
/// #}}} @helper $mkdir

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
