/**
 * ---------------------------------------------------------------------------
 * $CLONE-ARR HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $cloneArr
/**
 * @private
 * @param {(!Array|!Arguments|!Object|!Function)} src
 * @return {!Array}
 */
function $cloneArr(src) {

  /** @type {!Array} */
  var clone;
  /** @type {string} */
  var key;

  clone = new ARR(src['length']);
  for (key in src) {
    if ( $own(src, key) )
      clone[key] = src[key];
  }
  return clone;
}
/// #}}} @helper $cloneArr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
