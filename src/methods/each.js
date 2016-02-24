/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: each
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.0.1
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/wiki/vitals.each}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: each
////////////////////////////////////////////////////////////////////////////////

var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for iterating over object maps, arrays, or cycles.
   *
   * @public
   * @param {!(Object|function|Array|number|string)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   *   - string source: Converted to an array source using one of the following
   *     list of values for the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {(Object|function|Array|undefined)}
   */
  function each(source, iteratee, thisArg) {

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    if ( _is.num(source) ) return _eachCycle(source, iteratee, thisArg);

    if ( _is.str(source) ) source = splitKeys(source);

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps.
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
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function)}
   */
  each.object = function eachObject(source, iteratee, thisArg) {

    if ( !_is._obj(source)        ) throw _error.type('source',   'object');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'object');

    return _eachObj(source, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for iterating over array-like objects.
   *
   * @public
   * @param {!(Object|function|string)} source - If source is a string it is
   *   converted to an array using one of the following list of values for the
   *   separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {!(Object|function|Array)}
   */
  each.array = function eachArray(source, iteratee, thisArg) {

    if ( _is.str(source) ) source = splitKeys(source);

    if ( !_is._obj(source)        ) throw _error.type('source',        'array');
    if ( !_is.num(source.length)  ) throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee',      'array');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',       'array');

    return _eachArr(source, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /**
   * A shortcut for iterating over a set number of cycles.
   *
   * @public
   * @param {number} count
   * @param {function(number=)} iteratee
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   */
  each.cycle = function eachCycle(count, iteratee, thisArg) {

    if ( !_is.num(count)          ) throw _error.type('count',    'cycle');
    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'cycle');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'cycle');

    return _eachCycle(count, iteratee, thisArg);
  };
  // define shorthand
  each.time = each.cycle;

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: for (key in obj) own(obj, key) && iteratee();              break;
      case 1: for (key in obj) own(obj, key) && iteratee(obj[key]);      break;
      case 2: for (key in obj) own(obj, key) && iteratee(obj[key], key); break;
     default: for (key in obj) own(obj, key) && iteratee(obj[key], key, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) iteratee();              break;
      case 1:  while (++i < len) iteratee(obj[i]);        break;
      case 2:  while (++i < len) iteratee(obj[i], i);     break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   */
  function _eachCycle(count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) iteratee(i++);
    }
    else {
      while(count--) iteratee();
    }
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
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
      return function iteratee() { func.call(thisArg); };
      case 1:
      return function iteratee(val) { func.call(thisArg, val); };
      case 2:
      return function iteratee(val, key) { func.call(thisArg, val, key); };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('each');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


module.exports = each;
