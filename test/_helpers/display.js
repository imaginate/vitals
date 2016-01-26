/**
 * -----------------------------------------------------------------------------
 * TEST HELPERS - DISPLAYING TESTS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
      ? has(val, /^<[\s\S]+>$/)
        ? val.replace(/^<<|>>$/g, '')
        : '"' + val + '"'
      : String(val);
  return indentStr(val, indent, noLeadIndent);
};

/**
 * @global
 * @param {string} section
 * @param {string} details
 * @param {number=} indent
 * @return {string}
 */
global.testTitle = function testTitle(section, details, indent) {

  /** @type {string} */
  var result;

  if ( !is.str(section) ) log.error(
    'Invalid `testTitle` Call',
    'invalid type for `section` param',
    { argMap: true, section: section }
  );

  if ( !is.str(details) ) log.error(
    'Invalid `testTitle` Call',
    'invalid type for `details` param',
    { argMap: true, section: section, details: details }
  );

  indent = is.num(indent) && indent > 0 ? indent : 0;
  result = section + ' tests: ' + details;
  return breakStr(result, ++indent, true);
};

/**
 * @global
 * @param {string} str
 * @param {number} times
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
global.indentStr = function indentStr(str, times, noLeadIndent) {

  /** @type {string} */
  var indent;

  if ( !is.str(str) ) log.error(
    'Invalid `indentStr` Call',
    'invalid type for `str` param',
    { argMap: true, str: str }
  );

  if ( !is.num(times) ) log.error(
    'Invalid `indentStr` Call',
    'invalid type for `times` param',
    { argMap: true, str: str, times: times }
  );

  times = times < 0 ? 0 : times;
  indent = '';
  while (times--) indent += '  ';
  str = indent ? str.replace(/\n/g, '\n' + indent) : str;
  return noLeadIndent ? str : indent + str;
};

/**
 * @global
 * @param {string} str
 * @param {number=} indent
 * @param {boolean=} noLeadIndent
 * @return {string}
 */
global.breakStr = function breakStr(str, indent, noLeadIndent) {

  /** @type {string} */
  var result;
  /** @type {number} */
  var max;
  /** @type {number} */
  var i;

  if ( !is.str(str) ) log.error(
    'Invalid `breakStr` Call',
    'invalid type for `str` param',
    { argMap: true, str: str }
  );

  indent = is.num(indent) && indent > 0 ? indent : 0;

  if (str.length <= MAX_LENGTH) return str;

  i = getLastSpace(str, MAX_LENGTH) || str.length;
  result = str.substr(0, i);
  str = str.slice(i);
  max = MAX_LENGTH - 5;
  while (str.length > max) {
    i = getLastSpace(str, max) || str.length;
    result += '\n' + str.substr(0, i);
    str = str.slice(i);
  }
  result += str && '\n' + str;
  return indentStr(result, indent, noLeadIndent);
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
 * @param {number=} limit
 * @return {number}
 */
function getLastSpace(str, limit) {

  /** @type {string} */
  var temp;

  temp = limit ? str.substr(0, limit) : str;
  return ( temp.lastIndexOf(' ') || str.indexOf(' ') ) + 1;
}
