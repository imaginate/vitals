/**
 * ---------------------------------------------------------------------------
 * $IS-NOT-REGX HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isNotRegx
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function $isNotRegx(val) {
  return !$isRegx(val);
}
/// #}}} @helper $isNotRegx

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol