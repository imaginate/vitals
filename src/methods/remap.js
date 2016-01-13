/**
 * -----------------------------------------------------------------------------
 * VITALS - JS METHOD - REMAP
 * -----------------------------------------------------------------------------
 * @version 2.3.2
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/blob/master/src/methods/remap.js}
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

var newErrorAid = require('./_helpers/errorAid.js');
var _own = require('./_helpers/own.js');
var is = require('node-are').is;
var copy = require('./copy.js');


////////////////////////////////////////////////////////////////////////////////
// REMAP
////////////////////////////////////////////////////////////////////////////////

var remap = (function remapPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - remap
  // - remap.object (remap.obj)
  // - remap.array  (remap.arr)
  // - remap.string (remap.str)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for making a new object/array/string by invoking an action over
   *   the values of an existing object/array/string.
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {*} iteratee - Details per source type:
   *   object source: The iteratee must be a function with the optional params
   *     value, key, source. Note this method lazily clones the source based on
   *     the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   array source: The iteratee must be a function with the optional params
   *     value, index, source. Note this method lazily slices the source based
   *     on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   string source: The iteratee must be a pattern to search for within the
   *     source. If the pattern is not a string or RegExp it will be converted
   *     to a string.
   * @param {*=} replacement - Only use (and required) with string sources. If
   *   not a string or function the replacement is converted to a string. For
   *   details about using replacement functions see the
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the iteratee or
   *   replacement function is bound to its value.
   * @return {!(Object|function|Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    if ( is.str(source) ) {
      if (arguments.length < 2) throw _error('No iteratee defined');
      if (arguments.length < 3) throw _error('No replacement defined');
      if ( !is('obj=', thisArg) ) throw _error.type('thisArg');
      return _remapStr(source, iteratee, replacement, thisArg);
    }

    thisArg = replacement;

    if ( !is._obj(source)     ) throw _error.type('source');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    return is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for making a new object with the same keys and new values by
   *   invoking an action over the values of an existing object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Object} 
   */
  remap.object = function remapObject(source, iteratee, thisArg) {

    if ( !is._obj(source)     ) throw _error.type('source',   'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _remapObj(source, iteratee, thisArg);
  };
  // define shorthand
  remap.obj = remap.object;

  /**
   * A shortcut for making a new array by invoking an action over the values of
   *   an existing array-like object.
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, number=, !Array=)=} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Array}
   */
  remap.array = function remapArray(source, iteratee, thisArg) {

    if ( !is._obj(source)       ) throw _error.type('source',        'array');
    if ( !is.num(source.length) ) throw _error.type('source.length', 'array');
    if ( !is.func(iteratee)     ) throw _error.type('iteratee',      'array');
    if ( !is('obj=', thisArg)   ) throw _error.type('thisArg',       'array');

    return _remapArr(source, iteratee, thisArg);
  };
  // define shorthand
  remap.arr = remap.array;

  /**
   * A shortcut for [String.prototype.replace]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}.
   * @public
   * @param {string} source
   * @param {*} pattern - If not a RegExp the pattern is converted to a string.
   * @param {*} replacement - If not a string or function the replacement is
   *   converted to a string. For details about using replacement functions see
   *   [String.prototype.replace function param]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter}.
   * @param {Object=} thisArg - If thisArg is supplied the replacement function
   *   is bound to its value.
   * @return {string}
   */
  remap.string = function remapString(source, pattern, replacement, thisArg) {

    if (arguments.length < 2) throw _error('No pattern defined',     'string');
    if (arguments.length < 3) throw _error('No replacement defined', 'string');
    if ( !is.str(source)      ) throw _error.type('source',  'string');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'string');

    return _remapStr(source, pattern, replacement, thisArg);
  };
  // define shorthand
  remap.str = remap.string;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, string=, !(Object|function)=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};
    source = iteratee.length > 2 ? copy(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee();
      }
      break;
      case 1:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key]);
      }
      break;
      case 2:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key);
      }
      break;
      default:
      for (key in source) {
        if ( _own(source, key) ) obj[key] = iteratee(source[key], key, source);
      }
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} source
   * @param {function(*, number=, !Array=)=} iteratee
   * @param {Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    source = iteratee.length > 2 ? copy.arr(source) : source;
    iteratee = is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    len = source.length;
    arr = new Array(len);
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) arr[i] = iteratee();              break;
      case 1:  while (++i < len) arr[i] = iteratee(source[i]);     break;
      case 2:  while (++i < len) arr[i] = iteratee(source[i], i);  break;
      default: while (++i < len) arr[i] = iteratee(source[i], i, source);
    }
    return arr;
  }

  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source) return source;

    pattern = is.regex(pattern) ? pattern : String(pattern);
    replacement = is.func(replacement)
      ? is.undefined(thisArg)
        ? replacement
        : _bindR(replacement, thisArg)
      : String(replacement);

    return source.replace(pattern, replacement);
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - GENERAL
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindI(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { return func.call(thisArg); };
      case 1:
      return function iteratee(val) { return func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func.call(thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bindR(func, thisArg) {
    switch (func.length) {
      case 0: return function replacement() {
        return func.call(thisArg);
      };
      case 1: return function replacement(match) {
        return func.call(thisArg, match);
      };
      case 2: return function replacement(match, p1) {
        return func.call(thisArg, match, p1);
      };
      case 3: return function replacement(match, p1, p2) {
        return func.call(thisArg, match, p1, p2);
      };
      case 4: return function replacement(match, p1, p2, p3) {
        return func.call(thisArg, match, p1, p2, p3);
      };
      case 5: return function replacement(match, p1, p2, p3, p4) {
        return func.call(thisArg, match, p1, p2, p3, p4);
      };
    }
    return function replacement() {
      return func.apply(thisArg, arguments);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorAid('remap');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR REMAP
  return remap;
})();


module.exports = remap;
