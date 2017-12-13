/**
 * ---------------------------------------------------------------------------
 * $TRIM-END-SLASH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $trimEndSlash
/**
 * @description
 *   This helper removes all non-root ending forward and backward slashes from
 *   a file path. Any windows single letter or UNC drives existing in a file
 *   path are ignored. The #path does **not** have to be cleaned or resolved
 *   before calling this helper.
 * @private
 * @param {string} path
 * @return {string}
 */
function $trimEndSlash(path) {

  if ( !!path && $hasEndSlash(path) && !$isRootDir(path) ) {
    path = $replace(path, $PATT_END_SLASHES, '');
  }

  return path;
}
/// #}}} @helper $trimEndSlash

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
