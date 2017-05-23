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
var $isNone = require('./helpers/is-none.js');
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
   * @ref [split]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
   * @ref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
   * @ref [str2num]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Convert_numeric_strings_to_numbers)
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
   * Converts a primitive value to a number.
   *
   * @public
   * @param {(?string|?number|?boolean)} val
   *   Only [valid strings][str2num] allowed.
   * @return {number}
   *   `NaN` values will not be returned.
   */
  function toNumber(val) {

    if (!arguments.length) throw $err(new Error, 'Missing a val', 'number');

    if ( $is.num(val) ) return val;
    if ( $is.nil(val) ) return 0;
    if ( $is.bool(val) ) return val ? 1 : 0;

    if ( !$is.str(val) ) throw $typeErr(new TypeError, 'val', 'number');

    val = Number(val);

    if ( $is.nan(val) ) throw $rangeErr(new RangeError, 'val', 'see github.com/imaginate/vitals/wiki/vitals.to#tonumber', 'number');

    return val;
  }
  to['number'] = toNumber;
  to['num'] = toNumber;

  /// {{{2
  /// @method to.boolean
  /// @alias to.bool
  /**
   * Converts a value to a boolean.
   *
   * @public
   * @param {*} val
   * @return {boolean}
   */
  function toBoolean(val) {

    if (!arguments.length) throw $err(new Error, 'Missing a val', 'boolean');

    return !!val;
  }
  to['boolean'] = toBoolean;
  to['bool'] = toBoolean;

  /// {{{2
  /// @method to.array
  /// @alias to.arr
  /**
   * Converts a value to an array.
   *
   * @public
   * @param {(string|number)} val
   *   Details per val type:
   *   - string: [String.prototype.split][split] is called on the string.
   *   - number: A new array of val length is returned.
   * @param {*=} separator
   *   Only used with a string val. If no separator is defined one of the
   *   following values is used (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @return {!Array}
   */
  function toArray(val, separator) {

    if (!arguments.length) throw $err(new Error, 'Missing a val', 'array');

    if ( $is.num(val) ) return new Array(val);

    if ( !$is.str(val) ) throw $typeErr(new TypeError, 'val', 'array');

    if ( $is.none(separator) ) return $splitKeys(val);

    separator = $is.regx(separator) ? separator : String(separator);
    return val.split(separator);
  }
  to['array'] = toArray;
  to['arr'] = toArray;

  /// {{{2
  /// @method to.regexp
  /// @alias to.regex
  /// @alias to.re
  /**
   * Converts a string to a regex.
   *
   * @public
   * @param {string} source
   * @param {string=} flags
   * @return {!RegExp}
   */
  function toRegExp(source, flags) {

    if (!arguments.length) throw $err(new Error, 'Missing a source', 'regexp');

    if ( !$is.str(source)   ) throw $typeErr(new TypeError, 'source', 'regexp');
    if ( !$isNone.str(flags) ) throw $typeErr(new TypeError, 'flags',  'regexp');

    return flags ? new RegExp(source, flags) : new RegExp(source);
  }
  to['regexp'] = toRegExp;
  to['regex'] = toRegExp;
  to['re'] = toRegExp;

  /// {{{2
  /// @method to.upperCase
  /// @alias to.upper
  /**
   * Converts a string to upper case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  function toUpperCase(str) {

    if (!arguments.length) throw $err(new Error, 'Missing a str', 'upperCase');
    if ( !$is.str(str) ) throw $typeErr(new TypeError, 'source', 'upperCase');

    return str.toUpperCase();
  }
  to['upperCase'] = toUpperCase;
  to['upper'] = toUpperCase;

  /// {{{2
  /// @method to.lowerCase
  /// @alias to.lower
  /**
   * Converts a string to lower case.
   *
   * @public
   * @param {string} str
   * @return {string}
   */
  function toLowerCase(str) {

    if (!arguments.length) throw $err(new Error, 'Missing a str', 'lowerCase');
    if ( !$is.str(str) ) throw $typeErr(new TypeError, 'source', 'lowerCase');

    return str.toLowerCase();
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
