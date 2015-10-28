/**
 * -----------------------------------------------------------------------------
 * NODE-VITALS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
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

/** @type {Function<string, function>} */
var is = require('node-are').is;
/** @type {function} */
var has = require('./js-methods/has.js');
/** @type {function} */
var each = require('./js-methods/each.js');
/** @type {function} */
var merge = require('./js-methods/merge.js');
/** @type {function} */
var slice = require('./js-methods/slice.js');


////////////////////////////////////////////////////////////////////////////////
// EXPORT VITALS
////////////////////////////////////////////////////////////////////////////////

/* ------------------------------------
 *   ALL OF VITALS SECTIONS & METHODS
 * ------------------------------------
 *
 *   | Sections     | Shorthand |
 *   | :----------- | :-------- |
 *   | js-methods   | js        |
 *   | node-methods | node      |
 *
 *   | JS Methods | Node Methods |
 *   | :--------- | :----------- |
 *   | clone      |              |
 *   | create     |              |
 *   | cut        |              |
 *   | each       |              |
 *   | fill       |              |
 *   | freeze     |              |
 *   | get        |              |
 *   | has        |              |
 *   | merge      |              |
 *   | remap      |              |
 *   | seal       |              |
 *   | slice      |              |
 *   | typeOf     |              |
 *
 * ------------------------------------
 */

/**
 * @type {!Object}
 * @const
 */
var METHODS = {
  'js-methods': {
    'clone':  true,
    'create': true,
    'cut':    true,
    'each':   true,
    'fill':   true,
    'freeze': true,
    'get':    true,
    'has':    true,
    'merge':  true,
    'remap':  true,
    'seal':   true,
    'slice':  true,
    'typeOf': true
  },
  'node-methods': {}
};

/**
 * @param {number=} setup - [default= 0] options:
 *   0= nothing is appended to the global
 *   1= the vitals object is appended to the global
 *   2= each individual method and component is appended to the global
 * @param {...string=} methods - [default= "js"] The vitals methods to include.
 *   Methods may be included by section or individually.
 * @return {!Object} The vitals methods.
 */
module.exports = function setupVitals(setup, methods) {

  /** @type {!Object} */
  var vitals;
  /** @type {(!Object|string)} */
  var section;

  if (arguments.length) {
    if ( is.num(setup) ) {
      methods = slice(arguments, 1);
    }
    else {
      methods = slice(arguments);
      setup = 0;
    }
  }

  vitals = {};
  methods = methods || [ 'js' ];
  each(methods, function(method) {

    if ( !is.str(method) ) {
      throw new TypeError('Invalid method param in setupVitals call.');
    }

    if ( isSection(method) ) {
      method += has(method, '-methods') ? '' : '-methods';
      section = require('./' + method);
      vitals = merge(vitals, section);
      return;
    }

    section = getSection(method);

    if (!section) {
      throw new Error('A given method for setupVitals does not exist.');
    }

    vitals[method] = require('./' + section + '/' + method);
  });

  if (setup === 1) {
    global.vitals = vitals;
  }
  else if (setup === 2) {
    each(vitals, function(method, name) {
      global[name] = method;
    });
  }

  return vitals;
};


////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} str
 * @return {boolean}
 */
function isSection(str) {
  str += has(str, '-methods') ? '' : '-methods';
  return has(METHODS, str);
}

/**
 * @private
 * @param {string} method
 * @return {string}
 */
function getSection(method) {

  /** @type {string} */
  var prop;

  for (prop in METHODS) {
    if ( has(METHODS, prop) && has(METHODS[prop], method) ) {
      return prop;
    }
  }
  return '';
}
