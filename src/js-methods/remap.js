/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - REMAP
 * -----------------------------------------------------------------------------
 * @version 0.1.0
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/blob/master/src/parts/js-shortcuts/remap.js}
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
// REMAP
////////////////////////////////////////////////////////////////////////////////

/**
 * A shortcut for making a new object/array by invoking an action over the 
 *   values of an existing object/array or a new string by replacing a pattern.
 *   Note that for new object/arrays this method lazily clones the object based
 *   on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function|Array|string)} source
 * @param {!(string|RegExp)=} pattern - Use with string source.
 * @param {!(string|function(...*): string)=} replacement - Use with string
 *   source. See [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}
 *   for details on replacement functions.
 * @param {function(*, (string|number)=, !(Object|function)=)=} iteratee
 * @param {Object=} thisArg
 * @return {!(Object|function|Array|string)}
 */
function remap(source, pattern, replacement, iteratee, thisArg) {

  if ( is.str(source) ) {
    return remap.str(source, pattern, replacement);
  }

  if ( is._arr(source) ) {
    return remap.arr.apply(null, arguments);
  }

  if ( is._obj(val) ) {
    return remap.obj.apply(null, arguments);
  }

  throw new TypeError('Invalid source param in vitals.remap call.');
}

/**
 * A shortcut for String.prototype.replace.
 * @public
 * @param {string} source
 * @param {!(string|RegExp)} pattern
 * @param {!(string|function(...*): string)} replacement - See
 *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}
 *   for details on replacement functions. Replacement strings cannot be empty.
 * @return {string}
 */
remap.string = function remap(source, pattern, replacement) {

  if ( !is.str(source) ) {
    throw new TypeError('Invalid source param in vitals.remap.string call.');
  }

  if ( !is._str(pattern) && !is.regex(pattern) ) {
    throw new TypeError('Invalid pattern param in vitals.remap.string call.');
  }

  if ( !is._str(replacement) && !is.func(replacement) ) {
    throw new TypeError(
      'Invalid replacement param in vitals.remap.string call.'
    );
  }

  return source && source.replace(pattern, replacement);
};
remap.str = remap.string;

/**
 * A shortcut for making a new array by invoking an action over the values of an
 *   existing array-like object. Note that this method lazily clones the object
 *   based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function)} source
 * @param {function(*, number=, !(Object|function)=)=} iteratee
 * @param {Object=} thisArg
 * @return {!Array}
 */
remap.array = function remapArray(source, iteratee, thisArg) {

  /** @type {!Array} */
  var arr;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !is._obj(source) || !has(source, 'length') ) {
    throw new TypeError('Invalid source param in vitals.remap.array call.');
  }

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.remap.array call.');
  }

  source = iteratee.length > 2 ? clone.arr(source) : source;
  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  len = source.length;
  arr = len ? new Array(len) : [];
  i = -1;
  while (++i < len) {
    arr[i] = iteratee(source[i], i, source);
  }

  return arr;
};
remap.arr = remap.array;

/**
 * A shortcut for making a new object with the same props by invoking an action
 *   over the values of an existing object. Note that this method lazily clones 
 *   the object based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
 *   (i.e. if you alter the source object within the iteratee ensure to define
 *   the iteratee's third param to avoid accidental results).
 * @public
 * @param {!(Object|function)} source
 * @param {function(*, string=, !(Object|function)=)} iteratee
 * @param {Object=} thisArg
 * @return {!Object} 
 */
remap.object = function remapObject(source, iteratee, thisArg) {

  /** @type {string} */
  var prop;
  /** @type {!Object} */
  var obj;

  if ( !is._obj(source) ) {
    throw new TypeError('Invalid source param in vitals.remap.object call.');
  }

  if ( !is.func(iteratee) ) {
    throw new TypeError('Invalid iteratee param in vitals.remap.object call.');
  }

  source = iteratee.length > 2 ? clone(source) : source;
  iteratee = arguments.length > 2 ? function iteratee() {
    iteratee.apply(thisArg, arguments);
  } : iteratee;

  obj = {};
  for (prop in source) {
    if ( has(source, prop) ) {
      obj[prop] = iteratee(source[prop], prop, source);
    }
  }

  return obj;
};
remap.obj = remap.object;


module.exports = remap;
