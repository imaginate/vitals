/**
 * -----------------------------------------------------------------------------
 * VITALS METHOD: roll
 * -----------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.roll](https://github.com/imaginate/vitals/wiki/vitals.roll)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var newErrorMaker = require('./helpers/new-error-maker.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');


////////////////////////////////////////////////////////////////////////////////
// VITALS METHOD: roll
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
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, *=, (string|number)=, !(Object|function)=)} iteratee -
   *   It has the optional params - previousValue, currentValue, key/index, and
   *   source. Note this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
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
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined');
      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source');

    return _is._arr(source)
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
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
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
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'up');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'up');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'up');
      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'up');

    return _is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  };

  /**
   * A shortcut for deriving a difference by iterating over object maps, arrays,
   *   or cycles.
   *
   * @public
   * @param {*=} base - If defined it is the base value. Note that for number
   *   sources (i.e. cycles) a base is required.
   * @param {!(Object|function|Array|number)} source - Details per type:
   *   - object source: Iterates over all properties in random order.
   *   - array source:  Iterates over all indexed properties from 0 to length.
   *   - number source: Iterates over all cycles.
   * @param {function(*=, (string|number)=, !(Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {*}
   */
  roll.down = function rollDown(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    if (arguments.length < 2) throw _error('No source or iteratee defined','down');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !_is.func(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !_is.func(iteratee)      ) throw _error.type('iteratee', 'down');
    if ( !_is.nil.un.obj(thisArg) ) throw _error.type('thisArg',  'down');

    if ( _is.num(source) ) {
      if (!hasBase) throw _error('No base defined', 'down');
      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !_is._obj(source) ) throw _error.type('source', 'down');

    return _is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  };

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL OBJ
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObj(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result = iteratee(result);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result = iteratee(result, obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 3:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result = iteratee(result, obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, *, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObj(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 3 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( own(obj, key) ) result = iteratee(result);
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) result = iteratee(result, obj[key]);
      }
      break;
      case 3:
      for (key in obj) {
        if ( own(obj, key) ) result = iteratee(result, obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) result = iteratee(result, obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result += iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result += iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result += iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result += iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjUp(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( own(obj, key) ) result += iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( own(obj, key) ) result += iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) result += iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) result += iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollObjDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {string} */
    var key;
    /** @type {boolean} */
    var z;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result -= iteratee();
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result -= iteratee(obj[key]);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) {
          if (z) result -= iteratee(obj[key], key, obj);
          else {
            result = obj[key];
            z = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjDown(result, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee.length > 2 ? copy(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: 
      for (key in obj) {
        if ( own(obj, key) ) result -= iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( own(obj, key) ) result -= iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( own(obj, key) ) result -= iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( own(obj, key) ) result -= iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL ARR
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArr(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArr(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 3 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
      case 1:  while (++i < len) result = iteratee(result);               break;
      case 2:  while (++i < len) result = iteratee(result, obj[i]);       break;
      case 3:  while (++i < len) result = iteratee(result, obj[i], i);    break;
      default: while (++i < len) result = iteratee(result, obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrUp(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrUp(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result += iteratee();              break;
      case 1:  while (++i < len) result += iteratee(obj[i]);        break;
      case 2:  while (++i < len) result += iteratee(obj[i], i);     break;
      default: while (++i < len) result += iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {!(Object|function)} obj
   * @param {function(*, *, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollArrDown(obj, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    result = obj[0];
    len = obj.length;
    i = 0;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrDown(result, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee.length > 2 ? copy.arr(obj) : obj;
    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:  while (++i < len) result -= iteratee();              break;
      case 1:  while (++i < len) result -= iteratee(obj[i]);        break;
      case 2:  while (++i < len) result -= iteratee(obj[i], i);     break;
      default: while (++i < len) result -= iteratee(obj[i], i, obj);
    }
    return result;
  }

  //////////////////////////////////////////////////////////
  // PRIVATE METHODS - ROLL CYCLE
  //////////////////////////////////////////////////////////

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycle(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length > 1) {
      i = 0;
      while(count--) result = iteratee(result, i++);
    }
    else {
      while(count--) result = iteratee(result);
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleUp(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result += iteratee(i++);
    }
    else {
      while(count--) result += iteratee();
    }
    return result;
  }

  /**
   * @private
   * @param {*} result
   * @param {number} count
   * @param {function} iteratee
   * @param {Object=} thisArg
   * @return {*}
   */
  function _rollCycleDown(result, count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    iteratee = _is.undefined(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result -= iteratee(i++);
    }
    else {
      while(count--) result -= iteratee();
    }
    return result;
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
      case 0: return function iteratee() { return func.call(thisArg); };
      case 1: return function iteratee(val) { return func.call(thisArg, val); };
      case 2: return function iteratee(val1, val2) {
        return func.call(thisArg, val1, val2);
      };
      case 3: return function iteratee(val1, val2, val3) {
        return func.call(thisArg, val1, val2, val3);
      };
    }
    return function iteratee(prev, curr, key, obj) {
      return func.call(thisArg, prev, curr, key, obj);
    };
  }

  /**
   * @private
   * @type {!ErrorAid}
   */
  var _error = newErrorMaker('roll');

  //////////////////////////////////////////////////////////
  // END OF PRIVATE SCOPE FOR ROLL
  return roll;
})();


module.exports = roll;
