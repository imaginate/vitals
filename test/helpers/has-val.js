/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: hasVal
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

module.exports = hasVal;

var is = require('./is');
var inArr = require('./in-arr');
var inObj = require('./in-obj');

/**
 * @param {(!Object|function)} source
 * @param {*} val
 * @return {boolean}
 */
function hasVal(source, val) {
  return is.arr(source)
    ? inArr(source, val)
    : inObj(source, val);
}
