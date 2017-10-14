/**
 * ---------------------------------------------------------------------------
 * $GET-DRIVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getDrive
/**
 * @private
 * @param {string} path
 * @return {string}
 */
var $getDrive = (function __vitals$getDrive__() {

  /// #{{{ @const _NOT_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _NOT_DRIVE = /:[\s\S]*$/;
  /// #}}} @const _NOT_DRIVE

  /// #{{{ @func $getDrive
  /**
   * @param {string} path
   * @return {string}
   */
  function $getDrive(path) {
    return !!path && $hasDrive(path)
      ? path['replace'](_NOT_DRIVE, ':')
      : '';
  }
  /// #}}} @func $getDrive

  return $getDrive;
})();
/// #}}} @helper $getDrive

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
