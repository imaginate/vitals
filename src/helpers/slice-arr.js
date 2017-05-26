/**
 * ---------------------------------------------------------------------------
 * $SLICE-ARR HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $SLICE-ARR HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {(!Object|!Function)} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {!Array}
 */
function $sliceArr(source, start, end) {

  /** @type {!Array} */
  var result;
  /** @type {number} */
  var len;
  /** @type {number} */
  var ii;
  /** @type {number} */
  var i;

  len = source['length'];

  if ( $is.none(start) )
    start = 0;
  if ( $is.none(end) )
    end = len;

  if (start < 0)
    start += len;
  if (start < 0)
    start = 0;

  if (end > len)
    end = len;
  else if (end < 0)
    end += len;

  if (start >= end)
    return [];

  result = new Array(end - start);
  ii = start - 1;
  i = 0;
  while (++ii < end)
    result[i++] = source[ii];
  return result;
}
/// }}}2

module.exports = $sliceArr;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
