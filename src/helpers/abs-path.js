/**
 * ---------------------------------------------------------------------------
 * $ABS-PATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $absPath
/**
 * @private
 * @param {(?string|?undefined)} cwd
 * @param {(?string|?undefined)} path
 * @param {(?string|?undefined)=} homedir
 * @return {string}
 */
var $absPath = (function __vitals$absPath__() {

  /// #{{{ @docrefs $absPath
  /// @docref [node]:(https://nodejs.org/)
  /// @docref [v0-10]:(https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
  /// @docref [v7-9]:(https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
  /// #}}} @docrefs $absPath

  /// #{{{ @const _HAS_REL_DIR
  /**
   * @private
   * @const {!RegExp}
   */
  var _HAS_REL_DIR = /^\.\.?(?:\/[\s\S]*)?$/;
  /// #}}} @const _HAS_REL_DIR

  /// #{{{ @const _REL_DIR
  /**
   * @private
   * @const {!RegExp}
   */
  var _REL_DIR = /^\.\.?\/?/;
  /// #}}} @const _REL_DIR

  /// #{{{ @func _resolve
  /**
   * @description
   *   Resolves path segments into an absolute path. Note that older
   *   [node.js][node] versions of `path.resolve` such as [v0.10][v0-10]
   *   required a #path parameter (newer versions such as [v7.9][v7-9] do not
   *   require a #path parameter).
   * @private
   * @param {...string} path
   * @return {string}
   */
  var _resolve = $PATH['resolve'];
  /// #}}} @func _resolve

  /// #{{{ @func _resolvePath
  /**
   * @private
   * @param {string} cwd
   * @param {string} path
   * @return {string}
   */
  function _resolvePath(cwd, path) {

    /** @type {string} */
    var pathDrive;
    /** @type {string} */
    var cwdDrive;

    cwdDrive = $getDrive(cwd);
    pathDrive = $getDrive(path);

    if (!!pathDrive) {
      path = $trimDrive(path);
      if (!!cwdDrive) {
        if (pathDrive === cwdDrive) {
          cwd = $trimDrive(cwd);
          path = _resolve(cwd, path);
          path = $trimDrive(path);
          path = pathDrive + path;
        }
        else {
          path = _trimRelDir(path);
          path = pathDrive + '/' + path;
        }
      }
      else {
        path = _resolve(cwd, path);
        path = $trimDrive(path);
        path = pathDrive + path;
      }
    }
    else if (!!cwdDrive) {
      cwd = $trimDrive(cwd);
      path = _resolve(cwd, path);
      path = $trimDrive(path);
      path = cwdDrive + path;
    }
    else {
      path = _resolve(cwd, path);
      path = $trimDrive(path);
    }

    return $cleanPath(path);
  }
  /// #}}} @func _resolvePath

  /// #{{{ @func _trimRelDir
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _trimRelDir(path) {
    return !!path && _HAS_REL_DIR['test'](path)
      ? path['replace'](_REL_DIR, '')
      : path;
  }
  /// #}}} @func _trimRelDir

  /// #{{{ @func $absPath
  /**
   * @param {(?string|?undefined)} cwd
   *   If the #cwd is a non-empty primitive string, the #cwd must be cleaned
   *   with the `$cleanPath` helper **before** calling this method. If the
   *   #cwd is **not** a non-empty primitive string, the #cwd is set to the
   *   cleaned result of `process.cwd()`.
   * @param {(?string|?undefined)} path
   *   If the #path is a non-empty primitive string, the #path must be cleaned
   *   with the `$cleanPath` helper **before** calling this method. If the
   *   #path is **not** a non-empty primitive string, this method will return
   *   the cleaned result of `process.cwd()`.
   * @param {(?string|?undefined|?boolean)=} homedir
   *   If the #homedir is a primitive string, the #homedir must be cleaned
   *   with the `$cleanPath` helper **before** calling this method. If the
   *   #homedir is `false`, this method will **not** replace an existing home
   *   directory macro within the #path.
   * @return {string}
   */
  function $absPath(cwd, path, homedir) {

    if (!cwd) {
      cwd = $getCwd();
    }

    if (!path) {
      return cwd;
    }

    if ( homedir !== $NO && $hasHomeDirMacro(path) ) {
      path = $insHomeDir(path, homedir);
    }

    return $is.abspath(path)
      ? $hasDrive(path)
        ? path
        : $getDrive(cwd) + path
      : _resolvePath(cwd, path);
  }
  /// #}}} @func $absPath

  return $absPath;
})();
/// #}}} @helper $absPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
