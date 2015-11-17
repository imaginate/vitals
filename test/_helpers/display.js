/**
 * -----------------------------------------------------------------------------
 * TEST HELPERS - DISPLAYING TESTS
 * -----------------------------------------------------------------------------
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

// append global helpers if they do not exist
if (!global.__basics) require('./basics');


////////////////////////////////////////////////////////////////////////////////
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @global
 * @param {string} method
 * @param {Array=} args
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
global.testCall = function testCall(method, args, indent, noLeadIndent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  if ( !is.str(method) ) log.error(
    'Invalid `testCall` Call',
    'invalid type for `method` param',
    { argMap: true, method: method }
  );

  args = is.args(args) ? slice(args) : args;

  if ( !is('arr=', args) ) log.error(
    'Invalid `testCall` Call',
    'invalid type for `args` param',
    { argMap: true, method: method, args: args }
  );

  if (!args || !args.length) return method + '()';

  indent = is.num(indent) && indent > 0 ? indent : 0;
  result = method + '(';
  last = args.length - 1;
  each(args, function(arg, i) {
    result += toStr(arg);
    if (i < last) result += ', ';
  });
  result += ');';
  return indentStr(result, indent, noLeadIndent);
};

/**
 * @global
 * @param {*} val
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
global.toStr = function toStr(val, indent, noLeadIndent) {
  indent = is.num(indent) && indent > 0 ? indent : 0;
  val = is._obj(val)
    ? is.regex(val)
      ? val.toString()
      : is._arr(val)
        ? arrToStr(val)
        : objToStr(val)
    : is.str(val)
      ? has(val, /^<.+>$/)
        ? val
        : '"' + val + '"'
      : String(val);
  return indentStr(val, indent, noLeadIndent);
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {number}
 * @const
 */
var MAX_LENGTH = 50;

/**
 * @private
 * @param {(!Object|function)} obj
 * @return {string}
 */
function objToStr(obj) {

  /** @type {!Array<string>} */
  var result;
  /** @type {!Array<string>} */
  var keys;
  /** @type {number} */
  var last;
  /** @type {*} */
  var val;

  result = [];
  result.push( is.func(obj) ? '[Function] { ' : '{ ' );

  keys = objKeys(obj);

  if (!keys.length) return slice(result[0], 0, -1) + '}';

  // convert all object values to a string
  last = keys.length - 1;
  each(keys, function(key, i) {
    val = obj[key];
    key = key + ': ' + toStr(val);
    key += i < last && ( !is._obj(val) || is.regex(val) ) ? ', ' : ' ';
    result.push(key);
  });

  return isValidLength(result)
    ? result.join('') + '}'
    : result.join('\n  ') + '\n}';
}

/**
 * @private
 * @param {!Object} obj
 * @return {string}
 */
function arrToStr(obj) {

  /** @type {!Array<string>} */
  var result;
  /** @type {number} */
  var last;
  /** @type {*} */
  var val;

  result = [];
  result.push( is.args(obj) ? '[Arguments] [ ' : '[ ' );

  if (!obj.length) return slice(result[0], 0, -1) + ']';

  // convert all array values to a string
  last = obj.length - 1;
  each(obj, function(_val, i) {
    val = _val;
    _val = toStr(val);
    _val += i < last && ( !is._obj(val) || is.regex(val) ) ? ', ' : ' ';
    result.push(_val);
  });

  return isValidLength(result)
    ? result.join('') + ']'
    : result.join('\n  ') + '\n]';
}

/**
 * @private
 * @param {!Array} result
 * @return {boolean}
 */
function isValidLength(result) {

  /** @type {!Array<string>} */
  var strs;
  /** @type {string} */
  var str;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  str = result.join('');
  strs = str.split('\n');
  len = strs.length;
  i = -1;
  while (++i < len) {
    str = strs[i];
    if (str.length > MAX_LENGTH) return false;
  }
  return true;
}

/**
 * @private
 * @param {string} str
 * @param {number} times
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
function indentStr(str, times, noLeadIndent) {

  /** @type {string} */
  var indent;

  indent = '';
  while (times--) indent += '  ';
  str = indent ? str.replace(/\n/g, '\n' + indent) : str;
  return noLeadIndent ? str : indent + str;
}
