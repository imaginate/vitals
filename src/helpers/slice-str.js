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

/// #{{{ @helper $sliceStr
/**
 * @private
 * @param {string} src
 * @param {number=} start = `0`
 * @param {number=} end = `src.length`
 * @return {string}
 */
function $sliceStr(src, start, end) {

  /** @type {number} */
  var len;

  len = src['length'];

  if ( $is.void(start) )
    start = 0;
  if ( $is.void(end) )
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
    : src['substring'](start, end);
}
/// #}}} @helper $sliceStr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
