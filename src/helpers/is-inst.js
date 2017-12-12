/**
 * ---------------------------------------------------------------------------
 * $IS-INST HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isInst
/**
 * @private
 * @param {*} val
 * @param {!Function} constructor
 * @return {boolean}
 */
function $isInst(val, constructor) {
  return $isObj(val) && $instof(val, constructor);
}
/// #}}} @helper $isInst

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
