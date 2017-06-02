/**
 * ---------------------------------------------------------------------------
 * $NORMALIZE HELPER
 * ---------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $normalize
/**
 * @private
 * @param {string} src
 * @param {string} eol
 * @return {string}
 */
var $normalize = (function $normalizePrivateScope() {

  /// #{{{ @const _EOLS
  /**
   * @private
   * @const {!Object<string, !function(string): string>}
   * @dict
   */
  var _EOLS = {
    'CRLF': function normalizeEolCRLF(source) {
      return source['replace'](/\r?\n|\r\n?/g, '\r\n');
    },
    'CR': function normalizeEolCR(source) {
      return source['replace'](/\r?\n/g, '\r');
    },
    'LF': function normalizeEolLF(source) {
      return source['replace'](/\r\n?/g, '\n');
    }
  };
  /// #}}} @const _EOLS

  /// #{{{ @func $normalize
  /**
   * @param {string} src
   * @param {string} eol
   * @return {string}
   */
  function $normalize(src, eol) {
    return _EOLS[eol](src);
  }
  /// #}}} @func $normalize

  return $normalize;
})();
/// #}}} @helper $normalize

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
