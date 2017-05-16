/**
 * ---------------------------------------------------------------------------
 * VITALS EACH
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.each](https://github.com/imaginate/vitals/wiki/vitals.each)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNilNone = require('./helpers/is-nil-none.js');
var $splitKeys = require('./helpers/split-keys.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS EACH
//////////////////////////////////////////////////////////////////////////////

var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /* {{{2 Each References
   * @ref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
   * @ref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
   * @ref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
   * @ref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
   * @ref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
   * @ref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
   * @ref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
   * @ref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   */

  /// {{{2
  /// @method each
  /**
   * A shortcut for iterating over `object` and `array` properties or a
   * defined number of cycles.
   *
   * @public
   * @param {(!Object|!Function|!Array|number|string)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     Iterates over all properties in random order.
   *   - *`!Array`*!$
   *     Iterates over all indexed properties from `0` to `length`.
   *   - *`number`*!$
   *     Iterates over the `number` of cycles.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!function(*=, (string|number)=, (!Object|!Function)=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **key** or **index** *`string|number`*
   *   - **source** *`!Object|!Function|!Array`*
   *   Note this method lazily [clones][clone] the #source based on the
   *   iteratee's [length property][func-length] (i.e. if you alter the
   *   #source `object` within the #iteratee make sure you define the
   *   iteratee's third parameter so you can safely assume all references to
   *   the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is not used to bind the
   *   #iteratee. Instead the #iteratee is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   #iteratee with #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #iteratee (unless more than
   *   three parameters were defined for the #iteratee as the wrapper has a
   *   max value of `3`) and the [name property][func-name] value of
   *   `"iteratee"` (unless you are using a [minified][minify] version of
   *   `vitals`).
   * @return {(?Object|?Function|?Array|?undefined)}
   */
  function each(source, iteratee, thisArg) {

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg');

    if ( $is.num(source) )
      return _eachCycle(source, iteratee, thisArg);

    if ( $is.str(source) )
      source = $splitKeys(source);

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source');

    return $is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /// {{{2
  /// @method each.object
  /// @alias each.obj
  /**
   * A shortcut for iterating over `object` properties.
   *
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|!Function`*
   *   Note this method lazily [clones][clone] the #source based on the
   *   iteratee's [length property][func-length] (i.e. if you alter the
   *   #source `object` within the #iteratee make sure you define the
   *   iteratee's third parameter so you can safely assume all references to
   *   the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is not used to bind the
   *   #iteratee. Instead the #iteratee is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   #iteratee with #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #iteratee (unless more than
   *   three parameters were defined for the #iteratee as the wrapper has a
   *   max value of `3`) and the [name property][func-name] value of
   *   `"iteratee"` (unless you are using a [minified][minify] version of
   *   `vitals`).
   * @return {(!Object|!Function)}
   */
  each.object = function eachObject(source, iteratee, thisArg) {

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
        'object');
    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, string=, (!Object|!Function)=)', 'object');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=', 'object');

    return _eachObj(source, iteratee, thisArg);
  };
  // define shorthand
  each.obj = each.object;

  /// {{{2
  /// @method each.array
  /// @alias each.arr
  /**
   * A shortcut for iterating over the indexed properties of an `array` or
   * array-like `object`.
   *
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If #source is a `string`, it is converted to an `array` using one of
   *   the following list of values for the separator (values listed in order
   *   of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {!function(*=, number=, !Array=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note this method lazily [clones][clone] the #source with @copy#array
   *   based on the iteratee's [length property][func-length] (i.e. if you
   *   alter the #source `array` within the #iteratee make sure you define the
   *   iteratee's third parameter so you can safely assume all references to
   *   the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is not used to bind the
   *   #iteratee. Instead the #iteratee is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   #iteratee with #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #iteratee (unless more than
   *   three parameters were defined for the #iteratee as the wrapper has a
   *   max value of `3`) and the [name property][func-name] value of
   *   `"iteratee"` (unless you are using a [minified][minify] version of
   *   `vitals`).
   * @return {(!Array|!Arguments|!Object|!Function)}
   */
  each.array = function eachArray(source, iteratee, thisArg) {

    if ( $is.str(source) )
      source = $splitKeys(source);

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Array|!Arguments|!Object|!Function|string', 'array');
    if ( !$is.num(source.length) )
      throw $typeErr(new TypeError, 'source.length', source.length, 'number',
        'array');
    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, number=, !Array=)', 'array');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=', 'array');

    return _eachArr(source, iteratee, thisArg);
  };
  // define shorthand
  each.arr = each.array;

  /// {{{2
  /// @method each.cycle
  /// @alias each.time
  /**
   * A shortcut for iterating over a set `number` of cycles.
   *
   * @public
   * @param {number} count
   * @param {!function(number=)} iteratee
   *   It has the optional parameter:
   *   - **cycle** *`number`*
   *   Note that the cycle parameter is zero-based (i.e. the first cycle is
   *   `0`).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is not used to bind the
   *   #iteratee. Instead the #iteratee is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] to call the
   *   #iteratee with #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #iteratee (unless more than
   *   three parameters were defined for the #iteratee as the wrapper has a
   *   max value of `3`) and the [name property][func-name] value of
   *   `"iteratee"` (unless you are using a [minified][minify] version of
   *   `vitals`).
   * @return {undefined}
   */
  each.cycle = function eachCycle(count, iteratee, thisArg) {

    if ( !$is.num(count) )
      throw $typeErr(new TypeError, 'count', count, 'number', 'cycle');
    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(number=)', 'cycle');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=', 'cycle');

    return _eachCycle(count, iteratee, thisArg);
  };
  // define shorthand
  each.time = each.cycle;

  ///////////////////////////////////////////////////// {{{2
  // EACH HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _eachObj
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {!function(*, string=, (!Object|!Function)=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function _eachObj(obj, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee.length > 2)
      obj = copy(obj);
    if ( !$is.none(thisArg) )
      iteratee = _bind(iteratee, thisArg);

    switch (iteratee.length) {
      case 0:
        for (key in obj) {
          if ( $own(obj, key) )
            iteratee();
        }
        break;
      case 1:
        for (key in obj) {
          if ( $own(obj, key) )
            iteratee(obj[key]);
        }
        break;
      case 2:
        for (key in obj) {
          if ( $own(obj, key) )
            iteratee(obj[key], key);
        }
        break;
     default:
       for (key in obj) {
         if ( $own(obj, key) )
           iteratee(obj[key], key, obj);
       }
       break;
    }
    return obj;
  }

  /// {{{3
  /// @func _eachArr
  /**
   * @private
   * @param {(!Object|!Function|!Array)} obj
   * @param {!function(*, number=, !Array=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function|!Array)}
   */
  function _eachArr(obj, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee.length > 2)
      obj = copy.arr(obj);
    if ( !$is.none(thisArg) )
      iteratee = _bind(iteratee, thisArg);

    len = obj.length;
    i = -1;
    switch (iteratee.length) {
      case 0:
        while (++i < len)
          iteratee();
        break;
      case 1:
        while (++i < len)
          iteratee(obj[i]);
        break;
      case 2:
        while (++i < len)
          iteratee(obj[i], i);
        break;
      default:
        while (++i < len)
          iteratee(obj[i], i, obj);
        break;
    }
    return obj;
  }

  /// {{{3
  /// @func _eachCycle
  /**
   * @private
   * @param {number} count
   * @param {!function} iteratee
   * @param {?Object=} thisArg
   * @return {undefined}
   */
  function _eachCycle(count, iteratee, thisArg) {

    /** @type {number} */
    var i;

    if ( !$is.none(thisArg) )
      iteratee = _bind(iteratee, thisArg);

    if (iteratee.length) {
      i = 0;
      while(count--)
        iteratee(i++);
    }
    else {
      while(count--)
        iteratee();
    }
  }

  ///////////////////////////////////////////////////// {{{2
  // EACH HELPERS - MISC
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _bind
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bind(func, thisArg) {
    switch (func.length) {
      case 0:
        return function iteratee() {
          func.call(thisArg);
        };
      case 1:
        return function iteratee(val) {
          func.call(thisArg, val);
        };
      case 2:
        return function iteratee(val, key) {
          func.call(thisArg, val, key);
        };
    }
    return function iteratee(val, key, obj) {
      func.call(thisArg, val, key, obj);
    };
  }

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func $err
  /**
   * @private
   * @param {!Error} err
   * @param {string} msg
   * @param {string=} method
   * @return {!Error} 
   */
  var $err = $newErrorMaker('each');

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
  var $typeErr = $err.type;

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
  var $rangeErr = $err.range;

  /// }}}2
  // END OF PRIVATE SCOPE FOR EACH
  return each;
})();
/// }}}1

module.exports = each;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
