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
 * @note Older node.js versions such as v0.10 required a `path' parameter.
 *   Where newer node.js versions such as v7.9 did not require a parameter.
 * @see [node.js v0.10](https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
 * @see [node.js v7.9](https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
 * @private
 * @param {...string} path
 * @return {string}
 */
var resolvePath = require('path').resolve;

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
