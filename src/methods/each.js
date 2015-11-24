/**
 * -----------------------------------------------------------------------------
 * VITALS - JS SHORTCUTS - EACH
 * -----------------------------------------------------------------------------
 * @version 2.0.0
 * @see [vitals.each]{@link https://github.com/imaginate/vitals/blob/master/src/methods/each.js}
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
var clone = require('./clone.js');


////////////////////////////////////////////////////////////////////////////////
// EACH
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
   * A shortcut for iterating over object maps and arrays or for invoking an
   *   action a set number of times. If iterating over an object note that this
   *   method lazily clones the object based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param to avoid accidental results).
   * @public
   * @param {!(Object|function|Array|number)} val
   * @param {function(*=, (string|number)=, !(Object|function|Array)=)} iteratee
   * @param {Object=} thisArg
   * @return {(Object|function|Array|undefined)}
   */
  function each(val, iteratee, thisArg) {

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(val) ) {
      _eachCycle(val, iteratee, thisArg);
      return;
    }

    if ( !is._obj(val) ) throw _error.type('val');

    return is._arr(val)
      ? _eachArr(val, iteratee, thisArg)
      : _eachObj(val, iteratee, thisArg);
  }

  /**
   * A shortcut for iterating over object maps.
   * @public
   * @param {!(Object|function)} obj
   * @param {function(*=, string=, !(Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {!(Object|function)}
   */
  each.object = function eachObject(obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',      'object');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'object');

    return _eachObj(obj, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for iterating over array-like objects.
   * @public
   * @param {!(Object|function)} obj
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {!(Object|function|Array)}
   */
  each.array = function eachArray(obj, iteratee, thisArg) {

    if ( !is._obj(obj)        ) throw _error.type('obj',        'array');
    if ( !is.num(obj.length)  ) throw _error.type('obj.length', 'array');
    if ( !is.func(iteratee)   ) throw _error.type('iteratee',   'array');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',    'array');

    return _eachArr(obj, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /**
   * A shortcut for invoking an action a set number of times.
   * @public
   * @param {number} count
   * @param {function(number=)} action
   * @param {Object=} thisArg
   */
  each.cycle = function eachCycle(count, action, thisArg) {

    if ( !is.num(count)       ) throw _error.type('count',   'cycle');
    if ( !is.func(action)     ) throw _error.type('action',  'cycle');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg', 'cycle');

    _eachCycle(count, action, thisArg);
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

    obj = iteratee.length > 2 ? clone(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: for (key in obj) _own(obj, key) && iteratee();              break;
      case 1: for (key in obj) _own(obj, key) && iteratee(obj[key]);      break;
      case 2: for (key in obj) _own(obj, key) && iteratee(obj[key], key); break;
     default: for (key in obj) _own(obj, key) && iteratee(obj[key], key, obj);
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

    obj = iteratee.length > 2 ? clone.arr(obj) : obj;
    iteratee = is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) iteratee();             break;
      case 1:  while (++i < len) iteratee(obj[i]);       break;
      case 2:  while (++i < len) iteratee(obj[i], i);    break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }
    return obj;
  }

  /**
   * @private
   * @param {number} count
   * @param {function} action
   * @param {Object=} thisArg
   */
  function _eachCycle(count, action, thisArg) {

    /** @type {number} */
    var i;

    action = is.undefined(thisArg) ? action : _bind(action, thisArg);
    if (action.length) {
      i = 0;
      while(count--) action(i++);
    }
    else {
      while(count--) action();
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
  var _error = newErrorAid('each');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


module.exports = each;
