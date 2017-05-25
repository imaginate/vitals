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

'use strict';

///////////////////////////////////////////////////////////////////////// {{{2
// $ESCAPE HELPER
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} source
 * @return {string}
 */
var $escape = (function $escapePrivateScope() {

  /// {{{3
  /// @func $escape
  /**
   * @param {string} source
   * @return {string}
   */
  function $escape(source) {
    return source['replace'](CHARS, '\\$&');
  }

  ///////////////////////////////////////////////////// {{{3
  // $ESCAPE HELPERS
  //////////////////////////////////////////////////////////

  /// {{{4
  /// @const CHARS
  /**
   * @private
   * @type {!RegExp}
   */
  var CHARS = /[\\^$.*+?|(){}[\]]/g;
  /// }}}3

  // END OF PRIVATE SCOPE FOR $ESCAPE
  return $escape;
})();
/// }}}2

module.exports = $escape;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
