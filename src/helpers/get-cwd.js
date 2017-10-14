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
 * @return {string}
 */
function $getCwd() {

  /** @type {string} */
  var path;

  path = process['cwd']();
  return $cleanpath(path);
}
/// #}}} @helper $getCwd

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
