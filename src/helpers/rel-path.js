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
 * @param {string} src
 * @param {string} dest
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
   *   Returns a relative path from a #src path to a #dest path. Note that
   *   both **paths must be resolved** before calling this method.
   * @param {string} src
   *   A resolved path to start from.
   * @param {string} dest
   *   A resolved path to go to.
   * @return {string}
   */
  function $relPath(src, dest) {

    /** @type {string} */
    var srcDrive;
    /** @type {string} */
    var drive;
    /** @type {string} */
    var path;

    if (src === dest) {
      return dest;
    }

    drive = $getDrive(dest);
    srcDrive = $getDrive(src);

    if (!!drive) {
      if (!!srcDrive) {
        if (drive !== srcDrive) {
          return dest;
        }
        src = $trimDrive(src);
      }
      dest = $trimDrive(dest);
    }
    else if (!!srcDrive) {
      drive = srcDrive;
      src = $trimDrive(src);
    }

    path = _relative(src, dest);
    path = $trimDrive(path);
    path = $cleanpath(path);
    path = drive + path;

    return path;
  }
  /// #}}} @func $relPath

  return $relPath;
})();
/// #}}} @helper $relPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
