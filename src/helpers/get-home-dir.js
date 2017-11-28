/**
 * ---------------------------------------------------------------------------
 * $GET-HOME-DIR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getHomeDir
/**
 * @private
 * @return {string}
 */
var $getHomeDir = (function __vitals$getHomeDir__() {

  /// #{{{ @func _homedir
  /**
   * @private
   * @return {string}
   */
  var _homedir = $own($OS, 'homedir') && $is.fun($OS['homedir'])
    ? $OS['homedir']
    : function homedir() {
        return '';
      };
  /// #}}} @func _homedir

  /// #{{{ @func $getHomeDir
  /**
   * @return {string}
   */
  function $getHomeDir() {

    /** @type {string} */
    var result;

    result = _homedir();
    return $is._str(result)
      ? $cleanPath(result)
      : '';
  }
  /// #}}} @func $getHomeDir

  return $getHomeDir;
})();
/// #}}} @helper $getHomeDir

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
