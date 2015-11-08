/**
 * -----------------------------------------------------------------------------
 * VITALS LIBRARY - DISPLAY METHODS
 * -----------------------------------------------------------------------------
 * @file Vitals libraries, functional shortcuts, and other helpers.
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
// APPEND SHORTCUT METHODS
////////////////////////////////////////////////////////////////////////////////

/**
 * @global
 * @param {string} method
 * @param {Array=} args
 * @param {number=} indent
 * @return {string}
 */
global.testCall = function testCall(method, args, indent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var last;

  if ( !is.str(method) ) log.error(
    'Invalid `testCall` Call',
    'invalid type for `method` param',
    { argMap: true, method: method }
  );

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
  result += ')';
  return indentStr(result, indent);
};

/**
 * @global
 * @param {*} val
 * @param {number=} indent
 * @return {string}
 */
global.toStr = function toStr(val, indent) {
  indent = is.num(indent) && indent > 0 ? indent : 0;
  val = is._obj(val)
    ? is.regex(val)
      ? val.toString()
      : is._arr(val)
        ? arrToStr(val)
        : objToStr(val)
    : is.str(val)
      ? '"' + val + '"'
      : String(val);
  return indentStr(val, indent);
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {number}
 * @const
 */
var MAX_LENGTH = 150;

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

  result = [];
  result.push( is.func(obj) ? '[Function] { ' : '{ ' );

  keys = objKeys(obj);

  if (!keys.length) return slice(result[0], -1) + '}';

  // convert all object values to a string
  last = keys.length - 1;
  each(keys, function(key, i) {
    key = key + ': ' + toStr( obj[key] );
    key += i < last ? ', ' : ' ';
    result.push(key);
  });

  result.push('}');

  return result.join( isValidLength(result) ? '' : '\n  ' );
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

  result = [];
  result.push( is.args(obj) ? '[Arguments] [ ' : '[ ' );

  if (!obj.length) return slice(result[0], -1) + ']';

  // convert all array values to a string
  last = obj.length - 1;
  each(obj, function(val, i) {
    val = toStr(val);
    val += i < last ? ', ' : ' ';
    result.push(val);
  });

  result.push(']');

  return result.join( isValidLength(result) ? '' : '\n  ' );
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
 * @return {string}
 */
function indentStr(str, times) {

  /** @type {string} */
  var indent;

  indent = '';
  while (times--) indent += '  ';
  return indent ? indent + str.replace('\n', '\n' + indent) : str;
}
