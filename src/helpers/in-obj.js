/**
 * ---------------------------------------------------------------------------
 * $IN-OBJ HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $IN-OBJ HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(!Object|!Function)} source
 * @param {*} val
 * @return {boolean}
 */
var $inObj = (function $inObjPrivateScope() {

  /// {{{3
  /// @func $inObj
  /**
   * @param {(!Object|!Function)} source
   * @param {*} val
   * @return {boolean}
   */
  function $inObj(source, val) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( _hasOwn['call'](source, key) && source[key] === val )
        return true;
    }
    return false;
  }

  ///////////////////////////////////////////////////// {{{3
  // $IN-OBJ HELPERS
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

  // END OF PRIVATE SCOPE FOR $IN-OBJ
  return $inObj;
})();
/// }}}2

module.exports = $inObj;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
