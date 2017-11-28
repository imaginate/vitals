/**
 * ---------------------------------------------------------------------------
 * $ABS-PATHS HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $absPaths
/**
 * @private
 * @param {(?string|?undefined)} cwd
 * @param {!Array<string>} paths
 * @param {(?string|?undefined)=} homedir
 * @return {string}
 */
var $absPaths = (function __vitals$absPaths__() {

  /// #{{{ @const _BEGIN_FORWARD_SLASH
  /**
   * @private
   * @const {!RegExp}
   */
  var _BEGIN_FORWARD_SLASH = /^\//;
  /// #}}} @const _BEGIN_FORWARD_SLASH

  /// #{{{ @func _beginsWithForwardSlash
  /**
   * @private
   * @param {string} val
   * @return {boolean}
   */
  function _beginsWithForwardSlash(val) {
    return _BEGIN_FORWARD_SLASH['test'](val);
  }
  /// #}}} @func _beginsWithForwardSlash

  /// #{{{ @func _getDrive
  /**
   * @private
   * @param {string} cwd
   * @param {!Array<string>} paths
   * @param {number} i
   * @return {string}
   */
  function _getDrive(cwd, paths, i) {

    /** @type {string} */
    var drive;

    while (i--) {
      drive = $getDrive(paths[i]);
      if (!!drive) {
        return $hasLowerWinDrive(drive)
          ? $capitalizeWinDrive(drive)
          : drive;
      }
    }
    return $getDrive(cwd);
  }
  /// #}}} @func _getDrive

  /// #{{{ @func _resolvePaths
  /**
   * @private
   * @param {string} cwd
   * @param {!Array<string>} paths
   * @param {(?string|?undefined|?boolean)} homedir
   * @return {string}
   */
  function _resolvePaths(cwd, paths, homedir) {

    /** @type {string} */
    var tmpDrive;
    /** @type {string} */
    var drive;
    /** @type {string} */
    var path;
    /** @type {number} */
    var i;

    i = paths['length'];
    while (i--) {
      path = paths[i];
      if (!!path) {
        path = $cleanPath(path);

        if ( homedir !== $NO && $hasHomeDirMacro(path) ) {
          if ( !$is.str(homedir) ) {
            homedir = $getHomeDir();
          }
          path = $insHomeDir(path, homedir);
        }

        // REMEMBER
        //   Since any path containing a UNC drive breaks this loop, you can
        //   assume that a non-empty `drive` is a *win32* formatted drive.

        if ( _beginsWithForwardSlash(path) ) {
          if (!!drive) {
            if ( $hasUncDrive(path) ) {
              _spliceOne(paths, i);
            }
            else {
              paths[i] = path;
              _rootSplice(paths, i);
              break;
            }
          }
          else {
            drive = $getUncDrive(path);
            if (!!drive) {
              path = $trimUncDrive(path);
            }
            else {
              drive = _getDrive(cwd, paths, i);
            }
            paths[i] = path;
            _rootSplice(paths, i);
            break;
          }
        }
        else {
          tmpDrive = $getWinDrive(path);
          if (!!tmpDrive) {
            if (!!drive && tmpDrive !== drive) {
              _spliceOne(paths, i);
            }
            else {
              if (!drive) {
                drive = tmpDrive;
              }
              path = $trimWinDrive(path);
              paths[i] = path;
              if ( _beginsWithForwardSlash(path) ) {
                _rootSplice(paths, i);
                break;
              }
            }
          }
          else {
            paths[i] = path;
          }
        }
      }
      else {
        _spliceOne(paths, i);
      }
    }

    if (!paths['length']) {
      return cwd;
    }

    if (i === -1) {
      tmpDrive = $getDrive(cwd);
      if (!!drive) {
        if (!!tmpDrive && tmpDrive !== drive) {
          _unshift(paths, '/');
        }
        else {
          if (!!tmpDrive) {
            cwd = $trimDrive(cwd);
          }
          _unshift(paths, cwd);
        }
      }
      else {
        if (!!tmpDrive) {
          drive = tmpDrive;
          cwd = $trimDrive(cwd);
        }
        _unshift(paths, cwd);
      }
    }
    else if (!drive) {
      drive = $getDrive(cwd);
    }

    switch (paths['length']) {
      case 1:
        path = $resolvePath(paths[0]);
        break;
      case 2:
        path = $resolvePath(paths[0], paths[1]);
        break;
      case 3:
        path = $resolvePath(paths[0], paths[1], paths[2]);
        break;
      default:
        path = $resolvePath['apply']($NIL, paths);
    }

    path = $cleanPath(path);

    if ( $hasDrive(path) ) {
      path = $trimDrive(path);
    }

    if (!!drive) {
      path = drive + path;
    }

    return path;
  }
  /// #}}} @func _resolvePaths

  /// #{{{ @func _rootSplice
  /**
   * @private
   * @param {!Array} src
   * @param {number} count
   * @return {void}
   */
  function _rootSplice(src, count) {
    if (!!count) {
      src['splice'](0, count);
    }
  }
  /// #}}} @func _rootSplice

  /// #{{{ @func _spliceOne
  /**
   * @private
   * @param {!Array} src
   * @param {number} index
   * @return {void}
   */
  function _spliceOne(src, index) {
    src['splice'](index, 1);
  }
  /// #}}} @func _spliceOne

  /// #{{{ @func _unshift
  /**
   * @private
   * @param {!Array} src
   * @param {*} val
   * @return {void}
   */
  function _unshift(src, val) {
    src['unshift'](val);
  }
  /// #}}} @func _unshift

  /// #{{{ @func $absPaths
  /**
   * @description
   *   Resolves path segments into an absolute path or returns the current
   *   working directory.
   * @param {(?string|?undefined)} cwd
   *   If the #cwd is a non-empty primitive string, the #cwd must be cleaned
   *   with the `$cleanPath` helper **before** calling this method. If the
   *   #cwd is **not** a non-empty primitive string, the #cwd is set to the
   *   cleaned result of `process.cwd()`.
   * @param {!Array<string>} paths
   *   This method does clean each non-empty primitive string value in #paths
   *   with `$cleanPath`.
   * @param {(?string|?undefined|?boolean)=} homedir
   *   If the #homedir is a primitive string, the #homedir must be cleaned
   *   with the `$cleanPath` helper **before** calling this method. If the
   *   #homedir is `false`, this method will **not** replace an existing home
   *   directory macro within the #path.
   * @return {string}
   */
  function $absPaths(cwd, paths, homedir) {

    if (!cwd) {
      cwd = $getCwd();
    }

    switch (paths['length']) {
      case 0:
        return cwd;
      case 1:
        return $absPath(cwd, paths[0], homedir);
    }

    return _resolvePaths(cwd, paths, homedir);
  }
  /// #}}} @func $absPaths

  return $absPaths;
})();
/// #}}} @helper $absPaths

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
