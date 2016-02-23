/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS HELPER: parseVersion
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

module.exports = parseVersion;

var MAJOR = /^v?([0-9]+)\.[0-9\.]+$/;
var MINOR = /^v?[0-9]+\.([0-9]+)(?:\.[0-9]+)?$/;

/**
 * @typedef {!{
 *   major: number,
 *   minor: number
 * }} Version
 */

/**
 * @private
 * @param {string} version
 * @return {Version}
 */
function parseVersion(version) {
  return {
    major: Number( version.replace(MAJOR, '$1') ),
    minor: Number( version.replace(MINOR, '$1') )
  };
}