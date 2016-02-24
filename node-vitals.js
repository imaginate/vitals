/**
 * -----------------------------------------------------------------------------
 * VITALS - CONSTRUCTOR
 * -----------------------------------------------------------------------------
 * @file A JavaScript library of utility methods designed for elegance,
 *   performance, and reliability.
 * @version 4.0.1
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var _merge = require('./src/methods/helpers/merge.js');
var _own = require('./src/methods/helpers/own.js');
var _is = require('./src/methods/helpers/is.js');

var VERSION = '4.0.1';

/**
 * @public
 * @param {(!Array|...string)=} methods - [default= "all"] The vitals methods to
 *   include. Methods may be included by section or individually.
 * @return {(!Object|function)} If only one method is requested that method is
 *   returned. Otherwise an object with all the requested vitals methods is
 *   returned.
 */
exports = module.exports = function newVitals(methods) {

  /** @type {(!Object|function)} */
  var vitals;

  switch (arguments.length) {
    case 0: methods = 'all';
    case 1: break;
    default: methods = arguments;
  }

  if ( _is.arr(methods) ) {
    switch (methods.length) {
      case 0: methods = 'all'; break;
      case 1: methods = methods[0];
    }
  }

  vitals = _is.str(methods) ? setupMethod(methods) : setupMethods(methods);
  vitals.version = VERSION;
  vitals.mkGlobal = newMakeGlobal(vitals, methods);
  vitals.construct = newVitals;
  return vitals;
};

/**
 * @public
 * @type {string}
 */
exports.version = VERSION;

/**
 * @private
 * @param {(!Object|function)} vitals
 * @param {(?string|Object)} method
 * @return {function}
 */
function newMakeGlobal(vitals, method) {

  if ( !_is.func(vitals) ) method = null;

  /**
   * @public
   * Globally appends the vitals instance and each of its methods.
   * @type {function}
   */
  return function makeGlobal() {

    /** @type {string} */
    var key;

    global.vitals = vitals;

    if (method) global[method] = vitals;
    else {
      for (key in vitals) {
        if ( _own(vitals, key) && isMethod(key) ) global[key] = vitals[key];
      }
    }
  };
}

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
  'is':     true,
  'remap':  true,
  'roll':   true,
  'run':    true,
  'same':   true,
  'seal':   true,
  'slice':  true,
  'to':     true,
  'until':  true
};

/**
 * @private
 * @param {string} method
 * @return {(!Object|function)}
 */
function setupMethod(method) {

  /** @type {function} */
  var vitals;

  if ( isSection(method) ) return requireSection(method);

  if ( !isMethod(method) ) throw new RangeError( errMsg(method) );

  vitals = requireMethod(method);
  vitals[method] = vitals;
  return vitals;
}

/**
 * @private
 * @param {(!Array|Arguments)} methods
 * @return {!Object}
 */
function setupMethods(methods) {

  /** @type {!Object} */
  var section;
  /** @type {!Object} */
  var vitals;
  /** @type {string} */
  var method;
  /** @type {number} */
  var len;
  /** @type {!Object} */
  var fs;
  /** @type {number} */
  var i;

  if ( !_is._arr(methods) ) throw new TypeError( errMsg(methods) );

  vitals = {};
  len = methods.length;
  i = -1;
  while (++i < len) {
    method = methods[i];

    if ( !_is.str(method) ) throw new TypeError( errMsg(method, i) );

    if ( isSection(method) ) {
      section = requireSection(method);
      if ( isFs(method) ) fs = section;
      else vitals = _merge(vitals, section);
    }
    else if ( !isMethod(method) ) throw new RangeError( errMsg(method, i) );
    else vitals[method] = requireMethod(method);
  }
  return appendFs(vitals, fs);
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

/**
 * @private
 * @param {!Object} vitals
 * @param {!Object=} fs
 * @return {!Object}
 */
function appendFs(vitals, fs) {

  /** @type {string} */
  var key;

  if (!fs) return vitals;

  for (key in fs) {
    if ( _own(fs, key) ) {
      vitals[key] = _own(vitals, key)
        ? _merge(vitals[key], fs[key])
        : fs[key];
    }
  }
  return vitals;
}

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

/**
 * @private
 * @param {string} section
 * @return {boolean}
 */
function isFs(section) {
  return SECTIONS.fs.test(section);
}

/**
 * @private
 * @param {*} method
 * @param {number=} i
 * @return {string}
 */
function errMsg(method, i) {

  /** @type {string} */
  var msg;

  msg = 'invalid method - ';

  if ( _is.str(method) ) {
    msg += 'must be vitals section or method - ';
    msg += 'method= ' + method;
  }
  else {
    msg += 'must be a string - ';
    msg += 'typeof= ' + typeof method;
  }
  return _is.num(i)
    ? msg + ' index= ' + i
    : msg;
}
