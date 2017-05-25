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
   * @ref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
   * @ref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   * @ref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
   * @ref [str-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
   * @ref [str-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
   */

  /// {{{2
  /// @method slice
  /**
   * Makes a shallow [copy][clone] of specified indexed properties for an
   * `array` or array-like `object` or indexed characters for a `string`. Note
   * that @copy#array should be used to [copy][clone] all (not only indexed)
   * properties or to deep [copy][clone] an `array` or array-like `object`.
   * This method operates like a cross-platform safe shortcut for
   * [Array.prototype.slice][arr-slice] and
   * [String.prototype.slice][str-slice].
   *
   * @public
   * @param {(?Array|?Arguments|?Object|?Function|?string)} source
   *   The details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method [slices][arr-slice] the #source.
   *   - *`string`*!$
   *     This method [slices][str-slice] the #source.
   *   - *`null`*!$
   *     This method returns `null`.
   * @param {number=} start = `0`
   *   The #start details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][arr-length]. The #start index `number` is included in the
   *     [copied][clone] properties if it exists.
   *   - *`string`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][str-length]. The #start index `number` is included in the
   *     [copied][clone] characters if it exists.
   *   - *`null`*!$
   *     The #start value is not used.
   * @param {number=} end = `source.length`
   *   The #end details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][arr-length]. The #end index `number` is **not** included in
   *     the [copied][clone] properties if it exists.
   *   - *`string`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][str-length]. The #end index `number` is **not** included in
   *     the [copied][clone] characters if it exists.
   *   - *`null`*!$
   *     The #end value is not used.
   * @return {(?Array|?string)}
   *   The return details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns the new [copied][clone] `array`.
   *   - *`string`*!$
   *     This method returns the new [copied][clone] `string`.
   *   - *`null`*!$
   *     This method returns `null`.
   */
  function slice(source, start, end) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined');
      case 1:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=');
        break;
      default:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=');
        if ( !$is.none(end) && !$is.num(end) )
          throw $typeErr(new TypeError, 'end', end, 'number=');
        break;
    }

    if ( $is.nil(source) )
      return null;

    if ( $is.str(source) )
      return $sliceStr(source, start, end);

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '?Array|?Arguments|?Object|?Function|?string');

    len = source['length'];

    if ( !$is.num(len) )
      throw $typeErr(new TypeError, 'source.length', len, 'number');
    if ( !$is.whole(len) || len < 0 )
      throw $err(new Error, 'invalid #source.length `number` (' +
        'must be `0` or a positive whole `number`)');

    return $sliceArr(source, start, end);
  }

  /// {{{2
  /// @method slice.array
  /// @alias slice.arr
  /**
   * Makes a shallow [copy][clone] of specified indexed properties for an
   * `array` or array-like `object`. Note that @copy#array should be used to
   * [copy][clone] all (not only indexed) properties or to deep [copy][clone]
   * the #source. This method operates like a cross-platform safe shortcut for
   * [Array.prototype.slice][arr-slice].
   *
   * @public
   * @param {(?Array|?Arguments|?Object|?Function)} source
   *   The details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method [slices][arr-slice] the #source.
   *   - *`null`*!$
   *     This method returns `null`.
   * @param {number=} start = `0`
   *   The #start details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Begins the range of indexes in the #source that are [copied][clone].
   *     If the #start `number` is negative, it is added to the #source
   *     [length][arr-length]. The #start index `number` is included in the
   *     [copied][clone] properties if it exists.
   *   - *`null`*!$
   *     The #start value is not used.
   * @param {number=} end = `source.length`
   *   The #end details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     Ends the range of indexes in the #source that are [copied][clone]. If
   *     the #end `number` is negative, it is added to the #source
   *     [length][arr-length]. The #end index `number` is **not** included in
   *     the [copied][clone] properties if it exists.
   *   - *`null`*!$
   *     The #end value is not used.
   * @return {?Array}
   *   The return details are as follows (per #source type):
   *   - *`!Array|!Arguments|!Object|!Function`*!$
   *     This method returns the new [copied][clone] `array`.
   *   - *`null`*!$
   *     This method returns `null`.
   */
  function sliceArray(source, start, end) {

    /** @type {number} */
    var len;

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'array');
      case 1:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=', 'array');
        break;
      default:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=', 'array');
        if ( !$is.none(end) && !$is.num(end) )
          throw $typeErr(new TypeError, 'end', end, 'number=', 'array');
        break;
    }

    if ( $is.nil(source) )
      return null;

    if ( !$is._obj(source) )
      throw $typeErr(new TypeError, 'source', source,
        '?Array|?Arguments|?Object|?Function', 'array');

    len = source['length'];

    if ( !$is.num(len) )
      throw $typeErr(new TypeError, 'source.length', len, 'number', 'array');
    if ( !$is.whole(len) || len < 0 )
      throw $err(new Error, 'invalid #source.length `number` (' +
        'must be `0` or a positive whole `number`)', 'array');

    return $sliceArr(source, start, end);
  }
  slice['array'] = sliceArray;
  slice['arr'] = sliceArray;


  /// {{{2
  /// @method slice.string
  /// @alias slice.str
  /**
   * Makes a [copy][clone] of a specified range of indexed characters in a
   * `string`. This method operates like a cross-platform safe shortcut for
   * [String.prototype.slice][str-slice].
   *
   * @public
   * @param {string} source
   *   This method [slices][str-slice] the #source.
   * @param {number=} start = `0`
   *   Begins the range of indexes in the #source that are [copied][clone].
   *   If the #start `number` is negative, it is added to the #source
   *   [length][str-length]. The #start index `number` is included in the
   *   [copied][clone] characters if it exists.
   * @param {number=} end = `source.length`
   *   Ends the range of indexes in the #source that are [copied][clone]. If
   *   the #end `number` is negative, it is added to the #source
   *   [length][str-length]. The #end index `number` is **not** included in
   *   the [copied][clone] characters if it exists.
   * @return {string}
   *   This method returns the new [copied][clone] `string`.
   */
  function sliceString(source, start, end) {

    switch (arguments['length']) {
      case 0:
        throw $err(new Error, 'no #source defined', 'string');
      case 1:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=', 'string');
        break;
      default:
        if ( !$is.none(start) && !$is.num(start) )
          throw $typeErr(new TypeError, 'start', start, 'number=', 'string');
        if ( !$is.none(end) && !$is.num(end) )
          throw $typeErr(new TypeError, 'end', end, 'number=', 'string');
        break;
    }

    if ( !$is.str(source) )
      throw $typeErr(new TypeError, 'source', source, 'string', 'string');

    return $sliceStr(source, start, end);
  }
  slice['string'] = sliceString;
  slice['str'] = sliceString;

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
