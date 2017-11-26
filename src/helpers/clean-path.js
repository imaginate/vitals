/**
 * ---------------------------------------------------------------------------
 * $CLEAN-PATH HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $cleanPath
/**
 * @private
 * @param {string} path
 * @return {string}
 */
function $cleanPath(path) {

  /** @type {string} */
  var result;

  result = path['replace'](/\\+/g, '/');
  result = result['replace'](/\/\/+/g, '/');

  if ( $hasLowerWinDrive(path) ) {
    result = $capitalizeWinDrive(result);
  }
  else if ( $hasUncDrive(path) ) {
    result = '/' + result;
  }

  return result;
}
/// #}}} @helper $cleanPath

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
