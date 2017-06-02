/**
 * ---------------------------------------------------------------------------
 * $CLEANPATH HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $cleanpath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function $cleanpath(path) {
  path['replace'](/\\+/g, '/');
  return path['replace'](/\/\/+/g, '/');
}
/// #}}} @helper $cleanpath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
