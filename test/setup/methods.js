/**
 * -----------------------------------------------------------------------------
 * VITALS UNIT TESTS: ALL METHODS SETUP
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [act]{@link https://github.com/imaginate/act}
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

global.vitals = loadVitalsMethods();

/**
 * @private
 * @return {!Object}
 */
function loadVitalsMethods() {

  /** @type {!Array<string>} */
  var filenames;
  /** @type {string} */
  var filepath;
  /** @type {string} */
  var method;
  /** @type {!Object} */
  var vitals;

  vitals = {};
  filenames = get.filepaths('src/methods');
  each(filenames, function(filename) {
    method = cut(filename, /\.js$/);
    filepath = fuse('../../src/methods/', filename);
    vitals[method] = require(filepath);
  });
  return vitals;
}
