/**
 * -----------------------------------------------------------------------------
 * VITALS TESTS: SETUP VITALS METHODS
 * -----------------------------------------------------------------------------
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2015 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

/** @type {function} */
var retrieve = require('../_helpers/retrieve');


////////////////////////////////////////////////////////////////////////////////
// SETUP GLOBAL HELPERS
////////////////////////////////////////////////////////////////////////////////

if (!global.__basics) require('../_helpers/basics');

require('../_helpers/display');

/**
 * @global
 * @type {!Object}
 */
global.assert = require('assert');


////////////////////////////////////////////////////////////////////////////////
// SETUP VITALS
////////////////////////////////////////////////////////////////////////////////

/**
 * @global
 * @type {!Object}
 */
global.vitals = buildVitals();

/**
 * @private
 * @return {!Object}
 */
function buildVitals() {

  /** @type {!Object} */
  var vitals;
  /** @type {!Array} */
  var methods;

  vitals = {};
  methods = allMethods();
  each(methods, function(method) {
    vitals[method] = require('../../src/methods/' + method);
  });
  return vitals;
}

/**
 * @private
 * @return {!Array}
 */
function allMethods() {

  /** @type {!Array} */
  var methods;

  methods = retrieve.filepaths('src/methods');
  return remap(methods, function(method) {
    return stripExt(method);
  });
}

/**
 * @private
 * @param {string} filename
 * @return {string}
 */
function stripExt(filename) {
  return filename.replace(/\.js$/, '');
}
