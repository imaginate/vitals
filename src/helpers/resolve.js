/**
 * ---------------------------------------------------------------------------
 * $RESOLVE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $resolve
/**
 * @private
 * @param {(!Array<string|undefined>|!Arguments<string|undefined>|...string)=} path
 * @return {string}
 */
var $resolve = (function __vitals$resolve__() {

  /// #{{{ @docrefs $resolve
  /// @docref [node]:(https://nodejs.org/)
  /// @docref [v0-10]:(https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
  /// @docref [v7-9]:(https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
  /// #}}} @docrefs $resolve

  /// #{{{ @const _ABS_PATH
  /**
   * @private
   * @const {!RegExp}
   */
  var _ABS_PATH = /^[\/\\]/;
  /// #}}} @const _ABS_PATH

  /// #{{{ @const _LOWER_CASE_DRIVE
  /**
   * @private
   * @const {!RegExp}
   */
  var _LOWER_CASE_DRIVE = /^[a-z]/;
  /// #}}} @const _LOWER_CASE_DRIVE

  /// #{{{ @func _capitalizeDrive
  /**
   * @private
   * @param {string} drive
   * @return {string}
   */
  function _capitalizeDrive(drive) {
    return drive['toUpperCase']();
  }
  /// #}}} @func _capitalizeDrive

  /// #{{{ @func _getWinDrive
  /**
   * @private
   * @param {string} path
   * @return {string}
   */
  function _getWinDrive(path) {

    /** @type {string} */
    var drive;

    drive = $getWinDrive(path);
    return !!drive
      ? _LOWER_CASE_DRIVE['test'](drive)
        ? drive['replace'](_LOWER_CASE_DRIVE, _capitalizeDrive)
        : drive
      : '';
  }
  /// #}}} @func _getWinDrive

  /// #{{{ @func _isAbsPath
  /**
   * @private
   * @param {string} path
   * @return {boolean}
   */
  function _isAbsPath(path) {
    return _ABS_PATH['test'](path);
  }
  /// #}}} @func _isAbsPath

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

  /// #{{{ @func _resolvePaths
  /**
   * @private
   * @param {(!Array<(string|undefined)>|!Arguments<(string|undefined)>)} paths
   * @return {string}
   */
  function _resolvePaths(paths) {

    /// #{{{ @step declare-variables

    /** @type {!Array<string>} */
    var validPaths;
    /** @type {string} */
    var uncDrive;
    /** @type {string} */
    var winDrive;
    /** @type {string} */
    var drive;
    /** @type {string} */
    var home;
    /** @type {(string|undefined)} */
    var path;
    /** @type {number} */
    var i;

    /// #}}} @step declare-variables

    /// #{{{ @step get-valid-paths

    validPaths = [];
    i = paths['length'];

    mainloop:
    while (i--) {
      path = paths[i];

      /// #{{{ @step skip-empty-paths

      if (!path) {
        continue mainloop;
      }

      /// #}}} @step skip-empty-paths

      /// #{{{ @step insert-home-path

      if ( $hasHome(path) ) {
        if (!home) {
          home = $getHome();
        }
        path = $insHome(path, home);
      }

      /// #}}} @step insert-home-path

      /// #{{{ @step handle-non-win32-drive-absolute-path

      if ( _isAbsPath(path) ) {

        /// #{{{ @step handle-defined-win32-drive

        if (!!winDrive) {
          if ( $hasUncDrive(path) ) {
            continue mainloop;
          }
          _unshift(validPaths, path);
          break mainloop;
        }

        /// #}}} @step handle-defined-win32-drive

        /// #{{{ @step handle-unc-drive-path

        uncDrive = $getUncDrive(path);

        if (!!uncDrive) {
          path = $trimUncDrive(path);
          _unshift(validPaths, path);
          break mainloop;
        }

        /// #}}} @step handle-unc-drive-path

        /// #{{{ @step save-last-valid-path

        _unshift(validPaths, path);

        /// #}}} @step save-last-valid-path

        /// #{{{ @step record-unc-or-win32-drive

        while (i--) {
          path = paths[i];
          if (!!path) {
            winDrive = _getWinDrive(path);
            if (!!winDrive) {
              break mainloop;
            }
            uncDrive = $getUncDrive(path);
            if (!!uncDrive) {
              break mainloop;
            }
          }
        }
        i = 0;

        path = $getCwd();
        winDrive = _getWinDrive(path);
        if (!winDrive) {
          uncDrive = $getUncDrive(path);
        }

        /// #}}} @step record-unc-or-win32-drive

        break mainloop;
      }

      /// #}}} @step handle-non-win32-drive-absolute-path

      drive = _getWinDrive(path);

      /// #{{{ @step handle-non-win32-drive-relative-path

      if (!drive) {
        _unshift(validPaths, path);
        continue mainloop;
      }

      /// #}}} @step handle-non-win32-drive-relative-path

      /// #{{{ @step check-win32-drive

      if (!!winDrive) {
        if (drive !== winDrive) {
          continue mainloop;
        }
      }

      /// #}}} @step check-win32-drive

      /// #{{{ @step record-win32-drive

      else {
        winDrive = drive;
      }

      /// #}}} @step record-win32-drive

      path = $trimWinDrive(path);

      /// #{{{ @step handle-win32-drive-absolute-path

      if ( _isAbsPath(path) ) {
        _unshift(validPaths, path);
        break mainloop;
      }

      /// #}}} @step handle-win32-drive-absolute-path

      /// #{{{ @step handle-win32-drive-relative-path

      _unshift(validPaths, path);

      /// #}}} @step handle-win32-drive-relative-path

    }

    /// #}}} @step get-valid-paths

    /// #{{{ @step check-no-valid-paths

    if (!validPaths['length']) {
      return $getCwd();
    }

    /// #}}} @step check-no-valid-paths

    /// #{{{ @step save-cwd-to-valid-paths

    if (i < 0) {
      path = $getCwd();
      if ( _isAbsPath(path) ) {
        if (!!winDrive) {
          if ( !$hasUncDrive(path) ) {
            _unshift(validPaths, path);
          }
        }
        else {
          uncDrive = $getUncDrive(path);
          if (!!uncDrive) {
            path = $trimUncDrive(path);
          }
          _unshift(validPaths, path);
        }
      }
      else {
        drive = $getWinDrive(path);
        if (!!drive) {
          path = $trimWinDrive(path);
          if (!!winDrive) {
            if (drive === winDrive) {
              _unshift(validPaths, path);
            }
          }
          else {
            winDrive = drive;
            _unshift(validPaths, path);
          }
        }
        else {
          _unshift(validPaths, path);
        }
      }
    }

    /// #}}} @step save-cwd-to-valid-paths

    /// #{{{ @step get-resolved-path

    switch (validPaths['length']) {
      case 1:
        path = _resolve(validPaths[0]);
        break;
      case 2:
        path = _resolve(validPaths[0], validPaths[1]);
        break;
      case 3:
        path = _resolve(validPaths[0], validPaths[1], validPaths[2]);
        break;
      default:
        path = _resolve['apply']($NIL, validPaths);
    }

    drive = uncDrive || winDrive || '';
    path = drive + path;
    path = $cleanpath(path);

    /// #}}} @step get-resolved-path

    return path;
  }
  /// #}}} @func _resolvePaths

  /// #{{{ @func _unshift
  /**
   * @private
   * @param {!Array} src
   * @param {*} val
   * @return {!Array}
   */
  function _unshift(src, val) {
    src['unshift'](val);
    return src;
  }
  /// #}}} @func _unshift

  /// #{{{ @func $resolve
  /**
   * @description
   *   Resolves path segments into an absolute path or returns the current
   *   working directory.
   * @param {(!Array<(string|undefined)>|!Arguments<(string|undefined)>|...(string|undefined))=} path
   * @return {string}
   */
  function $resolve(path) {

    switch (arguments['length']) {
      case 0:
        return $getCwd();
      case 1:
        if (!path) {
          return $getCwd();
        }
        if ( !$is.str(path) ) {
          return _resolvePaths(path);
        }
    }

    return _resolvePaths(arguments);
  }
  /// #}}} @func $resolve

  return $resolve;
})();
/// #}}} @helper $resolve

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
