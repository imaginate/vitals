/**
 * ---------------------------------------------------------------------------
 * VITALS.ROLL
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.roll](https://github.com/imaginate/vitals/wiki/vitals.roll)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneArr ../helpers/clone-arr.js
/// #include @helper $cloneFun ../helpers/clone-fun.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #if}}} @scope SOLO

/// #{{{ @super roll
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var roll = (function rollPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs roll
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  /// @docref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  /// @docref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  /// @docref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
  /// @docref [apply]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [replace]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter)
  /// @docref [lastIndex]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #if}}} @docrefs roll

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.roll
  /**
   * @description
   *   A shortcut for deriving a result by carrying a value over each
   *   [owned][own] property of an `object` or `function`, each indexed
   *   property of an `array` or `arguments`, or each `number` of cycles.
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
   *     - **prevValue** *`*`*
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **prevValue** *`*`*
   *     - **propValue** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all four parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`number`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **prevValue** *`*`*
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
   *     - **cycles** *`number`*!$
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
  /// #}}} @docs main
  /// #if{{{ @code main
  function roll(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, *=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _rollCycle(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|number');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArr(base, source, iteratee, thisArg)
        : _rollArr(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObj(base, source, iteratee, thisArg)
        : _rollObj(source, iteratee, thisArg);
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod up
  /// #{{{ @docs up
  /// @section base
  /// @method vitals.roll.up
  /**
   * @description
   *   A shortcut for deriving a summed total by adding each value returned by
   *   an #iteratee `function` call over each [owned][own] property of an
   *   `object` or `function`, each indexed property of an `array` or
   *   `arguments`, or each `number` of cycles.
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
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
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
  /// #}}} @docs up
  /// #if{{{ @code up
  function rollUp(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'up');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'up');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *', 'up');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=', 'up');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)', 'up');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)', 'up');

      return _rollCycleUp(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
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
  /// #if}}} @code up
  /// #}}} @submethod up

  /// #{{{ @submethod down
  /// #{{{ @docs down
  /// @section base
  /// @method vitals.roll.down
  /**
   * @description
   *   A shortcut for deriving a reduced total by subtracting each value
   *   returned by an #iteratee `function` call over each [owned][own]
   *   property of an `object` or `function`, each indexed property of an
   *   `array` or `arguments`, or each `number` of cycles.
   * @public
   * @param {*=} base
   *   If a #base is defined, it is the initial total. Note that for a
   *   `number` #source (i.e. cycles) a #base is required.
   * @param {(!Object|!Function|!Array|!Arguments|number)} source
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     This method will carry (i.e. iterate or roll) over every [owned][own]
   *     property in random order the difference of the #base (if defined) and
   *     each value returned by every #iteratee call.
   *   - *`!Array|!Arguments`*!$
   *     This method will carry (i.e. iterate or roll) over every indexed
   *     property starting with `0` and ending at `source.length` the
   *     difference of the #base (if defined) and each value returned by every
   *     #iteratee call.
   *   - *`number`*!$
   *     This method will carry (i.e. iterate or roll) over every `number` of
   *     cycles starting with `0` and ending at `source` the difference of the
   *     #base and each value returned by every #iteratee call.
   * @param {!function(*=, (string|number)=, (!Object|!Function|!Array)=): *} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
   *     - **key** *`string`*
   *     - **source** *`!Object|!Function`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#main based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`!Array|!Arguments`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **propValue** *`*`*
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
  /// #}}} @docs down
  /// #if{{{ @code down
  function rollDown(base, source, iteratee, thisArg) {

    /** @type {boolean} */
    var hasBase;

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'down');
      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'down');
      case 2:
        iteratee = source;
        source = base;
        hasBase = NO;
        break;
      case 3:
        if ( !$is.fun(iteratee) ) {
          thisArg = iteratee;
          iteratee = source;
          source = base;
          hasBase = NO;
          break;
        }
      default:
        hasBase = YES;
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *', 'down');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=', 'down');

    if ( $is.num(source) ) {

      if (!hasBase)
        throw _mkErr(new ERR, 'no #base defined (' +
          '#base is required with a `number` #source)', 'down');
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)', 'down');

      return _rollCycleDown(base, source, iteratee, thisArg);
    }

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|number', 'down');

    return $is._arr(source)
      ? hasBase
        ? _rollBaseArrDown(base, source, iteratee, thisArg)
        : _rollArrDown(source, iteratee, thisArg)
      : hasBase
        ? _rollBaseObjDown(base, source, iteratee, thisArg)
        : _rollObjDown(source, iteratee, thisArg);
  }
  roll['down'] = rollDown;
  /// #if}}} @code down
  /// #}}} @submethod down

  /// #if{{{ @helpers roll

  /// #{{{ @group object

  /// #{{{ @func _rollObj
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, *=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObj(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 3)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
      case 1: 
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 3:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result = iteratee(result, source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollObj

  /// #{{{ @func _rollBaseObj
  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, *=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObj(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 3)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
      case 1: 
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key]);
        }
        break;
      case 3:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result = iteratee(result, source[key], key, source);
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseObj

  /// #{{{ @func _rollObjUp
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObjUp(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee();
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result += iteratee(source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollObjUp

  /// #{{{ @func _rollBaseObjUp
  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjUp(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result += iteratee(source[key], key, source);
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseObjUp

  /// #{{{ @func _rollObjDown
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollObjDown(source, iteratee, thisArg) {

    /** @type {boolean} */
    var loaded;
    /** @type {*} */
    var result;
    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    loaded = NO;
    result = VOID;

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee();
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key]);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key], key);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (loaded)
              result -= iteratee(source[key], key, source);
            else {
              result = source[key];
              loaded = YES;
            }
          }
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollObjDown

  /// #{{{ @func _rollBaseObjDown
  /**
   * @private
   * @param {*} result
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseObjDown(result, source, iteratee, thisArg) {

    /** @type {string} */
    var key;

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            result -= iteratee(source[key], key, source);
        }
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseObjDown

  /// #}}} @group object

  /// #{{{ @group array

  /// #{{{ @func _rollArr
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, *=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArr(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 3)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while (++i < len)
          result = iteratee(result);
        break;
      case 2:
        while (++i < len)
          result = iteratee(result, source[i]);
        break;
      case 3:
        while (++i < len)
          result = iteratee(result, source[i], i);
        break;
      default:
        while (++i < len)
          result = iteratee(result, source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollArr

  /// #{{{ @func _rollBaseArr
  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, *=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArr(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 3)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindPrevMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while (++i < len)
          result = iteratee(result);
        break;
      case 2:
        while (++i < len)
          result = iteratee(result, source[i]);
        break;
      case 3:
        while (++i < len)
          result = iteratee(result, source[i], i);
        break;
      default:
        while (++i < len)
          result = iteratee(result, source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseArr

  /// #{{{ @func _rollArrUp
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArrUp(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result += iteratee();
        break;
      case 1:
        while (++i < len)
          result += iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result += iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result += iteratee(source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollArrUp

  /// #{{{ @func _rollBaseArrUp
  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrUp(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result += iteratee();
        break;
      case 1:
        while (++i < len)
          result += iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result += iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result += iteratee(source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseArrUp

  /// #{{{ @func _rollArrDown
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollArrDown(source, iteratee, thisArg) {

    /** @type {*} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    result = len > 0
      ? source[0]
      : VOID;
    i = 0;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result -= iteratee();
        break;
      case 1:
        while (++i < len)
          result -= iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result -= iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result -= iteratee(source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollArrDown

  /// #{{{ @func _rollBaseArrDown
  /**
   * @private
   * @param {*} result
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollBaseArrDown(result, source, iteratee, thisArg) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindMap(iteratee, thisArg);

    len = source['length'];
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          result -= iteratee();
        break;
      case 1:
        while (++i < len)
          result -= iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          result -= iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          result -= iteratee(source[i], i, source);
        break;
    }

    return result;
  }
  /// #}}} @func _rollBaseArrDown

  /// #}}} @group array

  /// #{{{ @group cycle

  /// #{{{ @func _rollCycle
  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(*=, number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycle(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindPrevCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
      case 1:
        while(count--)
          result = iteratee(result);
        break;
      case 2:
        cycle = 0;
        while(count--)
          result = iteratee(result, cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result = iteratee(result, cycle++, cycles);
        break;
    }

    return result;
  }
  /// #}}} @func _rollCycle

  /// #{{{ @func _rollCycleUp
  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycleUp(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          result += iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          result += iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result += iteratee(cycle++, cycles);
        break;
    }

    return result;
  }
  /// #}}} @func _rollCycleUp

  /// #{{{ @func _rollCycleDown
  /**
   * @private
   * @param {*} result
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {*}
   */
  function _rollCycleDown(result, cycles, iteratee, thisArg) {

    /** @type {number} */
    var count;
    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindCycle(iteratee, thisArg);

    count = cycles > 0
      ? cycles
      : 0;

    switch (iteratee['length']) {
      case 0:
        while(count--)
          result -= iteratee();
        break;
      case 1:
        cycle = 0;
        while(count--)
          result -= iteratee(cycle++);
        break;
      default:
        cycle = 0;
        while(count--)
          result -= iteratee(cycle++, cycles);
        break;
    }

    return result;
  }
  /// #}}} @func _rollCycleDown

  /// #}}} @group cycle

  /// #{{{ @group bind

  /// #{{{ @func _bindMap
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
        return function iteratee(propValue) {
          return func['call'](thisArg, propValue);
        };
      case 2:
        return function iteratee(propValue, key) {
          return func['call'](thisArg, propValue, key);
        };
    }
    return function iteratee(propValue, key, source) {
      return func['call'](thisArg, propValue, key, source);
    };
  }
  /// #}}} @func _bindMap

  /// #{{{ @func _bindPrevMap
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindPrevMap(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(prevValue) {
          return func['call'](thisArg, prevValue);
        };
      case 2:
        return function iteratee(prevValue, propValue) {
          return func['call'](thisArg, prevValue, propValue);
        };
      case 3:
        return function iteratee(prevValue, propValue, key) {
          return func['call'](thisArg, prevValue, propValue, key);
        };
    }
    return function iteratee(prevValue, propValue, key, source) {
      return func['call'](thisArg, prevValue, propValue, key, source);
    };
  }
  /// #}}} @func _bindPrevMap

  /// #{{{ @func _bindCycle
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
  /// #}}} @func _bindCycle

  /// #{{{ @func _bindPrevCycle
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindPrevCycle(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(prevValue) {
          return func['call'](thisArg, prevValue);
        };
      case 2:
        return function iteratee(prevValue, cycle) {
          return func['call'](thisArg, prevValue, cycle);
        };
    }
    return function iteratee(prevValue, cycle, cycles) {
      return func['call'](thisArg, prevValue, cycle, cycles);
    };
  }
  /// #}}} @func _bindPrevCycle

  /// #}}} @group bind

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('roll');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers roll

/// #ifnot{{{ @scope DOCS_ONLY
  return roll;
})();
/// #ifnot{{{ @scope SOLO
vitals['roll'] = roll;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super roll

/// #if{{{ @scope SOLO
var vitals = roll;
vitals['roll'] = roll;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
