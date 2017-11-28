/**
 * ---------------------------------------------------------------------------
 * $RESOLVE-PATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @docrefs $resolvePath
/// @docref [node]:(https://nodejs.org/)
/// @docref [v0-10]:(https://nodejs.org/docs/v0.10.0/api/path.html#path_path_resolve_from_to)
/// @docref [v7-9]:(https://nodejs.org/docs/v7.9.0/api/path.html#path_path_resolve_paths)
/// #}}} @docrefs $resolvePath

/// #{{{ @helper $resolvePath
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
var $resolvePath = $PATH['resolve'];
/// #}}} @helper $resolvePath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
