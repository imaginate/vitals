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

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $isNilNone = require('./helpers/is-nil-none.js');
var $splitKeys = require('./helpers/split-keys.js');
var $escape = require('./helpers/escape.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');
var copy = require('./copy.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.REMAP
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var remap = (function remapPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - remap
  // - remap.object (remap.obj)
  // - remap.array  (remap.arr)
  // - remap.string (remap.str)
  //////////////////////////////////////////////////////////

  /* {{{2 Remap References
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
  /// @method remap
  /**
   * A shortcut for making a new `object`, `array`, or `string` by invoking an
   * action over each [owned][own] `object` or `function` property, indexed
   * `array` or `arguments` property, or matched `substring` pattern.
   *
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
   *     a `string` with [String()][string] before running a search on the
   *     #source for any matches.
   * @param {*=} replacement
   *   Only allowed (and then required) when the #source is a `string`. If it
   *   is **not** a `function` the #replacement is converted into a `string`
   *   with [String()][string]. If the #replacement is a `function`, it
   *   operates the same as any `function` parameter specified for
   *   [String.prototype.replace][replace].
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
  function remap(source, iteratee, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined');

      case 1:
        throw $err(new Error, 'no #iteratee defined');

      case 2:
        if ( $is.str(source) )
          throw $err(new Error, 'no #replacement defined');

        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Object|!Function|!Array|!Arguments|string');
        if ( !$is.fun(iteratee) )
          throw $typeErr(new TypeError, 'iteratee', iteratee,
           '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');

        return $is._arr(source)
          ? _remapArr(source, iteratee, NONE)
          : _remapObj(source, iteratee, NONE);

      case 3:
        if ( $is.str(source) )
          return _remapStr(source, iteratee, replacement, NONE);
        break;

      default:
        if ( $is.str(source) ) {
          if ( !$isNilNone.obj(thisArg) )
            throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=');

          return _remapStr(source, iteratee, replacement, thisArg);
        }
        break;
    }

    thisArg = replacement;

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '!Object|!Function|!Array|!Arguments|string');
    if ( !$is.fun(iteratee) )
      throw $typeErr(new TypeError, 'iteratee', iteratee,
        '!function(*=, (string|number)=, (!Object|!Function|!Array)=): *');
    if ( !$isNilNone.obj(thisArg) )
      throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=');

    return $is._arr(source)
      ? _remapArr(source, iteratee, thisArg)
      : _remapObj(source, iteratee, thisArg);
  }

  /// {{{2
  /// @method remap.object
  /// @alias remap.obj
  /**
   * A shortcut for making a new `object` with the same [owned][own] property
   * key names as an existing `object` or `function` and new values set by
   * invoking an action with an #iteratee `function` upon each [owned][own]
   * property of the existing `object`.
   *
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
  function remapObject(source, iteratee, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'object');

      case 1:
        throw $err(new Error, 'no #iteratee defined', 'object');

      case 2:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'object');
        if ( !$is.fun(iteratee) )
          throw $typeErr(new TypeError, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');

        return _remapObj(source, iteratee, NONE);

      default:
        if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source, '!Object|!Function',
            'object');
        if ( !$is.fun(iteratee) )
          throw $typeErr(new TypeError, 'iteratee', iteratee,
            '!function(*=, string=, (!Object|!Function)=): *', 'object');
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'object');

        return _remapObj(source, iteratee, thisArg);
    }
  }
  remap['object'] = remapObject;
  remap['obj'] = remapObject;

  /// {{{2
  /// @method remap.array
  /// @alias remap.arr
  /**
   * A shortcut for making a new `array` with the same [length][arr-length] of
   * indexed properties as an existing `array` or array-like `object` and with
   * new property values set by invoking an action with an #iteratee
   * `function` upon each indexed property of the existing `array` or
   * `object`.
   *
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
  function remapArray(source, iteratee, thisArg) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'array');

      case 1:
        throw $err(new Error, 'no #iteratee defined', 'array');

      case 2:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        if ( !$is.fun(iteratee) )
          throw $typeErr(new TypeError, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');

        len = source['length'];

        if ( !$is.num(len) )
          throw $typeErr(new TypeError, 'source.length', len, 'number',
            'array');
        if ( !$is.whole(len) || len < 0 )
          throw $err(new Error, 'invalid #source.length `number` (' +
            'must be `0` or a positive whole `number`)', 'array');

        return _remapArr(source, iteratee, NONE);

      default:
        if ( $is.str(source) )
          source = $splitKeys(source);
        else if ( !$is._obj(source) )
          throw $typeErr(new TypeError, 'source', source,
            '!Array|!Arguments|!Object|!Function|string', 'array');
        if ( !$is.fun(iteratee) )
          throw $typeErr(new TypeError, 'iteratee', iteratee,
            '!function(*=, number=, !Array=): *', 'array');
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'array');

        len = source['length'];

        if ( !$is.num(len) )
          throw $typeErr(new TypeError, 'source.length', len, 'number',
            'array');
        if ( !$is.whole(len) || len < 0 )
          throw $err(new Error, 'invalid #source.length `number` (' +
            'must be `0` or a positive whole `number`)', 'array');

        return _remapArr(source, iteratee, thisArg);
    }
  }
  remap['array'] = remapArray;
  remap['arr'] = remapArray;

  /// {{{2
  /// @method remap.string
  /// @alias remap.str
  /**
   * A shortcut for replacing each matching `substring` with a new `substring`
   * within a #source `string`.
   *
   * @public
   * @param {string} source
   * @param {*} pattern
   *   The #pattern must be a `substring` pattern to search for within the
   *   #source. If the #pattern is **not** a `RegExp`, it is converted into
   *   a `string` with [String()][string] before running a search on the
   *   #source for any matches. Note that a `string` #pattern will replace all
   *   of the `substring` matches in the #source (i.e. not just the first). To
   *   replace only one match use a `RegExp` #pattern that does not have the
   *   [global flag][global] set, a `RegExp` #pattern with an altered
   *   [lastIndex property][lastIndex], or a `function` #replacement that uses
   *   your own logic to decide whether to replace each #pattern occurrence.
   * @param {*} replacement
   *   If the #replacement is **not** a `function`, it is converted into a
   *   `string` with [String()][string]. If the #replacement is a `function`,
   *   it operates the same as any `function` parameter specified for
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
  function remapString(source, pattern, replacement, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'string');

      case 1:
        throw $err(new Error, 'no #pattern defined', 'string');

      case 2:
        throw $err(new Error, 'no #replacement defined', 'string');

      case 3:
        if ( !$is.str(source) )
          throw $typeErr(new TypeError, 'source', source, 'string', 'string');

        return _remapStr(source, pattern, replacement, NONE);

      default:
        if ( !$is.str(source) )
          throw $typeErr(new TypeError, 'source', source, 'string', 'string');
        if ( !$isNilNone.obj(thisArg) )
          throw $typeErr(new TypeError, 'thisArg', thisArg, '?Object=',
            'string');

        return _remapStr(source, pattern, replacement, thisArg);
    }
  }
  remap['string'] = remapString;
  remap['str'] = remapString;

  ///////////////////////////////////////////////////// {{{2
  // REMAP HELPERS - MAIN
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _remapObj
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
      source = copy(source);
    if ( !$is.none(thisArg) )
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

  /// {{{3
  /// @func _remapArr
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
      source = copy['array'](source);
    if ( !$is.none(thisArg) )
      iteratee = _bindIteratee(iteratee, thisArg);

    len = source['length'];
    arr = new Array(len);
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

  /// {{{3
  /// @func _remapStr
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
      if ( !$is.str(pattern) )
        pattern = String(pattern);
      else if (!pattern)
        return source;
      pattern = $escape(pattern);
      pattern = new RegExp(pattern, 'g');
    }

    if ( $is.fun(replacement) ) {
      if ( !$is.none(thisArg) )
        replacement = _bindReplacement(replacement, thisArg);
    }
    else if ( !$is.str(replacement) )
      replacement = String(replacement);

    return source['replace'](pattern, replacement);
  }

  ///////////////////////////////////////////////////// {{{2
  // REMAP HELPERS - GENERAL
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const NONE
  /**
   * @private
   * @const {undefined}
   */
  var NONE = (function(){})();

  /// {{{3
  /// @func _bindIteratee
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

  /// {{{3
  /// @func _bindReplacement
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

  ///////////////////////////////////////////////////// {{{2
  // REMAP HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('remap');

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

  // END OF PRIVATE SCOPE FOR VITALS.REMAP
  return remap;
})();
/// }}}1

module.exports = remap;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
