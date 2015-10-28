/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - KEYS
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.keys]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/keys.js}
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

var is = require('node-are').is;
var has = require('./has.js');


/** @type {!Object} */
var get = {};

/**
 * Gets an object's property keys.
 * @public
 * @param {?(Object|function)} obj
 * @return {Array<string>}
 */
get.keys = function getKeys(obj) {

  /** @type {string} */
  var prop;
  /** @type {!Array<string>} */
  var arr;

  if ( is.null(obj) ) {
    return null;
  }

  if ( !is._obj(obj) ) {
    throw new TypeError('Invalid obj param in vitals.get.keys call.');
  }

  arr = [];
  for (prop in obj) {
    has(obj, prop) && arr.push(prop);
  }

  return arr;
};


module.exports = get;
