/**
 * ---------------------------------------------------------------------------
 * $OWN-ENUM HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $OWN-ENUM HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(?Object|?Function)} source
 * @param {*} key
 * @return {boolean}
 */
var $ownEnum = (function $ownEnumPrivateScope() {

  /* {{{3 $ownEnum References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   * @ref [enum]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
   */

  /// {{{3
  /// @func $ownEnum
  /**
   * A safe way to call [Object.prototype.hasOwnProperty][own] and
   * [Object.prototype.propertyIsEnumerable][enum].
   *
   * @param {(?Object|?Function)} source
   * @param {*} key
   * @return {boolean}
   */
  function $ownEnum(source, key) {
    return !!source
      && _hasOwn['call'](source, key)
      && _hasEnum['call'](source, key);
  }

  ///////////////////////////////////////////////////// {{{3
  // $OWN-ENUM HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @func _hasEnum
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasEnum = Object['prototype']['propertyIsEnumerable'];

  /// {{{4
  /// @func _hasOwn
  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var _hasOwn = Object['prototype']['hasOwnProperty'];
  /// }}}3

  // END OF PRIVATE SCOPE FOR $OWN-ENUM
  return $ownEnum;
})();
/// }}}2

module.exports = $ownEnum;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
