/**
 * ---------------------------------------------------------------------------
 * VITALS.JOIN
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.join](https://github.com/imaginate/vitals/wiki/vitals.join)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #if}}} @scope SOLO

/// #{{{ @super join
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$VITALS['join'] = (function __vitalsJoin__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs join
  /// @docref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  /// @docref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// #if}}} @docrefs join

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.join
  /// @alias vitals.join.main
  /**
   * @description
   *   The @join#main method converts each indexed property of an `array` or
   *   array-like `object` or `function` into a `string` with @to#string and
   *   joins them with the `string` conversion of a user-defined #joint.
   * @public
   * @param {(!Array|!Arguments|!Object|!Function)} source
   *   If the #source is **not** an `array`, it must be an array-like `object`
   *   or `function`. The #source is considered array-like when it has a
   *   `"length"` property that is a whole `number` greater than or equal to
   *   zero.
   * @param {*=} joint = `""`
   *   The #joint abides by the first of the following rules that match (per
   *   #joint data type):
   *   - *`undefined`*!$
   *     The #joint is set to `""`.
   *   - *`string`*!$
   *     The #joint is used unchanged.
   *   - *`*`*!$
   *     The #joint is converted into a `string` with @to#string.
   * @return {string}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function join(source, joint) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    if (!len) {
      throw _MKERR_MAIN.noArg(new $ERR, 'source');
    }
    if ( !$is._obj(source) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'source', source,
        '(!Array|!Arguments|!Object|!Function)');
    }
    if ( !$is.arrish(source) ) {
      throw _MKERR_MAIN.arrLike(new $ERR, 'source', source);
    }

    if (!source['length']) {
      return '';
    }

    joint = len === 1 || $is.void(joint)
      ? ''
      : $mkStr(joint);

    return _join(source, joint);
  }
  join['main'] = join;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #if{{{ @helpers join

  /// #{{{ @group main

  /// #{{{ @func _join
  /**
   * @private
   * @param {(!Array|!Arguments|!Object|!Function)} src
   * @param {string} joint
   * @return {string}
   */
  function _join(src, joint) {

    /** @type {string} */
    var result;
    /** @type {number} */
    var last;
    /** @type {number} */
    var i;

    result = '';
    last = src['length'] - 1;
    i = -1;
    while (++i < last) {
      result += $mkStr(src[i]) + joint;
    }
    result += $mkStr(src[last]);

    return result;
  }
  /// #}}} @func _join

  /// #}}} @group main

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('join');
  /// #}}} @const _MKERR_MAIN

  /// #}}} @group errors

  /// #if}}} @helpers join

/// #ifnot{{{ @scope DOCS_ONLY
  return join;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super join

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
