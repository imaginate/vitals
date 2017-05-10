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

var newErrorMaker = require('./helpers/new-error-maker.js');
var splitKeys = require('./helpers/split-keys.js');
var own = require('./helpers/own.js');
var copy = require('./copy.js');
var _is = require('./helpers/is.js');

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

  /* {{{2
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
   * @param {(!Object|function|!Array|number|string)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|function`*!$
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
   * @param {function(*=, (string|number)=, (!Object|function)=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **key** or **index** *`string|number`*
   *   - **source** *`!Object|function|!Array`*
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
   * @return {(?Object|function|?Array|undefined)}
   */
  function each(source, iteratee, thisArg) {

    if ( !_is.func(iteratee) )
      throw _error.type('iteratee');
    if ( !_is.nil.un.obj(thisArg) )
      throw _error.type('thisArg');

    if ( _is.num(source) )
      return _eachCycle(source, iteratee, thisArg);

    if ( _is.str(source) )
      source = splitKeys(source);

    if ( !_is._obj(source) )
      throw _error.type('source');

    return _is._arr(source)
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
   * @param {(!Object|function)} source
   * @param {function(*=, string=, (!Object|function)=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|function`*
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
   * @return {(!Object|function)}
   */
  each.object = function eachObject(source, iteratee, thisArg) {

    if ( !_is._obj(source) )
      throw _error.type('source', 'object');
    if ( !_is.func(iteratee) )
      throw _error.type('iteratee', 'object');
    if ( !_is.nil.un.obj(thisArg) )
      throw _error.type('thisArg', 'object');

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
   * @param {(!Object|function|!Array|string)} source
   *   If #source is a `string`, it is converted to an `array` using one of
   *   the following list of values for the separator (values listed in order
   *   of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {function(*=, number=, !Array=)} iteratee
   *   It has the optional params:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note this method lazily [slices][slice] the #source based on the
   *   iteratee's [length property][func-length] (i.e. if you alter the
   *   #source `array` within the #iteratee make sure you define the
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
   * @return {(!Object|function|!Array)}
   */
  each.array = function eachArray(source, iteratee, thisArg) {

    if ( _is.str(source) )
      source = splitKeys(source);

    if ( !_is._obj(source) )
      throw _error.type('source', 'array');
    if ( !_is.num(source.length) )
      throw _error.type('source.length', 'array');
    if ( !_is.func(iteratee) )
      throw _error.type('iteratee', 'array');
    if ( !_is.nil.un.obj(thisArg) )
      throw _error.type('thisArg', 'array');

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
