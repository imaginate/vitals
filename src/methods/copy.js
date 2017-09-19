/**
 * ---------------------------------------------------------------------------
 * VITALS.COPY
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.copy](https://github.com/imaginate/vitals/wiki/vitals.copy)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #include @helper $merge ../helpers/merge.js
/// #include @helper $inStr ../helpers/in-str.js
/// #include @helper $getFlags ../helpers/get-flags.js
/// #include @helper $cloneRegx ../helpers/clone-regx.js
/// #if}}} @scope SOLO

/// #{{{ @super copy
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$VITALS['copy'] = (function __vitalsCopy__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs copy
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
  /// #if}}} @docrefs copy

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.copy
  /// @alias vitals.copy.main
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
  /// #}}} @docs main
  /// #if{{{ @code main
  function copy(val, deep) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_MAIN.noArg(new $ERR, 'val');
      case 1:
        deep = $NO;
        break;
      default:
        if ( $is.void(deep) ) {
          deep = $NO;
        }
        else if ( !$is.bool(deep) ) {
          throw _MKERR_MAIN.type(new $TYPE_ERR, 'deep', deep, 'boolean=');
        }
    }

    return !$is._obj(val)
      ? val
      : $is.fun(val)
        ? _copyFunc(val, deep)
        : $is._arr(val)
          ? _copyArr(val, deep)
          : $is.regx(val)
            ? _copyRegex(val, $VOID)
            : _copyObj(val, deep);  
  }
  copy['main'] = copy;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// #{{{ @docs object
  /// @section base
  /// @method vitals.copy.object
  /// @alias vitals.copy.obj
  /**
   * @description
   *   Makes a [copy][clone] of an `object`. By default it shallowly copies
   *   all [owned][own] properties of the #source with the option to deeply
   *   [copy][clone] them as well.
   * @public
   * @param {(!Object|!Function)} source
   * @param {boolean=} deep = `false`
   *   Whether to recursively [copy][clone] the #source property values.
   * @return {!Object}
   *   A new `object` [copied][clone] from the #source.
   */
  /// #}}} @docs object
  /// #if{{{ @code object
  function copyObject(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_OBJ.noArg(new $ERR, 'source');
      case 1:
        deep = $NO;
        break;
      default:
        if ( $is.void(deep) ) {
          deep = $NO;
        }
        else if ( !$is.bool(deep) ) {
          throw _MKERR_OBJ.type(new $TYPE_ERR, 'deep', deep, 'boolean=');
        }
    }

    if ( !$is.obj(source) && !$is.fun(source) ) {
      throw _MKERR_OBJ.type(new $TYPE_ERR, 'source', source,
        '!Object|!Function');
    }

    return _copyObj(source, deep);
  }
  copy['object'] = copyObject;
  copy['obj'] = copyObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// #{{{ @docs array
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
  /// #}}} @docs array
  /// #if{{{ @code array
  function copyArray(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_ARR.noArg(new $ERR, 'source');
      case 1:
        deep = $NO;
        break;
      default:
        if ( $is.void(deep) ) {
          deep = $NO;
        }
        else if ( !$is.bool(deep) ) {
          throw _MKERR_ARR.type(new $TYPE_ERR, 'deep', deep, 'boolean=');
        }
    }

    if ( !$is.obj(source) ) {
      throw _MKERR_ARR.type(new $TYPE_ERR, 'source', source,
        '(!Array|!Arguments|!Object)');
    }
    if ( !$is.arrish(source) ) {
      throw _MKERR_ARR.arrLike(new $ERR, 'source', source);
    }

    return _copyArr(source, deep);
  }
  copy['array'] = copyArray;
  copy['arr'] = copyArray;
  copy['args'] = copyArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// #{{{ @docs regexp
  /// @section base
  /// @method vitals.copy.regexp
  /// @alias vitals.copy.regex
  /// @alias vitals.copy.regx
  /// @alias vitals.copy.re
  /**
   * @description
   *   Makes a [copy][clone] of a `RegExp`.
   * @public
   * @param {!RegExp} source
   * @param {(string|undefined)=} flags = `undefined`
   *   The #flags allows you to override the #source `RegExp` flags when
   *   [copying][clone] it. If the #flags is `undefined`, the original #source
   *   flags are used. If the #flags `string` does **not** start with a plus
   *   sign (e.g. `"+"`) or minus sign (e.g. `"-"`), the #flags value is used
   *   for the [copied][clone] `RegExp`. Otherwise, the #flags `string` is
   *   parsed according to the following rules:
   *   - Each series of flag characters following a plus sign, `"+"`, are
   *     enabled for the [copied][clone] `RegExp`.
   *   - Each series of flag characters following a minus sign, `"-"`, are
   *     disabled for the [copied][clone] `RegExp`.
   * @return {!RegExp}
   *   A new `RegExp` with the [RegExp.prototype.source][regex-source] value
   *   and the `RegExp` flag settings of the #source `RegExp` (with exception
   *   to any overridden flags by a #flags `string`).
   */
  /// #}}} @docs regexp
  /// #if{{{ @code regexp
  function copyRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_REGX.noArg(new $ERR, 'source');
      case 1:
        flags = $VOID;
        break;
      default:
        if ( $is.str(flags) ) {
          if ( !$is.flags(flags) ) {
            throw _MKERR_REGX.range(new $RANGE_ERR, 'flags', $is.flags.SRC);
          }
        }
        else if ( !$is.void(flags) ) {
          throw _MKERR_REGX.type(new $TYPE_ERR, 'flags', flags, 'string=');
        }
    }

    if ( !$is.regx(source) ) {
      throw _MKERR_REGX.type(new $TYPE_ERR, 'source', source, '!RegExp');
    }

    return _copyRegex(source, flags);
  }
  copy['regexp'] = copyRegExp;
  copy['regex'] = copyRegExp;
  copy['regx'] = copyRegExp;
  copy['re'] = copyRegExp;
  /// #if}}} @code regexp
  /// #}}} @submethod regexp

  /// #{{{ @submethod func
  /// #{{{ @docs func
  /// @section base
  /// @method vitals.copy.func
  /// @alias vitals.copy.fun
  /// @alias vitals.copy.fn
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
   *   [name property][func-name] will be set to `"funCopy"` for
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
  /// #}}} @docs func
  /// #if{{{ @code func
  function copyFunction(source, deep) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_FUN.noArg(new $ERR, 'source');
      case 1:
        deep = $NO;
        break;
      default:
        if ( $is.void(deep) ) {
          deep = $NO;
        }
        else if ( !$is.bool(deep) ) {
          throw _MKERR_FUN.type(new $TYPE_ERR, 'deep', deep, 'boolean=');
        }
    }

    if ( !$is.fun(source) ) {
      throw _MKERR_FUN.type(new $TYPE_ERR, 'source', source, '!Function');
    }

    return _copyFunc(source, deep);
  }
  copy['func'] = copyFunction;
  copy['fun'] = copyFunction;
  copy['fn'] = copyFunction;
  try {
    copy['function'] = copyFunction;
  }
  catch (e) {}
  /// #if}}} @code func
  /// #}}} @submethod func

  /// #if{{{ @helpers copy

  /// #{{{ @group main

  /// #{{{ @func _copyObj
  /**
   * @private
   * @param {(!Object|!Function)} src
   * @param {boolean} deep
   * @return {!Object}
   */
  function _copyObj(src, deep) {
    return deep
      ? _mergeDeep({}, src)
      : $merge({}, src);
  }
  /// #}}} @func _copyObj

  /// #{{{ @func _copyArr
  /**
   * @private
   * @param {(!Array|!Arguments|!Object)} src
   * @param {boolean} deep
   * @return {!Array}
   */
  function _copyArr(src, deep) {

    /** @type {!Array} */
    var arr;

    arr = new $ARR(src['length']);
    return deep
      ? _mergeDeep(arr, src)
      : $merge(arr, src);
  }
  /// #}}} @func _copyArr

  /// #{{{ @func _copyRegex
  /**
   * @private
   * @param {!RegExp} src
   * @param {(string|undefined)} flags
   * @return {!RegExp}
   */
  function _copyRegex(src, flags) {

    /** @type {string} */
    var flags;

    flags = _getFlags(src, flags);
    return $cloneRegx(src, flags);
  }
  /// #}}} @func _copyRegex

  /// #{{{ @func _copyFunc
  /**
   * @private
   * @param {!Function} func
   * @param {boolean} deep
   * @return {!Function}
   */
  function _copyFunc(func, deep) {

    /** @type {!Function} */
    function funCopy() {
      return func['apply']($NIL, arguments);
    }

    return deep
      ? _mergeDeep(funCopy, func)
      : $merge(funCopy, func);
  }
  /// #}}} @func _copyFunc

  /// #}}} @group main

  /// #{{{ @group regexp

  /// #{{{ @const _MOD_FLAGS
  /**
   * @private
   * @const {!RegExp}
   */
  var _MOD_FLAGS = /^[\+\-]/;
  /// #}}} @const _MOD_FLAGS

  /// #{{{ @func _addFlags
  /**
   * @private
   * @param {!Object<string, boolean>} FLAGS
   * @param {!Array<string>} flags
   * @return {!Object<string, boolean>}
   */
  function _addFlags(FLAGS, flags) {

    /** @type {string} */
    var flag;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = flags['length'];
    i = -1;
    while (++i < len) {
      flag = flags[i];
      FLAGS[flag] = $YES;
    }
    return FLAGS;
  }
  /// #}}} @func _addFlags

  /// #{{{ @func _getFlags
  /**
   * @private
   * @param {!RegExp} src
   * @param {(string|undefined)} flags
   * @return {string}
   */
  function _getFlags(src, flags) {

    /** @type {string} */
    var flag;

    if ( $is.void(flags) ) {
      return $getFlags(src);
    }

    if ( !_MOD_FLAGS['test'](flags) ) {
      return flags;
    }

    /// #{{{ @const FLAGS
    /**
     * @private
     * @const {!Object<string, boolean>}
     */
    var FLAGS = _mkFlags(src);
    /// #}}} @const FLAGS

    /// #{{{ @func _modFlags
    /**
     * @private
     * @param {string} match
     * @param {string} sign
     * @param {string} flags
     * @return {string}
     */
    function _modFlags(match, sign, flags) {

      /** @type {!Array<string>} */
      var flagsArray;

      flagsArray = flags['split']('');

      if (sign === '+') {
        _addFlags(FLAGS, flagsArray);
      }
      else {
        _rmFlags(FLAGS, flagsArray);
      }

      return '';
    }
    /// #}}} @func _modFlags

    flags.replace(/([\+\-])([imgyu]+)/g, _modFlags);

    flags = '';
    for (flag in FLAGS) {
      if ( $own(FLAGS, flag) && FLAGS[flag] && !$inStr(flags, flag) ) {
        flags += flag;
      }
    }
    return flags;
  }
  /// #}}} @func _getFlags

  /// #{{{ @func _mkFlags
  /**
   * @private
   * @param {!RegExp} src
   * @return {!Object<string, string>}
   */
  function _mkFlags(src) {

    /** @type {!Object<string, boolean>} */
    var result;
    /** @type {!Array<string>} */
    var flags;
    /** @type {string} */
    var flag;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = {};
    flags = $getFlags(src)['split']('');
    len = flags['length'];
    i = -1;
    while (++i < len) {
      flag = flags[i];
      result[flag] = $YES;
    }
    return result;
  }
  /// #}}} @func _mkFlags

  /// #{{{ @func _rmFlags
  /**
   * @private
   * @param {!Object<string, boolean>} FLAGS
   * @param {!Array<string>} flags
   * @return {!Object<string, boolean>}
   */
  function _rmFlags(FLAGS, flags) {

    /** @type {string} */
    var flag;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = flags['length'];
    i = -1;
    while (++i < len) {
      flag = flags[i];
      FLAGS[flag] = $NO;
    }
    return FLAGS;
  }
  /// #}}} @func _rmFlags

  /// #}}} @group regexp

  /// #{{{ @group merge

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
        dest[key] = copy(source[key], $YES);
    }
    return dest;
  }
  /// #}}} @func _mergeDeep

  /// #}}} @group merge

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('copy');
  /// #}}} @const _MKERR_MAIN

  /// #{{{ @const _MKERR_OBJ
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_OBJ = $mkErr('copy', 'object');
  /// #}}} @const _MKERR_OBJ

  /// #{{{ @const _MKERR_ARR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ARR = $mkErr('copy', 'array');
  /// #}}} @const _MKERR_ARR

  /// #{{{ @const _MKERR_REGX
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_REGX = $mkErr('copy', 'regexp');
  /// #}}} @const _MKERR_REGX

  /// #{{{ @const _MKERR_FUN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_FUN = $mkErr('copy', 'function');
  /// #}}} @const _MKERR_FUN

  /// #}}} @group errors

  /// #if}}} @helpers copy

/// #ifnot{{{ @scope DOCS_ONLY
  return copy;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super copy

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
