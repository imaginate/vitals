/**
 * ---------------------------------------------------------------------------
 * $CLONE-FUN HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life>
 */

/// #{{{ @helper $cloneFun
/**
 * @private
 * @param {!Function} func
 * @return {!Function}
 */
function $cloneFun(func) {

  /** @type {string} */
  var key;

  /** @type {!Function} */
  function funCopy() {
    return func['apply']($NIL, arguments);
  }

  for (key in func) {
    if ( $own(func, key) ) {
      funCopy[key] = func[key];
    }
  }
  return funCopy;
}
/// #}}} @helper $cloneFun

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
