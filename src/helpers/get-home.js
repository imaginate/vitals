/**
 * ---------------------------------------------------------------------------
 * $GET-HOME HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getHome
/**
 * @private
 * @return {string}
 */
var $getHome = (function __vitals$getHome__() {

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

  /// #{{{ @func $getHome
  /**
   * @return {string}
   */
  function $getHome() {

    /** @type {string} */
    var result;

    result = _homedir();
    return $is._str(result)
      ? $cleanpath(result)
      : '';
  }
  /// #}}} @func $getHome

  return $getHome;
})();
/// #}}} @helper $getHome

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
