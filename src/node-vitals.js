/**
 * -----------------------------------------------------------------------------
 * NODE-VITALS
 * -----------------------------------------------------------------------------
 * @version 2.0.0
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

/** @type {function} */
var _error = require('./_error.js')('setup');
/** @type {function} */
var is = require('node-are').is;
/** @type {function} */
var has = require('./js-methods/has.js');
/** @type {function} */
var each = require('./js-methods/each.js');
/** @type {function} */
var fuse = require('./js-methods/fuse.js');
/** @type {function} */
var slice = require('./js-methods/slice.js');
/** @type {function} */
var until = require('./js-methods/until.js');
/** @type {function} */
var freeze = require('./js-methods/freeze.js');


////////////////////////////////////////////////////////////////////////////////
// DEFINE VITALS SETUP
////////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @param {number=} makeGlobal - [default= 0] options:
 *   0= nothing is appended to the global
 *   1= the vitals object is appended to the global
 *   2= each vitals method is appended to the global
 * @param {...string=} methods - [default= "js"] The vitals methods to include.
 *   Methods may be included by section or individually.
 * @return {!(Object|function)} If only one method is requested that method is
 *   returned. Otherwise an object with all the requested vitals methods is
 *   returned.
 */
module.exports = function setupVitals(makeGlobal, methods) {

  /** @type {!Object} */
  var vitals;

  if ( is.num(makeGlobal) ) {
    if (makeGlobal < 0 || makeGlobal > 2) {
      throw _error.range('makeGlobal', '0, 1, 2');
    }
    methods = slice(arguments, 1);
  }
  else {
    methods = slice(arguments);
    makeGlobal = 0;
  }

  methods = methods.length ? methods : DEFAULT_METHODS;
  return methods.length > 1
    ? setupMethods(makeGlobal, methods)
    : setupMethod(makeGlobal, methods[0]);
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - CONST REFS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @type {!Array}
 * @const
 */
var DEFAULT_METHODS = freeze([
  'js'
]);

/**
 * @private
 * @type {!Object}
 * @const
 */
var METHODS = (function() {

  /** @type {!Object} */
  var js;

  js = freeze({
    'amend':  true,
    'clone':  true,
    'create': true,
    'cut':    true,
    'each':   true,
    'fill':   true,
    'freeze': true,
    'fuse':   true,
    'get':    true,
    'has':    true,
    'remap':  true,
    'seal':   true,
    'slice':  true,
    'until':  true
  });

  return freeze({
    'js-methods': js,
    'js':         js
  });
})();


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - SETUP
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {number} makeGlobal
 * @param {string} method
 * @return {!(Object|function)}
 */
function setupMethod(makeGlobal, method) {

  /** @type {function} */
  var vitals;

  if ( !is.str(method) ) throw _error.type('method');

  if ( isSection(method) ) return setupSection(makeGlobal, method);

  if ( !isMethod(method) ) throw _error.range(
    'method', 'see docs for all vitals sections and methods'
  );

  vitals = fetchMethod(method);
  vitals[method] = vitals;
  setupGlobal(makeGlobal, vitals, method);
  return vitals;
}

/**
 * @private
 * @param {number} makeGlobal
 * @param {!Array} methods
 * @return {!Object}
 */
function setupMethods(makeGlobal, methods) {

  /** @type {!Object} */
  var vitals;

  vitals = {};
  each(methods, function(method) {
    if ( !is.str(method) ) throw _error.type('method');

    if ( isSection(method) ) {
      vitals = fuse(vitals, fetchSection(method));
      return;
    }

    if ( !isMethod(method) ) throw _error.range(
      'method', 'see docs for all vitals sections and methods'
    );

    vitals[method] = fetchMethod(method);
  });

  setupGlobal(makeGlobal, vitals);
  return vitals;
}

/**
 * @private
 * @param {number} makeGlobal
 * @param {string} section
 * @return {!Object}
 */
function setupSection(makeGlobal, section) {

  /** @type {!Object} */
  var vitals;

  vitals = fetchSection(section);
  setupGlobal(makeGlobal, vitals);
  return vitals;
}

/**
 * @private
 * @param {number} makeGlobal
 * @param {!(Object|function)} vitals
 * @param {string=} key
 */
function setupGlobal(makeGlobal, vitals, key) {

  if (!makeGlobal) return;

  global.vitals = vitals;

  if (key) {
    global[key] = vitals;
  }

  if (makeGlobal === 2) {
    each(vitals, function(method, key) {
      global[key] = method;
    });
  }
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - FETCH
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {function}
 */
function fetchMethod(method) {
  method = getSection(method) + '/' + method;
  return require('./' + method);
}

/**
 * @private
 * @param {string} section
 * @return {!Object}
 */
function fetchSection(section) {
  section += has(section, '-') ? '' : '-methods';
  return require('./' + section);
}

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function getSection(method) {

  /** @type {string} */
  var section;

  for (section in METHODS) {
    if ( has(METHODS, section) ) {
      if ( has(METHODS[section], method) ) {
        return has(section, '-') ? section : section + '-methods';
      }
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - TESTS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {boolean}
 */
function isMethod(method) {
  return until(true, METHODS, function(section) {
    return has(METHODS[section], method);
  });
}

/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
function isSection(section) {
  return has(METHODS, section);
}
