/**
 * ---------------------------------------------------------------------------
 * VITALS.STRINGIFY
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.stringify](https://github.com/imaginate/vitals/wiki/vitals.stringify)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #if}}} @scope SOLO

/// #{{{ @super stringify
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var stringify = (function fusePrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs stringify
  /// @docref [regexp]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  /// @docref [string]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  /// #if}}} @docrefs stringify

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.stringify
  /// @alias vitals.stringify.main
  /**
   * @description
   *   Converts any value into a `string`.
   * @public
   * @param {*} val
   * @return {string}
   *   The returned `string` conversion of #val uses the following rules in
   *   listed order (per #val data type):
   *   - *`string`*!$
   *     Returns unchanged #val.
   *   - *`!Object|!Function`*!$
   *     If the #val contains a `function` property named `"toString"`, it
   *     returns the result of [String][string] called on the result of
   *     `val.toString`. Otherwise, it returns the result of [String][string]
   *     on #val.
   *     ```
   *     if ( !('toString' in val) || !isFunction(val.toString) ) {
   *       return String(val);
   *     }
   *     val = val.toString();
   *     return isString(val)
   *       ? val
   *       : String(val);
   *     ```
   *   - *`undefined`*!$
   *     Returns `"undefined"`.
   *   - *`null`*!$
   *     Returns `"null"`.
   *   - *`boolean`*!$
   *     Returns `"true"` or `"false"`.
   *   - *`nan`*!$
   *     Returns `"NaN"`.
   *   - *`*`*!$
   *     Returns the result of [String][string] on #val.
   *     ```
   *     return String(val);
   *     ```
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function stringify(val) {

    if (!arguments['length']) {
      throw _mkErr(new ERR, 'no #val defined');
    }

    return $mkStr(val);
  }
  stringify['main'] = stringify;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #if{{{ @helpers stringify

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('stringify');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers stringify

/// #ifnot{{{ @scope DOCS_ONLY
  return stringify;
})();
/// #ifnot{{{ @scope SOLO
vitals['stringify'] = stringify;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super stringify

/// #if{{{ @scope SOLO
var vitals = stringify;
vitals['stringify'] = stringify;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
