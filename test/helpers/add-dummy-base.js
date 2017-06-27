/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: addDummyBase
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

module.exports = addDummyBase;

var BASE = DUMMY.base.replace(/\/$/, '');

/**
 * @global
 * @param {string=} path
 * @return {string}
 */
function addDummyBase(path) {
  return path ? BASE + '/' + path : BASE;
}
