/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: remap
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.2
 * @see [vitals.remap]{@link https://github.com/imaginate/vitals/wiki/vitals.remap}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var escape = require('./helpers/escape.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: remap
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
   *
   * @public
   * @param {!(Object|function|Array|string)} source
   * @param {*} iteratee - Details per source type:
   *   - object: The iteratee must be a function with the optional params -
   *     value, key, source. Note this method lazily clones the source based on
   *     the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   - array: The iteratee must be a function with the optional params -
   *     value, index, source. Note this method lazily slices the source based
   *     on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *     (i.e. if you alter the source object within the iteratee ensure to
   *     define the iteratee's third param so you can safely assume all
   *     references to the source are its original values).
   *   - string: The iteratee must be a pattern to search for within the
   *     source. If the pattern is not a string or RegExp it will be converted
   *     to a string.
   * @param {*=} replacement - Only use (and required) with string sources. If
   *   not a string or function the replacement is converted to a string. For
   *   details about using replacement functions see the
   *   [String.prototype.replace function param](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee or
   *   replacement function is bound to its value.
   * @return {!(Object|function|Array|string)}
   */
  function remap(source, iteratee, replacement, thisArg) {

    if ( _is.str(source) ) {
      if (arguments.length < 2) throw _error('No iteratee defined');
      if (arguments.length < 3) throw _error('No replacement defined');
      if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');
      return _remapStr(source, iteratee, replacement, thisArg);
    }

    thisArg = replacement;

    if ( !_is._obj(source)        ) throw _error.type('source');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    return _is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for making a new object with the same keys and new values by
   *   invoking an action over the values of an existing object.
   *
   * @public
   * @param {!(Object|function)} source
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Object} 
   */
  remap.object = function remapObject(source, iteratee, thisArg) {

    if ( !_is._obj(source)        ) throw _error.type('source',   'object');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'object');

    return _remapObj(source, iteratee, thisArg);
  };
  // define shorthand
  remap.obj = remap.object;

  /**
   * A shortcut for making a new array by invoking an action over the values of
   *   an existing array-like object.
   *
   * @public
   * @param {(!Object|function|string)} source - If source is a string it is
   *   converted to an array using one of the following values as the separator
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)=} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If thisArg is supplied the iteratee is bound to
   *   its value.
   * @return {!Array}
   */
  remap.array = function remapArray(source, iteratee, thisArg) {

    if ( _is.str(source) ) source = splitKeys(source);

    if ( !_is._obj(source)        ) throw _error.type('source',        'array');
    if ( !_is.num(source.length)  ) throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee',      'array');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',       'array');

    return _remapArr(source, iteratee, thisArg);
  };
  // define shorthand
  remap.arr = remap.array;

  /**
   * A shortcut for [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
   *   that defaults to global replacements instead of only the first.
   *
   * @public
   * @param {string} source
   * @param {*} pattern - If not a RegExp the pattern is converted to a string.
   * @param {*} replacement - If not a string or function the replacement is
   *   converted to a string. For details about using replacement functions see
   *   [String.prototype.replace function param](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter).
   * @param {Object=} thisArg - If thisArg is supplied the replacement function
   *   is bound to its value.
   * @return {string}
   */
  remap.string = function remapString(source, pattern, replacement, thisArg) {

    if (arguments.length < 2) throw _error('No pattern defined',     'string');
    if (arguments.length < 3) throw _error('No replacement defined', 'string');
    if ( !_is.str(source)         ) throw _error.type('source',  'string');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg', 'string');

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
    iteratee = _is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in source) {
        if ( own(source, key) ) obj[key] = iteratee();
      }
      break;
      case 1:
      for (key in source) {
        if ( own(source, key) ) obj[key] = iteratee(source[key]);
      }
      break;
      case 2:
      for (key in source) {
        if ( own(source, key) ) obj[key] = iteratee(source[key], key);
      }
      break;
      default:
      for (key in source) {
        if ( own(source, key) ) obj[key] = iteratee(source[key], key, source);
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
    iteratee = _is.undefined(thisArg) ? iteratee : _bindI(iteratee, thisArg);
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

    if ( !_is.regex(pattern) ) {
      pattern = String(pattern);
      pattern = escape(pattern);
      pattern = new RegExp(pattern, 'g');
    }

    replacement = _is.func(replacement)
      ? _is.undefined(thisArg)
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
  var _error = newErrorMaker('remap');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR REMAP
  return remap;
})();


module.exports = remap;
