/**
 * ---------------------------------------------------------------------------
 * VITALS.CUT
 * ---------------------------------------------------------------------------
 * @section base
 * @version 5.0.0
 * @see [vitals.cut](https://github.com/imaginate/vitals/wiki/vitals.cut)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #if{{{ @scope SOLO
/// #include @core OPEN ../core/open.js
/// #include @helper $escRegx ../helpers/esc-regx.js
/// #include @helper $sliceArr ../helpers/slice-arr.js
/// #if}}} @scope SOLO

/// #{{{ @super cut
/// #ifnot{{{ @scope DOCS_ONLY
/**
 * @public
 * @type {!Function}
 * @dict
 */
$VITALS['cut'] = (function __vitalsCut__() {
/// #ifnot}}} @scope DOCS_ONLY

  /// #if{{{ @docrefs cut
  /// @docref [equal]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  /// @docref [global]:(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  /// #if}}} @docrefs cut

  /// #{{{ @submethod main
  /// #{{{ @docs main
  /// @section base
  /// @method vitals.cut
  /// @alias vitals.cut.main
  /**
   * @description
   *   The @cut#main method removes patterns from a `string`.
   * @public
   * @param {string} source
   * @param {...*} pattern
   *   If only one `array` #pattern is defined, it is considered an `array`
   *   of patterns. If a #pattern is **not** a `RegExp`, it is converted into
   *   a `string` via @stringify and, **only the first** `substring` of
   *   matching characters is removed from the #source.
   * @return {string}
   *   The amended #source.
   */
  /// #}}} @docs main
  /// #if{{{ @code main
  function cut(source, pattern) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_MAIN.noArg(new $ERR, 'source');
      case 1:
        throw _MKERR_MAIN.noArg(new $ERR, 'pattern');
    }

    if ( !$is.str(source) ) {
      throw _MKERR_MAIN.type(new $TYPE_ERR, 'source', source, 'string');
    }

    if (len > 2) {
      pattern = $sliceArr(arguments, 1);
      return _cuts(source, pattern);
    }

    return $is.arr(pattern)
      ? _cuts(source, pattern)
      : _cut(source, pattern);
  }
  cut['main'] = cut;
  /// #if}}} @code main
  /// #}}} @submethod main

  /// #{{{ @submethod all
  /// #{{{ @docs all
  /// @section base
  /// @method vitals.cut.all
  /// @alias vitals.cut.g
  /**
   * @description
   *   The @cut#all method removes patterns from a `string`.
   * @public
   * @param {string} source
   * @param {...*} pattern
   *   If only one `array` #pattern is defined, it is considered an `array`
   *   of patterns. If a #pattern is **not** a `RegExp`, it is converted into
   *   a `string` via @stringify, and **every** `substring` of matching
   *   characters is removed from the #source.
   * @return {string}
   *   The amended #source.
   */
  /// #}}} @docs all
  /// #if{{{ @code all
  function cutAll(source, pattern) {

    /** @type {number} */
    var len;

    len = arguments['length'];

    switch (len) {
      case 0:
        throw _MKERR_ALL.noArg(new $ERR, 'source');
      case 1:
        throw _MKERR_ALL.noArg(new $ERR, 'pattern');
    }

    if ( !$is.str(source) ) {
      throw _MKERR_ALL.type(new $TYPE_ERR, 'source', source, 'string');
    }

    if (len > 2) {
      pattern = $sliceArr(arguments, 1);
      return _cutsAll(source, pattern);
    }

    return $is.arr(pattern)
      ? _cutsAll(source, pattern)
      : _cutAll(source, pattern);
  }
  cut['all'] = cutAll;
  cut['g'] = cutAll;
  /// #if}}} @code all
  /// #}}} @submethod all

  /// #if{{{ @helpers cut

  /// #{{{ @group main

  /// #{{{ @func _cut
  /**
   * @private
   * @param {string} src
   * @param {*} patt
   * @return {string}
   */
  function _cut(src, patt) {

    if ( !$is.regx(patt) ) {
      patt = $mkStr(patt);
      patt = $escRegx(patt);
      patt = new $REGX(patt);
    }

    return src['replace'](patt, '');
  }
  /// #}}} @func _cut

  /// #{{{ @func _cutAll
  /**
   * @private
   * @param {string} src
   * @param {*} patt
   * @return {string}
   */
  function _cutAll(src, patt) {

    if ( !$is.regx(patt) ) {
      patt = $mkStr(patt);
      patt = $escRegx(patt);
      patt = new $REGX(patt, 'g');
    }

    return src['replace'](patt, '');
  }
  /// #}}} @func _cutAll

  /// #{{{ @func _cuts
  /**
   * @private
   * @param {string} src
   * @param {!Array<*>} patts
   * @return {string}
   */
  function _cuts(src, patts) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patts['length'];
    i = -1;
    while (++i < len) {
      src = _cut(src, patts[i]);
    }
    return src;
  }
  /// #}}} @func _cuts

  /// #{{{ @func _cutsAll
  /**
   * @private
   * @param {string} src
   * @param {!Array<*>} patts
   * @return {string}
   */
  function _cutsAll(src, patts) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = patts['length'];
    i = -1;
    while (++i < len) {
      src = _cutAll(src, patts[i]);
    }
    return src;
  }
  /// #}}} @func _cutsAll

  /// #}}} @group main

  /// #{{{ @group errors

  /// #{{{ @const _MKERR_MAIN
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_MAIN = $mkErr('cut');
  /// #}}} @const _MKERR_MAIN

  /// #{{{ @const _MKERR_ALL
  /**
   * @private
   * @const {!ErrorMaker}
   * @struct
   */
  var _MKERR_ALL = $mkErr('cut', 'all');
  /// #}}} @const _MKERR_ALL

  /// #}}} @group errors

  /// #if}}} @helpers cut

/// #ifnot{{{ @scope DOCS_ONLY
  return cut;
})();
/// #ifnot}}} @scope DOCS_ONLY
/// #}}} @super cut

/// #if{{{ @scope SOLO
/// #include @core CLOSE ../core/close.js
/// #if}}} @scope SOLO

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
