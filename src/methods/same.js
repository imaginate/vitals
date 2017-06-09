/**
 * ---------------------------------------------------------------------------
 * VITALS.SAME
 * ---------------------------------------------------------------------------
 * @section base
 * @version 4.1.3
 * @see [vitals.same](https://github.com/imaginate/vitals/wiki/vitals.same)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #if{{{ @env SOLO
/// #insert @wrapper OPEN ../macros/wrapper.js
/// #include @core constants ../core/constants.js
/// #include @core helpers ../core/helpers.js
/// #if}}} @env SOLO

/// #{{{ @super same
/**
 * @public
 * @const {!Function<string, !Function>}
 * @dict
 */
var same = (function samePrivateScope() {

  /// #{{{ @docrefs same
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// #}}} @docrefs same

  /// #{{{ @submethod main
  /// @section base
  /// @method vitals.same
  /**
   * @description
   *   A functional representation of [strict equality][equal].
   * @public
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  function same(val1, val2) {

    switch (arguments['length']) {
      case 0:
        throw _mkErr(new ERR, 'no #val1 defined');
      case 1:
        throw _mkErr(new ERR, 'no #val2 defined');
    }

    return val1 === val2;
  }
  /// #}}} @submethod main

  /// #{{{ @submethod loose
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
  /// #}}} @submethod loose

  /// #{{{ @group Same-Helpers

  /// #{{{ @group Error-Helpers

  /// #{{{ @const _MK_ERR
  /**
   * @private
   * @const {!Object<string, !function>}
   * @struct
   */
  var _MK_ERR = $mkErrs('same');
  /// #}}} @const _MK_ERR
  /// #insert @code MK_ERR ../macros/mk-err.js

  /// #}}} @group Error-Helpers

  /// #}}} @group Same-Helpers

  return same;
})();
/// #ifnot{{{ @env SOLO
vitals['same'] = same;
/// #ifnot}}} @env SOLO
/// #}}} @super same

/// #if{{{ @env SOLO
var vitals = same;
vitals['same'] = same;
/// #insert @code EXPORT ../macros/export.js
/// #insert @wrapper CLOSE ../macros/wrapper.js
/// #if}}} @env SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
