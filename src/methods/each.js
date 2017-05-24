/**
 * ---------------------------------------------------------------------------
 * VITALS.EACH
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
// VITALS.EACH
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var each = (function eachPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - each
  // - each.object (each.obj)
  // - each.array  (each.arr)
  // - each.cycle  (each.time)
  //////////////////////////////////////////////////////////

  /* {{{2 Each References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
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
   * A shortcut for iterating over [owned][own] `object` properties, indexed
   * `array` properties, or a defined `number` of cycles.
   *
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     Iterates over all [owned][own] properties in random order.
   *   - *`!Array|!Arguments`*!$
   *     Iterates over all indexed properties from `0` to `source.length`.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   *   - *`number`*!$
   *     Must be a whole `number`. Iterates over the `number` of cycles.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=)} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments|string`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments|string`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than three parameters were defined for the #iteratee as the
   *     wrapper has a max length of `3`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than two parameters were defined for the #iteratee as the
   *     wrapper has a max length of `2`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   * @return {(!Object|!Function|!Array|!Arguments|number)}
   *   The original #source value (unless the #source is a `string` which will
   *   result in an `array`).
   */
  function each(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined');
      case 1:
        throw $err(new Error, 'no #iteratee defined');
      case 2:
        break;
      default:
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, (string|number)=, (!Object|!Function|!Array)=)');

    if ( $is.num(source) ) {
      if ( !$is.whole(source) )
        throw $err(new Error, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _eachCycle(source, iteratee, thisArg);
    }

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Object|!Function|!Array|!Arguments|string|number');

    return $is._arr(source)
      ? _eachArr(source, iteratee, thisArg)
      : _eachObj(source, iteratee, thisArg);
  }

  /// {{{2
  /// @method each.object
  /// @alias each.obj
  /**
   * A shortcut for iterating over [owned][own] `object` properties.
   *
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **key** *`string`*
   *   - **source** *`!Object|!Function`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#main based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {(!Object|!Function)}
   *   The original #source value.
   */
  function eachObject(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'object');
      case 1:
        throw $err(new Error, 'no #iteratee defined', 'object');
      case 2:
        break;
      default:
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'object');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, string=, (!Object|!Function)=)', 'object');
    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
        'object');

    return _eachObj(source, iteratee, thisArg);
  }
  each['object'] = eachObject;
  each['obj'] = eachObject;

  /// {{{2
  /// @method each.array
  /// @alias each.arr
  /**
   * A shortcut for iterating over all of the indexed properties of an `array`
   * or array-like `object` or `function`.
   *
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If the #source is a `string`, it is converted into an `array` using one
   *   of the following list of values for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {!function(*=, number=, !Array=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **value** *`*`*
   *   - **index** *`number`*
   *   - **source** *`!Array`*
   *   Note that this method lazily [clones][clone] the #source with
   *   @copy#array based on the #iteratee [length property][func-length]
   *   (i.e. if you alter any #source property within the #iteratee, make
   *   sure you define all three parameters for the #iteratee so you can
   *   safely assume all references to the #source are its original values).
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than three parameters were defined for the #iteratee as the
   *   wrapper has a max length of `3`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {(!Array|!Arguments|!Object|!Function)}
   *   The original #source value (unless the #source is a `string` which will
   *   result in an `array`).
   */
  function eachArray(source, iteratee, thisArg) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'array');
      case 1:
        throw $err(new Error, 'no #iteratee defined', 'array');
      case 2:
        break;
      default:
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'array');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, number=, !Array=)', 'array');

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Array|!Arguments|!Object|!Function|string', 'array');

    len = source['length'];

    if ( !$is.num(len) )
      throw $typeErr(new TypeError, 'source.length', len, 'number', 'array');
    if ( !$is.whole(len) || len < 0 )
      throw $err(new Error, 'invalid #source.length `number` (' +
        'must be `0` or a positive whole `number`)', 'array');

    return _eachArr(source, iteratee, thisArg);
  }
  each['array'] = eachArray;
  each['arr'] = eachArray;

  /// {{{2
  /// @method each.cycle
  /// @alias each.time
  /**
   * A shortcut for iterating over a set `number` of cycles.
   *
   * @public
   * @param {number} cycles
   *   Must be a whole `number`.
   * @param {!function(number=, number=)} iteratee
   *   The #iteratee can have the following optional parameters:
   *   - **cycle** *`number`*!$
   *     Note that this `number` is zero-based (i.e. the first *cycle* value
   *     is `0`).
   *   - **cycles** *`number`*!$
   *     The unchanged #cycles value.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #iteratee is bound to its value. Note
   *   that the native [Function.prototype.bind][bind] is **not** used to
   *   bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to
   *   call the #iteratee with #thisArg. The new wrapper `function` has the
   *   same [length property][func-length] value as the #iteratee (unless
   *   more than two parameters were defined for the #iteratee as the
   *   wrapper has a max length of `2`) and the [name property][func-name]
   *   value of `"iteratee"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {number}
   *   The original #cycles value.
   */
  function eachCycle(cycles, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #cycles defined', 'cycle');
      case 1:
        throw $err(new Error, 'no #iteratee defined', 'cycle');
      case 2:
        break;
      default:
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'cycle');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(number=, number=)', 'cycle');
    if ( !$is.num(cycles) )
      throw $typeErr(new TypeError, 'cycles', cycles, 'number', 'cycle');
    if ( !$is.whole(cycles) )
      throw $err(new Error, 'invalid #cycles `number` (' +
        'must be whole `number`)', 'cycle');

    return _eachCycle(cycles, iteratee, thisArg);
  }
  each['cycle'] = eachCycle;
  each['time'] = eachCycle;

  ///////////////////////////////////////////////////// {{{2
  // EACH HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _eachObj
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*, string=, (!Object|!Function)=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Object|!Function)}
   */
  function _eachObj(source, iteratee, thisArg) {

    /** @type {(!Object|!Function)} */
    var src;
    /** @type {string} */
    var key;

    if ( !$is.none(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    src = iteratee['length'] > 2
      ? copy(source)
      : source;

    switch (iteratee['length']) {
      case 0:
        for (key in src) {
          if ( $own(src, key) )
            iteratee();
        }
        break;
      case 1:
        for (key in src) {
          if ( $own(src, key) )
            iteratee(src[key]);
        }
        break;
      case 2:
        for (key in src) {
          if ( $own(src, key) )
            iteratee(src[key], key);
        }
        break;
     default:
       for (key in src) {
         if ( $own(src, key) )
           iteratee(src[key], key, src);
       }
       break;
    }

    return source;
  }

  /// {{{3
  /// @func _eachArr
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*, number=, !Array=)} iteratee
   * @param {?Object=} thisArg
   * @return {(!Array|!Arguments|!Object|!Function)}
   */
  function _eachArr(source, iteratee, thisArg) {

    /** @type {(!Array|!Arguments|!Object|!Function)} */
    var src;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if ( !$is.none(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    src = iteratee['length'] > 2
      ? copy['array'](source)
      : source;
    len = src['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          iteratee();
        break;
      case 1:
        while (++i < len)
          iteratee(src[i]);
        break;
      case 2:
        while (++i < len)
          iteratee(src[i], i);
        break;
      default:
        while (++i < len)
          iteratee(src[i], i, src);
        break;
    }

    return source;
  }

  /// {{{3
  /// @func _eachCycle
  /**
   * @private
   * @param {number} cycles
   * @param {!function} iteratee
   * @param {?Object=} thisArg
   * @return {number}
   */
  function _eachCycle(cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;


    if ( !$is.none(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          iteratee(cycle++, cycles);
        break;
    }

    return cycles;
  }

  ///////////////////////////////////////////////////// {{{2
  // EACH HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func _bindMap
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindMap(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(value) {
          func['call'](thisArg, value);
        };
      case 2:
        return function iteratee(value, key) {
          func['call'](thisArg, value, key);
        };
    }
    return function iteratee(value, key, source) {
      func['call'](thisArg, value, key, source);
    };
  }

  /// {{{3
  /// @func _bindCycle
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindCycle(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
    }
    return function iteratee(cycle, cycles) {
      return func['call'](thisArg, cycle, cycles);
    };
  }

  ///////////////////////////////////////////////////// {{{2
  // EACH HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('each');

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

  // END OF PRIVATE SCOPE FOR VITALS.EACH
  return each;
})();
/// }}}1

module.exports = each;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
