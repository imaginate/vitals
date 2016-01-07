/**
 * -----------------------------------------------------------------------------
 * VITALS JS - NODE VERSION - VITALS SETUP
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 2.2.1
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
 * @param {(!Array|...string)=} methods - [default= "all"] The vitals methods to
 *   include. Methods may be included by section or individually.
 * @return {!(Object|function)} If only one method is requested that method is
 *   returned. Otherwise an object with all the requested vitals methods is
 *   returned.
 */
module.exports = function setupVitals(makeGlobal, methods) {

  if ( is.num(makeGlobal) ) {
    if (makeGlobal < 0 || makeGlobal > 2) {
      throw new RangeError('Invalid makeGlobal param. Valid options: 0, 1, 2');
    }
    switch (arguments.length) {
      case 1:  methods = DEFAULT_METHODS;
      case 2:  break;
      default: methods = _sliceArr(arguments, 1);
    }
  }
  else {
    switch (arguments.length) {
      case 0:  methods = DEFAULT_METHODS; break;
      case 1:  methods = makeGlobal;      break;
      default: methods = _sliceArr(arguments);
    }
    makeGlobal = 0;
  }

  methods = is.arr(methods) ? methods : [ methods ];
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
var DEFAULT_METHODS = [ 'all' ];

/**
 * @private
 * @type {!Object}
 * @const
 */
var SECTIONS = {
  'all':    /^all$/i,
  'base':   /^base$/i,
  'strict': /^strict$/i,
  'fs':     /^fs$|^file-?system$/i,
  'shell':  /^shell$/i
};

/**
 * @private
 * @type {!Object}
 * @const
 */
var METHODS = {
  'amend':  true,
  'copy':   true,
  'create': true,
  'cut':    true,
  'each':   true,
  'fill':   true,
  'freeze': true,
  'fuse':   true,
  'get':    true,
  'has':    true,
  'remap':  true,
  'run':    true,
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

  if ( !is.str(method) ) {
    throw new TypeError('Invalid type for the method. Should be a string.');
  }

  if ( isSection(method) ) return setupSection(makeGlobal, method);

  if ( !isMethod(method) ) {
    throw new RangeError(
      'The method, "'+ method +'", is not a valid vitals section or method.'
    );
  }

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
  /** @type {boolean} */
  var hasFs;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  vitals = {};
  len = methods.length;
  i = -1;
  while (++i < len) {
    method = methods[i];

    if ( !is.str(method) ) {
      throw new TypeError('Invalid type for a method. Should be a string.');
    }

    if ( SECTIONS.fs.test(method) ) {
      hasFs = true;
      continue;
    }

    if ( isSection(method) ) {
      vitals = _merge(vitals, requireSection(method));
      continue;
    }

    if ( !isMethod(method) ) {
      throw new RangeError(
        'The method, "'+ method +'", is not a valid vitals section or method.'
      );
    }

    vitals[method] = requireMethod(method);
  }

  vitals = hasFs ? appendFs(vitals) : vitals;
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
      return require('./src/sections/' + key);
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS - APPEND
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {!Object} vitals
 * @return {!Object}
 */
function appendFs(vitals) {

  /** @type {!Object} */
  var fs;
  /** @type {string} */
  var key;

  fs = requireSection('fs');
  for (key in fs) {
    if ( _own(fs, key) ) {
      vitals[key] = _merge(vitals[key] || {}, fs[key]);
    }
  }
  return vitals;
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
