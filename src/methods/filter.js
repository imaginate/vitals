/**
 * ---------------------------------------------------------------------------
 * VITALS.FILTER
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.filter](https://github.com/imaginate/vitals/wiki/vitals.filter)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #include @helper $bind ../helpers/bind.js
/// #include @helper $cloneArr ../helpers/clone-arr.js
/// #include @helper $cloneFun ../helpers/clone-fun.js
/// #include @helper $cloneObj ../helpers/clone-obj.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #if}}} @scope SOLO

/// #{{{ @super filter
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @type {!Function}
 * @dict
 */
$VITALS['filter'] = (function __vitalsFilter__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs filter
  /// @docref [del]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [bind]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  /// @docref [call]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  /// @docref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  /// @docref [this]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
  /// @docref [type]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [minify]:(https://en.wikipedia.org/wiki/Minification_(programming))
  /// @docref [splice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  /// @docref [func-name]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #if}}} @docrefs filter

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.filter
  /// @alias vitals.filter.main
  /**
   * @description
   *   The @filter#main method removes properties from an `object`, `array`,
   *   or `function` based on the results of a user-defined #validator.
   * @public
   * @param {(!Object|!Function|!Array|!Arguments)} source
   *   If the #source is an `arguments` instance, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {!function(*=, (number|string)=, (!Object|!Function|!Array)=): *} validator
   *   The details for the #validator are as follows (per #source data type):
   *   - *`!Object|!Function`*!$
   *     The #validator is called once for each [owned][own] property within
   *     the #source in no specific order. If the `boolean` conversion of the
   *     value returned by the #validator is `false`, the property is
   *     [deleted][del] from the #source. The #validator has the following
   *     optional parameters:
   *     - **propValue** *`*`*
   *     - **propKey** *`string`*
   *     - **clonedSource** *`!Object|!Function`*
   *   - *`!Array|!Arguments`*!$
   *     The #validator is called once for each indexed property within the
   *     #source in reverse order (i.e. from `source.length - 1` to `0`). If
   *     the `boolean` conversion of the value returned by the #validator is
   *     `false`, the property is [spliced][splice] from the #source. The
   *     #validator has the following optional parameters:
   *     - **propValue** *`*`*
   *     - **propIndex** *`number`*
   *     - **clonedSource** *`!Array`*
   *   Note that @filter#main lazily [clones][clone] the #source with
   *   @copy#main based on if the value of the #validator
   *   [length property][func-length] is greater than `2` (i.e. it will
   *   **not** clone the #source unless the #validator length is greater than
   *   `2`). If you alter any #source property within the #validator, make
   *   sure you define all three parameters for the #validator so you can
   *   safely assume all references to the #source are its original values.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #validator is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is **not** used to bind the
   *   #validator. Instead the #validator `function` is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to call
   *   the #validator with #thisArg.
   * @return {(!Object|!Function|!Array)}
   *   The amended #source.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function filter(source, validator, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_MAIN.noArg(new $ERR, 'source');
      case 1:
        throw _MKERR_MAIN.noArg(new $ERR, 'validator');
      case 2:
        thisArg = $VOID;
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) ) {
          throw _MKERR_MAIN.type(new $TYPE_ERR, 'thisArg', thisArg,
            '?Object=');
        }
    }

    if ( !$is._obj(source) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'source', source,
        '!Object|!Function|!Array|!Arguments');
    }
    if ( !$is.fun(validator) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'validator', validator,
        '!function(*=, number|string=, !Object|!Function|!Array=): *');
    }

    if ( $is.args(source) ) {
      source = $sliceArr(source);
      return _filterArr(source, validator, thisArg);
    }

    return $is.arr(source)
      ? _filterArr(source, validator, thisArg)
      : _filterObj(source, validator, thisArg);
  }
  filter['main'] = filter;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// #{{{ @docs object
  /// @section base
  /// @method vitals.filter.object
  /// @alias vitals.filter.obj
  /**
   * @description
   *   The @filter#object method removes [owned][own] properties from an
   *   `object` or `function` based on the results of a user-defined
   *   #validator.
   * @public
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} validator
   *   The #validator is called once for each [owned][own] property within the
   *   #source in no specific order. If the `boolean` conversion of the value
   *   returned by the #validator is `false`, the property is [deleted][del]
   *   from the #source. The #validator has the following optional parameters:
   *   - **propValue** *`*`*
   *   - **propKey** *`string`*
   *   - **clonedSource** *`!Object|!Function`*
   *   Note that @filter#object lazily [clones][clone] the #source with
   *   @copy#object or @copy#func based on if the value of the #validator
   *   [length property][func-length] is greater than `2` (i.e. it will
   *   **not** clone the #source unless the #validator length is greater than
   *   `2`). If you alter any #source property within the #validator, make
   *   sure you define all three parameters for the #validator so you can
   *   safely assume all references to the #source are its original values.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #validator is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is **not** used to bind the
   *   #validator. Instead the #validator `function` is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to call
   *   the #validator with #thisArg.
   * @return {(!Object|!Function)}
   *   The amended #source.
   */
  /// #}}} @docs object
  /// #if{{{ @code object
  function filterObject(source, validator, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_OBJ.noArg(new $ERR, 'source');
      case 1:
        throw _MKERR_OBJ.noArg(new $ERR, 'validator');
      case 2:
        thisArg = $VOID;
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) ) {
          throw _MKERR_OBJ.type(new $TYPE_ERR, 'thisArg', thisArg,
            '?Object=');
        }
    }

    if ( !$is._obj(source) ) {
      throw _MKERR_OBJ.type(new $TYPE_ERR, 'source', source,
        '!Object|!Function');
    }
    if ( !$is.fun(validator) ) {
      throw _MKERR_OBJ.type(new $TYPE_ERR, 'validator', validator,
        '!function(*=, string=, !Object|!Function=): *');
    }

    return _filterObj(source, validator, thisArg);
  }
  filter['object'] = filterObject;
  filter['obj'] = filterObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// #{{{ @docs array
  /// @section base
  /// @method vitals.filter.array
  /// @alias vitals.filter.arr
  /**
   * @description
   *   The @filter#array method removes indexed properties from an `array` or
   *   array-like `object` or `function` based on the results of a
   *   user-defined #validator.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it has a
   *   `"length"` property that is a whole `number` greater than or equal to
   *   zero. If an array-like #source is defined, it is [sliced][slice] into
   *   an `array` before any values are removed.
   * @param {!function(*=, number=, !Array=): *} validator
   *   The #validator is called once for each indexed property within the
   *   #source in reverse order (i.e. from `source.length - 1` to `0`). If the
   *   `boolean` conversion of the value returned by the #validator is
   *   `false`, the property is [spliced][splice] from the #source. The
   *   #validator has the following optional parameters:
   *   - **propValue** *`*`*
   *   - **propIndex** *`number`*
   *   - **clonedSource** *`!Array`*
   *   Note that @filter#array lazily [clones][clone] the #source with
   *   @copy#array based on if the value of the #validator
   *   [length property][func-length] is greater than `2` (i.e. it will
   *   **not** clone the #source unless the #validator length is greater than
   *   `2`). If you alter any #source property within the #validator, make
   *   sure you define all three parameters for the #validator so you can
   *   safely assume all references to the #source are its original values.
   * @param {?Object=} thisArg
   *   If #thisArg is defined, the #validator is bound to its value. Note that
   *   the native [Function.prototype.bind][bind] is **not** used to bind the
   *   #validator. Instead the #validator `function` is wrapped with a regular
   *   new [Function][func] that uses [Function.prototype.call][call] to call
   *   the #validator with #thisArg.
   * @return {!Array}
   *   The amended #source.
   */
  /// #}}} @docs array
  /// #if{{{ @code array
  function filterArray(source, validator, thisArg) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_ARR.noArg(new $ERR, 'source');
      case 1:
        throw _MKERR_ARR.noArg(new $ERR, 'validator');
      case 2:
        thisArg = $VOID;
        break;
      default:
        if ( !$is.nil(thisArg) && !$is.void(thisArg) && !$is.obj(thisArg) ) {
          throw _MKERR_ARR.type(new $TYPE_ERR, 'thisArg', thisArg,
            '?Object=');
        }
    }

    if ( !$is._obj(source) ) {
      throw _MKERR_ARR.type(new $TYPE_ERR, 'source', source,
        '!Array|!Arguments|!Object|!Function');
    }
    if ( !$is.arrish(source) ) {
      throw _MKERR_ARR.arrLike(new $ERR, 'source', source);
    }
    if ( !$is.fun(validator) ) {
      throw _MKERR_ARR.type(new $TYPE_ERR, 'validator', validator,
        '!function(*=, number=, !Array=): *');
    }

    if ( !$is.arr(source) ) {
      source = $sliceArr(source);
    }

    return _filterArr(source, validator, thisArg);
  }
  filter['array'] = filterArray;
  filter['arr'] = filterArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #if{{{ @helpers filter

  /// #{{{ @group main

  /// #{{{ @func _filterObj
  /**
   * @private
   * @param {(!Object|!Function)} source
   * @param {!function(*=, string=, (!Object|!Function)=): *} validator
   * @param {(?Object|?undefined)} thisArg
   * @return {(!Object|!Function)}
   */
  function _filterObj(source, validator, thisArg) {

    /** @type {(!Object|!Function)} */
    var src;
    /** @type {string} */
    var key;

    if ( !$is.void(thisArg) ) {
      validator = $bind(validator, thisArg);
    }

    switch (validator['length']) {
      case 0:
        for (key in source) {
          if ( $own(source, key) && !validator() ) {
            delete source[key];
          }
        }
        break;
      case 1:
        for (key in source) {
          if ( $own(source, key) && !validator(source[key]) ) {
            delete source[key];
          }
        }
        break;
      case 2:
        for (key in source) {
          if ( $own(source, key) && !validator(source[key], key) ) {
            delete source[key];
          }
        }
        break;
      default:
        src = $is.fun(source)
          ? $cloneFun(source)
          : $cloneObj(source);
        for (key in src) {
          if ( $own(src, key) && !validator(src[key], key, src) ) {
            delete source[key];
          }
        }
    }

    return source;
  }
  /// #}}} @func _filterObj

  /// #{{{ @func _filterArr
  /**
   * @private
   * @param {!Array} source
   * @param {!function(*=, number=, !Array=): *} validator
   * @param {(?Object|?undefined)} thisArg
   * @return {!Array}
   */
  function _filterArr(source, validator, thisArg) {

    /** @type {!Array} */
    var src;
    /** @type {number} */
    var i;

    if ( !$is.void(thisArg) ) {
      validator = $bind(validator, thisArg);
    }

    i = src['length'];

    switch (validator['length']) {
      case 0:
        while (i--) {
          if ( !validator() ) {
            source['splice'](i, 1);
          }
        }
        break;
      case 1:
        while (i--) {
          if ( !validator(source[i]) ) {
            source['splice'](i, 1);
          }
        }
        break;
      case 2:
        while (i--) {
          if ( !validator(source[i], i) ) {
            source['splice'](i, 1);
          }
        }
        break;
      default:
        src = $cloneArr(source);
        while (i--) {
          if ( !validator(src[i], i, src) ) {
            source['splice'](i, 1);
          }
        }
    }

    return source;
  }
  /// #}}} @func _filterArr

  /// #}}} @group main

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('filter');
  /// #}}} @const _MKERR_MAIN

  /// #{{{ @const _MKERR_OBJ
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_OBJ = $mkErr('filter', 'object');
  /// #}}} @const _MKERR_OBJ

  /// #{{{ @const _MKERR_ARR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ARR = $mkErr('filter', 'array');
  /// #}}} @const _MKERR_ARR

  /// #}}} @group errors

  /// #if}}} @helpers filter

/// #ifnot{{{ @scope DOCS_ONLY
  return filter;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super filter

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
