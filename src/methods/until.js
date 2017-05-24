/**
 * ---------------------------------------------------------------------------
 * VITALS.UNTIL
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.until](https://github.com/imaginate/vitals/wiki/vitals.until)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNilNone = require('./helpers/is-nil-none.js');
var $splitKeys = require('./helpers/split-keys.js');
var $isNil = require('./helpers/is-nil.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.UNTIL
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var until = (function untilPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - until
  // - until.object (until.obj)
  // - until.array  (until.arr)
  // - until.cycle  (until.time)
  //////////////////////////////////////////////////////////

  /* {{{2 Until References
   */

  /// {{{2
  /// @method until
  /**
   * A shortcut for iterating over object maps, arrays, or cycles until an end
   *   value is returned.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {!(Object|function|Array|number|string)=} source - If the source is
   *   defined the iteration will also stop as follows (per source type):
   *   - object source: Ends after all properties are visited.
   *   - array source:  Ends after all indexes are visited.
   *   - number source: Ends after the count of cycles equals the source.
   *   - string source: Converted to an array source using one of the following
   *     values as the separator (values listed in order of rank):
   *     -- `", "`
   *     -- `","`
   *     -- `"|"`
   *     -- `" "`
   * @param {function(*=, (string|number)=, (!Object|function)=)} iteratee - It
   *   has the optional params - value, key/index, source. Note this method
   *   lazily clones the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg - If defined the iteratee is bound to this value.
   * @return {boolean} - This method will return true if the iteratee returns
   *   the end value or false if the iteratee does not.
   */
  function until(end, source, iteratee, thisArg) {

    if (arguments['length'] < 2) throw $err(new Error, 'No end or iteratee defined');

    if (arguments['length'] === 2) {
      iteratee = source;
      if ( !$is.fun(iteratee) ) throw $typeErr(new TypeError, 'iteratee');
      return _untilEnd(end, iteratee);
    }

    if ( arguments['length'] === 3 && $is.fun(source) && $isNil.obj(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      return _untilEnd(end, iteratee, thisArg);
    }

    if ( !$is.fun(iteratee)       ) throw $typeErr(new TypeError, 'iteratee');
    if ( !$isNilNone.obj(thisArg) ) throw $typeErr(new TypeError, 'thisArg');

    if ( $is.num(source) ) return _untilCycle(end, source, iteratee, thisArg);

    if ( $is.str(source) ) source = $splitKeys(source);

    if ( !$is._obj(source) ) throw $typeErr(new TypeError, 'source');

    return $is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }

  /// {{{2
  /// @method until.object
  /// @alias until.obj
  /**
   * A shortcut for iterating over object maps until an end value is returned or
   *   all properties are visited.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {(!Object|function)} obj
   * @param {function(*=, string=, (!Object|function)=)} iteratee - The iteratee
   *   must be a function with the optional params - value, key, source. Note
   *   this method lazily clones the source based on the iteratee's
   *   [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the properties are visited this
   *   method will return false.
   */
  function untilObject(end, obj, iteratee, thisArg) {

    if ( !$is._obj(obj)           ) throw $typeErr(new TypeError, 'obj',      'object');
    if ( !$is.fun(iteratee)       ) throw $typeErr(new TypeError, 'iteratee', 'object');
    if ( !$isNilNone.obj(thisArg) ) throw $typeErr(new TypeError, 'thisArg',  'object');

    return _untilObj(end, obj, iteratee, thisArg);
  }
  until['object'] = untilObject;
  until['obj'] = untilObject;

  /// {{{2
  /// @method until.array
  /// @alias until.arr
  /**
   * A shortcut for iterating over array-like objects until an end value is
   *   returned or all indexed values are visited.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {(!Object|function|string)} source - If source is a string it is
   *   converted to an array source using one of the following values as the
   *   separator (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)} iteratee - The iteratee must be a
   *   function with the optional params - value, index, source. Note this
   *   method lazily slices (see [vitals.copy.array](https://github.com/imaginate/vitals/wiki/vitals.copy#copyarray))
   *   the source based on the iteratee's [length property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   *   (i.e. if you alter the source object within the iteratee ensure to define
   *   the iteratee's third param so you can safely assume all references to the
   *   source are its original values).
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if all the indexed values are visited
   *   this method will return false.
   */
  function untilArray(end, source, iteratee, thisArg) {

    if ( $is.str(source) ) source = $splitKeys(source);

    if ( !$is._obj(source)           ) throw $typeErr(new TypeError, 'source',        'array');
    if ( !$is.num(source['length'])  ) throw $typeErr(new TypeError, 'source.length', 'array');
    if ( !$is.fun(iteratee)          ) throw $typeErr(new TypeError, 'iteratee',      'array');
    if ( !$isNilNone.obj(thisArg)    ) throw $typeErr(new TypeError, 'thisArg',       'array');

    return _untilArr(end, source, iteratee, thisArg);
  }
  until['array'] = untilArray;
  until['arr'] = untilArray;

  /// {{{2
  /// @method until.cycle
  /// @alias until.time
  /**
   * A shortcut for invoking an action until an end value is returned or the
   *   number of cycles is reached.
   *
   * @public
   * @param {*} end - A value that ends the iteration if returned by the
   *   iteratee.
   * @param {number} count - The number of cycles.
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean} - If the iteration is terminated by the end value this
   *   method will return true. Otherwise if the number of cycles is reached
   *   this method will return false.
   */
  function untilCycle(end, count, action, thisArg) {

    if ( !$is.num(count)          ) throw $typeErr(new TypeError, 'count',   'cycle');
    if ( !$is.fun(action)         ) throw $typeErr(new TypeError, 'action',  'cycle');
    if ( !$isNilNone.obj(thisArg) ) throw $typeErr(new TypeError, 'thisArg', 'cycle');

    return _untilCycle(end, count, action, thisArg);
  }
  until['cycle'] = untilCycle;
  until['time'] = untilCycle;

  ///////////////////////////////////////////////////// {{{2
  // UNTIL HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _untilEnd
  /**
   * @private
   * @param {*} end
   * @param {function} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, action, thisArg) {

    /** @type {number} */
    var i;

    action = $is.none(thisArg) ? action : _bind(action, thisArg);
    if (action['length']) {
      i = 0;
      while(action(i++) !== end) {}
    }
    else {
      while(action() !== end) {}
    }
    return true;
  }

  /// {{{3
  /// @func _untilObj
  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, string=, !(Object|function)=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    obj = iteratee['length'] > 2 ? copy(obj) : obj;
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee['length']) {
      case 0:
      for (key in obj) {
        if ( $own(obj, key) ) {
          if (iteratee() === end) return true;
        }
      }
      break;
      case 1:
      for (key in obj) {
        if ( $own(obj, key) ) {
          if (iteratee(obj[key]) === end) return true;
        }
      }
      break;
      case 2:
      for (key in obj) {
        if ( $own(obj, key) ) {
          if (iteratee(obj[key], key) === end) return true;
        }
      }
      break;
      default:
      for (key in obj) {
        if ( $own(obj, key) ) {
          if (iteratee(obj[key], key, obj) === end) return true;
        }
      }
    }
    return false;
  }

  /// {{{3
  /// @func _untilArr
  /**
   * @private
   * @param {*} end
   * @param {!(Object|function)} obj
   * @param {function(*, number=, !Array=)} iteratee
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    obj = iteratee['length'] > 2 ? copy['array'](obj) : obj;
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    len = obj['length'];
    i = -1;
    switch (iteratee['length']) {
      case 0:
      while (++i < len) {
        if (iteratee() === end) return true;
      }
      break;
      case 1:
      while (++i < len) {
        if (iteratee(obj[i]) === end) return true;
      }
      break;
      case 2:
      while (++i < len) {
        if (iteratee(obj[i], i) === end) return true;
      }
      break;
      default:
      while (++i < len) {
        if (iteratee(obj[i], i, obj) === end) return true;
      }
    }
    return false;
  }

  /// {{{3
  /// @func _untilCycle
  /**
   * @private
   * @param {*} end
   * @param {number} count
   * @param {function(number=)} action
   * @param {Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, count, action, thisArg) {

    /** @type {number} */
    var i;

    action = $is.none(thisArg) ? action : _bind(action, thisArg);
    if (action['length']) {
      i = 0;
      while(count--) if (action(i++) === end) return true;
    }
    else {
      while(count--) if (action() === end) return true;
    }
    return false;
  }

  ///////////////////////////////////////////////////// {{{2
  // UNTIL HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func _bind
  /**
   * @private
   * @param {function} func
   * @param {Object} thisArg
   * @return {function} 
   */
  function _bind(func, thisArg) {
    switch (func['length']) {
      case 0:
      return function iteratee() { return func['call'](thisArg); };
      case 1:
      return function iteratee(val) { return func['call'](thisArg, val); };
      case 2:
      return function iteratee(val, key) { return func['call'](thisArg,val,key); };
    }
    return function iteratee(val, key, obj) {
      return func['call'](thisArg, val, key, obj);
    };
  }

  ///////////////////////////////////////////////////// {{{2
  // UNTIL HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('until');

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = ERROR_MAKER.error;

  /// {{{3
  /// @func $typeErr
  /**
   * @private
   * @param {!TypeError} err
   * @param {string} paramName
   * @param {*} paramVal
   * @param {string} validTypes
   * @param {string=} methodName
   * @return {!TypeError} 
   */
  var $typeErr = ERROR_MAKER.typeError;

  /// {{{3
  /// @func $rangeErr
  /**
   * @private
   * @param {!RangeError} err
   * @param {string} paramName
   * @param {(!Array<*>|string|undefined)=} validRange
   *   An `array` of actual valid options or a `string` stating the valid
   *   range. If `undefined` this option is skipped.
   * @param {string=} methodName
   * @return {!RangeError} 
   */
  var $rangeErr = ERROR_MAKER.rangeError;
  /// }}}2

  // END OF PRIVATE SCOPE FOR VITALS.UNTIL
  return until;
})();
/// }}}1

module.exports = until;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
