/**
 * ---------------------------------------------------------------------------
 * $CLONE-OBJ HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $CLONE-OBJ HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
var $cloneObj = (function $cloneObjPrivateScope() {

  /// {{{3
  /// @func $cloneObj
  /**
   * @param {!Object} obj
   * @return {!Object}
   */
  function $cloneObj(obj) {

    /** @type {!Object} */
    var clone;
    /** @type {string} */
    var key;

    clone = {};
    for (key in obj) {
      if ( _hasOwn['call'](obj, key) )
        clone[key] = obj[key];
    }
    return clone;
  }

  ///////////////////////////////////////////////////// {{{3
  // $CLONE-OBJ HELPERS
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

  // END OF PRIVATE SCOPE FOR $CLONE-OBJ
  return $cloneObj;
})();
/// }}}2

module.exports = $cloneObj;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
