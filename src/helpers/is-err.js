/**
 * ---------------------------------------------------------------------------
 * $IS-ERR HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isErr
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
var $isErr = (function __vitals$isErr__() {

  /// #{{{ @const _REF
  /**
   * @private
   * @const {string}
   */
  var _REF = $objStrRef('Error');
  /// #}}} @const _REF

  /// #{{{ @func $isErr
  /**
   * @param {*} val
   * @return {boolean}
   */
  function $isErr(val) {
    return $isObj(val) && $objStr(val) === _REF;
  }
  /// #}}} @func $isErr

  return $isErr;
})();
/// #}}} @helper $isErr

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
