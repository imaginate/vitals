/**
 * ---------------------------------------------------------------------------
 * $IN-OBJ HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $inObj
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
function $inObj(src, val) {

  /** @type {string} */
  var key;

  for (key in src) {
    if ( $own(src, key) && src[key] === val ) {
      return $YES;
    }
  }
  return $NO;
}
/// #}}} @helper $inObj

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
