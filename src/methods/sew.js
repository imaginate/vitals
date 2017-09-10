/**
 * ---------------------------------------------------------------------------
 * VITALS.SEW
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.sew](https://github.com/imaginate/vitals/wiki/vitals.sew)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @helper $objStr ../helpers/obj-str.js
/// #include @helper $own ../helpers/own.js
/// #include @helper $is ../helpers/is.js
/// #include @helper $mkStr ../helpers/mk-str.js
/// #if}}} @scope SOLO

/// #{{{ @super sew
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var sew = (function fusePrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs sew
  /// #if}}} @docrefs sew

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.sew
  /// @alias vitals.sew.main
  /**
   * @description
   *   Converts values of any data type into a `string` and combines them.
   * @public
   * @param {(!Array<*>|...*)=} val
   *   If only one `array` #val is provided, it is considered an `array` of
   *   values. Each value is converted to a `string` via @stringify and
   *   combined in the recieved order.
   * @return {string}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function sew(val) {
    switch (arguments['length']) {
      case 0:
        return '';
      case 1:
        return $is.arr(val)
          ? _sew(val)
          : $mkStr(val);
      default:
        return _sew(arguments);
    }
  }
  sew['main'] = sew;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #if{{{ @helpers sew

  /// #{{{ @group main

  /// #{{{ @func _sew
  /**
   * @private
   * @param {(!Array<*>|!Arguments<*>)} vals
   * @return {string}
   */
  function _sew(vals) {

    /** @type {string} */
    var result;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = '';
    len = vals['length'];
    i = -1;
    while (++i < len) {
      result += $mkStr(vals[i]);
    }
    return result;
  }
  /// #}}} @func _sew

  /// #}}} @group main

  /// #if}}} @helpers sew

/// #ifnot{{{ @scope DOCS_ONLY
  return sew;
})();
/// #ifnot{{{ @scope SOLO
vitals['sew'] = sew;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super sew

/// #if{{{ @scope SOLO
var vitals = sew;
vitals['sew'] = sew;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
