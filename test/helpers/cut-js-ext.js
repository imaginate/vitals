/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: cutJSExt
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

/**
 * @param {string} file
 * @return {string}
 */
module.exports = function cutJSExt(file) {
  return file.replace(/\.js$/, '');
};
