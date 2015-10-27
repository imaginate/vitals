/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - CUT
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.cut]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/cut.js}
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

module.exports = cut;

var is = require('node-are').is;
var has = require('./has.js');


/**
 * Deletes a property from an object and returns it.
 * @public
 * @param {!Object} obj
 * @param {*} prop
 * @return {*} The value of the deleted property.
 */
function cut(obj, prop) {

  /** @type {*} */
  var val;

  if ( !is._obj(obj) ) {
    throw new TypeError('Invalid obj param in vitals.cutProp call.');
  }

  if ( !has(obj, prop) ) {
    throw new TypeError('Missing prop in obj for vitals.cutProp call.');
  }

  val = obj[prop];
  delete obj[prop];
  return val;
}
