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

'use strict';

var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////
// SETUP GLOBAL HELPERS
////////////////////////////////////////////////////////////////////////////////

require('../_helpers/basics');
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
global.vitals = getVitals();

/**
 * @private
 * @return {!Object}
 */
function getVitals() {

  /** @type {!Object} */
  var vitals;
  /** @type {!Array} */
  var methods;

  vitals = {};
  methods = getMethods();
  each(methods, function(method) {
    vitals[method] = require('../../src/methods/' + method + '.js');
  });
  return vitals;
}

/**
 * @private
 * @return {!Array}
 */
function getMethods() {

  /** @type {!Array} */
  var methods;
  /** @type {string} */
  var base;

  base = 'src/methods/';
  methods = fs.readdirSync(base);
  methods = methods.filter(function(method) {
    return is.file(base + method);
  });
  return methods.map(function(method) {
    return method.replace(/\.js$/, '');
  });
}
