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

  /// #{{{ @func _mkPaths
  /**
   * @private
   * @param {(!Array<(string|undefined)>|!Arguments<(string|undefined)>)} paths
   * @return {!Array<string>}
   */
  function _mkPaths(paths) {

    /** @type {!Array<string>} */
    var result;
    /** @type {(string|undefined)} */
    var path;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    result = [];
    len = paths['length'];
    i = -1;
    while (++i < len) {
      path = paths[i];
      if ( $is._str(path) ) {
        path = $insHome(path);
        result['push'](path);
      }
    }
    return result;
  }
  /// #}}} @func _mkPaths

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

    paths = _mkPaths(paths);

    switch (paths['length']) {
      case 0:
        return process['cwd']();
      case 1:
        return _resolve(paths[0]);
    }

    return _resolve['apply']($NIL, paths);
  }
  /// #}}} @func _resolvePaths

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
        path = process['cwd']();
        break;
      case 1:
        if (!path) {
          path = process['cwd']();
        }
        else if ( $is.str(path) ) {
          path = $insHome(path);
          path = _resolve(path);
        }
        else {
          path = _resolvePaths(path);
        }
        break;
      default:
        path = _resolvePaths(arguments);
    }

    return $cleanpath(path);
  }
  /// #}}} @func $resolve

  return $resolve;
})();
/// #}}} @helper $resolve

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
