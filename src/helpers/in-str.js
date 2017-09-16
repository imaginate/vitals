/**
 * ---------------------------------------------------------------------------
 * $IN-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $inStr
/**
 * @description
 *   A cross-platform shortcut for `String.prototype.includes`.
 * @private
 * @param {string} src
 * @param {*} val
 * @return {boolean}
 */
function $inStr(src, val) {
  val = $mkStr(val);
  return !src
    ? !val
    : !val
      ? $YES
      : $strIncl(src, val);
}
/// #}}} @helper $inStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
