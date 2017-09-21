/**
 * ---------------------------------------------------------------------------
 * VITALS.IS
 * ---------------------------------------------------------------------------
 * @section base
 * @section strict
 * @section fs
 * @version 5.0.0
 * @see [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #if}}} @scope SOLO

/// #{{{ @super is
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$VITALS['is'] = (function __vitalsIs__() {

  /// #ifnot{{{ @scope IS_MAIN_ONLY
  /** @type {*} */
  var _e;
  /// #ifnot}}} @scope IS_MAIN_ONLY

/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs is
  /// @docref [arr]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)
  /// @docref [doc]:(https://developer.mozilla.org/en-US/docs/Web/API/Document)
  /// @docref [nan]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  /// @docref [num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
  /// @docref [obj]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Objects)
  /// @docref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  /// @docref [args]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
  /// @docref [date]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  /// @docref [elem]:(https://developer.mozilla.org/en-US/docs/Web/API/Element)
  /// @docref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Normal_objects_and_functions)
  /// @docref [null]:(https://developer.mozilla.org/en-US/docs/Glossary/null)
  /// @docref [prim]:(https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  /// @docref [void]:(https://developer.mozilla.org/en-US/docs/Glossary/undefined)
  /// @docref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
  /// @docref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
  /// @docref [regex]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  /// @docref [frozen]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
  /// @docref [str-prim]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
  /// @docref [obj-class]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  /// @docref [bool-desc]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#Description)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #if}}} @docrefs is

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.is
  /// @alias vitals.is.main
  /**
   * @description
   *   Checks if a value or many values are a specific data type or types. See
   *   @is-types for a complete list of the available data types. Note that
   *   all `object` types are nullable by default (i.e. `is("object", null)`
   *   will return  `true`).
   * @public
   * @param {string} types
   *   The valid data types. See @is-types for a complete list of the
   *   available data types.
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {?Array<!function>} */
    var checks;
    /** @type {boolean} */
    var vals;

    switch (arguments['length']) {
      case 0:
        throw _MKERR_MAIN.noArg(new $ERR, 'types');
      case 1:
        throw _MKERR_MAIN.noArg(new $ERR, 'val');
      case 2:
        vals = $NO;
        break;
      default:
        vals = $YES;
    }

    if ( !$is.str(types) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'types', types, 'string');
    }
    if (!types) {
      throw _MKERR_MAIN.misc(new $ERR, 'invalid empty #types `string`');
    }

    if ( _hasSpecial('*', types) ) {
      return $YES;
    }

    checks = _getChecks(types);

    if (!checks) {
      throw _MKERR_MAIN.range(new $RANGE_ERR, 'types',
        'https://github.com/imaginate/vitals/wiki/vitals.is-types');
    }

    nullable = _getNullable(types);
    return vals
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }
  is['main'] = is;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #ifnot{{{ @scope IS_MAIN_ONLY

  /// #{{{ @submethod null
  /// #{{{ @docs null
  /// @section base
  /// @method vitals.is.null
  /// @alias vitals.is.nil
  /**
   * @description
   *   Checks if a value or many values are [null][null].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs null
  /// #if{{{ @code null
  function isNull(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_NULL.noArg(new $ERR, 'val');
      case 1:
        return $is.nil(val);
    }

    while (i--) {
      if ( !$is.nil(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['null'] = isNull;
  is['nil'] = isNull;
  /// #if}}} @code null
  /// #}}} @submethod null

  /// #{{{ @submethod undefined
  /// #{{{ @docs undefined
  /// @section base
  /// @method vitals.is.undefined
  /// @alias vitals.is.void
  /**
   * @description
   *   Checks if a value or many values are [undefined][void].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs undefined
  /// #if{{{ @code undefined
  function isUndefined(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_VOID.noArg(new $ERR, 'val');
      case 1:
        return $is.void(val);
    }

    while (i--) {
      if ( !$is.void(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['undefined'] = isUndefined;
  is['void'] = isUndefined;
  /// #if}}} @code undefined
  /// #}}} @submethod undefined

  /// #{{{ @submethod boolean
  /// #{{{ @docs boolean
  /// @section base
  /// @method vitals.is.boolean
  /// @alias vitals.is.bool
  /**
   * @description
   *   Checks if a value or many values are a [primitive boolean][bool-desc]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs boolean
  /// #if{{{ @code boolean
  function isBoolean(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_BOOL.noArg(new $ERR, 'val');
      case 1:
        return $is.bool(val);
    }

    while (i--) {
      if ( !$is.bool(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['boolean'] = isBoolean;
  is['bool'] = isBoolean;
  /// #if}}} @code boolean
  /// #}}} @submethod boolean

  /// #{{{ @submethod string
  /// #{{{ @docs string
  /// @section base
  /// @method vitals.is.string
  /// @alias vitals.is.str
  /**
   * @description
   *   Checks if a value or many values are a [primitive string][str-prim]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs string
  /// #if{{{ @code string
  function isString(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_STR.noArg(new $ERR, 'val');
      case 1:
        return $is.str(val);
    }

    while (i--) {
      if ( !$is.str(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['string'] = isString;
  is['str'] = isString;
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #{{{ @submethod number
  /// #{{{ @docs number
  /// @section base
  /// @method vitals.is.number
  /// @alias vitals.is.num
  /**
   * @description
   *   Checks if a value or many values are a [primitive][prim] [number][num]
   *   data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs number
  /// #if{{{ @code number
  function isNumber(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_NUM.noArg(new $ERR, 'val');
      case 1:
        return $is.num(val);
    }

    while (i--) {
      if ( !$is.num(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['number'] = isNumber;
  is['num'] = isNumber;
  /// #if}}} @code number
  /// #}}} @submethod number

  /// #{{{ @submethod nan
  /// #{{{ @docs nan
  /// @section base
  /// @method vitals.is.nan
  /**
   * @description
   *   Checks if a value or many values are [NaN][nan].
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs nan
  /// #if{{{ @code nan
  function isNan(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_NAN.noArg(new $ERR, 'val');
      case 1:
        return $is.nan(val);
    }

    while (i--) {
      if ( !$is.nan(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['nan'] = isNan;
  /// #if}}} @code nan
  /// #}}} @submethod nan

  /// #{{{ @submethod object
  /// #{{{ @docs object
  /// @section base
  /// @method vitals.is.object
  /// @alias vitals.is.obj
  /**
   * @description
   *   Checks if a value or many values are an [object][obj] data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs object
  /// #if{{{ @code object
  function isObject(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_OBJ.noArg(new $ERR, 'val');
      case 1:
        return $is.obj(val);
    }

    while (i--) {
      if ( !$is.obj(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['object'] = isObject;
  is['obj'] = isObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod plain
  /// #{{{ @docs plain
  /// @section base
  /// @method vitals.is.plain
  /// @alias vitals.is.plainObject
  /// @alias vitals.is.plainobject
  /// @alias vitals.is.plainObj
  /// @alias vitals.is.plainobj
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [Object][obj-class] constructor.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs plain
  /// #if{{{ @code plain
  function isPlainObject(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_PLAIN.noArg(new $ERR, 'val');
      case 1:
        return $is.plain(val);
    }

    while (i--) {
      if ( !$is.plain(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['plainObject'] = isPlainObject;
  is['plainobject'] = isPlainObject;
  is['plainObj'] = isPlainObject;
  is['plainobj'] = isPlainObject;
  is['plain'] = isPlainObject;
  /// #if}}} @code plain
  /// #}}} @submethod plain

  /// #{{{ @submethod function
  /// #{{{ @docs function
  /// @section base
  /// @method vitals.is.function
  ///   Note that `vitals.is.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use an alias like
  ///   `vitals.is.func` for compatibility with older environments.
  /// @alias vitals.is.func
  /// @alias vitals.is.fun
  /// @alias vitals.is.fn
  /**
   * @description
   *   Checks if a value or many values are a [function][func] data type. Note
   *   that `vitals.is.function` is not valid in [ES3][ecma3] and some
   *   [ES5][ecma5] browser and other platform environments. Use
   *   `vitals.is.func` for browser and platform safety.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs function
  /// #if{{{ @code function
  function isFunction(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_FUN.noArg(new $ERR, 'val');
      case 1:
        return $is.fun(val);
    }

    while (i--) {
      if ( !$is.fun(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['func'] = isFunction;
  is['fun'] = isFunction;
  is['fn'] = isFunction;
  try {
    is['function'] = isFunction;
  }
  catch (_e) {}
  /// #if}}} @code function
  /// #}}} @submethod function

  /// #{{{ @submethod array
  /// #{{{ @docs array
  /// @section base
  /// @method vitals.is.array
  /// @alias vitals.is.arr
  /**
   * @description
   *   Checks if a value or many values are an instance of the [array][arr]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs array
  /// #if{{{ @code array
  function isArray(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_ARR.noArg(new $ERR, 'val');
      case 1:
        return $is.arr(val);
    }

    while (i--) {
      if ( !$is.arr(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['array'] = isArray;
  is['arr'] = isArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// #{{{ @docs regexp
  /// @section base
  /// @method vitals.is.regexp
  /// @alias vitals.is.regex
  /// @alias vitals.is.regx
  /// @alias vitals.is.re
  /**
   * @description
   *   Checks if a value or many values are an instance of the [RegExp][regex]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs regexp
  /// #if{{{ @code regexp
  function isRegExp(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_REGX.noArg(new $ERR, 'val');
      case 1:
        return $is.regx(val);
    }

    while (i--) {
      if ( !$is.regx(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['regexp'] = isRegExp;
  is['regex'] = isRegExp;
  is['regx'] = isRegExp;
  is['re'] = isRegExp;
  /// #if}}} @code regexp
  /// #}}} @submethod regexp

  /// #{{{ @submethod date
  /// #{{{ @docs date
  /// @section base
  /// @method vitals.is.date
  /**
   * @description
   *   Checks if a value or many values are an instance of the [Date][date]
   *   `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs date
  /// #if{{{ @code date
  function isDate(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_DATE.noArg(new $ERR, 'val');
      case 1:
        return $is.date(val);
    }

    while (i--) {
      if ( !$is.date(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['date'] = isDate;
  /// #if}}} @code date
  /// #}}} @submethod date

  /// #{{{ @submethod error
  /// #{{{ @docs error
  /// @section base
  /// @method vitals.is.error
  /// @alias vitals.is.err
  /**
   * @description
   *   Checks if a value or many values are an instance of the [Error][error]
   *   `object` types.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs error
  /// #if{{{ @code error
  function isError(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_ERR.noArg(new $ERR, 'val');
      case 1:
        return $is.err(val);
    }

    while (i--) {
      if ( !$is.err(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['error'] = isError;
  is['err'] = isError;
  /// #if}}} @code error
  /// #}}} @submethod error

  /// #{{{ @submethod args
  /// #{{{ @docs args
  /// @section base
  /// @method vitals.is.args
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [arguments][args] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs args
  /// #if{{{ @code args
  function isArguments(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_ARGS.noArg(new $ERR, 'val');
      case 1:
        return $is.args(val);
    }

    while (i--) {
      if ( !$is.args(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['args'] = isArguments;
  /// #if}}} @code args
  /// #}}} @submethod args

  /// #{{{ @submethod document
  /// #{{{ @docs document
  /// @section base
  /// @method vitals.is.document
  /// @alias vitals.is.doc
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [DOM Document][doc] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs document
  /// #if{{{ @code document
  function isDocument(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_DOC.noArg(new $ERR, 'val');
      case 1:
        return $is.doc(val);
    }

    while (i--) {
      if ( !$is.doc(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['document'] = isDocument;
  is['doc'] = isDocument;
  /// #if}}} @code document
  /// #}}} @submethod document

  /// #{{{ @submethod element
  /// #{{{ @docs element
  /// @section base
  /// @method vitals.is.element
  /// @alias vitals.is.elem
  /**
   * @description
   *   Checks if a value or many values are an instance of the
   *   [DOM Element][elem] `object` type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs element
  /// #if{{{ @code element
  function isElement(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_ELEM.noArg(new $ERR, 'val');
      case 1:
        return $is.elem(val);
    }

    while (i--) {
      if ( !$is.elem(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['element'] = isElement;
  is['elem'] = isElement;
  /// #if}}} @code element
  /// #}}} @submethod element

  /// #{{{ @submethod empty
  /// #{{{ @docs empty
  /// @section base
  /// @method vitals.is.empty
  /**
   * @description
   *   Checks if a value or many values are considered empty. The definition
   *   of empty is as follows in order of priority (per #val data type):
   *   - *`null`*!$
   *     `null` is considered empty.
   *   - *`undefined`*!$
   *     `undefined` is considered empty.
   *   - *`number`*!$
   *     Only `0` and `NaN` are considered empty.
   *   - *`string`*!$
   *     Only `""` is considered empty.
   *   - *`boolean`*!$
   *     Only `false` is considered empty.
   *   - *`function`*!$
   *     The [length property][func-length] must be `0` to be considered
   *     empty.
   *   - *`!Array`*!$
   *     The [length property][arr-length] must be `0` to be considered empty.
   *   - *`!Object`*!$
   *     The `object` must **not** [own][own] any properties to be considered
   *     empty.
   *   - *`*`*!$
   *     All other data types are **not** considered empty.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be empty to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs empty
  /// #if{{{ @code empty
  function isEmpty(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_EMPTY.noArg(new $ERR, 'val');
      case 1:
        return $is.empty(val);
    }

    while (i--) {
      if ( !$is.empty(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['empty'] = isEmpty;
  /// #if}}} @code empty
  /// #}}} @submethod empty

  /// #{{{ @submethod same
  /// #{{{ @docs same
  /// @section base
  /// @method vitals.is.same
  /**
   * @description
   *   A functional representation of [strict equality][equal].
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs same
  /// #if{{{ @code same
  function isSame(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_SAME.noArg(new $ERR, 'val1');
      case 1:
        throw _MKERR_SAME.noArg(new $ERR, 'val2');
    }

    return val1 === val2;
  }
  is['same'] = isSame;
  /// #if}}} @code same
  /// #}}} @submethod same

  /// #{{{ @submethod similar
  /// #{{{ @docs similar
  /// @section base
  /// @method vitals.is.similar
  /// @alias vitals.is.sim
  /**
   * @description
   *   A functional representation of [loose equality][equal].
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs similar
  /// #if{{{ @code similar
  function isSimilar(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _MKERR_SIM.noArg(new $ERR, 'val1');
      case 1:
        throw _MKERR_SIM.noArg(new $ERR, 'val2');
    }

    return val1 == val2;
  }
  is['similar'] = isSimilar;
  is['sim'] = isSimilar;
  /// #if}}} @code similar
  /// #}}} @submethod similar

  /// #{{{ @submethod capped
  /// #{{{ @docs capped
  /// @section strict
  /// @method vitals.is.capped
  /// @alias vitals.is.cappedObject
  /// @alias vitals.is.cappedobject
  /// @alias vitals.is.cappedObj
  /// @alias vitals.is.cappedobj
  /**
   * @description
   *   Checks if an `object` or `function` is extensible.
   * @public
   * @param {...(?Object|?Function)} source
   *   If more than one #source is provided, every #source must be
   *   extensible to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs capped
  /// #if{{{ @code capped
  function isCapped(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_CAPPED.noArg(new $ERR, 'val');
      case 1:
        if ( $is.nil(val) ) {
          return $NO;
        }
        if ( !$is._obj(val) ) {
          throw _MKERR_CAPPED.type(new $TYPE_ERR, 'val', val,
            '?Object|?Function');
        }
        return !$is.extend(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.nil(val) && !$is._obj(val) ) {
        throw _MKERR_CAPPED.type(new $TYPE_ERR, 'val', val,
          '?Object|?Function');
      }
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !val || $is.extend(val) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['cappedObject'] = isCapped;
  is['cappedobject'] = isCapped;
  is['cappedObj'] = isCapped;
  is['cappedobj'] = isCapped;
  is['capped'] = isCapped;
  /// #if}}} @code capped
  /// #}}} @submethod capped

  /// #{{{ @submethod frozen
  /// #{{{ @docs frozen
  /// @section strict
  /// @method vitals.is.frozen
  /// @alias vitals.is.frozenObject
  /// @alias vitals.is.frozenobject
  /// @alias vitals.is.frozenObj
  /// @alias vitals.is.frozenobj
  /**
   * @description
   *   Checks if an `object` or `function` is [frozen][frozen].
   * @public
   * @param {...(?Object|?Function)} source
   *   If more than one #source is provided, every #source must be
   *   [frozen][frozen] to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs frozen
  /// #if{{{ @code frozen
  function isFrozen(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_FROZEN.noArg(new $ERR, 'val');
      case 1:
        if ( $is.nil(val) ) {
          return $NO;
        }
        if ( !$is._obj(val) ) {
          throw _MKERR_FROZEN.type(new $TYPE_ERR, 'val', val,
            '?Object|?Function');
        }
        return $is.frozen(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.nil(val) && !$is._obj(val) ) {
        throw _MKERR_FROZEN.type(new $TYPE_ERR, 'val', val,
          '?Object|?Function');
      }
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !val || !$is.frozen(val) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['frozenObject'] = isFrozen;
  is['frozenobject'] = isFrozen;
  is['frozenObj'] = isFrozen;
  is['frozenobj'] = isFrozen;
  is['frozen'] = isFrozen;
  /// #if}}} @code frozen
  /// #}}} @submethod frozen

  /// #{{{ @submethod sealed
  /// #{{{ @docs sealed
  /// @section strict
  /// @method vitals.is.sealed
  /// @alias vitals.is.sealedObject
  /// @alias vitals.is.sealedobject
  /// @alias vitals.is.sealedObj
  /// @alias vitals.is.sealedobj
  /**
   * @description
   *   Checks if an `object` or `function` is sealed.
   * @public
   * @param {...(?Object|?Function)} source
   *   If more than one #source is provided, every #source must be
   *   sealed to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs sealed
  /// #if{{{ @code sealed
  function isSealed(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_SEALED.noArg(new $ERR, 'val');
      case 1:
        if ( $is.nil(val) ) {
          return $NO;
        }
        if ( !$is._obj(val) ) {
          throw _MKERR_SEALED.type(new $TYPE_ERR, 'val', val,
            '?Object|?Function');
        }
        return $is.sealed(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.nil(val) && !$is._obj(val) ) {
        throw _MKERR_SEALED.type(new $TYPE_ERR, 'val', val,
          '?Object|?Function');
      }
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !val || !$is.sealed(val) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['sealedObject'] = isSealed;
  is['sealedobject'] = isSealed;
  is['sealedObj'] = isSealed;
  is['sealedobj'] = isSealed;
  is['sealed'] = isSealed;
  /// #if}}} @code sealed
  /// #}}} @submethod sealed

  /// #{{{ @submethod whole
  /// #{{{ @docs whole
  /// @section base
  /// @method vitals.is.whole
  /// @alias vitals.is.wholeNumber
  /// @alias vitals.is.wholenumber
  /// @alias vitals.is.wholeNum
  /// @alias vitals.is.wholenum
  /**
   * @description
   *   Checks if a [number][num] is whole (i.e. has no fractional portion).
   *   All whole numbers less than one (e.g. `wholeNumber <= 0`) will return
   *   `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be a valid whole `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs whole
  /// #if{{{ @code whole
  function isWholeNumber(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_WHOLE.noArg(new $ERR, 'val');
      case 1:
        if ( !$is.num(val) ) {
          throw _MKERR_WHOLE.type(new $TYPE_ERR, 'val', val, 'number');
        }
        return $is.whole(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.num(val) ) {
        throw _MKERR_WHOLE.type(new $TYPE_ERR, 'val', val, 'number');
      }
    }

    i = len;
    while (i--) {
      if ( !$is.whole(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['wholeNumber'] = isWholeNumber;
  is['wholenumber'] = isWholeNumber;
  is['wholeNum'] = isWholeNumber;
  is['wholenum'] = isWholeNumber;
  is['whole'] = isWholeNumber;
  /// #if}}} @code whole
  /// #}}} @submethod whole

  /// #{{{ @submethod odd
  /// #{{{ @docs odd
  /// @section base
  /// @method vitals.is.odd
  /// @alias vitals.is.oddNumber
  /// @alias vitals.is.oddnumber
  /// @alias vitals.is.oddNum
  /// @alias vitals.is.oddnum
  /**
   * @description
   *   Checks if a [number][num] is odd. All odd numbers less than zero (e.g.
   *   `oddNumber < 0`) will return `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be an odd `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs odd
  /// #if{{{ @code odd
  function isOddNumber(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_ODD.noArg(new $ERR, 'val');
      case 1:
        if ( !$is.num(val) ) {
          throw _MKERR_ODD.type(new $TYPE_ERR, 'val', val, 'number');
        }
        if ( !$is.whole(val) ) {
          throw _MKERR_ODD.range(new $RANGE_ERR, 'val', '[-+]?[0-9]+');
        }
        return $is.odd(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.num(val) ) {
        throw _MKERR_ODD.type(new $TYPE_ERR, 'val', val, 'number');
      }
      if ( !$is.whole(val) ) {
        throw _MKERR_ODD.range(new $RANGE_ERR, 'val', '[-+]?[0-9]+');
      }
    }

    i = len;
    while (i--) {
      if ( !$is.odd(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['oddNumber'] = isOddNumber;
  is['oddnumber'] = isOddNumber;
  is['oddNum'] = isOddNumber;
  is['oddnum'] = isOddNumber;
  is['odd'] = isOddNumber;
  /// #if}}} @code odd
  /// #}}} @submethod odd

  /// #{{{ @submethod even
  /// #{{{ @docs even
  /// @section base
  /// @method vitals.is.even
  /// @alias vitals.is.evenNumber
  /// @alias vitals.is.evennumber
  /// @alias vitals.is.evenNum
  /// @alias vitals.is.evennum
  /**
   * @description
   *   Checks if a [number][num] is even. All even numbers less than one (e.g.
   *   `evenNumber <= 0`) will return `true`.
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must be an even `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs even
  /// #if{{{ @code even
  function isEvenNumber(val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_EVEN.noArg(new $ERR, 'val');
      case 1:
        if ( !$is.num(val) ) {
          throw _MKERR_EVEN.type(new $TYPE_ERR, 'val', val, 'number');
        }
        if ( !$is.whole(val) ) {
          throw _MKERR_EVEN.range(new $RANGE_ERR, 'val', '[-+]?[0-9]+');
        }
        return $is.even(val);
    }

    i = len;
    while (i--) {
      val = arguments[i];
      if ( !$is.num(val) ) {
        throw _MKERR_EVEN.type(new $TYPE_ERR, 'val', val, 'number');
      }
      if ( !$is.whole(val) ) {
        throw _MKERR_EVEN.range(new $RANGE_ERR, 'val', '[-+]?[0-9]+');
      }
    }

    i = len;
    while (i--) {
      if ( !$is.even(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['evenNumber'] = isEvenNumber;
  is['evennumber'] = isEvenNumber;
  is['evenNum'] = isEvenNumber;
  is['evennum'] = isEvenNumber;
  is['even'] = isEvenNumber;
  /// #if}}} @code even
  /// #}}} @submethod even

  /// #if{{{ @build NODE

  /// #{{{ @submethod buffer
  /// #{{{ @docs buffer
  /// @section fs
  /// @method vitals.is.buffer
  /// @alias vitals.is.buff
  /// @alias vitals.is.buf
  /**
   * @description
   *   Checks if a value or many values are a `Buffer` instance.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs buffer
  /// #if{{{ @code buffer
  function isBuffer(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_BUFF.noArg(new $ERR, 'val');
      case 1:
        return $is.buff(val);
    }

    while (i--) {
      if ( !$is.buff(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['buffer'] = isBuffer;
  is['buff'] = isBuffer;
  is['buf'] = isBuffer;
  /// #if}}} @code buffer
  /// #}}} @submethod buffer

  /// #{{{ @submethod directory
  /// #{{{ @docs directory
  /// @section fs
  /// @method vitals.is.directory
  /// @alias vitals.is.dir
  /**
   * @description
   *   Checks if a value or many values are a valid directory path.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs directory
  /// #if{{{ @code directory
  function isDirectory(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_DIR.noArg(new $ERR, 'val');
      case 1:
        return $is.dir(val);
    }

    while (i--) {
      if ( !$is.dir(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['directory'] = isDirectory;
  is['dir'] = isDirectory;
  /// #if}}} @code directory
  /// #}}} @submethod directory

  /// #{{{ @submethod file
  /// #{{{ @docs file
  /// @section fs
  /// @method vitals.is.file
  /**
   * @description
   *   Checks if a value or many values are a valid file path.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs file
  /// #if{{{ @code file
  function isFile(val) {

    /** @type {number} */
    var i;

    i = arguments['length'];

    switch (i) {
      case 0:
        throw _MKERR_FILE.noArg(new $ERR, 'val');
      case 1:
        return $is.file(val);
    }

    while (i--) {
      if ( !$is.file(arguments[i]) ) {
        return $NO;
      }
    }
    return $YES;
  }
  is['file'] = isFile;
  /// #if}}} @code file
  /// #}}} @submethod file

  /// #if}}} @build NODE

  /// #ifnot}}} @scope IS_MAIN_ONLY

  /// #if{{{ @helpers is

  /// #{{{ @group check

  /// #{{{ @func _checkVal
  /**
   * @private
   * @param {!Array<!function>} checks
   * @param {*} val
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVal(checks, val, nullable) {

    /** @type {number} */
    var i;

    i = checks['length'];
    while (i--) {
      if ( checks[i](val, nullable) ) {
        return $YES;
      }
    }
    return $NO;
  }
  /// #}}} @func _checkVal

  /// #{{{ @func _checkVals
  /**
   * @private
   * @param {!Array<!function>} checks
   * @param {!Arguments} vals
   * @param {boolean=} nullable
   * @return {boolean}
   */
  function _checkVals(checks, vals, nullable) {

    /** @type {number} */
    var i;

    i = vals['length'];
    while (--i) {
      if ( !_checkVal(checks, vals[i], nullable) ) {
        return $NO;
      }
    }
    return $YES;
  }
  /// #}}} @func _checkVals

  /// #}}} @group check

  /// #{{{ @group types

  /// #{{{ @const _TYPES
  /**
   * @private
   * @const {!Object<string, !function(*, boolean=): boolean>}
   * @dict
   */
  var _TYPES = (function __vitals_TYPES__() {

    /// #{{{ @const TYPES
    /**
     * @const {!Object<string, !function(*, boolean=): boolean>}
     * @dict
     */
    var TYPES = {};
    /// #}}} @const TYPES

    /// #{{{ @func Type
    /**
     * @private
     * @param {string} name
     * @param {!function(*): boolean} test
     * @param {(?string|?Array<string>)=} alias
     * @param {boolean=} nullableDflt = `true`
     * @constructor
     * @struct
     */
    function Type(name, test, alias, nullableDflt) {
      this.name = name;
      this.test = test;
      if ( $is.bool(alias) ) {
        this.alias = $NIL;
        this.nullableDflt = alias;
      }
      else {
        this.alias = !!alias
          ? alias
          : $NIL;
        this.nullableDflt = nullableDflt !== $NO;
      }
    }
    Type['prototype'] = $mkObj($NIL);
    Type['prototype']['constructor'] = Type;
    /// #}}} @func Type

    /// #{{{ @func _newType
    /**
     * @private
     * @param {string} name
     * @param {!function(*): boolean} test
     * @param {(?string|?Array<string>)=} alias
     * @param {boolean=} nullableDflt = `true`
     * @return {!Type}
     */
    function _newType(name, test, alias, nullableDflt) {

      switch (arguments['length']) {
        case 2:
          return new Type(name, test);
        case 3:
          return new Type(name, test, alias);
      }
      return new Type(name, test, alias, nullableDflt);
    }
    /// #}}} @func _newType

    /// #{{{ @func Type.prototype.add
    /**
     * @description
     *   Adds a type to the *TYPES* hash map with a check method that
     *   evaluates nullable properties and invokes its type section's method.
     * @private
     * @param {string} section
     *   The type's category.
     * @return {void}
     */
    Type['prototype'].add = function addType(section) {

      if ( $own(_addType, section) ) {
        this.test = _addType[section](this.test);
      }

      _addType(section, this.name, this.test, this.nullableDflt);

      if ( $is._str(this.alias) ) {
        _addAlias(this.name, this.alias);
      }
      else if (!!this.alias) {
        _addAliases(this.name, this.alias);
      }
    }
    /// #}}} @func Type.prototype.add

    /// #{{{ @func _addTypes
    /**
     * @description
     *   Adds types to the *TYPES* hash map with a check method that
     *   evaluates nullable properties and invokes their type section's
     *   method.
     * @private
     * @param {string} section
     *   The category for the types.
     * @param {!Array<!Type>} types
     * @return {void}
     */
    function _addTypes(section, types) {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = types['length'];
      i = 0;
      while (++i < len) {
        types[i].add(section);
      }
    }
    /// #}}} @func _addTypes

    /// #{{{ @func _addType
    /**
     * @description
     *   Adds a type to the *TYPES* hash map with a check method that
     *   evaluates nullable properties.
     * @private
     * @param {string} section
     *   The type's category.
     * @param {string} type
     *   The type's name.
     * @param {!function(*): boolean} check
     *   The type's check method.
     * @param {boolean} nullableDflt
     *   The type's default nullable value.
     * @return {void}
     */
    function _addType(section, type, check, nullableDflt) {

      /// #{{{ @func typeCheck
      /**
       * @param {*} val
       * @param {boolean=} nullable = `nullableDflt`
       * @return {boolean}
       */
      function typeCheck(val, nullable) {
        return $is.nil(val)
          ? $is.bool(nullable)
            ? nullable
            : nullableDflt
          : check(val);
      }
      /// #}}} @func typeCheck

      TYPES['_' + type] = typeCheck;
    }
    /// #}}} @func _addType

    /// #{{{ @func _addAliases
    /**
     * @description
     *   Adds the type aliases to the *TYPES* hash map.
     * @private
     * @param {string} name
     * @param {!Array<string>} aliases
     * @return {void}
     */
    function _addAliases(name, aliases) {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len = aliases['length'];
      i = 0;
      while (++i < len) {
        _addAlias(name, aliases[i]);
      }
    }
    /// #}}} @func _addAliases

    /// #{{{ @func _addAlias
    /**
     * @description
     *   Adds the type alias to the *TYPES* hash map.
     * @private
     * @param {string} name
     * @param {string} alias
     * @return {void}
     */
    function _addAlias(name, alias) {
      TYPES['_' + alias] = TYPES['_' + name];
    }
    /// #}}} @func _addAlias

    /// #{{{ @func _addArrayType
    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     *   The check method for each of an array's property values.
     * @return {!function(*): boolean}
     *   The check method for the `array` type.
     */
    function _addArrayType(eachCheck) {

      /// #{{{ @func check
      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {number} */
        var i;

        if ( !$is.arr(val) ) {
          return $NO;
        }

        i = val['length'];
        while (i--) {
          if ( !eachCheck(val[i]) ) {
            return $NO;
          }
        }
        return $YES;
      }
      /// #}}} @func check

      return check;
    }
    _addType['arrays'] = _addArrayType;
    /// #}}} @func _addArrayType

    /// #{{{ @func _addMapType
    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     *   The check method for each of an hash map's property values.
     * @return {!function(*): boolean}
     *   The check method for the `object` or `function` hash map type.
     */
    function _addMapType(eachCheck) {

      /// #{{{ @func check
      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {string} */
        var key;

        if ( !$is.obj(val) ) {
          return $NO;
        }

        for (key in val) {
          if( $own(val, key) && !eachCheck(val[key]) ) {
            return $NO;
          }
        }
        return $YES;
      }
      /// #}}} @func check

      return check;
    }
    _addType['maps'] = _addMapType;
    /// #}}} @func _addMapType

    /// #{{{ @step add-primitives

    _addTypes('primitives', [
      _newType('null', $is.nil, 'nil'),
      _newType('undefined', $is.void, 'void', $NO),
      _newType('boolean', $is.bool, 'bool', $NO),
      _newType('string', $is.str, 'str', $NO),
      _newType('number', $is.num, 'num', $NO),
      _newType('nan', $is.nan, $NO)
    ]);

    /// #}}} @step add-primitives

    /// #{{{ @step add-js-objects

    _addTypes('js_objects', [
      _newType('object', $is.obj, 'obj'),
      _newType('function', $is.fun, [ 'func', 'fun', 'fn' ], $NO),
      _newType('array', $is.arr, 'arr'),
      _newType('regexp', $is.regx, [ 'regex', 'regx', 're' ]),
      _newType('error', $is.err, 'err'),
      _newType('date', $is.date),
      _newType('arguments', $is.args, 'args')
    ]);

    /// #}}} @step add-js-objects

    /// #{{{ @step add-dom-objects

    _addTypes('dom_objects', [
      _newType('document', $is.doc, [ 'htmldocument', 'doc' ]),
      _newType('element', $is.elem, [ 'htmlelement', 'elem' ])
    ]);

    /// #}}} @step add-dom-objects

    /// #{{{ @step add-specials

    _addTypes('specials', [
      _newType('empty', $is.empty)
    ]);

    /// #}}} @step add-specials

    /// #{{{ @step add-arrays

    _addTypes('arrays', [
      _newType('nulls', $is.nil, 'nils'),
      _newType('undefineds', $is.void, [ 'undefinedes', 'voids' ]),
      _newType('booleans', $is.bool, 'bools'),
      _newType('strings', $is.str, 'strs'),
      _newType('numbers', $is.num, 'nums'),
      _newType('nans', $is.nan),
      _newType('objects', $is.obj, 'objs'),
      _newType('functions', $is.fun, [ 'funcs', 'funs', 'fns' ]),
      _newType('arrays', $is.arr, 'arrs'),
      _newType('regexps', $is.regx, [ 'regexes', 'regexs', 'regxs', 'res' ]),
      _newType('errors', $is.err, 'errs'),
      _newType('dates', $is.date),
      _newType('documents', $is.doc, [ 'htmldocuments', 'docs' ]),
      _newType('elements', $is.elem, [ 'htmlelements', 'elems' ])
    ]);

    /// #}}} @step add-arrays

    /// #{{{ @step add-maps

    _addTypes('maps', [
      _newType('nullmap', $is.nil, 'nilmap'),
      _newType('undefinedmap', $is.void, 'voidmap'),
      _newType('booleanmap', $is.bool, 'boolmap'),
      _newType('stringmap', $is.str, 'strmap'),
      _newType('numbermap', $is.num, 'nummap'),
      _newType('nanmap', $is.nan),
      _newType('objectmap', $is.obj, 'objmap'),
      _newType('functionmap', $is.fun, [ 'funcmap', 'funmap', 'fnmap' ]),
      _newType('arraymap', $is.arr, 'arrmap'),
      _newType('regexpmap', $is.regx, [ 'regexmap', 'regxmap', 'remap' ]),
      _newType('errormap', $is.err, 'errmap'),
      _newType('datemap', $is.date),
      _newType('documentmap', $is.doc, [ 'htmldocumentmap', 'docmap' ]),
      _newType('elementmap', $is.elem, [ 'htmlelementmap', 'elemmap' ])
    ]);

    /// #}}} @step add-maps

    return TYPES;
  })();
  /// #}}} @const _TYPES

  /// #}}} @group types

  /// #{{{ @group parse

  /// #{{{ @const _ALL_SPECIALS
  /**
   * @private
   * @type {!RegExp}
   */
  var _ALL_SPECIALS = /[^a-z\|]/g;
  /// #}}} @const _ALL_SPECIALS

  /// #{{{ @const _SPECIALS
  /**
   * @private
   * @const {!Object<string, !function(string): boolean>}
   * @dict
   */
  var _SPECIALS = (function _SPECIALS_PrivateScope() {

    /// #{{{ @const _PIPE
    /**
     * @private
     * @const {!RegExp}
     */
    var _PIPE = /\|/;
    /// #}}} @const _PIPE

    /// #{{{ @const _EXCLAMATION_POINT
    /**
     * @private
     * @const {!RegExp}
     */
    var _EXCLAMATION_POINT = /\!/;
    /// #}}} @const _EXCLAMATION_POINT

    /// #{{{ @const _QUESTION_MARK
    /**
     * @private
     * @const {!RegExp}
     */
    var _QUESTION_MARK = /\?/;
    /// #}}} @const _QUESTION_MARK

    /// #{{{ @const _EQUAL_SIGN
    /**
     * @private
     * @const {!RegExp}
     */
    var _EQUAL_SIGN = /\=/;
    /// #}}} @const _EQUAL_SIGN

    /// #{{{ @const _ANY
    /**
     * @private
     * @const {!RegExp}
     */
    var _ANY = /\*|any/;
    /// #}}} @const _ANY

    /// #{{{ @func hasPipe
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasPipe(val) {
      return _PIPE['test'](val);
    }
    /// #}}} @func hasPipe

    /// #{{{ @func hasExPoint
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasExPoint(val) {
      return _EXCLAMATION_POINT['test'](val);
    }
    /// #}}} @func hasExPoint

    /// #{{{ @func hasQuestMark
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasQuestMark(val) {
      return _QUESTION_MARK['test'](val);
    }
    /// #}}} @func hasQuestMark

    /// #{{{ @func hasEqSign
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasEqSign(val) {
      return _EQUAL_SIGN['test'](val);
    }
    /// #}}} @func hasEqSign

    /// #{{{ @func hasAnyGlob
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasAnyGlob(val) {
      return _ANY['test'](val);
    }
    /// #}}} @func hasAnyGlob

    /// #{{{ @const SPECIALS
    /**
     * @const {!Object<string, !function(string): boolean>}
     * @dict
     */
    var SPECIALS = {
      '|': hasPipe,
      '!': hasExPoint,
      '?': hasQuestMark,
      '=': hasEqSign,
      '*': hasAnyGlob
    };
    /// #}}} @const SPECIALS

    return SPECIALS;
  })();
  /// #}}} @const _SPECIALS

  /// #{{{ @func _hasSpecial
  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return _SPECIALS[special](types);
  }
  /// #}}} @func _hasSpecial

  /// #{{{ @func _getChecks
  /**
   * @private
   * @param {string} types
   * @return {?Array<!function>}
   */
  function _getChecks(types) {

    /** @type {?Array<!function>} */
    var checks;
    /** @type {string} */
    var type;
    /** @type {number} */
    var i;

    if ( _hasSpecial('=', types) ) {
      types += '|undefined';
    }

    types = types['toLowerCase']();
    types = types['replace'](_ALL_SPECIALS, '');
    checks = types['split']('|');

    i = checks['length'];
    while (i--) {
      type = '_' + checks[i];
      if ( !$own(_TYPES, type) ) {
        return $NIL;
      }
      checks[i] = _TYPES[type];
    }

    return checks['length']
      ? checks
      : $NIL;
  }
  /// #}}} @func _getChecks

  /// #{{{ @func _getNullable
  /**
   * @description
   *   Method checks whether `"!"` or `"?"` exists in the #types `string`.
   * @private
   * @param {string} types
   * @return {(undefined|boolean)}
   *   If `undefined` no override exists.
   */
  function _getNullable(types) {

    /** @type {boolean} */
    var override;
    /** @type {boolean} */
    var ensure;
    /** @type {boolean} */
    var negate;

    ensure = _hasSpecial('?', types);
    negate = _hasSpecial('!', types);
    override = ensure && negate
      ? $NO
      : ensure || negate;
    return override
      ? !negate && ensure
      : $VOID;
  }
  /// #}}} @func _getNullable

  /// #}}} @group parse

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('is');
  /// #}}} @const _MKERR_MAIN

  /// #ifnot{{{ @scope IS_MAIN_ONLY

  /// #{{{ @const _MKERR_NULL
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_NULL = $mkErr('is', 'null');
  /// #}}} @const _MKERR_NULL

  /// #{{{ @const _MKERR_VOID
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_VOID = $mkErr('is', 'undefined');
  /// #}}} @const _MKERR_VOID

  /// #{{{ @const _MKERR_BOOL
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_BOOL = $mkErr('is', 'boolean');
  /// #}}} @const _MKERR_BOOL

  /// #{{{ @const _MKERR_STR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_STR = $mkErr('is', 'string');
  /// #}}} @const _MKERR_STR

  /// #{{{ @const _MKERR_NUM
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_NUM = $mkErr('is', 'number');
  /// #}}} @const _MKERR_NUM

  /// #{{{ @const _MKERR_NAN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_NAN = $mkErr('is', 'nan');
  /// #}}} @const _MKERR_NAN

  /// #{{{ @const _MKERR_OBJ
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_OBJ = $mkErr('is', 'object');
  /// #}}} @const _MKERR_OBJ

  /// #{{{ @const _MKERR_PLAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_PLAIN = $mkErr('is', 'plain');
  /// #}}} @const _MKERR_PLAIN

  /// #{{{ @const _MKERR_FUN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_FUN = $mkErr('is', 'function');
  /// #}}} @const _MKERR_FUN

  /// #{{{ @const _MKERR_ARR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ARR = $mkErr('is', 'array');
  /// #}}} @const _MKERR_ARR

  /// #{{{ @const _MKERR_REGX
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_REGX = $mkErr('is', 'regexp');
  /// #}}} @const _MKERR_REGX

  /// #{{{ @const _MKERR_DATE
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_DATE = $mkErr('is', 'date');
  /// #}}} @const _MKERR_DATE

  /// #{{{ @const _MKERR_ERR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ERR = $mkErr('is', 'error');
  /// #}}} @const _MKERR_ERR

  /// #{{{ @const _MKERR_ARGS
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ARGS = $mkErr('is', 'args');
  /// #}}} @const _MKERR_ARGS

  /// #{{{ @const _MKERR_DOC
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_DOC = $mkErr('is', 'document');
  /// #}}} @const _MKERR_DOC

  /// #{{{ @const _MKERR_ELEM
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ELEM = $mkErr('is', 'element');
  /// #}}} @const _MKERR_ELEM

  /// #{{{ @const _MKERR_EMPTY
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_EMPTY = $mkErr('is', 'empty');
  /// #}}} @const _MKERR_EMPTY

  /// #{{{ @const _MKERR_SAME
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_SAME = $mkErr('is', 'same');
  /// #}}} @const _MKERR_SAME

  /// #{{{ @const _MKERR_SIM
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_SIM = $mkErr('is', 'similar');
  /// #}}} @const _MKERR_SIM

  /// #{{{ @const _MKERR_CAPPED
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_CAPPED = $mkErr('is', 'capped');
  /// #}}} @const _MKERR_CAPPED

  /// #{{{ @const _MKERR_FROZEN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_FROZEN = $mkErr('is', 'frozen');
  /// #}}} @const _MKERR_FROZEN

  /// #{{{ @const _MKERR_SEALED
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_SEALED = $mkErr('is', 'sealed');
  /// #}}} @const _MKERR_SEALED

  /// #{{{ @const _MKERR_WHOLE
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_WHOLE = $mkErr('is', 'whole');
  /// #}}} @const _MKERR_WHOLE

  /// #{{{ @const _MKERR_ODD
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ODD = $mkErr('is', 'odd');
  /// #}}} @const _MKERR_ODD

  /// #{{{ @const _MKERR_EVEN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_EVEN = $mkErr('is', 'even');
  /// #}}} @const _MKERR_EVEN

  /// #if{{{ @build NODE

  /// #{{{ @const _MKERR_BUFF
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_BUFF = $mkErr('is', 'buffer');
  /// #}}} @const _MKERR_BUFF

  /// #{{{ @const _MKERR_DIR
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_DIR = $mkErr('is', 'directory');
  /// #}}} @const _MKERR_DIR

  /// #{{{ @const _MKERR_FILE
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_FILE = $mkErr('is', 'file');
  /// #}}} @const _MKERR_FILE

  /// #if}}} @build NODE

  /// #ifnot}}} @scope IS_MAIN_ONLY

  /// #}}} @group errors

  /// #if}}} @helpers is

/// #ifnot{{{ @scope DOCS_ONLY
  return is;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super is

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
