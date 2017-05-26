/**
 * ---------------------------------------------------------------------------
 * $OWN HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $OWN HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(?Object|?Function)} source
 * @param {*} key
 * @return {boolean}
 */
var $own = (function $ownPrivateScope() {

  /* {{{3 $own References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   */

  /// {{{3
  /// @func $own
  /**
   * A safe way to call [Object.prototype.hasOwnProperty][own].
   *
   * @param {(?Object|?Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function $own(source, key) {
    return !!source && _hasOwn['call'](source, key);
  }

  ///////////////////////////////////////////////////// {{{3
  // $OWN HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func _hasOwn
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwn = Object['prototype']['hasOwnProperty'];
  /// }}}3

  // END OF PRIVATE SCOPE FOR $OWN
  return $own;
})();
/// }}}2

module.exports = $own;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
