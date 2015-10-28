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

var is = require('node-are').is;
var has = require('./has.js');
var slice = require('./slice.js');
var merge = require('./merge.js');


////////////////////////////////////////////////////////////////////////////////
// CUT
////////////////////////////////////////////////////////////////////////////////

/**
 * Deletes properties from an object and returns them or deletes a pattern from
 *   a string and returns the amended string. Note that if a source array and
 *   numerical properties are provided splice is used on the array.
 * @public
 * @param {!(Object|function|Array|string)} source
 * @param {!(string|RegExp)=} pattern - Use for a string source.
 * @param {...*=} props - Use for an object source. Each array is considered an
 *   array of props.
 * @return {!(Object|string)} The values of the deleted properties or the new
 *   string.
 */
function cut(source, pattern, props) {

  if ( is.str(source) ) {
    return cut.str(source, pattern);
  }

  if ( is._obj(obj) ) {
    return cut.props.apply(null, arguments);
  }

  throw new TypeError('Invalid source param in vitals.cut call.');
}

/**
 * Deletes a property from an object and returns it.
 * @public
 * @param {!(Object|function|Array)} obj
 * @param {*} prop
 * @return {*} The value of the deleted property.
 */
cut.property = function cutProperty(obj, prop) {

  /** @type {*} */
  var val;

  if ( !is._obj(obj) ) {
    throw new TypeError('Invalid obj param in vitals.cut.property call.');
  }

  if ( !has(obj, prop) ) {
    throw new TypeError('No prop in obj for vitals.cut.property call.');
  }

  val = obj[prop];
  if ( is.arr(obj) && is.num(prop) ) {
    obj.splice(prop, 1);
  }
  else {
    delete obj[prop];
  }
  return val;
};
cut.prop = cut.property;

/**
 * Deletes properties from an object and returns an object with them.
 * @public
 * @param {!(Object|function|Array)} source
 * @param {...*} props - Each array is considered an array of props.
 * @return {!Object} The deleted properties and their values.
 */
cut.properties = function cutProperties(source, props) {

  /** @type {string} */
  var prop;
  /** @type {!Object} */
  var obj;
  /** @type {number} */
  var i;

  if ( !is._obj(source) ) {
    throw new TypeError('Invalid source param in vitals.cut.properties call.');
  }

  props = slice(arguments, 1);
  obj = {};
  i = props.length;
  while (i--) {
    prop = props[i];
    if ( is.arr(prop) ) {
      prop = cut.props(source, prop);
      obj = merge(obj, prop);
    }
    else {
      obj[prop] = cut.prop(source, prop);
    }
  }
  return obj;
};
cut.props = cut.properties;

/**
 * Deletes a pattern from a string and returns the amended string.
 * @public
 * @param {string} source
 * @param {!(string|RegExp)} pattern
 * @return {string} The new string.
 */
cut.string = function cutString(source, pattern) {

  if ( !is.str(source) ) {
    throw new TypeError('Invalid source param in vitals.cut.string call.');
  }

  if ( !is('!str|regex', pattern) ) {
    throw new TypeError('Invalid pattern param in vitals.cut.string call.');
  }

  return source.replace(pattern, '');
};
cut.str = cut.string;


module.exports = cut;
