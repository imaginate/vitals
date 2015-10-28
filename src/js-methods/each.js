/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - EACH
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/each.js}
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
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// EACH
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for iterating over object maps and arrays or for invoking an
 *   action a set number of times. If iterating over an object note that this
 *   method lazily clones the object based on the iteratee's
 *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function|Array|number)} val
 * @param {function(*, (string|number)=, !(Object|function|Array)=)} iteratee
 * @param {Object=} thisArg
 * @return {(Object|function|Array)} 
 */
function each(val, iteratee, thisArg) {

  if ( is._arr(val) ) {
    return each.arr.apply(null, arguments);
  }

  if ( is._obj(val) ) {
    return each.obj.apply(null, arguments);
  }

  if ( !is.num(val) ) {
    throw new TypeError('Invalid val param in vitals.each call.');
  }

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.each call.');
  }

  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  while(val--) {
    iteratee();
  }

  return null;
}

/**
 * A shortcut for iterating over array-like objects. Note that this method
 * lazily clones the object based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function)} obj
 * @param {function(*, (string|number)=, !(Object|function|Array)=)} iteratee
 * @param {Object=} thisArg
 * @return {!(Object|function|Array)} 
 */
each.array = function eachArray(obj, iteratee, thisArg) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(obj) || !has(obj, 'length') ) {
    throw new TypeError('Invalid obj param in vitals.each.array call.');
  }

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.each.array call.');
  }

  obj = iteratee.length > 2 ? clone.arr(obj) : obj;
  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  len = obj.length;
  i = -1;
  while (++i < len) {
    iteratee(obj[i], prop, obj);
  }

  return obj;
};
each.arr = each.array;

/**
 * A shortcut for iterating over object maps. Note that this method lazily
 *   clones the object based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function)} obj
 * @param {function(*, string=, !(Object|function)=)} iteratee
 * @param {Object=} thisArg
 * @return {(Object|function|Array)} 
 */
each.object = function eachObject(obj, iteratee, thisArg) {

  /** @type {string} */
  var prop;
  /** @type {number} */
  var len;

  if ( !is._obj(obj) ) {
    throw new TypeError('Invalid obj param in vitals.each.object call.');
  }

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.each.object call.');
  }

  obj = iteratee.length > 2 ? clone(obj) : obj;
  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  for (prop in obj) {
    has(obj, prop) && iteratee(obj[prop], prop, obj);
  }

  return obj;
};
each.obj = each.object;


module.exports = each;
