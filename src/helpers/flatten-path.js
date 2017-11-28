/**
 * ---------------------------------------------------------------------------
 * $FLATTEN-PATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $flattenPath
/**
 * @private
 * @param {string} path
 *   The #path must be cleaned with the `$cleanPath` helper **before** calling
 *   this method. Note that the #path **must be a relative file path**. Since
 *   the #path is assumed to be an absolute file path, the UNC drive pattern
 *   is not checked.
 * @return {string}
 */
function $flattenPath(path) {

  /** @const {string} */
  var DRIVE = $getWinDrive(path);

  if (!!DRIVE) {
    path = $trimWinDrive(path);
  }

  path = $trimRelDirs(path);
  return DRIVE + '/' + path;
}
/// #}}} @helper $flattenPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
