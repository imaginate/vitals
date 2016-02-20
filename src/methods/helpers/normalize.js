/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: normalize
 * -----------------------------------------------------------------------------
 * @version 4.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: normalize
////////////////////////////////////////////////////////////////////////////////

var normalize = (function normalizePrivateScope() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var OPTS = {
    'CRLF': { 'pattern': /\r?\n|\r\n?/g, 'value': '\r\n' },
    'CR':   { 'pattern': /\r?\n/g,       'value': '\r'   },
    'LF':   { 'pattern': /\r\n?/g,       'value': '\n'   }
  };

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function normalize(str, eol) {
    eol = OPTS[eol];
    return str.replace(eol.pattern, eol.value);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: normalize
  return normalize;
})();


module.exports = normalize;
