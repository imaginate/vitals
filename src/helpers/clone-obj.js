/**
 * ---------------------------------------------------------------------------
 * $CLONE-OBJ HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $cloneObj
/**
 * @private
 * @param {!Object} obj
 * @return {!Object}
 */
function $cloneObj(obj) {

  /** @type {!Object} */
  var clone;
  /** @type {string} */
  var key;

  clone = {};
  for (key in obj) {
    if ( $own(obj, key) ) {
      clone[key] = obj[key];
    }
  }
  return clone;
}
/// #}}} @helper $cloneObj

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
