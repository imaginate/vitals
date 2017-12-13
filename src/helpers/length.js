/**
 * ---------------------------------------------------------------------------
 * $LENGTH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $length
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function|!string)} src
 * @return {number}
 */
function $length(src) {
  return src['length'];
}
/// #}}} @helper $length

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
