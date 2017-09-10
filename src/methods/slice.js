/**
 * ---------------------------------------------------------------------------
 * VITALS.SLICE
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.slice](https://github.com/imaginate/vitals/wiki/vitals.slice)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #include @helper $sliceStr ../helpers/slice-str.js
/// #if}}} @scope SOLO

/// #{{{ @super slice
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var slice = (function slicePrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs slice
  /// @docref [clone]:(https://en.wikipedia.org/wiki/Cloning_(programming))
  /// @docref [arr-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [str-slice]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
  /// @docref [str-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
  /// #if}}} @docrefs slice

  /// #{{{ @submethod main
  /// #{{{ @docs main
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
  /// #}}} @docs main
  /// #if{{{ @code main
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
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod array
  /// #{{{ @docs array
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
  /// #}}} @docs array
  /// #if{{{ @code array
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
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod string
  /// #{{{ @docs string
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
  /// #}}} @docs string
  /// #if{{{ @code string
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
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #if{{{ @helpers slice

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('slice');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers slice

/// #ifnot{{{ @scope DOCS_ONLY
  return slice;
})();
/// #ifnot{{{ @scope SOLO
vitals['slice'] = slice;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super slice

/// #if{{{ @scope SOLO
var vitals = slice;
vitals['slice'] = slice;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
