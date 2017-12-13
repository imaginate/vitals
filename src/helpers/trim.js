/**
 * ---------------------------------------------------------------------------
 * $TRIM HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trim
/**
 * @private
 * @param {(!RegExp|!string)} patt
 * @param {string} src
 * @return {string}
 */
function $trim(patt, src) {
  return $replace(src, patt, '');
}
/// #}}} @helper $trim

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
