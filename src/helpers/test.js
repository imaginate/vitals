/**
 * ---------------------------------------------------------------------------
 * $TEST HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $test
/**
 * @private
 * @param {!RegExp} patt
 * @param {string} val
 * @return {boolean}
 */
function $test(patt, val) {
  return patt['test'](val);
}
/// #}}} @helper $test

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
