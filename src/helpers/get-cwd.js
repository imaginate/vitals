/**
 * ---------------------------------------------------------------------------
 * $GET-CWD HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getCwd
/**
 * @private
 * @param {(?Object|?undefined)=} proc = `process`
 *   If the #proc is an object, its `"cwd"` property must be set to a function
 *   that returns a primitive string (e.g. a node.js `ChildProcess` instance).
 *   If the #proc is **not** an object, it is set to the global `process`.
 * @return {string}
 */
function $getCwd(proc) {

  /** @type {string} */
  var cwd;

  if (!proc) {
    proc = process;
  }

  cwd = proc['cwd']();

  if (!cwd) {
    return '/';
  }

  cwd = $cleanPath(cwd);

  if ( !$is.abspath(cwd) ) {
    cwd = $flattenPath(cwd);
  }

  return cwd;
}
/// #}}} @helper $getCwd

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
