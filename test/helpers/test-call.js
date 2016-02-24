/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: testCall
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = testCall;

var is = require('./is');
var log = require('./log');
var chalk = require('chalk');
var sliceArr = require('./slice-arr');
var indentStr = require('./indent-str');

/**
 * @global
 * @param {string} method
 * @param {!(Array|Arguments)} args
 * @param {number} indent
 * @return {string}
 */
function testCall(method, args, indent) {

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

  args = sliceArr(args);

  if ( !is.str(method) ) throw new TypeError('invalid type for `method` param');
  if ( !is.arr(args)   ) throw new TypeError('invalid type for `args` param');

  if (!args || !args.length) {
    result = method + '()';
    return chalk.white(result);
  }

  result = '';
  last = args.length - 1;
  len = args.length;
  i = -1;
  while (++i < len) {
    arg = log.toString(args[i]);
    result += i < last ? arg + ', ' : arg;
  }
  result = method + '(' + result + ');';
  return indentStr(result, indent);
}
