/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: testCall
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = testCall;

var is = require('./is');
var log = require('./log');

/**
 * @global
 * @param {string} method
 * @param {!Array} args
 * @return {string}
 */
function testCall(method, args) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;
  /** @type {string} */
  var arg;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is.str(method) ) throw new TypeError('invalid type for `method` param');
  if ( !is.arr(args)   ) throw new TypeError('invalid type for `args` param');

  if (!args || !args.length) return method + '()';

  result = '';
  last = args.length - 1;
  len = args.length;
  i = -1;
  while (++i < len) {
    arg = log.toString(args[i]);
    result += i < last ? arg + ', ' : arg;
  }
  return method + '(' + result + ');';
}
