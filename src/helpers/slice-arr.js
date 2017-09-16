/**
 * ---------------------------------------------------------------------------
 * $SLICE-ARR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $sliceArr
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {(number|undefined)=} start = `0`
 * @param {(number|undefined)=} end = `src.length`
 * @return {!Array}
 */
function $sliceArr(src, start, end) {

  /** @type {!Array} */
  var result;
  /** @type {number} */
  var len;

  len = src['length'];

  if ( $is.void(start) ) {
    start = 0;
  }
  if ( $is.void(end) ) {
    end = len;
  }

  if (start < 0) {
    start += len;
  }
  if (start < 0) {
    start = 0;
  }

  if (end > len) {
    end = len;
  }
  else if (end < 0) {
    end += len;
  }

  result = [];
  while (start < end) {
    result['push'](src[start++]);
  }
  return result;
}
/// #}}} @helper $sliceArr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
