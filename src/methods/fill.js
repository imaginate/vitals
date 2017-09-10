/**
 * ---------------------------------------------------------------------------
 * VITALS.FILL
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.fill](https://github.com/imaginate/vitals/wiki/vitals.fill)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #if}}} @scope SOLO

/// #{{{ @super fill
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var fill = (function fillPrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs fill
  /// @docref [str-func]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// @docref [arr-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
  /// @docref [str-length]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
  /// #if}}} @docrefs fill

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.fill
  /**
   * @description
   *   Fills an `array`, `object`, or `string` with specified values.
   * @public
   * @param {(?Array|?Object|?Function|?number)} source
   *   If the #source is a `number`, @fill returns a new `string` filled with
   *   the `string` conversion of #val the #source `number` of times.
   * @param {(!Array|string)=} keys
   *   Only use with an `object` or `function` #source. If defined, #keys is
   *   considered an `array` of keys that will limit the fill action. If a
   *   `string` is defined for #keys, it is converted to an `array` using one
   *   of the values in the following list for the separator (values listed in
   *   order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `array`, `object`, or `string` with.
   * @param {number=} start = `0`
   *   Only use with an `array` #source. It begins the range of indexes in the
   *   #source that are filled with the #val. If negative, the #start value is
   *   added to the #source [length][arr-length]. The #start index `number` is
   *   included in the range of filled properties if it exists.
   * @param {number=} end = `source.length`
   *   Only use with an `array` #source. It ends the range of indexes in the
   *   #source that are filled with the #val. If negative, the #end value is
   *   added to the #source [length][arr-length]. The #end index `number` is
   *   **not** included in the range of filled properties if it exists.
   * @return {(?Array|?Object|?Function|?string)}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function fill(source, keys, val, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined');
      case 1:
        throw _mkErr(new ERR, 'no #val defined');
    }

    if ( $is.nil(source) )
      return NIL;

    if ( $is.num(source) )
      return _fillStr(source, keys); // note: `_fillStr(source, val)`

    if ( !$is._obj(source) )
      throw _mkTypeErr(new TYPE_ERR, 'source', source,
        '?Array|?Object|?Function|?number');

    if ( $is.arr(source) ) {
      end = start;
      start = val;
      val = keys;

      if ( $is.num(start) ) {
        if ( !$is.whole(start) )
          throw _mkErr(new ERR, 'invalid #start `number` (' +
            'must be whole `number`)');
      }
      else if ( !$is.void(start) )
        throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=');

      if ( $is.num(end) ) {
        if ( !$is.whole(end) )
          throw _mkErr(new ERR, 'invalid #end `number` (' +
            'must be whole `number`)');
      }
      else if ( !$is.void(end) )
        throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=');

      return _fillArr(source, val, start, end);
    }

    if (arguments['length'] === 2)
      return _fillObj(source, keys); // note: `_fillObj(source, val)`

    if ( $is.str(keys) )
      keys = $splitKeys(keys);
    else if ( !$is.arr(keys) )
      throw _mkTypeErr(new TYPE_ERR, 'keys', keys, '(!Array|string)=');

    return _fillKeys(source, keys, val);
  }
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod object
  /// #{{{ @docs object
  /// @section base
  /// @method vitals.fill.object
  /// @alias vitals.fill.obj
  /**
   * @description
   *   Fills an existing `object` or `function` with specified keys and
   *   values.
   * @public
   * @param {(!Object|!Function)} source
   * @param {(!Array|string)=} keys
   *   If defined, #keys is considered an `array` of keys that will limit the
   *   fill action. If a `string` is defined for #keys, it is converted to an
   *   `array` using one of the values in the following list for the separator
   *   (values listed in order of rank):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @param {*} val
   *   The value to fill the `object` or `function` with.
   * @return {(!Object|!Function)}
   */
  /// #}}} @docs object
  /// #if{{{ @code object
  function fillObject(source, keys, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'object');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'object');

      case 2:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');

        return _fillObj(source, keys); // note: `_fillObj(source, val)`

      default:
        if ( !$is._obj(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source,
            '!Object|!Function', 'object');

        if ( $is.str(keys) )
          keys = $splitKeys(keys);
        else if ( !$is.arr(keys) )
          throw _mkTypeErr(new TYPE_ERR, 'keys', keys, '(!Array|string)=',
            'object');

        return _fillKeys(source, keys, val);
    }
  }
  fill['object'] = fillObject;
  fill['obj'] = fillObject;
  /// #if}}} @code object
  /// #}}} @submethod object

  /// #{{{ @submethod array
  /// #{{{ @docs array
  /// @section base
  /// @method vitals.fill.array
  /// @alias vitals.fill.arr
  /**
   * @description
   *   Fills an existing or new `array` with specified values.
   * @public
   * @param {(!Array|number)} source
   *   If #source is a `number`, it makes a new `array` for #source using the
   *   #source `number` for the [array's length][arr-length].
   * @param {*} val
   *   The value to fill the #source `array` with.
   * @param {number=} start = `0`
   *   Begins the range of indexes in the #source that are filled with the
   *   #val. If negative, the #start value is added to the #source
   *   [length][arr-length]. The #start index `number` is included in the
   *   range of filled properties if it exists.
   * @param {number=} end = `arr.length`
   *   Ends the range of indexes in the #source that are filled with the #val.
   *   If negative, the #end value is added to the #source
   *   [length][arr-length]. The #end index `number` is **not** included in
   *   the range of filled properties if it exists.
   * @return {!Array}
   */
  /// #}}} @docs array
  /// #if{{{ @code array
  function fillArray(source, val, start, end) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #source defined', 'array');

      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'array');

      case 2:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        return _fillArr(source, val, VOID, VOID);

      case 3:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        if ( $is.num(start) ) {
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(start) )
          throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=', 'array');

        return _fillArr(source, val, start, VOID);

      default:
        if ( $is.num(source) )
          source = new ARR(source);
        else if ( !$is.arr(source) )
          throw _mkTypeErr(new TYPE_ERR, 'source', source, '!Array|number',
            'array');

        if ( $is.num(start) ) {
          if ( !$is.whole(start) )
            throw _mkErr(new ERR, 'invalid #start `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(start) )
          throw _mkTypeErr(new TYPE_ERR, 'start', start, 'number=', 'array');

        if ( $is.num(end) ) {
          if ( !$is.whole(end) )
            throw _mkErr(new ERR, 'invalid #end `number` (' +
              'must be whole `number`)', 'array');
        }
        else if ( !$is.void(end) )
          throw _mkTypeErr(new TYPE_ERR, 'end', end, 'number=', 'array');

        return _fillArr(source, val, start, end);
    }
  }
  fill['array'] = fillArray;
  fill['arr'] = fillArray;
  /// #if}}} @code array
  /// #}}} @submethod array

  /// #{{{ @submethod string
  /// #{{{ @docs string
  /// @section base
  /// @method vitals.fill.string
  /// @alias vitals.fill.str
  /**
   * @description
   *   Fills a new `string` with specified values.
   * @public
   * @param {number} count
   *   The [length][str-length] of the new `string`.
   * @param {*} val
   *   The value to fill the new `string` with. Any #val that is not a
   *   `string` is converted to a `string`.
   * @return {string}
   */
  /// #}}} @docs string
  /// #if{{{ @code string
  function fillString(count, val) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #count defined', 'string');
      case 1:
        throw _mkErr(new ERR, 'no #val defined', 'string');
    }

    if ( !$is.num(count) )
      throw _mkTypeErr(new TYPE_ERR, 'count', count, 'number', 'string');
    if ( !$is.whole(count) )
      throw _mkErr(new ERR, 'invalid #count `number` (' +
        'must be whole `number`)', 'string');

    return _fillStr(count, val);
  }
  fill['string'] = fillString;
  fill['str'] = fillString;
  /// #if}}} @code string
  /// #}}} @submethod string

  /// #if{{{ @helpers fill

  /// #{{{ @group main

  /// #{{{ @func _fillObj
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillObj(obj, val) {

    /** @type {string} */
    var key;

    for (key in obj) {
      if ( $own(obj, key) )
        obj[key] = val;
    }
    return obj;
  }
  /// #}}} @func _fillObj

  /// #{{{ @func _fillKeys
  /**
   * @private
   * @param {(!Object|!Function)} obj
   * @param {!Array} keys
   * @param {*} val
   * @return {(!Object|!Function)}
   */
  function _fillKeys(obj, keys, val) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = keys['length'];
    i = -1;
    while (++i < len)
      obj[ keys[i] ] = val;
    return obj;
  }
  /// #}}} @func _fillKeys

  /// #{{{ @func _fillArr
  /**
   * @private
   * @param {!Array} arr
   * @param {*} val
   * @param {number=} start = `0`
   * @param {number=} end = `arr.length`
   * @return {!Array}
   */
  function _fillArr(arr, val, start, end) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = arr['length'];

    if ( $is.void(start) )
      start = 0;
    if ( $is.void(end) )
      end = len;

    if (start < 0)
      start += len;
    if (start < 0)
      start = 0;

    if (end > len)
      end = len;
    else if (end < 0)
      end += len;

    if (start >= end)
      return arr;

    i = start - 1;
    while (++i < end)
      arr[i] = val;
    return arr;
  }
  /// #}}} @func _fillArr

  /// #{{{ @func _fillStr
  /**
   * @private
   * @param {number} count
   * @param {*} val
   * @return {string}
   */
  function _fillStr(count, val) {

    /** @type {string} */
    var str;

    if (count < 1)
      return '';

    val = $mkStr(val);
    str = '';
    while (count--)
      str += val;
    return str;
  }
  /// #}}} @func _fillStr

  /// #}}} @group main

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('fill');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #insert @code MK_TYPE_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers fill

/// #ifnot{{{ @scope DOCS_ONLY
  return fill;
})();
/// #ifnot{{{ @scope SOLO
vitals['fill'] = fill;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super fill

/// #if{{{ @scope SOLO
var vitals = fill;
vitals['fill'] = fill;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
