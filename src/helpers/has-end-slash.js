/**
 * ---------------------------------------------------------------------------
 * $HAS-END-SLASH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $hasEndSlash
/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
function $hasEndSlash(path) {
  return $test($PATT_END_SLASH, path);
}
/// #}}} @helper $hasEndSlash

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
