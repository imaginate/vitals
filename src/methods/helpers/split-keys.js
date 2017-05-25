/**
 * ---------------------------------------------------------------------------
 * $SPLIT-KEYS HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $SPLIT-KEYS HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} keys
 *   The #keys are split using one of the values in the following list as the
 *   separator (values listed in order of rank):
 *   - `", "`
 *   - `","`
 *   - `"|"`
 *   - `" "`
 * @return {!Array<string>}
 */
var $splitKeys = (function $splitKeysPrivateScope() {

  /* {{{3 $splitKeys References
   * @ref [includes]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   */

  /// {{{3
  /// @func $splitKeys
  /**
   * @param {string} keys
   * @return {!Array<string>}
   */
  function $splitKeys(keys) {

    /** @type {string} */
    var separator;

    if (!keys)
      return [ '' ];

    separator = _inStr(keys, ', ')
      ? ', '
      : _inStr(keys, ',')
        ? ','
        : _inStr(keys, '|')
          ? '|'
          : ' ';

    return keys['split'](separator);
  }

  ///////////////////////////////////////////////////// {{{3
  // $SPLIT-KEYS HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func _inStr
  /**
   * Polyfills [String.prototype.includes][includes] if it does not exist.
   *
   * @private
   * @param {string} source
   * @param {string} substr
   * @return {boolean}
   */
  var _inStr = (function _inStrPrivateScope() {

    /**
     * @private
     * @const {!Object}
     */
    var PROTO = String['prototype'];

    return 'includes' in PROTO && $is.fun(PROTO['includes'])
      ? function _inStr(source, substr) {
          return source['includes'](substr);
        }
      : function _inStr(source, substr) {
          return source['indexOf'](substr) !== -1;
        };
  })();
  /// }}}3

  // END OF PRIVATE SCOPE FOR $SPLIT-KEYS
  return $splitKeys;
})();
/// }}}2

module.exports = $splitKeys;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
