/**
 * ---------------------------------------------------------------------------
 * $OWN-ENUM HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $ownEnum
/**
 * @description
 *   A safe way to call `Object.prototype.hasOwnProperty` and
 *   `Object.prototype.propertyIsEnumerable`.
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} key
 * @return {boolean}
 */
function $ownEnum(src, key) {
  return $own(src, key) && $hasEnum(src, key);
}
/// #}}} @helper $ownEnum

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
