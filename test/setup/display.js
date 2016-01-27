/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: SETUP DISPLAY HELPERS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

var chalk = require('chalk');

var MAX_LENGTH = 50;

global.testCall  = testCall;
global.testTitle = testTitle;
global.breakStr  = breakStr;

log.toString.setFormat({
  'lineLimit': MAX_LENGTH
});

/**
 * @global
 * @param {string} method
 * @param {!Array} args
 * @param {number} indent
 * @return {string}
 */
function testCall(method, args, indent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  args = slice(args);

  if ( !is.str(method) ) throw new TypeError('invalid type for `method` param');
  if ( !is.arr(args)   ) throw new TypeError('invalid type for `args` param');

  if (!args || !args.length) {
    result = fuse(method, '()');
    return chalk.white(result);
  }

  last = args.length - 1;
  result = roll.up('', args, function(arg, i) {
    arg = log.toString(arg);
    return i < last ? fuse(arg, ', ') : arg;
  });
  result = fuse(method, '(', result, ');');
  return indentStr(result, indent);
}

/**
 * @global
 * @param {string} section
 * @param {string} details
 * @param {number} indent
 * @return {string}
 */
function testTitle(section, details, indent) {

  /** @type {string} */
  var result;

  if ( !is.str(section) ) throw new TypeError('invalid type for `section` param');
  if ( !is.str(details) ) throw new TypeError('invalid type for `details` param');
  if ( !is.num(indent)  ) throw new TypeError('invalid type for `indent` param');

  result = fuse(section, ' tests: ', details);
  return breakStr(result, ++indent);
}

/**
 * @global
 * @param {string} str
 * @param {number} indent
 * @return {string}
 */
function breakStr(str, indent) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var substr;
  /** @type {number} */
  var max;
  /** @type {number} */
  var i;

  if ( !is.str(str) ) throw new TypeError('invalid type for `str` param');

  max = MAX_LENGTH;

  if (str.length <= max) return str;

  i = lastSpace(str, max);
  result = slice(str, 0, i);
  str = slice(str, i);
  max = max - 3;
  until(0, 10, function() {
    i = lastSpace(str, max);
    substr = slice(str, 0, i);
    result = fuse(result, '\n', substr);
    str = slice(str, i);
    return str.length;
  });
  result = indentStr(result, indent);
  return chalk.white(result);
}

/**
 * @private
 * @param {string} str
 * @param {number} indents
 * @return {string}
 */
function indentStr(str, indents) {

  /** @type {string} */
  var indent;

  indents = indents || 0;

  if ( !is.str(str)     ) throw new TypeError('invalid type for `str` param');
  if ( !is.num(indents) ) throw new TypeError('invalid type for `indents` param');

  if (!indents) return str;

  indent = fill(indents, '  ');
  indent = fuse('\n', indent);
  return remap(str, /\n/g, indent);
}

/**
 * @private
 * @param {string} str
 * @param {number} limit
 * @return {number}
 */
function lastSpace(str, limit) {

  /** @type {string} */
  var temp;
  /** @type {number} */
  var i;

  if (str.length < limit) return str.length;

  temp = slice(str, 0, limit);
  i = temp.lastIndexOf(' ');
  i = is.same(i, -1) ? str.indexOf(' ') : i;
  return is.same(i, -1) ? str.length : ++i;
}
