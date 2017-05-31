/**
 * ---------------------------------------------------------------------------
 * VITALS.IS
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.is](https://github.com/imaginate/vitals/wiki/vitals.is)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $own = require('./helpers/own.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.IS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var is = (function isPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - is
  // - is.null      (is.nil)
  // - is.undefined
  // - is.boolean   (is.bool)
  // - is.string    (is.str)
  // - is._string   (is._str)
  // - is.number    (is.num)
  // - is._number   (is._num)
  // - is.nan
  // - is.object    (is.obj)
  // - is._object   (is._obj)
  // - is.func      (is.fn|is.function*)
  // - is.array     (is.arr)
  // - is._array    (is._arr)
  // - is.regexp    (is.regex|is.re)
  // - is.date
  // - is.error     (is.err)
  // - is.args
  // - is.document  (is.doc)
  // - is.element   (is.elem)
  // - is.empty
  // - is.frozen
  // - is.whole
  // - is.odd
  // - is.even
  //
  // * Note that `vitals.is.function` will fail in all ES3
  //   and some ES5 browser and other platform environments.
  //   Use `vitals.is.func` for compatibility with older
  //   environments.
  //////////////////////////////////////////////////////////

  /* {{{2 Is References
   * @ref [arr]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays)
   * @ref [doc]:(https://developer.mozilla.org/en-US/docs/Web/API/Document)
   * @ref [nan]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
   * @ref [num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
   * @ref [obj]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Objects)
   * @ref [own]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
   * @ref [args]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
   * @ref [date]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
   * @ref [elem]:(https://developer.mozilla.org/en-US/docs/Web/API/Element)
   * @ref [func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Normal_objects_and_functions)
   * @ref [none]:(https://developer.mozilla.org/en-US/docs/Glossary/undefined)
   * @ref [null]:(https://developer.mozilla.org/en-US/docs/Glossary/null)
   * @ref [prim]:(https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
   * @ref [ecma3]:(http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)
   * @ref [ecma5]:(http://www.ecma-international.org/ecma-262/5.1/index.html)
   * @ref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
   * @ref [regex]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * @ref [frozen]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
   * @ref [str-prim]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
   * @ref [bool-desc]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#Description)
   * @ref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
   * @ref [func-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
   */

  /// {{{2
  /// @method is
  /**
   * Checks if a value or many values are a specific data type or types. See
   * @is-types for a complete list of the available data types. Note that all
   * `object` types are nullable by default (i.e. `is("object", null)` will
   * return `true`).
   *
   * @public
   * @param {string} types
   *   The valid data types. See @is-types for a complete list of the
   *   available data types.
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function is(types, val) {

    /** @type {string} */
    var nullable;
    /** @type {?Array<!function>} */
    var checks;
    /** @type {boolean} */
    var vals;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #types defined');
      case 1:
        throw $err(new Error, 'no #val defined');
      case 2:
        vals = NO;
        break;
      default:
        vals = YES;
        break;
    }

    if ( !$is.str(types) )
      throw $typeErr(new TypeError, 'types', types, 'string');
    if ( !types )
      throw $err(new Error, 'invalid empty #types `string`');

    if ( _hasSpecial('*', types) )
      return YES;

    checks = _getChecks(types);

    if (!checks)
      throw $rangeErr(new RangeError, 'types',
        'https://github.com/imaginate/vitals/wiki/vitals.is-types');

    nullable = _getNullable(types);
    return vals
      ? _checkVals(checks, arguments, nullable)
      : _checkVal(checks, val, nullable);
  }

  /// {{{2
  /// @method is.null
  /// @alias is.nil
  /**
   * Checks if a value or many values are [null][null].
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isNull(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'null');
      case 1:
        return $is.nil(val);
      default:
        return _are(arguments, $is.nil);
    }
  }
  is['null'] = isNull;
  is['nil'] = isNull;

  /// {{{2
  /// @method is.undefined
  /**
   * Checks if a value or many values are [undefined][none].
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isUndefined(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'undefined');
      case 1:
        return $is.none(val);
      default:
        return _are(arguments, $is.none);
    }
  }
  is['undefined'] = isUndefined;

  /// {{{2
  /// @method is.boolean
  /// @alias is.bool
  /**
   * Checks if a value or many values are a [primitive boolean][bool-desc]
   * data type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isBoolean(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'boolean');
      case 1:
        return $is.bool(val);
      default:
        return _are(arguments, $is.bool);
    }
  }
  is['boolean'] = isBoolean;
  is['bool'] = isBoolean;

  /// {{{2
  /// @method is.string
  /// @alias is.str
  /**
   * Checks if a value or many values are a [primitive string][str-prim] data
   * type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isString(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'string');
      case 1:
        return $is.str(val);
      default:
        return _are(arguments, $is.str);
    }
  }
  is['string'] = isString;
  is['str'] = isString;

  /// {{{2
  /// @method is._string
  /// @alias is._str
  /**
   * Checks if a value or many values are a [primitive string][str-prim] data
   * type and not empty (e.g. `""`).
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isNonEmptyString(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', '_string');
      case 1:
        return $is._str(val);
      default:
        return _are(arguments, $is._str);
    }
  }
  is['_string'] = isNonEmptyString;
  is['_str'] = isNonEmptyString;

  /// {{{2
  /// @method is.number
  /// @alias is.num
  /**
   * Checks if a value or many values are a [primitive][prim] [number][num]
   * data type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'number');
      case 1:
        return $is.num(val);
      default:
        return _are(arguments, $is.num);
    }
  }
  is['number'] = isNumber;
  is['num'] = isNumber;

  /// {{{2
  /// @method is._number
  /// @alias is._num
  /**
   * Checks if a value or many values are a [primitive][prim] [number][num]
   * data type and not `0`.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isNonZeroNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', '_number');
      case 1:
        return $is._num(val);
      default:
        return _are(arguments, $is._num);
    }
  }
  is['_number'] = isNonZeroNumber;
  is['_num'] = isNonZeroNumber;

  /// {{{2
  /// @method is.nan
  /**
   * Checks if a value or many values are [NaN][nan].
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isNan(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'nan');
      case 1:
        return $is.nan(val);
      default:
        return _are(arguments, $is.nan);
    }
  }
  is['nan'] = isNan;

  /// {{{2
  /// @method is.object
  /// @alias is.obj
  /**
   * Checks if a value or many values are an [object][obj] data type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isObject(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'object');
      case 1:
        return $is.obj(val);
      default:
        return _are(arguments, $is.obj);
    }
  }
  is['object'] = isObject;
  is['obj'] = isObject;

  /// {{{2
  /// @method is._object
  /// @alias is._obj
  /**
   * Checks if a value or many values are an [object][obj] or [function][func]
   * data type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   * Checks if a value(s) is an object or function.
   *
   * @public
   * @param {...*} val
   * @return {boolean}
   */
  function isObjectOrFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', '_object');
      case 1:
        return $is._obj(val);
      default:
        return _are(arguments, $is._obj);
    }
  }
  is['_object'] = isObjectOrFunction;
  is['_obj'] = isObjectOrFunction;

  /// {{{2
  /// @method is.func
  /// @alias is.fn
  /// @alias is.function*
  /**
   * Checks if a value or many values are a [function][func] data type. Note
   * that `vitals.is.function` is not valid in [ES3][ecma3] and some
   * [ES5][ecma5] browser and other platform environments. Use
   * `vitals.is.func` for browser and platform safety.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isFunction(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'function');
      case 1:
        return $is.fun(val);
      default:
        return _are(arguments, $is.fun);
    }
  }
  is['func'] = isFunction;
  try {
    is['fn'] = isFunction;
    is['function'] = isFunction;
  }
  catch (e) {}

  /// {{{2
  /// @method is.array
  /// @alias is.arr
  /**
   * Checks if a value or many values are an instance of the [array][arr]
   * `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isArray(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'array');
      case 1:
        return $is.arr(val);
      default:
        return _are(arguments, $is.arr);
    }
  }
  is['array'] = isArray;
  is['arr'] = isArray;

  /// {{{2
  /// @method is._array
  /// @alias is._arr
  /**
   * Checks if a value or many values are an instance of the [array][arr] or
   * [arguments][args] `object` types.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isArrayOrArguments(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', '_array');
      case 1:
        return $is._arr(val);
      default:
        return _are(arguments, $is._arr);
    }
  }
  is['_array'] = isArrayOrArguments;
  is['_arr'] = isArrayOrArguments;

  /// {{{2
  /// @method is.regexp
  /// @alias is.regex
  /// @alias is.re
  /**
   * Checks if a value or many values are an instance of the [RegExp][regex]
   * `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isRegExp(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'regexp');
      case 1:
        return $is.regx(val);
      default:
        return _are(arguments, $is.regx);
    }
  }
  is['regexp'] = isRegExp;
  is['regex'] = isRegExp;
  is['re'] = isRegExp;

  /// {{{2
  /// @method is.date
  /**
   * Checks if a value or many values are an instance of the [Date][date]
   * `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isDate(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'date');
      case 1:
        return $is.date(val);
      default:
        return _are(arguments, $is.date);
    }
  }
  is['date'] = isDate;

  /// {{{2
  /// @method is.error
  /// @alias is.err
  /**
   * Checks if a value or many values are an instance of the [Error][error]
   * `object` types.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isError(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'error');
      case 1:
        return $is.err(val);
      default:
        return _are(arguments, $is.err);
    }
  }
  is['error'] = isError;
  is['err'] = isError;

  /// {{{2
  /// @method is.args
  /**
   * Checks if a value or many values are an instance of the [arguments][args]
   * `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isArguments(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'args');
      case 1:
        return $is.args(val);
      default:
        return _are(arguments, $is.args);
    }
  }
  is['args'] = isArguments;

  /// {{{2
  /// @method is.document
  /// @alias is.doc
  /**
   * Checks if a value or many values are an instance of the
   * [DOM Document][doc] `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isDocument(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'document');
      case 1:
        return $is.doc(val);
      default:
        return _are(arguments, $is.doc);
    }
  }
  is['document'] = isDocument;
  is['doc'] = isDocument;

  /// {{{2
  /// @method is.element
  /// @alias is.elem
  /**
   * Checks if a value or many values are an instance of the
   * [DOM Element][elem] `object` type.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must pass the type check to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isElement(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'element');
      case 1:
        return $is.elem(val);
      default:
        return _are(arguments, $is.elem);
    }
  }
  is['element'] = isElement;
  is['elem'] = isElement;

  /// {{{2
  /// @method is.empty
  /**
   * Checks if a value or many values are considered empty. The definition of
   * empty is defined as follows in order of priority (per #val data type):
   * - *`null`*!$
   *   `null` is considered empty.
   * - *`undefined`*!$
   *   `undefined` is considered empty.
   * - *`number`*!$
   *   Only `0` and `NaN` are considered empty.
   * - *`string`*!$
   *   Only `""` is considered empty.
   * - *`boolean`*!$
   *   Only `false` is considered empty.
   * - *`function`*!$
   *   The [length property][func-length] must be `0` to be considered empty.
   * - *`!Array`*!$
   *   The [length property][arr-length] must be `0` to be considered empty.
   * - *`!Object`*!$
   *   The `object` must [own][own] at least one property to be considered
   *   empty.
   * - *`*`*!$
   *   All other data types are **not** considered empty.
   *
   * @public
   * @param {...*} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must be empty to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isEmpty(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'empty');
      case 1:
        return $is.empty(val);
      default:
        return _are(arguments, $is.empty);
    }
  }
  is['empty'] = isEmpty;

  /// {{{2
  /// @method is.frozen
  /**
   * Checks if an `object` or `function` is [frozen][frozen].
   *
   * @public
   * @param {...(?Object|?Function)} source
   *   If more than one #source is provided every #source must be
   *   [frozen][frozen] to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isFrozen(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'frozen');
      case 1:
        return _isFrozen(val);
      default:
        return _are(arguments, _isFrozen);
    }
  }
  is['frozen'] = isFrozen;

  /// {{{2
  /// @method is.whole
  /**
   * Checks if a [number][num] is whole (i.e. has no fractional portion). All
   * whole numbers less than one (e.g. `wholeNumber <= 0`) will return `true`.
   *
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must be a valid whole `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isWholeNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'whole');
      case 1:
        return _isWhole(val);
      default:
        return _are(arguments, _isWhole);
    }
  }
  is['whole'] = isWholeNumber;

  /// {{{2
  /// @method is.odd
  /**
   * Checks if a [number][num] is odd. All odd numbers less than zero (e.g.
   * `oddNumber < 0`) will return `true`.
   *
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must be an odd `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isOddNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'odd');
      case 1:
        return _isOdd(val);
      default:
        return _are(arguments, _isOdd);
    }
  }
  is['odd'] = isOddNumber;

  /// {{{2
  /// @method is.even
  /**
   * Checks if a [number][num] is even. All even numbers less than one (e.g.
   * `evenNumber <= 0`) will return `true`.
   *
   * @public
   * @param {...number} val
   *   The value to evaluate. If more than one #val is provided every #val
   *   must be an even `number` to return `true`.
   * @return {boolean}
   *   The evaluation result.
   */
  function isEvenNumber(val) {
    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'even');
      case 1:
        return _isEven(val);
      default:
        return _are(arguments, _isEven);
    }
  }
  is['even'] = isEvenNumber;

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - ARE
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _are
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

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - IS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _isFrozen
  /**
   * @private
   * @param {(?Object|?Function)} val
   * @return {boolean}
   */
  function _isFrozen(val) {

    if ( $is.nil(val) )
      return NO;

    if ( !$is._obj(val) )
      throw $typeErr(new TypeError, 'val', val, '?Object|?Function',
        'frozen');

    return $is.frozen(val);
  }

  /// {{{3
  /// @func _isWhole
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isWhole(val) {

    if ( !$is.num(val) )
      throw $typeErr(new TypeError, 'val', val, 'number', 'whole');

    return $is.whole(val);
  }

  /// {{{3
  /// @func _isOdd
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isOdd(val) {

    if ( !$is.num(val) )
      throw $typeErr(new TypeError, 'val', val, 'number', 'odd');
    if ( !$is.whole(val) )
      throw $rangeErr(new RangeError, 'val', '-?[0-9]+', 'odd');

    return $is.odd(val);
  }

  /// {{{3
  /// @func _isEven
  /**
   * @private
   * @param {number} val
   * @return {boolean}
   */
  function _isEven(val) {

    if ( !$is.num(val) )
      throw $typeErr(new TypeError, 'val', val, 'number', 'even');
    if ( !$is.whole(val) )
      throw $rangeErr(new RangeError, 'val', '-?[0-9]+', 'even');

    return $is.even(val);
  }

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - CHECKS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @func _checkVal
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

  /// {{{3
  /// @func _checkVals
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

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - TYPES
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const TYPES
  /**
   * @private
   * @const {!Object<string, !function(*, boolean=): boolean>}
   * @dict
   */
  var TYPES = (function _isTypesPrivateScope() {

    /**
     * @type {!Object<string, !function(*, boolean=): boolean>}
     * @dict
     */
    var $types = {};

    /// {{{4
    /// @func addTypes
    /**
     * Adds types to the *$types* hash map with a check method that evaluates
     * nullable properties and invokes their type section's method.
     *
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
    function addTypes(section, types, nullableDefault) {

      /** @type {string} */
      var type;

      for (type in types) {
        if( $own(types, type) )
          addType(section, type, types[type], nullableDefault);
      }
    }

    /// {{{4
    /// @func addType
    /**
     * Adds a type to the *$types* hash map with a check method that evaluates
     * nullable properties and invokes its type section's method.
     *
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
    function addType(section, type, check, nullableDefault) {

      if ( $own(addType, section) )
        check = addType[section](check);

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

    /// {{{4
    /// @func addShortcuts
    /**
     * Adds the type shortcuts to the *$types* hash map.
     *
     * @private
     * @param {!Object<string, string>} shortcuts
     * @return {void}
     */
    function addShortcuts(shortcuts) {

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

    /// {{{4
    /// @func addArrayType
    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     *   The check method for each of an array's property values.
     * @return {!function(*): boolean}
     *   The check method for the `array` type.
     */
    function addArrayType(eachCheck) {

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
    addType['arrays'] = addArrayType;

    /// {{{4
    /// @func addMapType
    /**
     * @private
     * @param {!function(*): boolean} eachCheck
     *   The check method for each of an hash map's property values.
     * @return {!function(*): boolean}
     *   The check method for the `object` or `function` hash map type.
     */
    function addMapType(eachCheck) {

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
    addType['maps'] = addMapType;

    ///////////////////////// {{{4
    // ADD TYPES
    //////////////////////////////

    /// {{{5 Add Primitives
    addTypes('primitives', {
      'undefined': $is.none,
      'boolean':   $is.bool,
      'string':    $is.str,
      'number':    $is.num,
      'nan':       $is.nan
    }, NO);
    addType('primitives', 'null', $is.nil);

    /// {{{5 Add JS Objects
    addTypes('js_objects', {
      'object': $is.obj,
      'regexp': $is.regx,
      'array':  $is.arr,
      'error':  $is.err,
      'date':   $is.date
    });
    addType('js_objects', 'arguments', $is.args);
    addType('js_objects', 'function', $is.fun, NO);

    /// {{{5 Add DOM Objects
    addTypes('dom_objects', {
      'element':  $is.elem,
      'document': $is.doc
    });

    /// {{{5 Add Others
    addType('others', 'empty', $is.empty);

    /// {{{5 Add Arrays
    addTypes('arrays', {
      'nulls':     $is.nil,
      'booleans':  $is.bool,
      'strings':   $is.str,
      'numbers':   $is.num,
      'nans':      $is.nan,
      'objects':   $is.obj,
      'functions': $is.fun,
      'regexps':   $is.regx,
      'arrays':    $is.arr,
      'dates':     $is.date,
      'errors':    $is.err,
      'elements':  $is.elem,
      'documents': $is.doc
    });

    /// {{{5 Add Maps
    addTypes('maps', {
      'nullmap':     $is.nil,
      'booleanmap':  $is.bool,
      'stringmap':   $is.str,
      'numbermap':   $is.num,
      'nanmap':      $is.nan,
      'objectmap':   $is.obj,
      'functionmap': $is.func,
      'regexpmap':   $is.regex,
      'arraymap':    $is.arr,
      'datemap':     $is.date,
      'errormap':    $is.err,
      'elementmap':  $is.elem,
      'documentmap': $is.doc
    });

    ///////////////////////// {{{4
    // ADD SHORTCUTS
    //////////////////////////////

    addShortcuts({

      /// {{{5 Add Primitives
      'nil':  'null',
      'bool': 'boolean',
      'str':  'string',
      'num':  'number',

      /// {{{5 Add JS Objects
      'obj':   'object',
      'func':  'function',
      'fn':    'function',
      'regex': 'regexp',
      're':    'regexp',
      'arr':   'array',
      'err':   'error',
      'args':  'arguments',

      /// {{{5 Add DOM Objects
      'elem': 'element',
      'doc':  'document',

      /// {{{5 Add Arrays
      'nils':   'nulls',
      'strs':   'strings',
      'nums':   'numbers',
      'bools':  'booleans',
      'objs':   'objects',
      'funcs':  'functions',
      'fns':    'functions',
      'regexs': 'regexps',
      'res':    'regexps',
      'arrs':   'arrays',
      'errs':   'errors',
      'elems':  'elements',
      'docs':   'documents',

      /// {{{5 Add Maps
      'nilmap':   'nullmap',
      'strmap':   'stringmap',
      'nummap':   'numbermap',
      'boolmap':  'booleanmap',
      'objmap':   'objectmap',
      'funcmap':  'functionmap',
      'fnmap':    'functionmap',
      'regexmap': 'regexpmap',
      'remap':    'regexpmap',
      'arrmap':   'arraymap',
      'errmap':   'errormap',
      'elemmap':  'elementmap',
      'docmap':   'documentmap'
    });
    /// }}}4

    // END OF PRIVATE SCOPE FOR IS TYPES
    return $types;
  })();

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - PARSING
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ALL_SPECIALS
  /**
   * @private
   * @type {!RegExp}
   */
  var ALL_SPECIALS = /[^a-z\|]/g;

  /// {{{3
  /// @const SPECIALS
  /**
   * @private
   * @const {!Object<string, !function(string): boolean>}
   * @dict
   */
  var SPECIALS = (function _isSpecialsPrivateScope() {

    /// {{{4
    /// @const PIPE
    /**
     * @private
     * @const {!RegExp}
     */
    var PIPE = /\|/;

    /// {{{4
    /// @const EX_POINT
    /**
     * @private
     * @const {!RegExp}
     */
    var EX_POINT = /\!/;

    /// {{{4
    /// @const QUEST_MARK
    /**
     * @private
     * @const {!RegExp}
     */
    var QUEST_MARK = /\?/;

    /// {{{4
    /// @const EQ_SIGN
    /**
     * @private
     * @const {!RegExp}
     */
    var EQ_SIGN = /\=/;

    /// {{{4
    /// @const ANY_GLOB
    /**
     * @private
     * @const {!RegExp}
     */
    var ANY_GLOB = /\*|any/;

    /// {{{4
    /// @func hasPipe
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasPipe(val) {
      return PIPE['test'](val);
    }

    /// {{{4
    /// @func hasExPoint
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasExPoint(val) {
      return EX_POINT['test'](val);
    }

    /// {{{4
    /// @func hasQuestMark
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasQuestMark(val) {
      return QUEST_MARK['test'](val);
    }

    /// {{{4
    /// @func hasEqSign
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasEqSign(val) {
      return EQ_SIGN['test'](val);
    }

    /// {{{4
    /// @func hasAnyGlob
    /**
     * @param {string} val
     * @return {boolean}
     */
    function hasAnyGlob(val) {
      return ANY_GLOB['test'](val);
    }

    /// {{{4
    /// @const SPECIALS
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
    /// }}}4

    // END OF PRIVATE SCOPE FOR IS SPECIALS
    return SPECIALS;
  })();

  /// {{{3
  /// @func _hasSpecial
  /**
   * @private
   * @param {string} special
   * @param {string} types
   * @return {boolean}
   */
  function _hasSpecial(special, types) {
    return SPECIALS[special](types);
  }

  /// {{{3
  /// @func _getChecks
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
    types = types['replace'](ALL_SPECIALS, '');
    checks = types['split']('|');

    i = checks['length'];
    while (i--) {
      type = '_' + checks[i];
      if ( !$own(TYPES, type) )
        return NIL;
      checks[i] = TYPES[type];
    }

    return checks['length']
      ? checks
      : NIL;
  }

  /// {{{3
  /// @func _getNullable
  /**
   * Method checks whether `"!"` or `"?"` exists in the #types `string`.
   *
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

  ///////////////////////////////////////////////////// {{{2
  // IS HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('is');

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

  // END OF PRIVATE SCOPE FOR VITALS.IS
  return is;
})();
/// }}}1

module.exports = is;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
