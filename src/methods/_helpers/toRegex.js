/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD HELPER - VALUE TO REGEX
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals]{@link https://github.com/imaginate/vitals/tree/master/src/methods}
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

var _escape = require('./escape.js');

module.exports = _toRegex;


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER - TO-REGEX
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {*} source
 * @param {string=} flags
 * @param {boolean=} anyChars
 * @param {?RegExp=} escapeChars
 * @return {!RegExp}
 */
function _toRegex(source, flags, anyChars, escapeChars) {
  source = String(source);
  source = _escape(source, anyChars, escapeChars);
  flags = flags || '';
  return flags ? new RegExp(source, flags) : new RegExp(source);
}
