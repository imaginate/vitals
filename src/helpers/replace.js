/**
 * ---------------------------------------------------------------------------
 * $REPLACE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $replace
/**
 * @private
 * @param {string} src
 * @param {(!RegExp|!string)} patt
 * @param {(!string|!function)} replacement
 * @return {string}
 */
function $replace(src, patt, replacement) {
  return src['replace'](patt, replacement);
}
/// #}}} @helper $replace

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
