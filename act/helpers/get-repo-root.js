/**
 * -----------------------------------------------------------------------------
 * ACT TASK HELPER: getRepoRoot
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/**
 * @private
 * @param {(!ArrayLike<string>|...string)=} path
 * @return {string}
 */
var resolvePath = require('./resolve-path.js');

/**
 * @private
 * @const {string}
 */
var REPO_DIR = resolvePath(__dirname, '../..');

/**
 * @public
 * @return {string}
 */
module.exports = function getRepoRoot() {
  return REPO_DIR;
};
