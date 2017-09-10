/**
 * ---------------------------------------------------------------------------
 * VITALS.IS
 * ---------------------------------------------------------------------------
 * @section base
 * @section fs
 * @version 5.0.0
 * @see [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #if}}} @scope SOLO

/// #{{{ @super is
/// #ifnot{{{ @scope DOCS_ONLY
/// #ifnot{{{ @scope FS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
/// #ifnot}}} @scope FS_ONLY
/// #if{{{ @scope FS_ONLY
/**
 * @public
 * @const {!Object}
 * @dict
 */
/// #if}}} @scope FS_ONLY
var is = (function isPrivateScope() {
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
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
  /// @docref [regex]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  /// @docref [frozen]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
  /// @docref [str-prim]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
  /// @docref [bool-desc]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#Description)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
  /// #if}}} @docrefs is

  /// #if{{{ @scope FS_ONLY
  /**
   * @public
   * @type {!Object}
   * @dict
   */
  var is = {};
  /// #if}}} @scope FS_ONLY

  /// #ifnot{{{ @scope FS_ONLY
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
        throw _mkErr(new ERR, 'no #types defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
      case 2:
        vals = NO;
        break;
      default:
        vals = YES;
        break;
    }

    if ( !$is.str(types) )
      throw _mkTypeErr(new TYPE_ERR, 'types', types, 'string');
    if ( !types )
      throw _mkErr(new ERR, 'invalid empty #types `string`');

    if ( _hasSpecial('*', types) )
      return YES;

    checks = _getChecks(types);

    if (!checks)
      throw _mkRangeErr(new RANGE_ERR, 'types',
        'https://github.com/imaginate/vitals/wiki/vitals.is-types');

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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'null');
      case 1:
        return $is.nil(val);
      default:
        return _are(arguments, $is.nil);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'undefined');
      case 1:
        return $is.void(val);
      default:
        return _are(arguments, $is.none);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'boolean');
      case 1:
        return $is.bool(val);
      default:
        return _are(arguments, $is.bool);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'string');
      case 1:
        return $is.str(val);
      default:
        return _are(arguments, $is.str);
    }
  }
  is['string'] = isString;
  is['str'] = isString;
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #{{{ @submethod _string
  /// #{{{ @docs _string
  /// @section base
  /// @method vitals.is._string
  /// @alias vitals.is._str
  /**
   * @description
   *   Checks if a value or many values are a [primitive string][str-prim]
   *   data type and not empty (e.g. `""`).
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs _string
  /// #if{{{ @code _string
  function isNonEmptyString(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_string');
      case 1:
        return $is._str(val);
      default:
        return _are(arguments, $is._str);
    }
  }
  is['_string'] = isNonEmptyString;
  is['_str'] = isNonEmptyString;
  /// #if}}} @code _string
  /// #}}} @submethod _string

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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'number');
      case 1:
        return $is.num(val);
      default:
        return _are(arguments, $is.num);
    }
  }
  is['number'] = isNumber;
  is['num'] = isNumber;
  /// #if}}} @code number
  /// #}}} @submethod number

  /// #{{{ @submethod _number
  /// #{{{ @docs _number
  /// @section base
  /// @method vitals.is._number
  /// @alias vitals.is._num
  /**
   * @description
   *   Checks if a value or many values are a [primitive][prim] [number][num]
   *   data type and not `0`.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs _number
  /// #if{{{ @code _number
  function isNonZeroNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_number');
      case 1:
        return $is._num(val);
      default:
        return _are(arguments, $is._num);
    }
  }
  is['_number'] = isNonZeroNumber;
  is['_num'] = isNonZeroNumber;
  /// #if}}} @code _number
  /// #}}} @submethod _number

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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'nan');
      case 1:
        return $is.nan(val);
      default:
        return _are(arguments, $is.nan);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'object');
      case 1:
        return $is.obj(val);
      default:
        return _are(arguments, $is.obj);
    }
  }
  is['object'] = isObject;
  is['obj'] = isObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod _object
  /// #{{{ @docs _object
  /// @section base
  /// @method vitals.is._object
  /// @alias vitals.is._obj
  /**
   * @description
   *   Checks if a value or many values are an [object][obj] or
   *   [function][func] data type.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs _object
  /// #if{{{ @code _object
  function isObjectOrFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_object');
      case 1:
        return $is._obj(val);
      default:
        return _are(arguments, $is._obj);
    }
  }
  is['_object'] = isObjectOrFunction;
  is['_obj'] = isObjectOrFunction;
  /// #if}}} @code _object
  /// #}}} @submethod _object

  /// #{{{ @submethod func
  /// #{{{ @docs func
  /// @section base
  /// @method vitals.is.func
  /// @alias vitals.is.fn
  /// @alias vitals.is.fun
  /// @alias vitals.is.function
  ///   Note that `vitals.is.function` will fail in all ES3 and some ES5
  ///   browser and other platform environments. Use `vitals.is.func` for
  ///   compatibility with older environments.
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
  /// #}}} @docs func
  /// #if{{{ @code func
  function isFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'function');
      case 1:
        return $is.fun(val);
      default:
        return _are(arguments, $is.fun);
    }
  }
  is['func'] = isFunction;
  is['fun'] = isFunction;
  try {
    is['fn'] = isFunction;
    is['function'] = isFunction;
  }
  catch (e) {}
  /// #if}}} @code func
  /// #}}} @submethod func

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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'array');
      case 1:
        return $is.arr(val);
      default:
        return _are(arguments, $is.arr);
    }
  }
  is['array'] = isArray;
  is['arr'] = isArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod _array
  /// #{{{ @docs _array
  /// @section base
  /// @method vitals.is._array
  /// @alias vitals.is._arr
  /**
   * @description
   *   Checks if a value or many values are an instance of the [array][arr] or
   *   [arguments][args] `object` types.
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided, every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  /// #}}} @docs _array
  /// #if{{{ @code _array
  function isArrayOrArguments(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', '_array');
      case 1:
        return $is._arr(val);
      default:
        return _are(arguments, $is._arr);
    }
  }
  is['_array'] = isArrayOrArguments;
  is['_arr'] = isArrayOrArguments;
  /// #if}}} @code _array
  /// #}}} @submethod _array

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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'regexp');
      case 1:
        return $is.regx(val);
      default:
        return _are(arguments, $is.regx);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'date');
      case 1:
        return $is.date(val);
      default:
        return _are(arguments, $is.date);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'error');
      case 1:
        return $is.err(val);
      default:
        return _are(arguments, $is.err);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'args');
      case 1:
        return $is.args(val);
      default:
        return _are(arguments, $is.args);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'document');
      case 1:
        return $is.doc(val);
      default:
        return _are(arguments, $is.doc);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'element');
      case 1:
        return $is.elem(val);
      default:
        return _are(arguments, $is.elem);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'empty');
      case 1:
        return $is.empty(val);
      default:
        return _are(arguments, $is.empty);
    }
  }
  is['empty'] = isEmpty;
  /// #if}}} @code empty
  /// #}}} @submethod empty

  /// #{{{ @submethod frozen
  /// #{{{ @docs frozen
  /// @section base
  /// @method vitals.is.frozen
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'frozen');
      case 1:
        return _isFrozen(val);
      default:
        return _are(arguments, _isFrozen);
    }
  }
  is['frozen'] = isFrozen;
  /// #if}}} @code frozen
  /// #}}} @submethod frozen

  /// #{{{ @submethod wholeNumber
  /// #{{{ @docs wholeNumber
  /// @section base
  /// @method vitals.is.wholeNumber
  /// @alias vitals.is.whole
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
  /// #}}} @docs wholeNumber
  /// #if{{{ @code wholeNumber
  function isWholeNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'wholeNumber');
      case 1:
        return _isWhole(val);
      default:
        return _are(arguments, _isWhole);
    }
  }
  is['wholeNumber'] = isWholeNumber;
  is['whole'] = isWholeNumber;
  /// #if}}} @code wholeNumber
  /// #}}} @submethod wholeNumber

  /// #{{{ @submethod oddNumber
  /// #{{{ @docs oddNumber
  /// @section base
  /// @method vitals.is.oddNumber
  /// @alias vitals.is.odd
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
  /// #}}} @docs oddNumber
  /// #if{{{ @code oddNumber
  function isOddNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'oddNumber');
      case 1:
        return _isOdd(val);
      default:
        return _are(arguments, _isOdd);
    }
  }
  is['oddNumber'] = isOddNumber;
  is['odd'] = isOddNumber;
  /// #if}}} @code oddNumber
  /// #}}} @submethod oddNumber

  /// #{{{ @submethod evenNumber
  /// #{{{ @docs evenNumber
  /// @section base
  /// @method vitals.is.evenNumber
  /// @alias vitals.is.even
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
  /// #}}} @docs evenNumber
  /// #if{{{ @code evenNumber
  function isEvenNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'evenNumber');
      case 1:
        return _isEven(val);
      default:
        return _are(arguments, _isEven);
    }
  }
  is['evenNumber'] = isEvenNumber;
  is['even'] = isEvenNumber;
  /// #if}}} @code evenNumber
  /// #}}} @submethod evenNumber
  /// #ifnot}}} @scope IS_MAIN_ONLY
  /// #ifnot}}} @scope FS_ONLY

  /// #if{{{ @scope FS
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'buffer');
      case 1:
        return $is.buff(val);
      default:
        return _are(arguments, $is.buff);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'directory');
      case 1:
        return $is.dir(val);
      default:
        return _are(arguments, $is.dir);
    }
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
    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'file');
      case 1:
        return $is.file(val);
      default:
        return _are(arguments, $is.file);
    }
  }
  is['file'] = isFile;
  /// #if}}} @code file
  /// #}}} @submethod file
  /// #if}}} @scope FS

  /// #if{{{ @helpers is

  /// #ifnot{{{ @scope IS_MAIN_ONLY
  /// #{{{ @group main

  /// #{{{ @func _are
  /**
   * @private
   * @param {!Arguments} vals
   * @param {!function(*): boolean} check
   * @return {boolean}
   */
  function _are(vals, check) {

    /** @type {number} */
    var i;

    i = vals['length'];
    while (i--) {
      if ( !check(vals[i]) )
        return NO;
    }
    return YES;
  }
  /// #}}} @func _are

  /// #ifnot{{{ @scope FS_ONLY
  /// #{{{ @func _isFrozen
  /**
   * @private
   * @param {(?Object|?Function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( $is.nil(val) )
      return NO;

    if ( !$is._obj(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, '?Object|?Function',
        'frozen');

    return $is.frozen(val);
  }
  /// #}}} @func _isFrozen

  /// #{{{ @func _isWhole
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'wholeNumber');

    return $is.whole(val);
  }
  /// #}}} @func _isWhole

  /// #{{{ @func _isOdd
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'oddNumber');
    if ( !$is.whole(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', '-?[0-9]+', 'oddNumber');

    return $is.odd(val);
  }
  /// #}}} @func _isOdd

  /// #{{{ @func _isEven
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !$is.num(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, 'number', 'evenNumber');
    if ( !$is.whole(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', '-?[0-9]+', 'evenNumber');

    return $is.even(val);
  }
  /// #}}} @func _isEven
  /// #ifnot}}} @scope FS_ONLY

  /// #}}} @group main
  /// #ifnot}}} @scope IS_MAIN_ONLY

  /// #ifnot{{{ @scope FS_ONLY
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
      if ( checks[i](val, nullable) )
        return YES;
    }
    return NO;
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
      if ( !_checkVal(checks, vals[i], nullable) )
        return NO;
    }
    return YES;
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
  var _TYPES = (function _TYPES_PrivateScope() {

    /**
     * @type {!Object<string, !function(*, boolean=): boolean>}
     * @dict
     */
    var $types = {};

    /// #{{{ @func _addTypes
    /**
     * @description
     *   Adds types to the *$types* hash map with a check method that
     *   evaluates nullable properties and invokes their type section's
     *   method.
     * @private
     * @param {string} section
     *   The category for the types.
     * @param {!Object<string, !function(*): boolean>} types
     *   Each property should use a type's name for its key and method for its
     *   value.
     * @param {boolean=} nullableDefault = `true`
     *   The default nullable value for each type in #types.
     * @return {void}
     */
    function _addTypes(section, types, nullableDefault) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( $own(types, type) )
          _addType(section, type, types[type], nullableDefault);
      }
    }
    /// #}}} @func _addTypes

    /// #{{{ @func _addType
    /**
     * @description
     *   Adds a type to the *$types* hash map with a check method that
     *   evaluates nullable properties and invokes its type section's method.
     * @private
     * @param {string} section
     *   The type's category.
     * @param {string} type
     *   The type's name.
     * @param {!function(*): boolean} check
     *   The type's check method.
     * @param {boolean=} nullableDefault = `true`
     *   The type's default nullable value.
     * @return {void}
     */
    function _addType(section, type, check, nullableDefault) {

      if ( $own(_addType, section) )
        check = _addType[section](check);

      nullableDefault = nullableDefault !== NO;

      /**
       * @param {*} val
       * @param {boolean=} nullable = `nullableDefault`
       * @return {boolean}
       */
      function typeCheck(val, nullable) {

        if ( !$is.bool(nullable) )
          nullable = nullableDefault;

        return $is.nil(val)
          ? nullable
          : check(val);
      }

      $types['_' + type] = typeCheck;
    }
    /// #}}} @func _addType

    /// #{{{ @func _addShortcuts
    /**
     * @description
     *   Adds the type shortcuts to the *$types* hash map.
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {void}
     */
    function _addShortcuts(shortcuts) {

      /** @type {string} */
      var shortcut;
      /** @type {string} */
      var type;

      for (shortcut in shortcuts) {
        if( $own(shortcuts, shortcut) ) {
          type = '_' + shortcuts[shortcut];
          shortcut = '_' + shortcut;
          $types[shortcut] = $types[type];
        }
      }
    }
    /// #}}} @func _addShortcuts

    /// #{{{ @func _addArrayType
    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     *   The check method for each of an array's property values.
     * @return {!function(*): boolean}
     *   The check method for the `array` type.
     */
    function _addArrayType(eachCheck) {

      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {number} */
        var i;

        if ( !$is.arr(val) )
          return NO;

        i = val['length'];
        while (i--) {
          if ( !eachCheck(val[i]) )
            return NO;
        }
        return YES;
      }

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

      /**
       * @param {*} val
       * @return {boolean}
       */
      function check(val) {

        /** @type {string} */
        var key;

        if ( !$is.obj(val) )
          return NO;

        for (key in val) {
          if( $own(val, key) && !eachCheck(val[key]) )
            return NO;
        }
        return YES;
      }

      return check;
    }
    _addType['maps'] = _addMapType;
    /// #}}} @func _addMapType

    /// #{{{ @group Add-Types

    /// #{{{ @group Primitives
    _addTypes('primitives', {
      'undefined': $is.void,
      'boolean':   $is.bool,
      'string':    $is.str,
      'number':    $is.num,
      'nan':       $is.nan
    }, NO);
    _addType('primitives', 'null', $is.nil);
    /// #}}} @group Primitives

    /// #{{{ @group JS-Objects
    _addTypes('js_objects', {
      'object': $is.obj,
      'regexp': $is.regx,
      'array':  $is.arr,
      'error':  $is.err,
      'date':   $is.date
    });
    _addType('js_objects', 'arguments', $is.args);
    _addType('js_objects', 'function', $is.fun, NO);
    /// #}}} @group JS-Objects

    /// #{{{ @group DOM-Objects
    _addTypes('dom_objects', {
      'element':  $is.elem,
      'document': $is.doc
    });
    /// #}}} @group DOM-Objects

    /// #{{{ @group Others
    _addType('others', 'empty', $is.empty);
    /// #}}} @group Others

    /// #{{{ @group Arrays
    _addTypes('arrays', {
      'undefineds': $is.void,
      'nulls':      $is.nil,
      'booleans':   $is.bool,
      'strings':    $is.str,
      'numbers':    $is.num,
      'nans':       $is.nan,
      'objects':    $is.obj,
      'functions':  $is.fun,
      'regexps':    $is.regx,
      'arrays':     $is.arr,
      'dates':      $is.date,
      'errors':     $is.err,
      'elements':   $is.elem,
      'documents':  $is.doc
    });
    /// #}}} @group Arrays

    /// #{{{ @group Maps
    _addTypes('maps', {
      'undefinedmap': $is.void,
      'nullmap':      $is.nil,
      'booleanmap':   $is.bool,
      'stringmap':    $is.str,
      'numbermap':    $is.num,
      'nanmap':       $is.nan,
      'objectmap':    $is.obj,
      'functionmap':  $is.func,
      'regexpmap':    $is.regex,
      'arraymap':     $is.arr,
      'datemap':      $is.date,
      'errormap':     $is.err,
      'elementmap':   $is.elem,
      'documentmap':  $is.doc
    });
    /// #}}} @group Maps

    /// #}}} @group Add-Types

    /// #{{{ @group Add-Shortcuts
    _addShortcuts({

      /// #{{{ @group Primitives
      'nil':  'null',
      'bool': 'boolean',
      'str':  'string',
      'num':  'number',
      'void': 'undefined',
      /// #}}} @group Primitives

      /// #{{{ @group JS-Objects
      'obj':   'object',
      'func':  'function',
      'fun':   'function',
      'fn':    'function',
      'regex': 'regexp',
      'regx':  'regexp',
      're':    'regexp',
      'arr':   'array',
      'err':   'error',
      'args':  'arguments',
      /// #}}} @group JS-Objects

      /// #{{{ @group DOM-Objects
      'elem': 'element',
      'doc':  'document',
      /// #}}} @group DOM-Objects

      /// #{{{ @group Arrays
      'undefinedes': 'undefineds',
      'voids':   'undefineds',
      'nils':    'nulls',
      'strs':    'strings',
      'nums':    'numbers',
      'bools':   'booleans',
      'objs':    'objects',
      'funcs':   'functions',
      'funs':    'functions',
      'fns':     'functions',
      'regexes': 'regexps',
      'regexs':  'regexps',
      'res':     'regexps',
      'arrs':    'arrays',
      'errs':    'errors',
      'elems':   'elements',
      'docs':    'documents',
      /// #}}} @group Arrays

      /// #{{{ @group Maps
      'voidmap':  'undefinedmap',
      'nilmap':   'nullmap',
      'strmap':   'stringmap',
      'nummap':   'numbermap',
      'boolmap':  'booleanmap',
      'objmap':   'objectmap',
      'funcmap':  'functionmap',
      'funmap':   'functionmap',
      'fnmap':    'functionmap',
      'regexmap': 'regexpmap',
      'regxmap':  'regexpmap',
      'remap':    'regexpmap',
      'arrmap':   'arraymap',
      'errmap':   'errormap',
      'elemmap':  'elementmap',
      'docmap':   'documentmap'
      /// #}}} @group Maps

    });
    /// #}}} @group Add-Shortcuts

    return $types;
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

    if ( _hasSpecial('=', types) )
      types += '|undefined';

    types = types['toLowerCase']();
    types = types['replace'](_ALL_SPECIALS, '');
    checks = types['split']('|');

    i = checks['length'];
    while (i--) {
      type = '_' + checks[i];
      if ( !$own(_TYPES, type) )
        return NIL;
      checks[i] = _TYPES[type];
    }

    return checks['length']
      ? checks
      : NIL;
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
      ? NO
      : ensure || negate;
    return override
      ? !negate && ensure
      : VOID;
  }
  /// #}}} @func _getNullable

  /// #}}} @group parse
  /// #ifnot}}} @scope FS_ONLY

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('is');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #insert @code MK_RANGE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers is

/// #ifnot{{{ @scope DOCS_ONLY
  return is;
})();
/// #ifnot{{{ @scope SOLO
/// #ifnot{{{ @scope IS_MAIN_ONLY
vitals['is'] = is;
/// #ifnot}}} @scope IS_MAIN_ONLY
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super is

/// #if{{{ @scope SOLO
var vitals = is;
vitals['is'] = is;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
