/**
 * ---------------------------------------------------------------------------
 * VITALS.SPLIT
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.split](https://github.com/imaginate/vitals/wiki/vitals.split)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #include @helper $splitKeys ../helpers/split-keys.js
/// #if}}} @scope SOLO

/// #{{{ @super split
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
$VITALS['split'] = (function __vitalsSplit__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs split
  /// @docref [join]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  /// @docref [split]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
  /// @docref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// #if}}} @docrefs split

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.split
  /// @alias vitals.split.main
  /**
   * @description
   *   The @split#main method converts a #source `string` into an `array` of
   *   `string` values by splitting the #source at each `substring` that
   *   matches the user-defined #separator. [String.prototype.split][split]
   *   is called to execute the split.
   * @public
   * @param {string} source
   * @param {*=} separator = `""`
   *   The #separator abides by the first of the following rules that match
   *   (per #separator data type):
   *   - *`undefined`*!$
   *     The #separator is set to `""`.
   *   - *`!RegExp|string`*!$
   *     The #separator is used unchanged.
   *   - *`*`*!$
   *     The #separator is converted into a `string` with @to#string.
   * @return {!Array<string>}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function split(source, separator) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    if (!len) {
      throw _MKERR_MAIN.noArg(new $ERR, 'source');
    }
    if ( !$is.str(source) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'source', source, 'string');
    }

    if (!source) {
      return [ '' ];
    }

    if ( len === 1 || $is.void(separator) ) {
      separator = '';
    }
    else if ( !$is.regx(separator) ) {
      separator = $mkStr(separator);
    }

    return source['split'](separator);
  }
  split['main'] = split;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod keys
  /// #{{{ @docs keys
  /// @section base
  /// @method vitals.split.keys
  /**
   * @description
   *   The @split#keys method converts a #source `string` into an `array` of
   *   `string` values by splitting the #source with the first matching
   *   separator. [String.prototype.split][split] is called to execute the
   *   split. The default separators are as follows (listed in ranking order):
   *   - `", "`
   *   - `","`
   *   - `"|"`
   *   - `" "`
   * @public
   * @param {string} source
   * @return {!Array<string>}
   */
  /// #}}} @docs keys
  /// #if{{{ @code keys
  function splitKeys(source) {

    if (!arguments['length']) {
      throw _MKERR_KEYS.noArg(new $ERR, 'source');
    }
    if ( !$is.str(source) ) {
      throw _MKERR_KEYS.type(new $TYPE_ERR, 'source', source, 'string');
    }

    return $splitKeys(source);
  }
  split['keys'] = splitKeys;
  /// #if}}} @code keys
  /// #}}} @submethod keys

  /// #if{{{ @helpers split

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('split');
  /// #}}} @const _MKERR_MAIN

  /// #{{{ @const _MKERR_KEYS
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_KEYS = $mkErr('split', 'keys');
  /// #}}} @const _MKERR_KEYS

  /// #}}} @group errors

  /// #if}}} @helpers split

/// #ifnot{{{ @scope DOCS_ONLY
  return split;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super split

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
