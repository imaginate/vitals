/**
 * ---------------------------------------------------------------------------
 * $IS-BOOL HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isBool
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function $isBool(val) {
  return $typeof(val) === 'boolean';
}
/// #}}} @helper $isBool

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
