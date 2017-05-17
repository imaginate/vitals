/**
 * ---------------------------------------------------------------------------
 * VITALS ROLL
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.roll](https://github.com/imaginate/vitals/wiki/vitals.roll)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNilNone = require('./helpers/is-nil-none.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS ROLL
//////////////////////////////////////////////////////////////////////////////

var roll = (function rollPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - roll
  // - roll.up
  // - roll.down
  //////////////////////////////////////////////////////////

  /* {{{2 Roll References
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   * @ref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
   * @ref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
   * @ref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
   * @ref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
   * @ref [apply]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
   * @ref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
   * @ref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
   * @ref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
   * @ref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   * @ref [replace]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter)
   * @ref [lastIndex]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
   * @ref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
   * @ref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
   * @ref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   */

  /// {{{2
  /// @method roll
  /**
   * A shortcut for deriving a result by carrying a value over each
   * [owned][own] property of an `object` or `function`, each indexed property
   * of an `array` or `arguments`, or each `number` of cycles.
   *
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial carried value. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over each [owned][own]
   *     property in random order.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over each indexed
   *     property starting with `0` and ending at `source.length`.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over each `number` of
   *     cycles starting with `0` and ending at `source`.
   * @param {!function(*=, *=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **previousValue** *`*`*
   *     - **currentValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **previousValue** *`*`*
   *     - **currentValue** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **previousValue** *`*`*
   *     - **currentCycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first
   *       *currentCycle* value is `0`).
   *     - **totalCycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than four parameters were defined for the #iteratee as the
   *     wrapper has a max length of `4`) and the [name property][func-name]
   *     value of `"iteratee"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   *   - *`number`*!$
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
   * @return {*}
   */
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments.length) {
      case 0:
        throw $err(new Error, 'no #source defined');
      case 1:
        throw $err(new Error, 'no #iteratee defined');
      case 2:
        iteratee = source;
        source = base;
        hasBase = false;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = false;
          break;
        }
      default:
        hasBase = true;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee, '!function(' +
        '*=, *=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw $err(new Error, 'no #base defined (' +
          '#base is required with a `number` #source)');

      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Object|!Function|!Array|!Arguments|number');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }

  /// {{{2
  /// @method roll.up
  /**
   * A shortcut for deriving a summed total by adding each value returned by
   * an #iteratee `function` call over each [owned][own] property of an
   * `object` or `function`, each indexed property of an `array` or
   * `arguments`, or each `number` of cycles.
   *
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial total. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over every [owned][own]
   *     property in random order the sum of the #base (if defined) and each
   *     value returned by every #iteratee call.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over every indexed
   *     property starting with `0` and ending at `source.length` the sum of
   *     the #base (if defined) and each value returned by every #iteratee
   *     call.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over every `number` of
   *     cycles starting with `0` and ending at `source` the sum of the #base
   *     and each value returned by every #iteratee call.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
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
   *   - *`!Array|!Arguments`*!$
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
   *     - **currentCycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first
   *       *currentCycle* value is `0`).
   *     - **totalCycles** *`number`*!$
   *       The unchanged #source value.
   * @param {?Object=} thisArg
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function|!Array|!Arguments`*!$
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
   * @return {*}
   */
  function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments.length) {
      case 0:
        throw $err(new Error, 'no #source defined', 'up');
      case 1:
        throw $err(new Error, 'no #iteratee defined', 'up');
      case 2:
        iteratee = source;
        source = base;
        hasBase = false;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = false;
          break;
        }
      default:
        hasBase = true;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *', 'up');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=', 'up');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw $err(new Error, 'no #base defined (' +
          '#base is required with a `number` #source)', 'up');

      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Object|!Function|!Array|!Arguments|number', 'up');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArrUp(base, source, iteratee, thisArg)
        : _rollArrUp(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjUp(base, source, iteratee, thisArg)
        : _rollObjUp(source, iteratee, thisArg);
  }
  roll['up'] = rollUp;

  /// {{{2
  /// @method roll.down
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

    if (arguments.length < 2) throw $err(new Error, 'No source or iteratee defined','down');
  
    if (arguments.length === 2) {
      iteratee = source;
      source = base;
    }
    else if ( arguments.length === 3 && !$is.fun(iteratee) ) {
      thisArg = iteratee;
      iteratee = source;
      source = base;
    }
    else hasBase = true;

    if ( !$is.fun(iteratee)      ) throw $typeErr(new TypeError, 'iteratee', 'down');
    if ( !$isNilNone.obj(thisArg) ) throw $typeErr(new TypeError, 'thisArg',  'down');

    if ( $is.num(source) ) {
      if (!hasBase) throw $err(new Error, 'No base defined', 'down');
      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) ) throw $typeErr(new TypeError, 'source', 'down');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  };

  ///////////////////////////////////////////////////// {{{2
  // ROLL HELPERS - OBJECT
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _rollObj
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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

  /// {{{3
  /// @func _rollBaseObj
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      case 1: 
      for (key in obj) {
        if ( $own(obj, key) ) result = iteratee(result);
      }
      break;
      case 2:
      for (key in obj) {
        if ( $own(obj, key) ) result = iteratee(result, obj[key]);
      }
      break;
      case 3:
      for (key in obj) {
        if ( $own(obj, key) ) result = iteratee(result, obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( $own(obj, key) ) result = iteratee(result, obj[key], key, obj);
      }
    }
    return result;
  }

  /// {{{3
  /// @func _rollObjUp
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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

  /// {{{3
  /// @func _rollBaseObjUp
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( $own(obj, key) ) result += iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( $own(obj, key) ) result += iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( $own(obj, key) ) result += iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( $own(obj, key) ) result += iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  /// {{{3
  /// @func _rollObjDown
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0:
      for (key in obj) {
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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
        if ( $own(obj, key) ) {
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

  /// {{{3
  /// @func _rollBaseObjDown
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    switch (iteratee.length) {
      case 0: 
      for (key in obj) {
        if ( $own(obj, key) ) result -= iteratee();
      }
      break;
      case 1:
      for (key in obj) {
        if ( $own(obj, key) ) result -= iteratee(obj[key]);
      }
      break;
      case 2:
      for (key in obj) {
        if ( $own(obj, key) ) result -= iteratee(obj[key], key);
      }
      break;
      default:
      for (key in obj) {
        if ( $own(obj, key) ) result -= iteratee(obj[key], key, obj);
      }
    }
    return result;
  }

  ///////////////////////////////////////////////////// {{{2
  // ROLL HELPERS - ARRAY
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _rollArr
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  /// {{{3
  /// @func _rollBaseArr
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  /// {{{3
  /// @func _rollArrUp
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  /// {{{3
  /// @func _rollBaseArrUp
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  /// {{{3
  /// @func _rollArrDown
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  /// {{{3
  /// @func _rollBaseArrDown
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
    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
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

  ///////////////////////////////////////////////////// {{{2
  // ROLL HELPERS - CYCLE
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _rollCycle
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

    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length > 1) {
      i = 0;
      while(count--) result = iteratee(result, i++);
    }
    else {
      while(count--) result = iteratee(result);
    }
    return result;
  }

  /// {{{3
  /// @func _rollCycleUp
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

    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result += iteratee(i++);
    }
    else {
      while(count--) result += iteratee();
    }
    return result;
  }

  /// {{{3
  /// @func _rollCycleDown
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

    iteratee = $is.none(thisArg) ? iteratee : _bind(iteratee, thisArg);
    if (iteratee.length) {
      i = 0;
      while(count--) result -= iteratee(i++);
    }
    else {
      while(count--) result -= iteratee();
    }
    return result;
  }

  ///////////////////////////////////////////////////// {{{2
  // ROLL HELPERS - MISC
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
  var $err = $newErrorMaker('roll');

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
  // END OF PRIVATE SCOPE FOR ROLL
  return roll;
})();
/// }}}1

module.exports = roll;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
