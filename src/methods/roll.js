/**
 * -----------------------------------------------------------------------------
 * VITALS - BASE METHOD - ROLL
 * -----------------------------------------------------------------------------
 * @version 2.2.2
 * @see [vitals.roll]{@link https://github.com/imaginate/vitals/blob/master/src/methods/roll.js}
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
// ROLL
////////////////////////////////////////////////////////////////////////////////

var roll = (function rollPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - roll
  // - roll.up
  // - roll.down
  //////////////////////////////////////////////////////////

  /**
   * A shortcut for deriving a result by iterating over object maps, arrays, or
   *   cycles.
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, *=, (string|number)=, !(Object|function)=)} iteratee -
   *   It has the optional params - previousValue, currentValue, key/index,
   *   source. Note this method lazily clones the source based on the iteratee's
   *   [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's fourth param so you can safely assume all references to
   *   the source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !is.func(iteratee)   ) throw _error.type('iteratee');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg');

    if ( is.num(source) ) {
      if (!hasBase) throw _error('No base defined');
      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !is._obj(source) ) throw _error.type('source');

    return is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }

  /**
   * A shortcut for deriving a sum by iterating over object maps, arrays, or
   *   cycles.
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length}
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.up = function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','up');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !is.func(iteratee)   ) throw _error.type('iteratee', 'up');
    if ( !is('obj=', thisArg) ) throw _error.type('thisArg',  'up');

    if ( is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'up');
      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !is._obj(source) ) throw _error.type('source', 'up');

    return is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - MAIN
  //////////////////////////////////////////////////////////

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
  var _error = newErrorAid('roll');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ROLL
  return roll;
})();


module.exports = roll;
