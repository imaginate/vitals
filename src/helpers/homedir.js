/**
 * ---------------------------------------------------------------------------
 * $HOMEDIR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $homedir
/**
 * @private
 * @return {string}
 */
var $homedir = (function __vitals$homedir__() {

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

  /// #{{{ @func $homedir
  /**
   * @return {string}
   */
  function $homedir() {

    /** @type {string} */
    var result;

    result = _homedir();
    return $is._str(result)
      ? $cleanpath(result)
      : '';
  }
  /// #}}} @func $homedir

  return $homedir;
})();
/// #}}} @helper $homedir

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
