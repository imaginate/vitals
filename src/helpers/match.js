/**
 * ---------------------------------------------------------------------------
 * $MATCH HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $match
/**
 * @description
 *   A cross-platform shortcut for `String.prototype.includes` and
 *   `RegExp.prototype.test`.
 * @private
 * @param {string} src
 * @param {*} patt
 * @return {boolean}
 */
function $match(src, patt) {

  if ( $is.regx(patt) )
    return patt['test'](src);

  patt = $mkStr(patt);
  return !src
    ? !patt
    : !patt
      ? YES
      : $strIncl(src, patt);
}
/// #}}} @helper $match

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
