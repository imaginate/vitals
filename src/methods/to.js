/**
 * ---------------------------------------------------------------------------
 * VITALS.TO
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.to](https://github.com/imaginate/vitals/wiki/vitals.to)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $splitKeys = require('./helpers/split-keys.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.TO
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @type {!Object<string, !Function>}
 * @dict
 */
var to = (function toPrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - to.string    (to.str)
  // - to.number    (to.num)
  // - to.boolean   (to.bool)
  // - to.array     (to.arr)
  // - to.regexp    (to.re|to.regex)
  // - to.upperCase (to.upper)
  // - to.lowerCase (to.lower)
  //////////////////////////////////////////////////////////

  /* {{{2 To References
   * @ref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
   * @ref [prim]:(https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
   * @ref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
   * @ref [split]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
   * @ref [number]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
   * @ref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
   * @ref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   * @ref [str2num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Convert_numeric_strings_to_numbers)
   * @ref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
   * @ref [regx-src]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
   */

  /// {{{2 to
  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var to = {};

  /// {{{2
  /// @method to.string
  /// @alias to.str
  /**
   * Converts any value to a `string` with [String][string] or optionally, for
   * an `array` #val, [Array.prototype.join][join].
   *
   * @public
   * @param {*} val
   * @param {string=} separator
   *   Only allowed for use if the #val is an `array`. If the #separator is
   *   defined, [Array.prototype.join][join] is called on the #val using the
   *   #separator value to join each indexed property.
   * @return {string}
   */
  function toString(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'string');
      case 1:
        return $is.str(val)
          ? val
          : String(val);
    }

    if ( $is.none(separator) )
      return String(val);

    if ( !$is.arr(val) )
      throw $err(new Error, 'invalid #separator defined (' +
        'only allowed with an `array` #val)', 'string');
    if ( !$is.str(separator) )
      throw $typeErr(new TypeError, 'separator', separator, 'string=',
        'string');

    return val['join'](separator);
  }
  to['string'] = toString;
  to['str'] = toString;

  /// {{{2
  /// @method to.number
  /// @alias to.num
  /**
   * Converts most [primitive][prim] values to a `number`.
   *
   * @public
   * @param {(?string|?number|?boolean)} val
   *   If the #val is a `string`, [Number][number] is used to convert it to a
   *   `number`. Only [valid strings][str2num] are allowed.
   * @return {number}
   *   The return details are as follows (per #val data type):
   *   - *`boolean`*!$
   *     This method will return `1` for `true` or `0` for `false`.
   *   - *`number`*!$
   *     This method will return the value of #val.
   *   - *`string`*!$
   *     This method will return the result from [Number][number] unless it is
   *     `NaN`. If the result is `NaN`, an [Error][error] will be thrown.
   *   - *`null`*!$
   *     This method will return `0`.
   */
  function toNumber(val) {

    if (arguments['length'] < 1)
      throw $err(new Error, 'no #val defined', 'number');

    if ( $is.num(val) )
      return val;
    if ( $is.nil(val) )
      return 0;
    if ( $is.bool(val) )
      return val
        ? 1
        : 0;

    if ( !$is.str(val) )
      throw $typeErr(new TypeError, 'val', val, '?string|?number|?boolean',
        'number');

    val = Number(val);

    if ( $is.nan(val) )
      throw $rangeErr(new RangeError, 'val', 'https://github.com/imaginate/' +
        'vitals/wiki/vitals.to#user-content-number', 'number');

    return val;
  }
  to['number'] = toNumber;
  to['num'] = toNumber;

  /// {{{2
  /// @method to.boolean
  /// @alias to.bool
  /**
   * Converts any value into a `boolean`.
   *
   * @public
   * @param {*} val
   * @return {boolean}
   */
  function toBoolean(val) {

    if (arguments['length'] < 1)
      throw $err(new Error, 'no #val defined', 'boolean');

    return !!val;
  }
  to['boolean'] = toBoolean;
  to['bool'] = toBoolean;

  /// {{{2
  /// @method to.array
  /// @alias to.arr
  /**
   * Converts a `string` or `number` into an `array`.
   *
   * @public
   * @param {(string|number)} val
   *   The #val details are as follows (per #val type):
   *   - *`string`*!$
   *     [String.prototype.split][split] is called on the #val.
   *   - *`number`*!$
   *     A new `array` with #val [length][arr-length] is created.
   * @param {*=} separator
   *   Only allowed for use if the #val is a `string`. The #separator is used
   *   to [split][split] the `string` into `array` properties. If the
   *   #separator is defined and is not a `RegExp`, it is converted into a
   *   `string` with [String][string]. If the #separator is **not** defined,
   *   one of the following values is used to [split][split] the `string`
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  function toArray(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #val defined', 'array');
      case 1:
        if ( $is.num(val) )
          return new Array(val);

        if ( !$is.str(val) )
          throw $typeErr(new TypeError, 'val', val, 'string|number', 'array');

        return $splitKeys(val);
    }

    if ( $is.num(val) ) {
      if ( !$is.none(separator) )
        throw $err(new Error, 'invalid #separator defined (' +
          'only allowed with a `string` #val)', 'array');

      return new Array(val);
    }

    if ( !$is.str(val) )
      throw $typeErr(new TypeError, 'val', val, 'string|number', 'array');

    if ( !$is.regx(separator) && !$is.str(separator) )
      separator = String(separator);

    return val['split'](separator);
  }
  to['array'] = toArray;
  to['arr'] = toArray;

  /// {{{2
  /// @method to.regexp
  /// @alias to.regex
  /// @alias to.re
  /**
   * Converts a `string` into a `RegExp`.
   *
   * @public
   * @param {string} source
   *   The [RegExp.prototype.source][regx-src] pattern for the new `RegExp`.
   * @param {string=} flags
   *   If #flags is defined, it is the [RegExp flags][regexp] to assign to the
   *   new `RegExp`.
   * @return {!RegExp}
   */
  function toRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'regexp');

      case 1:
        if ( !$is.str(source) )
          throw $typeErr(new TypeError, 'source', source, 'string', 'regexp');

        return new RegExp(source);
    }

    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'regexp');

    if ( $is.none(flags) )
      return new RegExp(source);

    if ( !$is.str(flags) )
      throw $typeErr(new TypeError, 'flags', flags, 'string=', 'regexp');

    return new RegExp(source, flags);
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['re'] = toRegExp;

  /// {{{2
  /// @method to.upperCase
  /// @alias to.upper
  /**
   * Converts all characters in a `string` to upper case.
   *
   * @public
   * @param {string} source
   * @return {string}
   */
  function toUpperCase(source) {

    if (arguments['length'] < 1)
      throw $err(new Error, 'no #source defined', 'upperCase');
    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'upperCase');

    return source['toUpperCase']();
  }
  to['upperCase'] = toUpperCase;
  to['upper'] = toUpperCase;

  /// {{{2
  /// @method to.lowerCase
  /// @alias to.lower
  /**
   * Converts all characters in a `string` to lower case.
   *
   * @public
   * @param {string} source
   * @return {string}
   */
  function toLowerCase(source) {

    if (arguments['length'] < 1)
      throw $err(new Error, 'no #source defined', 'lowerCase');
    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'lowerCase');

    return source['toLowerCase']();
  }
  to['lowerCase'] = toLowerCase;
  to['lower'] = toLowerCase;

  ///////////////////////////////////////////////////// {{{2
  // TO HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('to');

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

  // END OF PRIVATE SCOPE FOR VITALS.TO
  return to;
})();
/// }}}1

module.exports = to;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
