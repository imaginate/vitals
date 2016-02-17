/**
 * -----------------------------------------------------------------------------
 * VITALS - METHOD HELPER - NORMALIZE STRING
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
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
// PRIVATE HELPER - NORMALIZE
////////////////////////////////////////////////////////////////////////////////

var _normalize = (function _normalizePrivateScope() {

  /**
   * @param {string} str
   * @param {string} eol
   * @return {string}
   */
  function _normalize(str, eol) {
    return str.replace(EOL.find[eol], EOL.replace[eol]);
  }

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var EOL = {
    'replace': {
      'CRLF': '\r\n',
      'CR':   '\r',
      'LF':   '\n'
    },
    'find': {
      'CRLF': /\r?\n|\r\n?/g,
      'CR':   /\r?\n/g,
      'LF':   /\r\n?/g
    }
  };

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR NORMALIZE
  return _normalize;
})();


module.exports = _normalize;
