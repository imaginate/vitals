/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: splitKeys
 * -----------------------------------------------------------------------------
 * @version 4.1.3
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: splitKeys
////////////////////////////////////////////////////////////////////////////////

var splitKeys = (function splitKeysPrivateScope() {

  /**
   * @private
   * @param {string} keys
   * @param {string} str
   * @return {boolean}
   */
  var inStr = !!String.prototype.includes
    ? function inStr(keys, str) { return keys.includes(str); }
    : function inStr(keys, str) { return keys.indexOf(str) !== -1; };

  /**
   * @param {string} keys - The keys are split using one of the values in the
   *   following list as the separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array<string>}
   */
  function splitKeys(keys) {

    /** @type {string} */
    var separator;

    if (!keys) return [ '' ];

    separator = inStr(keys, ', ')
      ? ', '  : inStr(keys, ',')
        ? ',' : inStr(keys, '|')
          ? '|' : ' ';
    return keys.split(separator);
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: splitKeys
  return splitKeys;
})();


module.exports = splitKeys;
