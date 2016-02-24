/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: testTitle
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = testTitle;

var is = require('./is');
var breakStr = require('./break-str');

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

  result = section + ' tests: ' + details;
  return breakStr(result, ++indent);
}
