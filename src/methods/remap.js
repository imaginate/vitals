/**
 * ---------------------------------------------------------------------------
 * VITALS.REMAP
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.remap](https://github.com/imaginate/vitals/wiki/vitals.remap)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $cloneArr ../helpers/clone-arr.js
/// #include @helper $cloneFun ../helpers/clone-fun.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $escRegx ../helpers/esc-regx.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #if}}} @scope SOLO

/// #{{{ @super remap
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var remap = (function remapPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs remap
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
  /// #if}}} @docrefs remap

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.remap
  /**
   * @description
   *   A shortcut for making a new `object`, `array`, or `string` by invoking
   *   an action over each [owned][own] `object` or `function` property,
   *   indexed `array` or `arguments` property, or matched `substring`
   *   pattern.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments|string)} source
   * @param {*} iteratee
   *   The details are as follows (per #source type):
   *   - *`!Object|!Function`*!$
   *     The #iteratee must be a `function`. The value returned from each call
   *     to the #iteratee is set as the property value for the new `object`.
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
   *     The #iteratee must be a `function`. The value returned from each call
   *     to the #iteratee is set as the property value for the new `array`.
   *     The #iteratee can have the following optional parameters:
   *     - **value** *`*`*
   *     - **index** *`number`*
   *     - **source** *`!Array`*
   *     Note that this method lazily [clones][clone] the #source with
   *     @copy#array based on the #iteratee [length property][func-length]
   *     (i.e. if you alter any #source property within the #iteratee, make
   *     sure you define all three parameters for the #iteratee so you can
   *     safely assume all references to the #source are its original values).
   *   - *`string`*!$
   *     The #iteratee must be a `substring` pattern to search for within the
   *     #source. If the #iteratee is **not** a `RegExp`, it is converted into
   *     a `string` before running a search on the #source for any matches.
   * @param {*=} replacement
   *   Only allowed (and then required) when the #source is a `string`. If it
   *   is **not** a `function` the #replacement is converted into a `string`.
   *   If the #replacement is a `function`, it operates the same as any
   *   `function` parameter specified for [String.prototype.replace][replace].
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
   *   - *`string`*!$
   *     If #thisArg is defined and the #replacement is a `function`, the
   *     #replacement is bound to its value. Note that the native
   *     [Function.prototype.bind][bind] is **not** used to bind the
   *     #replacement. Instead the #replacement is wrapped with a regular new
   *     [Function][func] that uses [Function.prototype.call][call] or when
   *     seven or more parameters are defined for the #replacement,
   *     [Function.prototype.apply][apply] to call the #replacement with
   *     #thisArg. The new wrapper `function` has the same
   *     [length property][func-length] value as the #replacement (unless
   *     more than seven parameters were defined for the #replacement as the
   *     wrapper has a max length of `7`) and the [name property][func-name]
   *     value of `"replacement"` (unless you are using a [minified][minify]
   *     version of `vitals`).
   * @return {(!Object|!Array|string)}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function remap(source, iteratee, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined');

      case 2:
        if ( $is.str(source) )
          throw _mkErr(new ERR, 'no #replacement defined');

        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
           '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');

        return $is._arr(source)
          ? _remapArr(source, iteratee, VOID)
          : _remapObj(source, iteratee, VOID);

      case 3:
        if ( $is.str(source) )
          return _remapStr(source, iteratee, replacement, VOID);
        break;

      default:
        if ( $is.str(source) ) {
          if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
            throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

          return _remapStr(source, iteratee, replacement, thisArg);
        }
        break;
    }

    thisArg = replacement;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments|string');
    if ( !$is.fun(iteratee) )
      throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
        '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
      throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=');

    return $is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// #{{{ @docs object
  /// @section base
  /// @method vitals.remap.object
  /// @alias vitals.remap.obj
  /**
   * @description
   *   A shortcut for making a new `object` with the same [owned][own]
   *   property key names as an existing `object` or `function` and new values
   *   set by invoking an action with an #iteratee `function` upon each
   *   [owned][own] property of the existing `object`.
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   *   The #iteratee must be a `function`. The value returned from each call
   *   to the #iteratee is set as the property value for the new `object`.
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
   * @return {!Object} 
   */
  /// #}}} @docs object
  /// #if{{{ @code object
  function remapObject(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'object');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');

        return _remapObj(source, iteratee, VOID);

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');
        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'object');

        return _remapObj(source, iteratee, thisArg);
    }
  }
  remap['object'] = remapObject;
  remap['obj'] = remapObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// #{{{ @docs array
  /// @section base
  /// @method vitals.remap.array
  /// @alias vitals.remap.arr
  /**
   * @description
   *   A shortcut for making a new `array` with the same [length][arr-length]
   *   of indexed properties as an existing `array` or array-like `object` and
   *   with new property values set by invoking an action with an #iteratee
   *   `function` upon each indexed property of the existing `array` or
   *   `object`.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function|string)} source
   *   If the #source is a `string`, it is converted into an `array` using one
   *   of the following values as the separator (values listed in order of
   *   rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {!function(*=, number=, !Array=): *} iteratee
   *   The #iteratee must be a `function`. The value returned from each call
   *   to the #iteratee is set as the property value for the new `array`.
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
   * @return {!Array}
   */
  /// #}}} @docs array
  /// #if{{{ @code array
  function remapArray(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        throw _mkErr(new ERR, 'no #iteratee defined', 'array');

      case 2:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        else if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'array');

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');

        return _remapArr(source, iteratee, VOID);

      default:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        else if ( !$is.arrish(source) )
          throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
            'length must be a whole `number` that is `0` or more)', 'array');

        if ( !$is.fun(iteratee) )
          throw _mkTypeErr(new TYPE_ERR, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'array');

        return _remapArr(source, iteratee, thisArg);
    }
  }
  remap['array'] = remapArray;
  remap['arr'] = remapArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod string
  /// #{{{ @docs string
  /// @section base
  /// @method vitals.remap.string
  /// @alias vitals.remap.str
  /**
   * @description
   *   A shortcut for replacing each matching `substring` with a new
   *   `substring` within a #source `string`.
   * @public
   * @param {string} source
   * @param {*} pattern
   *   The #pattern must be a `substring` pattern to search for within the
   *   #source. If the #pattern is **not** a `RegExp`, it is converted into
   *   a `string` before running a search on the #source for any matches. Note
   *   that a `string` #pattern will replace all of the `substring` matches in
   *   the #source (i.e. not just the first). To replace only one match use a
   *   `RegExp` #pattern that does not have the [global flag][global] set, a
   *   `RegExp` #pattern with an altered [lastIndex property][lastIndex], or a
   *   `function` #replacement that uses your own logic to decide whether to
   *   replace each #pattern occurrence.
   * @param {*} replacement
   *   If the #replacement is **not** a `function`, it is converted into a
   *   `string`. If the #replacement is a `function`, it operates the same as
   *   any `function` parameter specified for
   *   [String.prototype.replace][replace].
   * @param {?Object=} thisArg
   *   If #thisArg is defined and the #replacement is a `function`, the
   *   #replacement is bound to its value. Note that the native
   *   [Function.prototype.bind][bind] is **not** used to bind the
   *   #replacement. Instead the #replacement is wrapped with a regular new
   *   [Function][func] that uses [Function.prototype.call][call] or when
   *   seven or more parameters are defined for the #replacement,
   *   [Function.prototype.apply][apply] to call the #replacement with
   *   #thisArg. The new wrapper `function` has the same
   *   [length property][func-length] value as the #replacement (unless
   *   more than seven parameters were defined for the #replacement as the
   *   wrapper has a max length of `7`) and the [name property][func-name]
   *   value of `"replacement"` (unless you are using a [minified][minify]
   *   version of `vitals`).
   * @return {string}
   */
  /// #}}} @docs string
  /// #if{{{ @code string
  function remapString(source, pattern, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'string');

      case 1:
        throw _mkErr(new ERR, 'no #pattern defined', 'string');

      case 2:
        throw _mkErr(new ERR, 'no #replacement defined', 'string');

      case 3:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'string');

        return _remapStr(source, pattern, replacement, VOID);

      default:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'string');
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) )
          throw _mkTypeErr(new TYPE_ERR, 'thisArg', thisArg, '?Object=',
            'string');

        return _remapStr(source, pattern, replacement, thisArg);
    }
  }
  remap['string'] = remapString;
  remap['str'] = remapString;
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #if{{{ @helpers remap

  /// #{{{ @group main

  /// #{{{ @func _remapObj
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Object}
   */
  function _remapObj(source, iteratee, thisArg) {

    /** @type {!Object} */
    var obj;
    /** @type {string} */
    var key;

    obj = {};

    if (iteratee['length'] > 2)
      source = $is.fun(source)
        ? $cloneFun(source)
        : $cloneObj(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindIteratee(iteratee, thisArg);

    switch (iteratee['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee();
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key]);
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key], key);
        }
        break;
      default:
        for (key in source) {
          if ( $own(source, key) )
            obj[key] = iteratee(source[key], key, source);
        }
        break;
    }

    return obj;
  }
  /// #}}} @func _remapObj

  /// #{{{ @func _remapArr
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} source
   * @param {!function(*=, number=, !Array=): *} iteratee
   * @param {?Object=} thisArg
   * @return {!Array}
   */
  function _remapArr(source, iteratee, thisArg) {

    /** @type {!Array} */
    var arr;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    if (iteratee['length'] > 2)
      source = $cloneArr(source);
    if ( !$is.void(thisArg) )
      iteratee = _bindIteratee(iteratee, thisArg);

    len = source['length'];
    arr = new ARR(len);
    i = -1;

    switch (iteratee['length']) {
      case 0:
        while (++i < len)
          arr[i] = iteratee();
        break;
      case 1:
        while (++i < len)
          arr[i] = iteratee(source[i]);
        break;
      case 2:
        while (++i < len)
          arr[i] = iteratee(source[i], i);
        break;
      default:
        while (++i < len)
          arr[i] = iteratee(source[i], i, source);
        break;
    }

    return arr;
  }
  /// #}}} @func _remapArr

  /// #{{{ @func _remapStr
  /**
   * @private
   * @param {string} source
   * @param {*} pattern
   * @param {*} replacement
   * @param {?Object=} thisArg
   * @return {string}
   */
  function _remapStr(source, pattern, replacement, thisArg) {

    if (!source)
      return source;

    if ( !$is.regx(pattern) ) {
      pattern = $mkStr(pattern);
      if (!pattern)
        return source;
      pattern = $escRegx(pattern);
      pattern = new REGX(pattern, 'g');
    }

    if ( !$is.fun(replacement) )
      replacement = $mkStr(replacement);
    else if ( !$is.void(thisArg) )
      replacement = _bindReplacement(replacement, thisArg);

    return source['replace'](pattern, replacement);
  }
  /// #}}} @func _remapStr

  /// #}}} @group main

  /// #{{{ @group bind

  /// #{{{ @func _bindIteratee
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function} 
   */
  function _bindIteratee(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function iteratee() {
          return func['call'](thisArg);
        };
      case 1:
        return function iteratee(value) {
          return func['call'](thisArg, value);
        };
      case 2:
        return function iteratee(value, key) {
          return func['call'](thisArg, value, key);
        };
    }
    return function iteratee(value, key, source) {
      return func['call'](thisArg, value, key, source);
    };
  }
  /// #}}} @func _bindIteratee

  /// #{{{ @func _bindReplacement
  /**
   * @private
   * @param {!function} func
   * @param {?Object} thisArg
   * @return {!function}
   */
  function _bindReplacement(func, thisArg) {
    switch (func['length']) {
      case 0:
        return function replacement() {
          return func['call'](thisArg);
        };
      case 1:
        return function replacement(match) {
          return func['call'](thisArg, match);
        };
      case 2:
        return function replacement(match, offset) {
          return func['call'](thisArg, match, offset);
        };
      case 3:
        return function replacement(match, offset, source) {
          return func['call'](thisArg, match, offset, source);
        };
      case 4:
        return function replacement(match, p1, offset, source) {
          return func['call'](thisArg, match, p1, offset, source);
        };
      case 5:
        return function replacement(match, p1, p2, offset, source) {
          return func['call'](thisArg, match, p1, p2, offset, source);
        };
      case 6:
        return function replacement(match, p1, p2, p3, offset, source) {
          return func['call'](thisArg, match, p1, p2, p3, offset, source);
        };
    }
    return function replacement(match, p1, p2, p3, p4, offset, source) {
      return func['apply'](thisArg, arguments);
    };
  }
  /// #}}} @func _bindReplacement

  /// #}}} @group bind

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('remap');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers remap

/// #ifnot{{{ @scope DOCS_ONLY
  return remap;
})();
/// #ifnot{{{ @scope SOLO
vitals['remap'] = remap;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super remap

/// #if{{{ @scope SOLO
var vitals = remap;
vitals['remap'] = remap;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
