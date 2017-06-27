/**
 * ---------------------------------------------------------------------------
 * $CLONE-FUN HELPER
 * ---------------------------------------------------------------------------
 * @version 5.0.0
 * @see [vitals](https://github.com/imaginate/vitals)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2014-2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

/// #{{{ @helper $cloneFun
/**
 * @private
 * @param {!Function} func
 * @return {!Function}
 */
function $cloneFun(func) {

  /** @type {!Function} */
  function funcCopy() {
    return func['apply'](NIL, arguments);
  }
  /** @type {string} */
  var key;

  for (key in func) {
    if ( $own(func, key) )
      funcCopy[key] = func[key];
  }
  return funcCopy;
}
/// #}}} @helper $cloneFun

// vim:ts=2:et:ai:cc=79:fen:fdm=marker:eol
