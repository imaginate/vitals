/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - CHECK STRING FOR MATCH
 * -----------------------------------------------------------------------------
 * @version 3.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

var _inStr = require('./in-str.js');
var _is = require('./is.js');

module.exports = _match;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - MATCH
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for String.prototype.includes and RegExp.prototype.test.
 * @param {string} source
 * @param {*} pattern
 * @return {boolean}
 */
function _match(source, pattern) {
  return _is.regex(pattern) ? pattern.test(source) : _inStr(source, pattern);
}
