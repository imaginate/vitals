/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: breakStr
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = breakStr;

var is = require('./is');
var indentStr = require('./indent-str');

var MAX_LENGTH = 60;

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
  result = str.slice(0, i);
  str = str.slice(i);
  max = max - 3;
  while (str.length) {
    i = lastSpace(str, max);
    substr = str.slice(0, i);
    result = result + '\n' + substr;
    str = str.slice(i);
  }
  return indentStr(result, indent);
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

  temp = str.slice(0, limit);
  i = temp.lastIndexOf(' ');
  i = i === -1 ? str.indexOf(' ') : i;
  return i === -1 ? str.length : ++i;
}
