/**
 * ---------------------------------------------------------------------------
 * $INSTOF HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $instof
/**
 * @private
 * @param {!Object} inst
 * @param {!Function} constructor
 * @return {string}
 */
function $instof(inst, constructor) {
  return inst instanceof constructor;
}
/// #}}} @helper $instof

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
