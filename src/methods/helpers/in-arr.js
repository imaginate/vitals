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

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $IN-ARR HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} source
 * @param {*} val
 * @return {boolean}
 */
function $inArr(source, val) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = source['length'];
  i = -1;
  while (++i < len) {
    if (source[i] === val)
      return true;
  }
  return false;
}
/// }}}2

module.exports = $inArr;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
