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

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneArr ../helpers/clone-arr.js
/// #include @helper $cloneFun ../helpers/clone-fun.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #}}} @on SOLO

/// #{{{ @super until
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var until = (function untilPrivateScope() {

  /// #{{{ @docrefs until
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  /// @docref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  /// @docref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  /// @docref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [endless]:(https://en.wikipedia.org/wiki/Infinite_loop)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #}}} @docrefs until

  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.until
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties, indexed
   *   `array` properties, a defined `number` of cycles, or an unlimited
   *   `number` of cycles until a defined #end value is returned or all
   *   properties or cycles are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Object|!Function|!Array|!Arguments|string|number|undefined)=} source
   *   If the #source is **not** defined, this method will call the #iteratee
   *   until an #end match is found. It is recommended to define a maximum
   *   `number` of cycles for the #source instead of leaving it `undefined` to
   *   avoid an [infinite loop][endless] situation. If the #source is defined,
   *   the details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     Iterates over all [owned][own] properties in random order until an
   *     #end match is found or all properties are visited.
   *   - *`!Array|!Arguments`*!$
   *     Iterates over all indexed properties from `0` to `source.length`
   *     until an #end match is found or all properties are visited.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   *   - *`number`*!$
   *     Must be a whole `number`. Iterates over the `number` of cycles until
   *     an #end match is found or all cycles are completed.
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
   *   - *`undefined`*!$
   *     The #iteratee can have the following optional parameters:
   *     - **cycle** *`number`*!$
   *       Note that this `number` is zero-based (i.e. the first *cycle* value
   *       is `0`).
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
   *   - *`undefined`*!$
   *     If #thisArg is defined, the #iteratee is bound to its value. Note
   *     that the native [Function.prototype.bind][bind] is **not** used to
   *     bind the #iteratee. Instead the #iteratee is wrapped with a regular
   *     new [Function][func] that uses [Function.prototype.call][call] to
   *     call the #iteratee with #thisArg. The new wrapper `function` has the
   *     same [length property][func-length] value as the #iteratee (unless
   *     more than one parameter was defined for the #iteratee as the wrapper
   *     has a max length of `1`) and the [name property][func-name] value of
   *     `"iteratee"` (unless you are using a [minified][minify] version of
   *     `vitals`).
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
   */
  function until(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');

      case 2:
        iteratee = source;

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
            '*=, (string|number)=, (!Object|!Function|!Array)=): *');

        return _untilEnd(end, iteratee);

      case 3:
        if ($is.fun(source)
            && ($is.nil(iteratee)
                || $is.void(iteratee)
                || $is.obj(iteratee) ) ) {
          thisArg = iteratee;
          iteratee = source;
          return _untilEnd(end, iteratee, thisArg);
        }
        break;

      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, (string|number)=, (!Object|!Function|!Array)=): *');

    if ( $is.num(source) ) {
      if ( !$is.whole(source) )
        throw _mkErr(new ERR, 'invalid #source `number` (' +
          'must be whole `number`)');

      return _untilCycle(end, source, iteratee, thisArg);
    }

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '(!Object|!Function|!Array|!Arguments|string|number)=');

    return $is._arr(source)
      ? _untilArr(end, source, iteratee, thisArg)
      : _untilObj(end, source, iteratee, thisArg);
  }
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// @section base
  /// @method vitals.until.object
  /// @alias vitals.until.obj
  /**
   * @description
   *   A shortcut for iterating over [owned][own] `object` properties until a
   *   defined #end value is returned or all properties are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Object|!Function)} source
   *   Iterates over the [owned][own] #source properties in random order until
   *   an #end match is found or all properties are visited.
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
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
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
   */
  function untilObject(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'object');
      case 1:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'object');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'object');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, string=, (!Object|!Function)=): *', 'object');
    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '(!Object|!Function)',
        'object');

    return _untilObj(end, source, iteratee, thisArg);
  }
  until['object'] = untilObject;
  until['obj'] = untilObject;
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// @section base
  /// @method vitals.until.array
  /// @alias vitals.until.arr
  /**
   * @description
   *   A shortcut for iterating over indexed `array` or array-like `object` or
   *   `function` properties until a defined #end value is returned or all
   *   indexed properties are visited.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   The #source details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Iterates over all indexed properties from `0` to `source.length`
   *     until an #end match is found or all indexed properties are visited.
   *   - *`string`*!$
   *     Converted to an `array` #source using one of the following list of
   *     values for the separator (values listed in order of rank):
   *     - `", "`
   *     - `","`
   *     - `"|"`
   *     - `" "`
   * @param {!function(*=, number=, !Array=): *} iteratee
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
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
   */
  function untilArray(end, source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'array');
      case 1:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'array');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'array');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee, '!function(' +
        '*=, number=, !Array=): *', 'array');

    if ( $is.str(source) )
      source = $splitKeys(source);
    else if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function|string', 'array');
    else if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _untilArr(end, source, iteratee, thisArg);
  }
  until['array'] = untilArray;
  until['arr'] = untilArray;
  /// #}}} @submethod array

  /// #{{{ @submethod cycle
  /// @section base
  /// @method vitals.until.cycle
  /// @alias vitals.until.time
  /**
   * @description
   *   A shortcut for iterating over a set `number` of cycles until a defined
   *   #end value is returned or all cycles are completed.
   * @public
   * @param {*} end
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, the iteration is halted,
   *   and this method will return `true`.
   * @param {number} cycles
   *   Must be a whole `number`. Iterates over the `number` of cycles until
   *   an #end match is found or all cycles are completed.
   * @param {!function(number=, number=): *} iteratee
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
   * @return {boolean}
   *   If a value returned by the #iteratee matches (via a
   *   [strict equality][equal] test) the #end value, this method will return
   *   `true`. Otherwise, it will return `false`.
   */
  function untilCycle(end, cycles, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #end defined', 'cycle');
      case 1:
        throw _mkErr(new ERR, 'no #cycles defined', 'cycle');
      case 2:
        throw _mkErr(new ERR, 'no #iteratee defined', 'cycle');
      case 3:
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'cycle');
        break;
    }

    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(number=, number=): *', 'cycle');
    if ( !$is.num(cycles) )
      throw _mkTypeErr(new TYPE_ERR, 'cycles', cycles, 'number', 'cycle');
    if ( !$is.whole(cycles) )
      throw _mkErr(new ERR, 'invalid #cycles `number` (' +
        'must be whole `number`)', 'cycle');

    return _untilCycle(end, cycles, iteratee, thisArg);
  }
  until['cycle'] = untilCycle;
  until['time'] = untilCycle;
  /// #}}} @submethod cycle

  /// #{{{ @group Until-Helpers

  /// #{{{ @group Main-Helpers

  /// #{{{ @func _untilEnd
  /**
   * @private
   * @param {*} end
   * @param {!function(number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilEnd(end, iteratee, thisArg) {

    /** @type {number} */
    var cycle;

    if ( !$is.void(thisArg) )
      iteratee = _bindEnd(iteratee, thisArg);

    if (iteratee['length'] > 0) {
      cycle = 0;
      while(iteratee(cycle++) !== end)
        ;
    }
    else {
      while(iteratee() !== end)
        ;
    }
    return YES;
  }
  /// #}}} @func _untilEnd

  /// #{{{ @func _untilObj
  /**
   * @private
   * @param {*} end
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilObj(end, source, iteratee, thisArg) {

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
          if ( $own(source, key) ) {
            if (iteratee() === end)
              return YES;
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key]) === end)
              return YES;
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key], key) === end)
              return YES;
          }
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) ) {
            if (iteratee(source[key], key, source) === end)
              return YES;
          }
        }
        break;
    }
    return NO;
  }
  /// #}}} @func _untilObj

  /// #{{{ @func _untilArr
  /**
   * @private
   * @param {*} end
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilArr(end, source, iteratee, thisArg) {

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
        while (++i < len) {
          if (iteratee() === end)
            return YES;
        }
        break;
      case 1:
        while (++i < len) {
          if (iteratee(source[i]) === end)
            return YES;
        }
        break;
      case 2:
        while (++i < len) {
          if (iteratee(source[i], i) === end)
            return YES;
        }
        break;
      default:
        while (++i < len) {
          if (iteratee(source[i], i, source) === end)
            return YES;
        }
        break;
    }
    return NO;
  }
  /// #}}} @func _untilArr

  /// #{{{ @func _untilCycle
  /**
   * @private
   * @param {*} end
   * @param {number} cycles
   * @param {!function(number=, number=): *} iteratee
   * @param {?Object=} thisArg
   * @return {boolean}
   */
  function _untilCycle(end, cycles, iteratee, thisArg) {

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
        while(count--) {
          if (iteratee() === end)
            return YES;
        }
        break;
      case 1:
        cycle = 0;
        while(count--) {
          if (iteratee(cycle++) === end)
            return YES;
        }
        break;
      default:
        cycle = 0;
        while(count--) {
          if (iteratee(cycle++, cycles) === end)
            return YES;
        }
        break;
    }
    return NO;
  }
  /// #}}} @func _untilCycle

  /// #}}} @group Main-Helpers

  /// #{{{ @group Bind-Helpers

  /// #{{{ @func _bindEnd
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindEnd(func, thisArg) {

    return func['length'] < 1
      ? function iteratee() {
          return func['call'](thisArg);
        }
      : function iteratee(cycle) {
          return func['call'](thisArg, cycle);
        };
  }
  /// #}}} @func _bindEnd

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
  /// #}}} @func _bindMap

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

  /// #}}} @group Bind-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('until');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Until-Helpers

  return until;
})();
/// #{{{ @off SOLO
vitals['until'] = until;
/// #}}} @off SOLO
/// #}}} @super until

/// #{{{ @on SOLO
var vitals = until;
vitals['until'] = until;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
