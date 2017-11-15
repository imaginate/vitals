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

  /// #{{{ @func $relPath
  /**
   * @description
   *   Returns a relative path from #fromPath to #toPath. Note that both
   *   **paths must be resolved** before calling this method.
   * @param {string} fromPath
   * @param {string} toPath
   * @return {string}
   */
  function $relPath(fromPath, toPath) {

    /** @type {string} */
    var fromDrive;
    /** @type {string} */
    var toDrive;
    /** @type {string} */
    var relPath;

    if (fromPath === toPath) {
      return '';
    }

    fromDrive = $getDrive(fromPath);
    toDrive = $getDrive(toPath);

    if (!!fromDrive && !!toDrive && fromDrive !== toDrive) {
      return toPath;
    }

    if (!!fromDrive) {
      fromPath = $trimDrive(fromPath);
    }
    if (!!toDrive) {
      toPath = $trimDrive(toPath);
    }

    if (fromPath === toPath) {
      return '';
    }

    relPath = _relative(fromPath, toPath);
    relPath = $cleanpath(relPath);

    return relPath;
  }
  /// #}}} @func $relPath

  return $relPath;
})();
/// #}}} @helper $relPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
