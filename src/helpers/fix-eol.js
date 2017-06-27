/**
 * ---------------------------------------------------------------------------
 * $FIX-EOL HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $fixEol
/**
 * @private
 * @param {string} src
 * @param {string} eol
 * @return {string}
 */
var $fixEol = (function $fixEolPrivateScope() {

  /// #{{{ @const _EOLS
  /**
   * @private
   * @const {!Object<string, !function(string): string>}
   * @dict
   */
  var _EOLS = {
    'CRLF': function fixEolCRLF(src) {
      return src['replace'](/\r?\n|\r\n?/g, '\r\n');
    },
    'CR': function fixEolCR(src) {
      return src['replace'](/\r?\n/g, '\r');
    },
    'LF': function fixEolLF(src) {
      return src['replace'](/\r\n?/g, '\n');
    }
  };
  /// #}}} @const _EOLS

  /// #{{{ @func $fixEol
  /**
   * @param {string} src
   * @param {string} eol
   * @return {string}
   */
  function $fixEol(src, eol) {
    return _EOLS[eol](src);
  }
  /// #}}} @func $fixEol

  return $fixEol;
})();
/// #}}} @helper $fixEol

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
