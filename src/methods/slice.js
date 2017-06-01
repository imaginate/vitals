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

/// #{{{ @on SOLO
/// #include @macro OPEN_WRAPPER ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @helper $sliceStr ../helpers/slice-str.js
/// #}}} @on SOLO

/// #{{{ @super slice
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var slice = (function slicePrivateScope() {

  /// #{{{ @docrefs slice
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [str-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
  /// @docref [str-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
  /// #}}} @docrefs slice

  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.slice
  /**
   * @description
   *   Makes a shallow [copy][clone] of specified indexed properties for an
   *   `array` or array-like `object` or indexed characters for a `string`.
   *   Note that @copy#array should be used to [copy][clone] all (not only
   *   indexed) properties or to deep [copy][clone] an `array` or array-like
   *   `object`. This method operates like a cross-platform safe shortcut for
   *   [Array.prototype.slice][arr-slice] and
   *   [String.prototype.slice][str-slice].
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

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)');
        }
    }

    if ( $is.nil(source) )
      return NIL;

    if ( $is.str(source) )
      return $sliceStr(source, start, end);

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Arguments|?Object|?Function|?string');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)');

    return $sliceArr(source, start, end);
  }
  /// #}}} @submethod main

  /// #{{{ @submethod array
  /// @section base
  /// @method vitals.slice.array
  /// @alias vitals.slice.arr
  /**
   * @description
   *   Makes a shallow [copy][clone] of specified indexed properties for an
   *   `array` or array-like `object`. Note that @copy#array should be used to
   *   [copy][clone] all (not only indexed) properties or to deep
   *   [copy][clone] the #source. This method operates like a cross-platform
   *   safe shortcut for [Array.prototype.slice][arr-slice].
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

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'array');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'array');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'array');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'array');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
    }

    if ( $is.nil(source) )
      return NIL;

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Arguments|?Object|?Function', 'array');
    if ( !$is.arrish(source) )
      throw _mkErr(new ERR, '#source failed `array-like` test (#source.' +
        'length must be a whole `number` that is `0` or more)', 'array');

    return $sliceArr(source, start, end);
  }
  slice['array'] = sliceArray;
  slice['arr'] = sliceArray;
  /// #}}} @submethod array

  /// #{{{ @submethod string
  /// @section base
  /// @method vitals.slice.string
  /// @alias vitals.slice.str
  /**
   * @description
   *   Makes a [copy][clone] of a specified range of indexed characters in a
   *   `string`. This method operates like a cross-platform safe shortcut for
   *   [String.prototype.slice][str-slice].
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
        throw _mkErr(new ERR, 'no #source defined', 'string');

      case 1:
        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'string');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'string');
        }
        break;

      default:
        if ( !$is.void(end) ) {
          if ( !$is.num(end) )
            throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'string');
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'string');
        }

        if ( !$is.void(start) ) {
          if ( !$is.num(start) )
            throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=',
              'string');
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'string');
        }
    }

    if ( !$is.str(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source, 'string', 'string');

    return $sliceStr(source, start, end);
  }
  slice['string'] = sliceString;
  slice['str'] = sliceString;
  /// #}}} @submethod string

  /// #{{{ @group Slice-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('slice');
  /// #}}} @const _MK_ERR
  /// #include @macro MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Slice-Helpers

  return slice;
})();
/// #{{{ @off SOLO
vitals['slice'] = slice;
/// #}}} @off SOLO
/// #}}} @super slice

/// #{{{ @on SOLO
var vitals = slice;
vitals['slice'] = slice;
/// #include @macro EXPORT ../macros/export.js
/// #include @macro CLOSE_WRAPPER ../macros/wrapper.js
/// #}}} @on SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
