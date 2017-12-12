/**
 * ---------------------------------------------------------------------------
 * $IS-DOM-DOC HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $isDomDoc
/**
 * @private
 * @param {*} val
 * @return {boolean}
 */
function $isDomDoc(val) {
  return $isObj(val) && $KEY_NODE_TYPE in val && val[$KEY_NODE_TYPE] === 9;
}
/// #}}} @helper $isDomDoc

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
