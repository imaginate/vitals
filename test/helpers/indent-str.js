/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: indentStr
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = indentStr;

var is = require('./is');

/**
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

  indent = '';
  while (--indents) indent += '  ';
  indent = '\n' + indent;
  return str.replace(/\n/g, indent);
}
