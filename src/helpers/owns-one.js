/**
 * ---------------------------------------------------------------------------
 * $OWNS-ONE HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $ownsOne
/**
 * @private
 * @param {(!Object|!Function)} src
 * @param {!Array<string>} keys
 * @return {boolean}
 */
function $ownsOne(src, keys) {

  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  len = keys['length'];
  i = -1;
  while (++i < len) {
    if ( $own(src, keys[i]) ) {
      return YES;
    }
  }
  return NO;
}
/// #}}} @helper $ownsOne

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
