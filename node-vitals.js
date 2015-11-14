/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - VITALS SETUP
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
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
var _error = requireHelper('errorAid.js')('setup');
/** @type {function} */
var _sliceArr = requireHelper('sliceArr.js');
/** @type {function} */
var _inStr = requireHelper('inStr.js');
/** @type {function} */
var _merge = requireHelper('merge.js');
/** @type {function} */
var _own = requireHelper('own.js');
/** @type {function} */
var is = require('node-are').is;


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
    methods = _sliceArr(arguments, 1);
  }
  else {
    methods = _sliceArr(arguments);
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
var DEFAULT_METHODS = [ 'js' ];

/**
 * @private
 * @type {!Object}
 * @const
 */
var SECTIONS = {
  'all':          /^all$/i,
  'js/all':       /^(?:all)?-?js-?(?:all)?$/i,
  'js/base':      /^(?:js)?-?base-?(?:js)?$/i,
  'js/configure': /^(?:js)?-?configure-?(?:js)?$/i
};

/**
 * @private
 * @type {!Object}
 * @const
 */
var METHODS = {
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
};


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

  vitals = requireMethod(method);
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
  /** @type {string} */
  var method;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  vitals = {};
  len = methods.length;
  i = -1;
  while (++i < len) {
    method = methods[i];

    if ( !is.str(method) ) throw _error.type('method');

    if ( isSection(method) ) {
      vitals = _merge(vitals, requireSection(method));
      continue;
    }

    if ( !isMethod(method) ) throw _error.range(
      'method', 'see docs for all vitals sections and methods'
    );

    vitals[method] = requireMethod(method);
  }

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

  vitals = requireSection(section);
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
    for (key in vitals) {
      if ( _own(vitals, key) ) {
        global[key] = vitals[key];
      }
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - REQUIRE
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} method
 * @return {function}
 */
function requireHelper(method) {
  return require('./src/methods/_helpers/' + method);
}

/**
 * @private
 * @param {string} method
 * @return {function}
 */
function requireMethod(method) {
  return require('./src/methods/' + method);
}

/**
 * @private
 * @param {string} section
 * @return {!Object}
 */
function requireSection(section) {

  /** @type {string} */
  var key;

  if ( _own(SECTIONS, section) ) return require('./src/sections/' + section);

  for (key in SECTIONS) {
    if ( _own(SECTIONS, key) && SECTIONS[key].test(section) ) {
      return require('./src/sections/' + section);
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
  return _own(METHODS, method);
}

/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
function isSection(section) {

  /** @type {string} */
  var key;

  if ( _own(SECTIONS, section) ) return true;

  for (key in SECTIONS) {
    if ( _own(SECTIONS, key) && SECTIONS[key].test(section) ) return true;
  }
  return false;
}
