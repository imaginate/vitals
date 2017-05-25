/**
 * ---------------------------------------------------------------------------
 * $MERGE HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $MERGE HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(!Object|!Function)} dest
 * @param {(!Object|!Function)} source
 * @return {(!Object|!Function)}
 */
var $merge = (function $mergePrivateScope() {

  /// {{{3
  /// @func $merge
  /**
   * @param {(!Object|!Function)} dest
   * @param {(!Object|!Function)} source
   * @return {(!Object|!Function)}
   */
  function $merge(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _hasOwn['call'](source, key) )
        dest[key] = source[key];
    }
    return dest;
  }

  ///////////////////////////////////////////////////// {{{3
  // $MERGE HELPERS
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

  // END OF PRIVATE SCOPE FOR $MERGE
  return $merge;
})();
/// }}}2

module.exports = $merge;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
