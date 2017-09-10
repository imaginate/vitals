/**
 * ---------------------------------------------------------------------------
 * VITALS.SAME
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.same](https://github.com/imaginate/vitals/wiki/vitals.same)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #if}}} @scope SOLO

/// #{{{ @super same
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @const {!Function}
 * @dict
 */
var same = (function samePrivateScope() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs same
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// #if}}} @docrefs same

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.same
  /// @alias vitals.same.main
  /**
   * @description
   *   A functional representation of [strict equality][equal].
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function same(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val1 defined');
      case 1:
        throw _mkErr(new ERR, 'no #val2 defined');
    }

    return val1 === val2;
  }
  same['main'] = same;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod loose
  /// #{{{ @docs loose
  /// @section base
  /// @method vitals.same.loose
  /// @alias vitals.same.ish
  /**
   * @description
   *   A functional representation of [loose equality][equal].
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  /// #}}} @docs loose
  /// #if{{{ @code loose
  function sameLoose(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val1 defined', 'loose');
      case 1:
        throw _mkErr(new ERR, 'no #val2 defined', 'loose');
    }

    return val1 == val2;
  }
  same['loose'] = sameLoose;
  same['ish'] = sameLoose;
  /// #if}}} @code loose
  /// #}}} @submethod loose

  /// #if{{{ @helpers same

  /// #{{{ @group errors

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('same');
  /// #}}} @const _MK_ERR

  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group errors

  /// #if}}} @helpers same

/// #ifnot{{{ @scope DOCS_ONLY
  return same;
})();
/// #ifnot{{{ @scope SOLO
vitals['same'] = same;
/// #ifnot}}} @scope SOLO
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super same

/// #if{{{ @scope SOLO
var vitals = same;
vitals['same'] = same;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
