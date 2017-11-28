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
 * @param {(?string|?undefined|?boolean)=} homedir
 * @return {string}
 */
var $absPath = (function __vitals$absPath__() {

  /// #{{{ @func _resolvePath
  /**
   * @private
   * @param {string} cwd
   * @param {string} path
   * @return {string}
   */
  function _resolvePath(cwd, path) {

    /** @const {string} */
    var PATH_DRIVE = $getDrive(path);
    /** @const {string} */
    var CWD_DRIVE = $getDrive(cwd);

    if (!!PATH_DRIVE) {
      path = $trimDrive(path);
      if (!!CWD_DRIVE) {
        if (PATH_DRIVE === CWD_DRIVE) {
          cwd = $trimDrive(cwd);
          path = $resolvePath(cwd, path);
          path = $trimDrive(path);
          path = PATH_DRIVE + path;
        }
        else {
          path = $trimRelDirs(path);
          path = PATH_DRIVE + '/' + path;
        }
      }
      else {
        path = $resolvePath(cwd, path);
        path = $trimDrive(path);
        path = PATH_DRIVE + path;
      }
    }
    else if (!!CWD_DRIVE) {
      cwd = $trimDrive(cwd);
      path = $resolvePath(cwd, path);
      path = $trimDrive(path);
      path = CWD_DRIVE + path;
    }
    else {
      path = $resolvePath(cwd, path);
      path = $trimDrive(path);
    }

    return $cleanPath(path);
  }
  /// #}}} @func _resolvePath

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
