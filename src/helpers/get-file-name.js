/**
 * ---------------------------------------------------------------------------
 * $GET-FILE-NAME HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $getFileName
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function $getFileName(path) {

  if (!!path) {
    if ( $isRootDir(path) ) {
      path = '/';
    }
    else {
      if ( $hasEndSlash(path) ) {
        path = $trim($PATT_END_SLASHES, path);
      }
      path = $trimDrive(path);
      if ( !!path && $hasSlash(path) ) {
        path = $trim($PATT_DIR_NAME, path);
      }
    }
  }

  return path;
}
/// #}}} @helper $getFileName

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
