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

var each = (function eachPrivateScope() {

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
   * @return {(Object|function|Array|undefined)} 
   */
  function each(val, iteratee, thisArg) {

    if ( !is.func(iteratee) ) throw _error('iteratee');
    if ( !is('obj=', thisArg) ) throw _error('thisArg');

    if ( is._obj(val) ) return is._arr(val)
      ? _eachArr(val, iteratee, thisArg)
      : _eachObj(val, iteratee, thisArg);

    if ( !is.num(val) ) throw _error('val');

    _eachCycle(val, iteratee, thisArg);
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

    if ( !is._obj(obj) || !has(obj, 'length') ) throw _error('obj', 'array');
    if ( !is.func(iteratee)   ) throw _error('iteratee', 'array');
    if ( !is('obj=', thisArg) ) throw _error('thisArg',  'array');

    return _eachArr(obj, iteratee, thisArg);
  };
  // define shorthand
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

    if ( !is._obj(obj)        ) throw _error('obj',      'object');
    if ( !is.func(iteratee)   ) throw _error('iteratee', 'object');
    if ( !is('obj=', thisArg) ) throw _error('thisArg',  'object');

    return _eachObj(obj, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /**
   * A shortcut for invoking an action a set number of times.
   * @public
   * @param {number} count
   * @param {function} action
   * @param {Object=} thisArg
   */
  each.cycle = function eachCycle(count, action, thisArg) {

    if ( !is.num(count)       ) throw _error('count',   'cycle');
    if ( !is.func(action)     ) throw _error('action',  'cycle');
    if ( !is('obj=', thisArg) ) throw _error('thisArg', 'cycle');

    _eachCycle(count, action, thisArg);
  };

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, (string|number)=, !(Object|function|Array)=)} iteratee
   * @param {Object=} thisArg
   * @return {!(Object|function|Array)} 
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? clone.arr(obj) : obj;
    iteratee = thisArg || is.null(thisArg)
      ? _bind(iteratee, thisArg)
      : iteratee;

    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 1:  while (++i < len) iteratee(obj[i]); break;
      case 2:  while (++i < len) iteratee(obj[i], i); break;
      default: while (++i < len) iteratee(obj[i], i, obj);
    }

    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {(Object|function|Array)} 
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? clone(obj) : obj;
    iteratee = thisArg || is.null(thisArg)
      ? _bind(iteratee, thisArg)
      : iteratee;

    switch (iteratee.length) {
      case 1:  for (key in obj) has(obj, key) && iteratee(obj[key]); break;
      case 2:  for (key in obj) has(obj, key) && iteratee(obj[key], key); break;
      default: for (key in obj) has(obj, key) && iteratee(obj[key], key, obj);
    }

    return obj;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   */
  function _eachCycle(count, action, thisArg) {
    action = thisArg || is.null(thisArg) ? _bind(action, thisArg) : action;
    while(count--) action();
  }

  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0: return function iteratee() {
        func.call(thisArg);
      };
      case 1: return function iteratee(val) {
        func.call(thisArg, val);
      };
      case 2: return function iteratee(val, key) {
        func.call(thisArg, val, key);
      };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /**
   * @private
   * @param {string} param
   * @param {string=} method
   * @return {!TypeError} 
   */
  function _error(param, method) {
    param += ' param';
    method = method || '';
    method = 'vitals.each' + ( method && '.' ) + method;
    return new TypeError('Invalid ' + param + ' in ' + method + ' call.');
  }

  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();


module.exports = each;
