/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: cutJSExt
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @param {string} file
 * @return {string}
 */
module.exports = function cutJSExt(file) {
  return file.replace(/\.js$/, '');
};
