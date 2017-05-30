/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $inStr ../helpers/in-str.js
/// #}}} @on SOLO

/// #{{{ @super copy
/**
 * @public
 * @type {!Function<string, !Function>}
 * @dict
 */
var copy = (function copyPrivateScope() {

  /// #{{{ @docrefs copy
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
  /// @docref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// @docref [regex-global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  /// @docref [regex-source]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
  /// #}}} @docrefs copy

  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.copy
  /**
   * @description
   *   Makes a [copy][clone] of any value. Note that for `array` values @slice 
   *   only copies the indexed properties while @copy copies all of the
   *   properties.
   * @public
   * @param {*} val
   *   The value to copy.
   * @param {boolean=} deep = `false`
   *   Whether to recursively copy property values for an `object` or
   *   `function`.
   * @return {*}
   */
  function copy(val, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=');
    }

    return !$is._obj(val)
      ? val
      : $is.fun(val)
        ? _copyFunc(val, deep)
        : $is._arr(val)
          ? _copyArr(val, deep)
          : $is.regx(val)
            ? _copyRegex(val)
            : _copyObj(val, deep);  
  }
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// @section base
  /// @method vitals.copy.object
  /// @alias vitals.copy.obj
  /**
   * @description
   *   Makes a [copy][clone] of an `object`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well.
   * @public
   * @param {!Object} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Object}
   *   A new `object` [copied][clone] from the #source.
   */
  function copyObject(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'object');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Object', 'object');

    return _copyObj(source, deep);
  }
  copy['object'] = copyObject;
  copy['obj'] = copyObject;
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// @section base
  /// @method vitals.copy.array
  /// @alias vitals.copy.arr
  /// @alias vitals.copy.args
  /**
   * @description
   *   Makes a [copy][clone] of an `array` or array-like `object`. Note that
   *   @slice#array only copies the indexed properties while @copy#array
   *   copies all of the indexed and [owned][own] properties. By default it
   *   shallowly copies all of the #source properties with the option to
   *   deeply [copy][clone] them as well.
   * @public
   * @param {(!Array|!Arguments|!Object)} source
   *   Must be an `array` or array-like `object`. The #source is considered
   *   array-like when it [owns][own] a property with the `"length"` key name
   *   (e.g. `source.length` like the `array` [length property][arr-length])
   *   whose value is a whole `number` that is greater than or equal to zero
   *   (e.g. `isWholeNumber(source.length) && source.length >= 0`).
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Array}
   *   A new `array` [copied][clone] from the #source.
   */
  function copyArray(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=', 'array');
    }

    if ( !$is.obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '(!Array|!Arguments|!Object)', 'array');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return _copyArr(source, deep);
  }
  copy['array'] = copyArray;
  copy['arr'] = copyArray;
  copy['args'] = copyArray;
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// @section base
  /// @method vitals.copy.regexp
  /// @alias vitals.copy.regex
  /// @alias vitals.copy.re
  /**
   * @description
   *   Makes a [copy][clone] of a `RegExp`.
   * @public
   * @param {!RegExp} source
   * @param {(boolean|undefined)=} forceGlobal = `undefined`
   *   Override the [global setting][regex-global] for the returned `RegExp`.
   *   If the #forceGlobal is `undefined`, the [global setting][regex-global]
   *   from the #source is used.
   * @return {!RegExp}
   *   A new `RegExp` with the [RegExp.prototype.source][regex-source] value
   *   and the `RegExp` flag settings of the provided #source `RegExp`.
   */
  function copyRegExp(source, forceGlobal) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');
      case 1:
        break;
      default:
        if ( !$is.void(forceGlobal) && !$is.bool(forceGlobal) )
          throw _mkTypeErr(new TYPE_ERR, 'forceGlobal', forceGlobal,
            'boolean=', 'regexp');
    }

    if ( !$is.regx(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!RegExp', 'regexp');

    return _copyRegex(source, forceGlobal);
  }
  copy['regexp'] = copyRegExp;
  copy['regex'] = copyRegExp;
  copy['re'] = copyRegExp;
  /// #}}} @submethod regexp

  /// #{{{ @submethod func
  /// @section base
  /// @method vitals.copy.fn
  /// @alias vitals.copy.function
  ///   Note that `vitals.copy.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use `vitals.copy.func` for
  ///   compatibility with older environments.
  /**
   * @description
   *   Makes a [copy][clone] of a `function`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well. Note that the
   *   [length property][func-length] will be set to `0` and the
   *   [name property][func-name] will be set to `"funcCopy"` for
   *   [unminified][minify] `vitals` sources. Also note that
   *   `vitals.copy.function` is not valid in [ES3][ecma3] and some
   *   [ES5][ecma5] browser and other platform environments. Use
   *   `vitals.copy.func` for browser and platform safety.
   * @public
   * @param {!Function} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Function}
   *   A new `function` [copied][clone] from the #source.
   */
  function copyFunction(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'function');
      case 1:
        break;
      default:
        if ( !$is.void(deep) && !$is.bool(deep) )
          throw _mkTypeErr(new TYPE_ERR, 'deep', deep, 'boolean=',
            'function');
    }

    if ( !$is.fun(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Function',
        'function');

    return _copyFunc(source, deep);
  }
  copy['func'] = copyFunction;
  try {
    copy['fn'] = copyFunction;
    copy['function'] = copyFunction;
  }
  catch (e) {}
  /// #}}} @submethod func

  /// #{{{ @group Copy-Helpers

  /// #{{{ @group Main-Helpers

  /// #{{{ @func _copyObj
  /**
   * @private
   * @param {!Object} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Object}
   */
  function _copyObj(obj, deep) {
    return deep
      ? _mergeDeep({}, obj)
      : $merge({}, obj);
  }
  /// #}}} @func _copyObj

  /// #{{{ @func _copyArr
  /**
   * @private
   * @param {!Object} obj
   * @param {(boolean|undefined)=} deep
   * @return {!Array}
   */
  function _copyArr(obj, deep) {

    /** @type {!Array} */
    var arr;

    arr = new ARR(obj['length']);
    return deep
      ? _mergeDeep(arr, obj)
      : $merge(arr, obj);
  }
  /// #}}} @func _copyArr

  /// #{{{ @func _copyRegex
  /**
   * @private
   * @param {!RegExp} regex
   * @param {(boolean|undefined)=} forceGlobal
   * @return {!RegExp}
   */
  function _copyRegex(regex, forceGlobal) {

    /** @type {string} */
    var source;
    /** @type {string} */
    var flags;

    source = _escape(regex['source']);
    flags = _setupFlags(regex, forceGlobal);

    return flags
      ? new REGX(source, flags)
      : new REGX(source);
  }
  /// #}}} @func _copyRegex

  /// #{{{ @func _copyFunc
  /**
   * @private
   * @param {!Function} func
   * @param {(boolean|undefined)=} deep
   * @return {!Function}
   */
  function _copyFunc(func, deep) {

    /** @type {!Function} */
    function funcCopy() {
      return func['apply'](NIL, arguments);
    }

    return deep
      ? _mergeDeep(funcCopy, func)
      : $merge(funcCopy, func);
  }
  /// #}}} @func _copyFunc

  /// #}}} @group Main-Helpers

  /// #{{{ @group RegExp-Helpers

  /// #{{{ @const _FLAGS
  /**
   * @private
   * @const {!Object<string, string>}
   * @dict
   */
  var _FLAGS = (function _FLAGS_PrivateScope() {

    /**
     * @type {!Object<string, string>}
     * @dict
     */
    var flags;

    flags = {};
    flags['ignoreCase'] = 'i';
    flags['multiline'] = 'm';
    flags['global'] = 'g';

    if ('sticky' in REGX_PROTO)
      flags['sticky'] = 'y';
    if ('unicode' in REGX_PROTO)
      flags['unicode'] = 'u';

    return flags;
  })();
  /// #}}} @const _FLAGS

  /// #{{{ @func _escape
  /**
   * @description
   *   Returns a properly escaped [RegExp.prototype.source][regex-source].
   * @private
   * @param {string} source
   * @return {string}
   */
  var _escape = (function() {

    /** @type {?RegExp} */
    var pattern;

    pattern = /\n/['source'] !== '\\n'
      ? /\\/g
      : NIL;
    return pattern
      ? function _escape(source) {
          return source['replace'](pattern, '\\\\');
        }
      : function _escape(source) {
          return source;
        };
  })();
  /// #}}} @func _escape

  /// #{{{ @func _setupFlags
  /**
   * @private
   * @param {!RegExp} regex
   * @param {boolean=} forceGlobal
   * @return {string}
   */
  function _setupFlags(regex, forceGlobal) {

    /** @type {string} */
    var flags;
    /** @type {string} */
    var key;

    flags = '';
    for (key in _FLAGS) {
      if ( $own(_FLAGS, key) && regex[key] )
        flags += _FLAGS[key];
    }

    if ( $is.void(forceGlobal) )
      return flags;

    return $inStr(flags, 'g')
      ? forceGlobal
        ? flags
        : flags['replace']('g', '')
      : forceGlobal
        ? flags + 'g'
        : flags;
  }
  /// #}}} @func _setupFlags

  /// #}}} @group RegExp-Helpers

  /// #{{{ @group Merge-Helpers

  /// #{{{ @func _mergeDeep
  /**
   * @private
   * @param {(!Object|!Function)} dest
   * @param {(!Object|!Function)} source
   * @return {(!Object|!Function)}
   */
  function _mergeDeep(dest, source) {

    /** @type {string} */
    var key;

    for (key in source) {
      if ( $own(source, key) )
        dest[key] = copy(source[key], true);
    }
    return dest;
  }
  /// #}}} @func _mergeDeep

  /// #}}} @group Merge-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('copy');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Copy-Helpers

  return copy;
})();
/// #{{{ @off SOLO
vitals['copy'] = copy;
/// #}}} @off SOLO
/// #}}} @super copy

/// #{{{ @on SOLO
var vitals = copy;
vitals['copy'] = copy;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
