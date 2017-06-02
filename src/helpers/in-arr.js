/**
 * ---------------------------------------------------------------------------
 * $IN-ARR HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $inArr
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @param {*} val
 * @return {boolean}
 */
function $inArr(src, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = src['length'];
  i = -1;
  while (++i < len) {
    if (src[i] === val)
      return YES;
  }
  return NO;
}
/// #}}} @helper $inArr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
