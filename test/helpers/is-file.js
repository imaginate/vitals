/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: isFile
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

var fs = require('fs');

/**
 * @param {string} filepath
 * @return {boolean}
 */
module.exports = function isFile(filepath) {

  if (typeof filepath !== 'string') throw new TypeError('invalid filepath (must be a string)');

  if (!filepath) return false;

  try {
    return fs.statSync(filepath).isFile();
  }
  catch (err) {
    return false;
  }
};
