/**
 * -----------------------------------------------------------------------------
 * VITALS HELPER: merge
 * -----------------------------------------------------------------------------
 * @version 4.1.2
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';


////////////////////////////////////////////////////////////////////////////////
// VITALS HELPER: merge
////////////////////////////////////////////////////////////////////////////////

var merge = (function mergePrivateScope() {

  /**
   * @private
   * @param {*} key
   * @return {boolean}
   */
  var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * @param {(!Object|function)} dest
   * @param {(!Object|function)} source
   * @return {(!Object|function)}
   */
  function merge(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( hasOwn.call(source, key) ) dest[key] = source[key];
    }
    return dest;
  }

  ////////////////////////////////////////////////////
  // PRIVATE SCOPE END: merge
  return merge;
})();


module.exports = merge;
