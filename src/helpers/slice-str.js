/**
 * ---------------------------------------------------------------------------
 * $SLICE-STR HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $SLICE-STR HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {number=} start = `0`
 * @param {number=} end = `source.length`
 * @return {string}
 */
function $sliceStr(source, start, end) {

  /** @type {number} */
  var len;

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

  return start >= end
    ? ''
    : source['substring'](start, end);
}
/// }}}2

module.exports = $sliceStr;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
