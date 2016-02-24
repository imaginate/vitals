/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: isDirectory
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var fs = require('fs');

/**
 * @param {string} dirpath
 * @return {boolean}
 */
module.exports = function isDirectory(dirpath) {

  if (typeof dirpath !== 'string') throw new TypeError('invalid dirpath (must be a string)');

  if (!dirpath) return false;

  try {
    return fs.statSync(dirpath).isDirectory();
  }
  catch (err) {
    return false;
  }
};
