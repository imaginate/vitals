/**
 * ---------------------------------------------------------------------------
 * VITALS.SLICE
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.slice](https://github.com/imaginate/vitals/wiki/vitals.slice)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

'use strict';

var $newErrorMaker = require('./helpers/new-error-maker.js');
var $sliceArr = require('./helpers/slice-arr.js');
var $sliceStr = require('./helpers/slice-str.js');
var $isNone = require('./helpers/is-none.js');
var $is = require('./helpers/is.js');

///////////////////////////////////////////////////////////////////////// {{{1
// VITALS.SLICE
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var slice = (function slicePrivateScope() {

  //////////////////////////////////////////////////////////
  // PUBLIC METHODS
  // - slice
  // - slice.array  (slice.arr)
  // - slice.string (slice.str)
  //////////////////////////////////////////////////////////

  /* {{{2 Slice References
   * @ref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [str-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
   */

  /// {{{2
  /// @method slice
  /**
   * A shortcut for [Array.prototype.slice][arr-slice] and
   * [String.prototype.slice][str-slice].
   *
   * @public
   * @param {?(Object|Array|function|string)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {?(Array|string)}
   */
  function slice(source, start, end) {

    if ( !$isNone.num(start) ) throw $typeErr(new TypeError, 'start');
    if ( !$isNone.num(end)   ) throw $typeErr(new TypeError, 'end');

    if ( $is.nil(source) ) return null;

    if ( $is.str(source) ) return $sliceStr(source, start, end);

    if ( !$is._obj(source)       ) throw $typeErr(new TypeError, 'source');
    if ( !$is.num(source.length) ) throw $typeErr(new TypeError, 'source.length');

    return $sliceArr(source, start, end);
  }

  /// {{{2
  /// @method slice.array
  /// @alias slice.arr
  /**
   * A shortcut for [Array.prototype.slice][arr-slice].
   *
   * @public
   * @param {?(Object|Array|function)} source
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= source.length]
   * @return {!Array}
   */
  slice.array = function sliceArray(source, start, end) {

    if ( !$is._obj(source)       ) throw $typeErr(new TypeError, 'source',        'array');
    if ( !$is.num(source.length) ) throw $typeErr(new TypeError, 'source.length', 'array');
    if ( !$isNone.num(start)      ) throw $typeErr(new TypeError, 'start',         'array');
    if ( !$isNone.num(end)        ) throw $typeErr(new TypeError, 'end',           'array');

    return $sliceArr(source, start, end);
  };
  // define shorthand
  slice.arr = slice.array;

  /// {{{2
  /// @method slice.string
  /// @alias slice.str
  /**
   * A shortcut for [String.prototype.slice][str-slice].
   *
   * @public
   * @param {string} str
   * @param {number=} start - [default= 0]
   * @param {number=} end - [default= str.length]
   * @return {string}
   */
  slice.string = function sliceString(str, start, end) {

    if ( !$is.str(str)      ) throw $typeErr(new TypeError, 'str',   'string');
    if ( !$isNone.num(start) ) throw $typeErr(new TypeError, 'start', 'string');
    if ( !$isNone.num(end)   ) throw $typeErr(new TypeError, 'end',   'string');

    return $sliceStr(str, start, end);
  };
  // define shorthand
  slice.str = slice.string;

  ///////////////////////////////////////////////////// {{{2
  // SLICE HELPERS - ERROR MAKERS
  //////////////////////////////////////////////////////////

  /// {{{3
  /// @const ERROR_MAKER
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var ERROR_MAKER = $newErrorMaker('slice');

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

  // END OF PRIVATE SCOPE FOR VITALS.SLICE
  return slice;
})();
/// }}}1

module.exports = slice;

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
