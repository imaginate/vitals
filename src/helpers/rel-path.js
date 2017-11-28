/**
 * ---------------------------------------------------------------------------
 * $REL-PATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $relPath
/**
 * @private
 * @param {string} fromPath
 * @param {string} toPath
 * @return {string}
 */
var $relPath = (function __vitals$relPath__() {

  /// #{{{ @docrefs $relPath
  /// @docref [node]:(https://nodejs.org/)
  /// @docref [rel]:(https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_relative_from_to)
  /// #}}} @docrefs $relPath

  /// #{{{ @func _relative
  /**
   * @description
   *   See the online [node.js][node] documentation for details about the
   *   native [relative][rel] method.
   * @private
   * @param {string} from
   * @param {string} to
   * @return {string}
   */
  var _relative = $PATH['relative'];
  /// #}}} @func _relative

  /// #{{{ @func _relPath
  /**
   * @param {string} fromPath
   * @param {string} toPath
   * @return {string}
   */
  function _relPath(fromPath, toPath) {

    /** @type {string} */
    var relPath;

    relPath = _relative(fromPath, toPath);
    relPath = $cleanPath(relPath);
    return relPath;
  }
  /// #}}} @func _relPath

  /// #{{{ @func $relPath
  /**
   * @description
   *   Returns a relative path from the #fromPath to the #toPath. Note that
   *   both **paths must be resolved** with the `$absPath` helper before
   *   calling this method.
   * @param {string} fromPath
   * @param {string} toPath
   * @return {string}
   */
  function $relPath(fromPath, toPath) {

    if (fromPath === toPath) {
      return '';
    }

    /** @const {string} */
    var FROM_DRIVE = $getDrive(fromPath);
    /** @const {string} */
    var TO_DRIVE = $getDrive(toPath);

    if (!!FROM_DRIVE) {
      if (!!TO_DRIVE && FROM_DRIVE !== TO_DRIVE) {
        return toPath;
      }
      fromPath = $trimDrive(fromPath);
    }
    if (!!TO_DRIVE) {
      toPath = $trimDrive(toPath);
    }

    return fromPath === toPath
      ? ''
      : _relPath(fromPath, toPath);
  }
  /// #}}} @func $relPath

  return $relPath;
})();
/// #}}} @helper $relPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
