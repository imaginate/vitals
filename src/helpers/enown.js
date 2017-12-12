/**
 * ---------------------------------------------------------------------------
 * $ENOWN HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $enown
/**
 * @description
 *   A safe way to call `Object.prototype.hasOwnProperty` and
 *   `Object.prototype.propertyIsEnumerable`.
 * @private
 * @param {(!Object|!Function)} src
 * @param {*} key
 * @return {boolean}
 */
function $enown(src, key) {
  return $own(src, key) && $enum(src, key);
}
/// #}}} @helper $enown

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
