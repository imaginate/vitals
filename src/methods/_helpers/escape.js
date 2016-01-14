/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - ESCAPE STRING FOR REGEX
 * -----------------------------------------------------------------------------
 * @version 2.3.7
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - ESCAPE
////////////////////////////////////////////////////////////////////////////////

var _escape = (function _escapePrivateScope() {

  /**
   * @param {string} source
   * @param {boolean=} anyChars
   * @param {?RegExp=} escapeChars
   * @return {string}
   */
  function _escape(source, anyChars, escapeChars) {
    return escapeChars
      ? source.replace(escapeChars, '\\$&')
      : anyChars
        ? anyEscape(source)
        : source.replace(ALL_ESCAPE_CHARS, '\\$&');
  }

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ALL_ESCAPE_CHARS = /[\\^$.*+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_ESCAPE_CHARS = /[\\^$.+?|(){}[\]]/g;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var ANY_REPLACE = /(\\+)\*/g;

  /**
   * @private
   * @param {string} source
   * @return {string}
   */
  function anyEscape(source) {
    source = source.replace(ANY_ESCAPE_CHARS, '\\$&');
    return ANY_REPLACE.test(source)
      ? source.replace(ANY_REPLACE, anyReplacer)
      : source;
  }

  /**
   * @private
   * @param {string} match
   * @param {?string=} capture
   * @return {string}
   */
  function anyReplacer(match, capture) {

    /** @type {number} */
    var len;

    len = capture.length >>> 1; // len = capture.length / 2;
    return len % 2 ? match.substr(1) : match; // is.odd(len) ? ...
  }

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ESCAPE
  return _escape;
})();


module.exports = _escape;
