/**
 * ---------------------------------------------------------------------------
 * $ESCAPE HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $escape
/**
 * @private
 * @param {string} source
 * @return {string}
 */
function $escape(source) {
  return source['replace'](/[\\^$.*+?|(){}[\]]/g, '\\$&');
}
/// #}}} @helper $escape

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
