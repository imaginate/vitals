/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: inObj
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = inObj;

var hasOwn = require('./has-own');

/**
 * @param {(!Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function inObj(source, val) {

  /** @type {string} */
  var key;

  for (key in source) {
    if ( hasOwn(source, key) && source[key] === val ) return true;
  }
  return false;
}
