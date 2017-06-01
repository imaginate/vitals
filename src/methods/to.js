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

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #}}} @on SOLO

/// #{{{ @super to
/**
 * @public
 * @type {!Object<string, !Function>}
 * @dict
 */
var to = (function toPrivateScope() {

  /// #{{{ @docrefs to
  /// @docref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  /// @docref [prim]:(https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
  /// @docref [error]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
  /// @docref [split]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
  /// @docref [number]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  /// @docref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [str2num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Convert_numeric_strings_to_numbers)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [regx-src]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)
  /// #}}} @docrefs to

  /**
   * @public
   * @type {!Object<string, !Function>}
   * @dict
   */
  var to = {};

  /// #{{{ @submethod string
  /// @section base
  /// @method vitals.to.string
  /// @alias vitals.to.str
  /**
   * @description
   *   Converts any value to a `string` with [String][string], the value's (if
   *   it is a `RegExp`) `toString` property, or optionally (if it is an
   *   `array`) [Array.prototype.join][join].
   * @public
   * @param {*} val
   * @param {(string|undefined)=} separator = `undefined`
   *   Only allowed for use if the #val is an `array`. If the #separator is
   *   defined, [Array.prototype.join][join] is called on the #val using the
   *   #separator value to join each indexed property.
   * @return {string}
   */
  function toString(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'string');

      case 1:
        return $mkStr(val);

      default:
        if ( $is.void(separator) )
          return $mkStr(val);

        if ( !$is.arr(val) )
          throw _mkErr(new ERR, 'invalid #separator defined (' +
            'only allowed with an `array` #val)', 'string');
        if ( !$is.str(separator) )
          throw _mkTypeErr(new TYPE_ERR, 'separator', separator, 'string=',
            'string');

        return val['join'](separator);
    }
  }
  to['string'] = toString;
  to['str'] = toString;
  /// #}}} @submethod string

  /// #{{{ @submethod number
  /// @section base
  /// @method vitals.to.number
  /// @alias vitals.to.num
  /**
   * @description
   *   Converts most [primitive][prim] values to a `number`.
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
      throw _mkErr(new ERR, 'no #val defined', 'number');

    if ( $is.num(val) )
      return val;
    if ( $is.nil(val) )
      return 0;
    if ( $is.bool(val) )
      return val
        ? 1
        : 0;

    if ( !$is.str(val) )
      throw _mkTypeErr(new TYPE_ERR, 'val', val, '?string|?number|?boolean',
        'number');

    val = NUM(val);

    if ( $is.nan(val) )
      throw _mkRangeErr(new RANGE_ERR, 'val', 'https://github.com/' +
        'imaginate/vitals/wiki/vitals.to#user-content-number', 'number');

    return val;
  }
  to['number'] = toNumber;
  to['num'] = toNumber;
  /// #}}} @submethod number

  /// #{{{ @submethod boolean
  /// @section base
  /// @method vitals.to.boolean
  /// @alias vitals.to.bool
  /**
   * @description
   *   Converts any value into a `boolean`.
   * @public
   * @param {*} val
   * @return {boolean}
   */
  function toBoolean(val) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #val defined', 'boolean');

    return !!val;
  }
  to['boolean'] = toBoolean;
  to['bool'] = toBoolean;
  /// #}}} @submethod boolean

  /// #{{{ @submethod array
  /// @section base
  /// @method vitals.to.array
  /// @alias vitals.to.arr
  /**
   * @description
   *   Converts a `string` or `number` into an `array`.
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
   *   `string`. If the #separator is **not** defined, one of the following
   *   values is used to [split][split] the `string` (values listed in order
   *   of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  function toArray(val, separator) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 1:
        if ( $is.num(val) )
          return new ARR(val);

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        return $splitKeys(val);

      default:
        if ( $is.num(val) ) {
          if ( !$is.void(separator) )
            throw _mkErr(new ERR, 'invalid #separator defined (' +
              'only allowed with a `string` #val)', 'array');

          return new ARR(val);
        }

        if ( !$is.str(val) )
          throw _mkTypeErr(new TYPE_ERR, 'val', val, 'string|number',
            'array');

        if ( !$is.regx(separator) )
          separator = $mkStr(separator);

        return val['split'](separator);
    }
  }
  to['array'] = toArray;
  to['arr'] = toArray;
  /// #}}} @submethod array

  /// #{{{ @submethod regexp
  /// @section base
  /// @method vitals.to.regexp
  /// @alias vitals.to.regex
  /// @alias vitals.to.re
  /**
   * @description
   *   Converts a `string` into a `RegExp`.
   * @public
   * @param {string} source
   *   The [RegExp.prototype.source][regx-src] pattern for the new `RegExp`.
   * @param {(string|undefined)=} flags
   *   If #flags is defined, it is the [RegExp flags][regexp] to assign to the
   *   new `RegExp`.
   * @return {!RegExp}
   */
  function toRegExp(source, flags) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'regexp');

      case 1:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        return new REGX(source);

      default:
        if ( !$is.str(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string',
            'regexp');

        if ( $is.void(flags) )
          return new REGX(source);

        if ( !$is.str(flags) )
          throw _mkTypeErr(new TYPE_ERR, 'flags', flags, 'string=', 'regexp');

        return new REGX(source, flags);
    }
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['re'] = toRegExp;
  /// #}}} @submethod regexp

  /// #{{{ @submethod upperCase
  /// @section base
  /// @method vitals.to.upperCase
  /// @alias vitals.to.upper
  /**
   * @description
   *   Converts all characters in a `string` to upper case.
   * @public
   * @param {string} source
   * @return {string}
   */
  function toUpperCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'upperCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'upperCase');

    return source['toUpperCase']();
  }
  to['upperCase'] = toUpperCase;
  to['upper'] = toUpperCase;
  /// #}}} @submethod upperCase

  /// #{{{ @submethod lowerCase
  /// @section base
  /// @method vitals.to.lowerCase
  /// @alias vitals.to.lower
  /**
   * @description
   *   Converts all characters in a `string` to lower case.
   * @public
   * @param {string} source
   * @return {string}
   */
  function toLowerCase(source) {

    if (arguments['length'] < 1)
      throw _mkErr(new ERR, 'no #source defined', 'lowerCase');
    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'lowerCase');

    return source['toLowerCase']();
  }
  to['lowerCase'] = toLowerCase;
  to['lower'] = toLowerCase;
  /// #}}} @submethod lowerCase

  /// #{{{ @group To-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('to');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group To-Helpers

  return to;
})();
/// #{{{ @off SOLO
vitals['to'] = to;
/// #}}} @off SOLO
/// #}}} @super to

/// #{{{ @on SOLO
var vitals = to;
vitals['to'] = to;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
