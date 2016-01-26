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

global.toStr     = toStr;
global.indentStr = indentStr;
global.testCall  = testCall;
global.testTitle = testTitle;
global.breakStr  = breakStr;

//////////////////////////////////////////////////////////////////////////////
// DEFINE CUSTOM HELPERS

/**
 * @private
 * @type {number}
 * @const
 */
var MAX_LENGTH = 50;

/**
 * @global
 * @param {*} val
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
function toStr(val, indent, noLeadIndent) {
  indent = is.num(indent) && indent > 0 ? indent : 0;
  val = log.toString(val);
  return indentStr(val, indent, noLeadIndent);
}

/**
 * @global
 * @param {string} str
 * @param {number} times
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
function indentStr(str, times, noLeadIndent) {

  /** @type {string} */
  var indent;

  if ( !is.str(str)   ) throw new TypeError('invalid type for `str` param');
  if ( !is.num(times) ) throw new TypeError('invalid type for `times` param');

  times = times < 0 ? 0 : times;
  indent = '';
  while (times--) indent += '  ';
  str = indent ? remap(str, /\n/g, fuse('\n', indent)) : str;
  return noLeadIndent ? str : fuse(indent, str);
}

/**
 * @global
 * @param {string} method
 * @param {Array=} args
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
function testCall(method, args, indent, noLeadIndent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  if ( !is.str(method) ) throw new TypeError('invalid type for `method` param');

  args = is.args(args) ? slice(args) : args;

  if ( !is('arr=', args) ) throw new TypeError('invalid type for `args` param');

  if (!args || !args.length) return fuse(method, '()');

  indent = is.num(indent) && indent > 0 ? indent : 0;
  result = fuse(method, '(');
  last = args.length - 1;
  result = roll.up(result, args, function(arg, i) {
    arg = toStr(arg);
    return i < last ? fuse(arg, ', ') : arg;
  });
  result = fuse(result, ');');
  return indentStr(result, indent, noLeadIndent);
}

/**
 * @global
 * @param {string} section
 * @param {string} details
 * @param {number=} indent
 * @return {string}
 */
function testTitle(section, details, indent) {

  /** @type {string} */
  var result;

  if ( !is.str(section) ) throw new TypeError('invalid type for `section` param');
  if ( !is.str(details) ) throw new TypeError('invalid type for `details` param');

  indent = is.num(indent) && indent > 0 ? indent : 0;
  result = section + ' tests: ' + details;
  return breakStr(result, ++indent, true);
}

/**
 * @global
 * @param {string} str
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
function breakStr(str, indent, noLeadIndent) {

  /** @type {string} */
  var result;
  /** @type {string} */
  var part;
  /** @type {number} */
  var max;
  /** @type {number} */
  var i;

  if ( !is.str(str) ) throw new TypeError('invalid type for `str` param');

  indent = is.num(indent) && indent > 0 ? indent : 0;

  if (str.length <= MAX_LENGTH) return str;

  i = getLastSpace(str, MAX_LENGTH) || str.length;
  result = slice(str, 0, i);
  str = slice(str, i);
  max = MAX_LENGTH - 5;
  while (str.length > max) {
    i = getLastSpace(str, max) || str.length;
    part = slice(str, 0, i);
    result = fuse(result, '\n', part);
    str = slice(str, i);
  }
  result = str ? fuse(result, '\n', str) : result;
  return indentStr(result, indent, noLeadIndent);
}

/**
 * @private
 * @param {string} str
 * @param {number=} limit
 * @return {number}
 */
function getLastSpace(str, limit) {

  /** @type {string} */
  var temp;

  temp = limit ? slice(str, 0, limit) : str;
  return ( temp.lastIndexOf(' ') || str.indexOf(' ') ) + 1;
}
