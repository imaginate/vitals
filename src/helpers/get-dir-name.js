/**
 * ---------------------------------------------------------------------------
 * $GET-DIR-NAME HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getDirName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function $getDirName(path) {

  if (!!path) {
    path = $trimEndSlash(path);
    path = $replace(path, $PATT_FILE_NAME, '');
    path = $trimEndSlash(path);
  }

  return path;
}
/// #}}} @helper $getDirName

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
