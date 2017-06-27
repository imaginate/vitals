/**
 * ---------------------------------------------------------------------------
 * $HAS-OPT HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $hasOpt
/**
 * @private
 * @param {!Object<string, *>} opts
 * @param {string} opt
 * @return {boolean}
 */
function $hasOpt(opts, opt) {
  return $own(opts, opt) && !$is.void(opts[opt]);
}
/// #}}} @helper $hasOpt

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
