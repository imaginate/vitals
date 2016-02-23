/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: validSetErr
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

module.exports = validSetErr;

var is = require('./is');

/**
 * @param {!TypeError} err
 * @return {boolean}
 */
function validSetErr(err) {
  return is.err(err) && err.__setter === true && err.name === 'TypeError';
}
