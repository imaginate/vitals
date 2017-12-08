/**
 * ---------------------------------------------------------------------------
 * $CLEAN-PATH-FORMAT HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $cleanPathFormat
/**
 * @private
 * @param {string} format
 * @return {string}
 */
function $cleanPathFormat(format) {
  return !!format
    ? $is.xfmt(format)
      ? 'posix'
      : $is.wfmt(format)
        ? 'windows'
        : 'universal'
    : 'universal';
}
/// #}}} @helper $cleanPathFormat

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
