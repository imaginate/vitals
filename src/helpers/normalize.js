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

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $NORMALIZE HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @param {string} eol
 * @return {string}
 */
var $normalize = (function $normalizePrivateScope() {

  /// {{{3
  /// @func $normalize
  /**
   * @param {string} source
   * @param {string} eol
   * @return {string}
   */
  function $normalize(source, eol) {
    return EOL[eol](source);
  }

  ///////////////////////////////////////////////////// {{{3
  // $NORMALIZE HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const EOL
  /**
   * @private
   * @const {!Object<string, !function(string): string>}
   * @dict
   */
  var EOL = {
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
  /// }}}3

  // END OF PRIVATE SCOPE FOR $NORMALIZE
  return $normalize;
})();
/// }}}2

module.exports = $normalize;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
